const axios = require('axios');
// 
const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const response = await axios.get('http://authservice:8081/api/user-info', {
      headers: { Authorization: `Bearer ${token}` } //verifi depuis api authservice (8081)
    });
    const { role } = response.data;
    if (role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = adminMiddleware;
