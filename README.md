## **Live Deployments**

- **Frontend Application**: [https://swapify.club](https://swapify.club)
- **Admin Panel**: [https://swapify-crm.vercel.app/](https://swapify-crm.vercel.app/)

## **Problem Statement**

e-Waste is rising as devices are thrown away instead of reused. Every year, millions of phones, laptops, and gadgets end up in landfills, leaking harmful chemicals into the environment. People often replace devices quickly instead of repairing, recycling, or passing them on to someone who needs them.


### **Solution: Swapify**

**Swapify** is a community-driven platform where people can **donate, sell, or exchange their unused electronics and items locally**—with a strong focus on **reuse and sustainability**.

*“If you have more than what you need, simply give it to those who need it the most.”*

* Instead of throwing away old or unused devices, users can list them on Swapify to be **donated, sold at an affordable price, or exchanged**.
* The platform encourages **repair and recycling** by connecting people who have unused items with those who can fix, repurpose, or use them.
* By enabling **local meetups only (no shipping)**, Swapify reduces carbon footprint and builds community trust.
* This helps extend the lifecycle of electronics, reduce e-waste, and promote a **circular economy** where resources are continuously reused.

In short, Swapify empowers people to **donate, sell, recycle, and reuse electronics and other items**—so they don’t end up in landfills, but instead find a **second life** in someone’s hands.

### **How We Are Different**

To make the platform safe and trustworthy:

* We use a **dedicated Admin Panel with AI-powered listing approvals** to reduce spam and scams.
* Strict rules are implemented for both **users and listings**.
* Each region has **dedicated admins** to manage local activity and ensure quality.

## Application Screenshots


![1758731680696](images/README/1758731680696.png)
*Login Screen*

![1758731437510](images/README/1758731437510.png)
*Home Page (Feed):People can See Nearby Listing Items*

![1758731493475](images/README/1758731493475.png)
*Users Can One click Autodetect or Manually Select Their Location*

![1758731622375](images/README/1758731622375.png)
*My Listings Page: Users Can Manage their Listed items*

![1758732608675](images/README/1758732608675.png)
*Interested Buyers , Can Make An Offer for the Listing*

![1758732466701](images/README/1758732466701.png)
*Listings Page: Users Can Check details about the Listed items*

![1758731736840](images/README/1758731736840.png)
*My Offers Page: Sellers Can Check the Buyers Offers*

## Manager & Admin Panel (CRM Screenshots)

![1758734359703](images/README/1758734359703.png)
*Manager Panel: Manager has the access the approve admins for a pearitcular selecteed region Ex:  Kothri Kalan*

![1758733401577](images/README/1758733401577.png)
*Login Page:  Only Approved Admins For a Selected Region can Access the Admin Panel Ex: Admin Who has access to kothrikalan listing can approve and manage the listings*

![1758733491992](images/README/1758733491992.png)
*User Management: Admin Have the Control To block, Approve and manage users*

![1758733539066](images/README/1758733539066.png)
*Listing Management: Admin Have the Control To Manage The Lisitings, Approve and manage Lsitings prevent spams and scams*

![1758733586218](images/README/1758733586218.png)
*Offer Management: Admin Have the Control To Manage The Offers, Approve and manage Offers prevent spams and scams*

## Media CDN

![1758736794814](images/README/1758736794814.png)
*Our Self Developed Custom Media CDN to make it more scalable *

## **Project Architecture**

### **Technology Stack**
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **CRM/Admin Panel**: Next.js 14 with TypeScript
- **Media CDN**: Custom-built content delivery network
- **Authentication**: JWT tokens, Google OAuth
- **UI Components**: shadcn/ui
- **Deployment**: Vercel (frontend/CRM), Custom server (backend)

### **Key Features**
- **Local-First Marketplace**: No shipping required, builds community trust
- **AI-Powered Moderation**: Reduces spam and scams through intelligent listing approval
- **Region-Based Administration**: Dedicated admins for quality control in specific areas
- **Real-time Chat System**: Direct communication between buyers and sellers
- **Offer Management**: Comprehensive system for managing buy/sell offers
- **Sustainability Focus**: Promotes circular economy and e-waste reduction

### **Components**
1. **swapify-frontend** - User-facing marketplace application
2. **swapify-crm** - Admin panel for platform management
3. **swapify-backend** - REST API server with MongoDB
4. **swapify-media-cdn** - Custom media content delivery network

---

**Swapify** - *Reducing e-waste, one exchange at a time.*
