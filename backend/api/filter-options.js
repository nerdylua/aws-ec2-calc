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
    const instances = data.instances;

    const families = [...new Set(instances.map(instance => {
      const name = instance.instanceName;
      const family = name.split('.')[0];
      return family;
    }))].sort();

    const vcpus = [...new Set(instances.map(instance => instance.vCPUs))].sort((a, b) => a - b);

    const memories = [...new Set(instances.map(instance => {
      const memory = instance.memory;
      const match = memory.match(/^([\d.]+)/);
      return match ? match[1] : memory;
    }))].sort((a, b) => {
      const aNum = parseFloat(a);
      const bNum = parseFloat(b);
      return aNum - bNum;
    });

    const networks = [...new Set(instances.map(instance => instance.networkPerformance))].sort();

    res.status(200).json({
      families,
      vcpus,
      memories,
      networks
    });
  } catch (error) {
    console.error('Error in filter-options endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 