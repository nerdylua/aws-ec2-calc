const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

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

// Cache the data
let cachedData;

function getCachedData() {
  if (!cachedData) {
    cachedData = readExcelData();
  }
  return cachedData;
}

// NEW: force refresh of the cached Excel data (used by /api/refresh-data)
function refreshCachedData() {
  cachedData = readExcelData();
  return cachedData;
}

module.exports = {
  readExcelData,
  getSampleData,
  getCachedData,
  refreshCachedData
}; 