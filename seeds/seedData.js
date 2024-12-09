const campaigns = [
  {
    title: "Save Local Theater",
    description: "Help preserve our historic local theater for future generations.",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
    goal: 100000,
    raised: 45000,
    category: "arts",
    endDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000), // 55 days from now
    status: "active"
  },
  {
    title: "Help Build School Library",
    description: "Support education by helping us build a new library for students.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    goal: 50000,
    raised: 25000,
    category: "education",
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "active"
  },
  {
    title: "Emergency Medical Fund",
    description: "Support urgent medical treatment for those in need.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
    goal: 20000,
    raised: 15000,
    category: "medical",
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    status: "active"
  }
];

const users = [
  {
    walletAddress: "0x1234567890123456789012345678901234567890",
    name: "Demo User 1",
    nonce: "initial_nonce_1",
    avatar: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d"
  },
  {
    walletAddress: "0x2345678901234567890123456789012345678901",
    name: "Demo User 2",
    nonce: "initial_nonce_2",
    avatar: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d"
  }
];

module.exports = { campaigns, users }; 