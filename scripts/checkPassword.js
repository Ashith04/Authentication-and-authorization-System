require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const [,, email, password] = process.argv;
if (!email || !password) {
  console.error('Usage: node scripts/checkPassword.js <email> <password>');
  process.exit(2);
}

(async () => {
  try {
    await connectDB();
    const user = await User.findOne({ email }).lean();
    if (!user) return console.log('User not found');
    const match = await bcrypt.compare(password, user.password);
    console.log('email:', user.email);
    console.log('role :', user.role);
    console.log('passwordMatch:', match);
    process.exit(0);
  } catch (err) {
    console.error('Error checking password:', err.message || err);
    process.exit(1);
  }
})();
