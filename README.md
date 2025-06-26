# AWS EC2 Cost Calculator

A professional AWS EC2 cost estimation tool with real-time pricing data. Built with Next.js and Node.js, featuring advanced filtering and cost analysis.

## 🚀 Features

- **Web scraping** from AWS Calculator using Selenium WebDriver
- **Live cost calculator** with custom instance count and usage hours
- **On-Demand vs Compute Savings Plan** pricing comparison
- **Professional UI** with dark/light theme toggle
- **Instance selection** with detailed specifications display
- **Real-time cost calculations** for monthly and total costs
- **Breakeven analysis** page with detailed cost calculations

## 🏗️ Architecture

```
aws-ec2-calc/
├── frontend/                           # Next.js 15 React application
│   ├── app/
│   │   ├── page.tsx            # Main EC2 calculator interface 
│   │   ├── cost-calculations/
│   │   │   └── page.tsx               # Breakeven analysis page
│   │   ├── layout.tsx                 # Root layout
│   │   └── globals.css                # Global styles
│   ├── components/ui/                 # Shadcn/ui components
│   ├── lib/utils.ts                   # Utility functions
│   ├── package.json                   # Frontend dependencies
│   ├── vercel.json                    # Frontend deployment config
│   └── next.config.ts                 # Next.js configuration
├── backend/                           # Serverless API & data processing
│   ├── api/                          # Individual serverless endpoints
│   │   ├── index.js                  # Main API router
│   │   ├── metadata.js               # EC2 metadata endpoint
│   │   ├── instances.js              # Instances with pagination/filters
│   │   ├── filter-options.js         # Available filter values
│   │   ├── refresh-data.js           # Data refresh endpoint
│   │   └── health.js                 # Health check endpoint
│   ├── data/
│   │   └── aws_ec2_instances.xlsx    # EC2 instances data
│   ├── server-utils.js               # Shared utilities & Excel reader
│   ├── server.js                     # Local development server
│   ├── scraper.py                    # Selenium web scraper
│   ├── requirements.txt              # Python dependencies
│   ├── package.json                  # Node.js dependencies
│   └── vercel.json                   # Backend deployment config
└── README.md                         # This file
```

## 🛠️ Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui  
**Backend:** Node.js, Express.js, XLSX processing  
**Scraper:** Python, Selenium WebDriver, Pandas, OpenPyXL

## 🚀 Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/nerdylua/aws-ec2-calc.git
   cd aws-ec2-calc
   ```

2. **Start Backend (Local)**
   ```bash
   cd backend
   npm install 
   npm start  # Runs on http://localhost:3001
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm install 
   npm run dev  # Runs on http://localhost:3000
   ```

4. **Optional: Run Web Scraper**
   ```bash
   cd backend
   pip install -r requirements.txt
   python scraper.py  # Requires Chrome browser
   ```

Application runs on `http://localhost:3000`

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check with timestamp |
| `GET` | `/api/metadata` | AWS configuration (region, tenancy, OS) |
| `GET` | `/api/instances` | Paginated EC2 instances with filtering |
| `GET` | `/api/filter-options` | Available filter values (families, vCPUs, etc.) |
| `POST` | `/api/refresh-data` | Refresh Excel data cache |

**Example API Calls:**
```bash
# Get metadata
GET /api/metadata

# Get instances with filters
GET /api/instances?page=1&limit=10&search=t3&family=t3&vcpus=2

# Get filter options
GET /api/filter-options
```

## 💰 Cost Calculator

- **Real-time calculations** for custom usage patterns
- **Breakeven analysis** showing optimal commitment periods
- **Multi-instance support** for enterprise scenarios
- **Professional AWS-style** cost breakdowns

## 🔧 Development

```bash
# Frontend
npm run dev      # Development server
npm run build    # Production build

# Backend
npm start        # Start server

# Scraper (from backend directory)
cd backend
python scraper.py    # Collect fresh data
```

## 🎨 UI Features

- **Professional AWS-style interface** with modern gradients
- **Smart pagination** with configurable page sizes (10/30/50)
- **Advanced search** across instance names, memory, network, storage
- **Color-coded pricing** with currency formatting
- **Responsive design** for mobile and desktop
- **Theme toggle** with localStorage persistence

### Built with ❤️ for professional AWS cost estimation.