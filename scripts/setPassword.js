require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const [,, email, newPassword] = process.argv;
if (!email || !newPassword) {
  console.error('Usage: node scripts/setPassword.js <email> <newPassword>');
  process.exit(2);
}

(async () => {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return console.log('User not found');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();
    console.log('Password updated for', user.email);
    process.exit(0);
  } catch (err) {
    console.error('Error setting password:', err.message || err);
    process.exit(1);
  }
})();
