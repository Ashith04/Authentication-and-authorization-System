const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTAxYTcyNWVmNmYyZDlhZjI2NDBhOTMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Nzg3MjEyODUsImV4cCI6MTc3ODcyNDg4NX0.CgwxyESl-QuqymAnh99tfC55akvvWN6mH_zgvU6rGRg';

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Token is valid:', decoded);
} catch (err) {
  console.log('Token verification failed:', err.message);
}