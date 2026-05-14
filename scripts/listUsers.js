require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

(async () => {
  try {
    await connectDB();
    const users = await User.find().lean();
    if (!users.length) return console.log('No users found');
    users.forEach(u => {
      console.log({ id: u._id.toString(), email: u.email, passwordHash: u.password, role: u.role });
    });
    process.exit(0);
  } catch (err) {
    console.error('Error listing users:', err.message || err);
    process.exit(1);
  }
})();
