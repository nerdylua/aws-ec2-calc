// Local Development
const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Function to read Excel data
function readExcelData() {
  try {
    const excelPath = path.join(__dirname, 'data/aws_ec2_instances.xlsx');
    
    if (!fs.existsSync(excelPath)) {
      console.log('Excel file not found, using sample data');
      return getSampleData();
    }

    const workbook = xlsx.readFile(excelPath);
    
    // Read Configuration sheet
    const configSheet = workbook.Sheets['Configuration'];
    const configData = xlsx.utils.sheet_to_json(configSheet);
    
    // Read EC2 Instances sheet
    const instancesSheet = workbook.Sheets['EC2 Instances'];
    const instancesData = xlsx.utils.sheet_to_json(instancesSheet);
    
         // Filter out any invalid entries (ones without instance names)
     const validInstances = instancesData.filter(instance => 
       instance['Instance name'] && 
       instance['Instance name'].trim() !== ''
     );

     return {
       metadata: {
         region: "Asia Pacific (Mumbai)",
         tenancy: "Shared Instances",
         os: "Windows Server",
         workload: "Constant usage",
         totalInstances: validInstances.length,
         pagesComplete: "8 of 8",
         progress: `${validInstances.length}/${validInstances.length} (100.0%)`
       },
             instances: validInstances.map(instance => ({
        instanceName: instance['Instance name'],
        vCPUs: instance['vCPUs'],
        memory: instance['Memory'],
        networkPerformance: instance['Network Performance'],
        storage: instance['Storage'],
        onDemandHourlyCost: parseFloat(instance['On-Demand Hourly Cost']),
        currentGeneration: instance['CurrentGeneration'],
        potentialEffectiveHourlyCost: instance['Potential Effective Hourly Cost (Savings %)']
      }))
    };
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return getSampleData();
  }
}

// Sample data fallback
function getSampleData() {
  return {
    metadata: {
      region: "Asia Pacific (Mumbai)",
      tenancy: "Shared Instances",
      os: "Windows Server",
      workload: "Constant usage",
      totalInstances: 10,
      pagesComplete: "Sample Data",
      progress: "10/394 (2.4%)"
    },
    instances: [
      {
        instanceName: "t3a.nano",
        vCPUs: 2,
        memory: "0.5 GiB",
        networkPerformance: "Up to 5 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.0077,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0057 (25%)"
      },
      {
        instanceName: "t2.nano",
        vCPUs: 1,
        memory: "0.5 GiB",
        networkPerformance: "Low",
        storage: "EBS only",
        onDemandHourlyCost: 0.0085,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0046 (46%)"
      },
      {
        instanceName: "t3.nano",
        vCPUs: 2,
        memory: "0.5 GiB",
        networkPerformance: "Up to 5 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.0102,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0067 (35%)"
      },
      {
        instanceName: "t3a.micro",
        vCPUs: 2,
        memory: "1 GiB",
        networkPerformance: "Up to 5 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.0154,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0115 (26%)"
      },
      {
        instanceName: "t2.micro",
        vCPUs: 1,
        memory: "1 GiB",
        networkPerformance: "Low to Moderate",
        storage: "EBS only",
        onDemandHourlyCost: 0.017,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0091 (46%)"
      },
      {
        instanceName: "t3.micro",
        vCPUs: 2,
        memory: "1 GiB",
        networkPerformance: "Up to 5 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.0204,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0133 (35%)"
      },
      {
        instanceName: "t3a.small",
        vCPUs: 2,
        memory: "2 GiB",
        networkPerformance: "Up to 5 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.0307,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0229 (25%)"
      },
      {
        instanceName: "t2.small",
        vCPUs: 1,
        memory: "2 GiB",
        networkPerformance: "Low to Moderate",
        storage: "EBS only",
        onDemandHourlyCost: 0.034,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.0183 (46%)"
      },
      {
        instanceName: "m5.large",
        vCPUs: 2,
        memory: "8 GiB",
        networkPerformance: "Up to 10 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.193,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.1300 (33%)"
      },
      {
        instanceName: "c5.large",
        vCPUs: 2,
        memory: "4 GiB",
        networkPerformance: "Up to 10 Gigabit",
        storage: "EBS only",
        onDemandHourlyCost: 0.177,
        currentGeneration: "Yes",
        potentialEffectiveHourlyCost: "0.1240 (30%)"
      }
    ]
  };
}

// Cache the data on server start
let cachedData = readExcelData();

// Routes
app.get('/api/metadata', (req, res) => {
  res.json(cachedData.metadata);
});

app.get('/api/instances', (req, res) => {
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

  let filteredInstances = cachedData.instances;

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

  res.json({
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
});

// Get unique filter options
app.get('/api/filter-options', (req, res) => {
  const instances = cachedData.instances;

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

  res.json({
    families,
    vcpus,
    memories,
    networks
  });
});

// Refresh data endpoint (useful for development)
app.post('/api/refresh-data', (req, res) => {
  cachedData = readExcelData();
  res.json({ message: 'Data refreshed successfully', totalInstances: cachedData.instances.length });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server (only in development/local)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Loaded ${cachedData.instances.length} EC2 instances`);
    console.log(`📋 Available endpoints:`);
    console.log(`   GET /api/metadata - EC2 configuration metadata`);
    console.log(`   GET /api/instances - EC2 instances with pagination and filters`);
    console.log(`   GET /api/filter-options - Available filter options`);
    console.log(`   POST /api/refresh-data - Refresh Excel data`);
    console.log(`   GET /api/health - Health check`);
  });
}

// Export for Vercel serverless
module.exports = app; 