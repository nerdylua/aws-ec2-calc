const metadataHandler      = require('./metadata');
const instancesHandler     = require('./instances');
const filterOptionsHandler = require('./filter-options');
const refreshDataHandler   = require('./refresh-data');
const healthHandler        = require('./health');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { pathname } = new URL(req.url, 'http://localhost');
  const path = pathname.replace(/\/+$/, '');       // trim trailing slash

  if (path === '/api/metadata')       return await metadataHandler(req, res);
  if (path === '/api/instances')      return await instancesHandler(req, res);
  if (path === '/api/filter-options') return await filterOptionsHandler(req, res);
  if (path === '/api/refresh-data')   return await refreshDataHandler(req, res);
  if (path === '/api/health')         return await healthHandler(req, res);

  if (path === '/api') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      status: 'ok',
      message: 'AWS EC2 Cost Calculator API',
      endpoints: [
        '/api/metadata',
        '/api/instances',
        '/api/filter-options',
        '/api/refresh-data',
        '/api/health'
      ]
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({ error: 'Endpoint not found' });
};
