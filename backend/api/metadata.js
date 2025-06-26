const { getCachedData } = require('../server-utils');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  try {
    const data = getCachedData();
    res.status(200).json(data.metadata);
  } catch (error) {
    console.error('Error in metadata endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 