const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const Listing = require('../models/Listing');
const User = require('../models/User');
// Chat removed from offer flow
const authMiddleware = require('../middlewares/authMiddleware');

// Submit a new offer
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { listingId, offerAmount, message, contactName, contactPhone } = req.body;
    const buyerId = req.userId;

    // Validate input
    if (
      !listingId ||
      offerAmount === undefined || offerAmount === null || isNaN(Number(offerAmount)) ||
      !message || !contactName || !contactPhone
    ) {
      return res.status(400).json({ 
        success: false, 
        message: 'Listing ID, valid offerAmount, message, contactName and contactPhone are required' 
      });
    }

    if (Number(offerAmount) < 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Offer amount must be zero or greater' 
      });
    }

    // Check if listing exists and is active
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ 
        success: false, 
        message: 'Listing not found' 
      });
    }

    if (listing.status !== 'active') {
      return res.status(400).json({ 
        success: false, 
        message: 'This listing is no longer accepting offers' 
      });
    }

    // Check if buyer is not the seller
    if (listing.seller_id.toString() === buyerId.toString()) {
      return res.status(400).json({ 
        success: false, 
        message: 'You cannot make an offer on your own listing' 
      });
    }

    // Check if there's already a pending offer from this buyer
    const existingOffer = await Offer.findOne({
      listing: listingId,
      buyer: buyerId,
      status: 'pending'
    });

    if (existingOffer) {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have a pending offer for this listing' 
      });
    }

    // Create new offer
    const newOffer = new Offer({
      listing: listingId,
      buyer: buyerId,
      seller: listing.seller_id,
      offerAmount,
      message,
      contactName,
      contactPhone,
      status: 'pending'
    });

    await newOffer.save();

    // Populate the offer for response
    const populatedOffer = await Offer.findById(newOffer._id)
      .populate('buyer', 'name email')
      .populate('listing', 'title price');

    res.status(201).json({
      success: true,
      message: 'Offer submitted successfully',
      offer: populatedOffer
    });

  } catch (error) {
    console.error('Error submitting offer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while submitting offer' 
    });
  }
});

// Get all offers for a specific listing (for sellers)
router.get('/listing/:listingId', authMiddleware, async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.userId;

    // Verify the listing belongs to the current user
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ 
        success: false, 
        message: 'Listing not found' 
      });
    }

    if (listing.seller_id.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only view offers for your own listings' 
      });
    }

    // Get all offers for this listing
    const offers = await Offer.find({ listing: listingId })
      .populate('buyer', 'username email phone_number google_user_avatar user_avatar full_name')
      .populate('listing', 'title price cover_image')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      offers,
      totalOffers: offers.length
    });

  } catch (error) {
    console.error('Error fetching listing offers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching offers' 
    });
  }
});

// Get all listings with offers for a seller
router.get('/my-listings-with-offers', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    // Get all offers for this seller's listings
    const offersData = await Offer.aggregate([
      { $match: { seller: userId } },
      {
        $group: {
          _id: '$listing',
          totalOffers: { $sum: 1 },
          pendingOffers: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          latestOffer: { $max: '$createdAt' }
        }
      }
    ]);

    // Get listing details
    const listingIds = offersData.map(offer => offer._id);
    const listings = await Listing.find({
      _id: { $in: listingIds },
      deleted: false
    }).select('title price cover_image status category subcategory location_display_name createdAt');

    // Combine data
    const listingsWithOffers = listings.map(listing => {
      const offerStats = offersData.find(offer => 
        offer._id.toString() === listing._id.toString()
      );
      
      return {
        ...listing.toObject(),
        offerStats: {
          totalOffers: offerStats.totalOffers,
          pendingOffers: offerStats.pendingOffers,
          latestOffer: offerStats.latestOffer
        }
      };
    });

    // Sort by latest offer date
    listingsWithOffers.sort((a, b) => 
      new Date(b.offerStats.latestOffer) - new Date(a.offerStats.latestOffer)
    );

    res.json({
      success: true,
      listings: listingsWithOffers
    });

  } catch (error) {
    console.error('Error fetching listings with offers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching listings with offers' 
    });
  }
});

// Update offer status (accept/reject)
router.patch('/:offerId/status', authMiddleware, async (req, res) => {
  try {
    const { offerId } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be "accepted" or "rejected"' 
      });
    }

    const offer = await Offer.findById(offerId).populate('listing');
    if (!offer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Offer not found' 
      });
    }

    // Verify the seller owns the listing
    if (offer.seller.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only update offers for your own listings' 
      });
    }

    if (offer.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'This offer has already been processed' 
      });
    }

    // Update offer status
    offer.status = status;
    await offer.save();

    // No chat messaging in offers flow

    res.json({
      success: true,
      message: `Offer ${status} successfully`,
      offer
    });

  } catch (error) {
    console.error('Error updating offer status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating offer status' 
    });
  }
});

// Get offers made by current user (buyer perspective)
router.get('/my-offers', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const offers = await Offer.find({ buyer: userId })
      .populate('listing', 'title price cover_image status seller_id')
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      offers
    });

  } catch (error) {
    console.error('Error fetching user offers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching your offers' 
    });
  }
});

module.exports = router;