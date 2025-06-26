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
    const {
      page = 1,
      limit = 10,
      search = '',
      family = '',
      vcpus = '',
      memory = '',
      network = ''
    } = req.query;

    // Validate limit to allowed values
    const allowedLimits = [10, 30, 50];
    const validLimit = allowedLimits.includes(parseInt(limit)) ? parseInt(limit) : 10;

    const data = getCachedData();
    let filteredInstances = data.instances;

    // Apply filters - Professional search handling
    if (search) {
      const searchTerms = search.toLowerCase().trim().split(/\s+/);
      filteredInstances = filteredInstances.filter(instance => {
        const searchableText = [
          instance.instanceName,
          instance.memory,
          instance.networkPerformance,
          instance.storage,
          instance.currentGeneration
        ].join(' ').toLowerCase();
        
        // All search terms must match
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    if (family && family !== 'All') {
      filteredInstances = filteredInstances.filter(instance =>
        instance.instanceName.toLowerCase().startsWith(family.toLowerCase())
      );
    }

    if (vcpus && vcpus !== 'All') {
      filteredInstances = filteredInstances.filter(instance =>
        instance.vCPUs.toString() === vcpus
      );
    }

    if (memory && memory !== 'All') {
      filteredInstances = filteredInstances.filter(instance =>
        instance.memory.includes(memory)
      );
    }

    if (network && network !== 'All') {
      filteredInstances = filteredInstances.filter(instance =>
        instance.networkPerformance.includes(network)
      );
    }

    // Pagination
    const pageNum = parseInt(page);
    const startIndex = (pageNum - 1) * validLimit;
    const endIndex = startIndex + validLimit;

    const paginatedInstances = filteredInstances.slice(startIndex, endIndex);

    res.status(200).json({
      instances: paginatedInstances,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredInstances.length / validLimit),
        totalItems: filteredInstances.length,
        itemsPerPage: validLimit,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, filteredInstances.length)
      }
    });
  } catch (error) {
    console.error('Error in instances endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 