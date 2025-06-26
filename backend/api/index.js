const metadataHandler = require('./metadata');
const instancesHandler = require('./instances');
const pricingPlansHandler = require('./pricing-plans');
const calculateHandler = require('./calculate');
const filterOptionsHandler = require('./filter-options');
const refreshDataHandler = require('./refresh-data');
const healthHandler = require('./health');

module.exports = (req, res) => {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Route based on URL path
  const path = req.url || '';
  
  if (path.startsWith('/api/metadata')) {
    return metadataHandler(req, res);
  }
  
  if (path.startsWith('/api/instances')) {
    return instancesHandler(req, res);
  }
  
  if (path.startsWith('/api/pricing-plans')) {
    return pricingPlansHandler(req, res);
  }
  
  if (path.startsWith('/api/calculate')) {
    return calculateHandler(req, res);
  }
  
  if (path.startsWith('/api/filter-options')) {
    return filterOptionsHandler(req, res);
  }
  
  if (path.startsWith('/api/refresh-data')) {
    return refreshDataHandler(req, res);
  }
  
  if (path.startsWith('/api/health')) {
    return healthHandler(req, res);
  }
  
  // API info endpoint
  if (path === '/api') {
    return res.status(200).json({ 
      status: 'ok', 
      message: 'AWS EC2 Cost Calculator API',
      endpoints: [
        '/api/metadata',
        '/api/instances',
        '/api/pricing-plans',
        '/api/calculate',
        '/api/filter-options',
        '/api/refresh-data',
        '/api/health'
      ]
    });
  }
  
  // 404 for unknown routes
  res.status(404).json({ error: 'Endpoint not found' });
}; 