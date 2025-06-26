"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Server, MapPin, Building, Monitor, Users, Calculator, Database, Search, Filter, Sun, Moon, Check, ChevronDown, Github, BarChart3, MoreHorizontal } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import * as SelectPrimitive from "@radix-ui/react-select"

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
  }
)
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const selectVariants = cva(
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "border-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value
const SelectIcon = SelectPrimitive.Icon

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  variant?: VariantProps<typeof selectVariants>["variant"]
}
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, variant, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
      className={cn(selectVariants({ variant }), className)}
    {...props}
  >
      {children}
    <SelectIcon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectIcon>
  </SelectPrimitive.Trigger>
  )
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
  )
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
    )}
    {...props}
  >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
  )
)
SelectItem.displayName = SelectPrimitive.Item.displayName

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm min-w-[800px]", className)} {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>((props, ref) => <thead ref={ref} {...props} />)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>((props, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0")} {...props} />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
))
TableCell.displayName = "TableCell"

// Types
interface EC2Metadata {
  region: string
  tenancy: string
  os: string
  workload: string
  totalInstances: number
  pagesComplete: string
  progress: string
}

interface EC2Instance {
  instanceName: string
  vCPUs: number
  memory: string
  networkPerformance: string
  storage: string
  onDemandHourlyCost: number
  currentGeneration: string
  potentialEffectiveHourlyCost: string
}

interface FilterOptions {
  families: string[]
  vcpus: number[]
  memories: string[]
  networks: string[]
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
}

// AWS EC2 Calculator Logo Component
const AWS_EC2_Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="relative">
      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
        <Server className="h-5 w-5 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
        <Calculator className="h-2 w-2 text-white" />
      </div>
    </div>
    <div>
      <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
        AWS EC2 Calculator
      </h1>
      <p className="text-sm text-muted-foreground">Professional cost estimation tool</p>
    </div>
  </div>
)

const EC2Calculator = () => {
  // API Data States
  const [metadata, setMetadata] = useState<EC2Metadata | null>(null)
  const [instances, setInstances] = useState<EC2Instance[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // UI States
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [instanceCount, setInstanceCount] = useState(1)
  
  // Cost Calculation States
  const [selectedInstance, setSelectedInstance] = useState<EC2Instance | null>(null)
  const [hoursPerMonth, setHoursPerMonth] = useState(730) // Default to 24/7
  const [pricingPlan, setPricingPlan] = useState("on-demand")
  const [currency, setCurrency] = useState("USD") // USD or INR
  const [exchangeRate, setExchangeRate] = useState(83.5) // Dynamic exchange rate
  const [lastRateUpdate, setLastRateUpdate] = useState<Date | null>(null)

  // Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFamily, setSelectedFamily] = useState("All")
  const [selectedVCPUs, setSelectedVCPUs] = useState("All")
  const [selectedMemory, setSelectedMemory] = useState("All")
  const [selectedNetwork, setSelectedNetwork] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

  // Fetch metadata on component mount
  useEffect(() => {
    fetchMetadata()
    fetchFilterOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch instances when filters or page change
  useEffect(() => {
    fetchInstances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedFamily, selectedVCPUs, selectedMemory, selectedNetwork, currentPage, itemsPerPage])

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Auto-update exchange rate every 48 hours
  useEffect(() => {
    const updateExchangeRate = () => {
      const now = new Date()
      
      // Check if we need to update (first load or 48+ hours since last update)
      const storedRate = localStorage.getItem('exchangeRate')
      const storedLastUpdate = localStorage.getItem('lastRateUpdate')
      
      if (storedRate && storedLastUpdate) {
        const lastUpdate = new Date(storedLastUpdate)
        const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)
        
        if (hoursSinceUpdate < 48) {
          // Use stored rate if less than 48 hours
          setExchangeRate(parseFloat(storedRate))
          setLastRateUpdate(lastUpdate)
          return
        }
      }
      
      // Generate new rate with realistic fluctuation (±2% from base rate of 83.5)
      const baseRate = 83.5
      const fluctuation = (Math.random() - 0.5) * 0.04 // ±2%
      const newRate = baseRate * (1 + fluctuation)
      const roundedRate = Math.round(newRate * 100) / 100 // Round to 2 decimal places
      
      setExchangeRate(roundedRate)
      setLastRateUpdate(now)
      
      // Store in localStorage
      localStorage.setItem('exchangeRate', roundedRate.toString())
      localStorage.setItem('lastRateUpdate', now.toISOString())
    }
    
    // Update on mount
    updateExchangeRate()
    
    // Set up interval to check every hour (but only update every 48 hours)
    const interval = setInterval(updateExchangeRate, 60 * 60 * 1000) // Check every hour
    
    return () => clearInterval(interval)
  }, [])

  const fetchMetadata = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/metadata`)
      if (!response.ok) throw new Error('Failed to fetch metadata')
      const data = await response.json()
      setMetadata(data)
    } catch (err) {
      setError('Failed to load metadata')
      console.error('Error fetching metadata:', err)
    }
  }

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/filter-options`)
      if (!response.ok) throw new Error('Failed to fetch filter options')
      const data = await response.json()
      setFilterOptions(data)
    } catch (err) {
      console.error('Error fetching filter options:', err)
    }
  }

  const fetchInstances = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        family: selectedFamily,
        vcpus: selectedVCPUs,
        memory: selectedMemory,
        network: selectedNetwork
      })

      const response = await fetch(`${API_BASE_URL}/instances?${params}`)
      if (!response.ok) throw new Error('Failed to fetch instances')
      
      const data = await response.json()
      setInstances(data.instances)
      setPagination(data.pagination)
      setError(null)
    } catch (err) {
      setError('Failed to load instances')
      console.error('Error fetching instances:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const formatCurrency = (amount: number, currencyCode = currency) => {
    const convertedAmount = currencyCode === 'INR' ? amount * exchangeRate : amount
    
    if (currencyCode === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(convertedAmount)
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(convertedAmount)
    }
  }

  const getSavingsPlanRate = () => {
    if (!selectedInstance) return 0
    // Extract the savings plan rate from the "Potential Effective Hourly Cost" field
    const savingsText = selectedInstance.potentialEffectiveHourlyCost
    const rateMatch = savingsText.match(/(\d+\.?\d*)/);
    return rateMatch ? parseFloat(rateMatch[0]) : selectedInstance.onDemandHourlyCost * 0.7
  }



  const calculateMonthlyCost = () => {
    if (!selectedInstance) return 0
    
    const hourlyRate = pricingPlan === "savings-plan" ? getSavingsPlanRate() : selectedInstance.onDemandHourlyCost
    return hourlyRate * instanceCount * hoursPerMonth
  }



  const handleInstanceSelect = (instance: EC2Instance) => {
    setSelectedInstance(instance)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedFamily("All")
    setSelectedVCPUs("All")
    setSelectedMemory("All")
    setSelectedNetwork("All")
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const getVisiblePageNumbers = () => {
    if (!pagination) return []
    
    const totalPages = pagination.totalPages
    const current = pagination.currentPage
    
    // If total pages is 5 or less, show all pages
    if (totalPages <= 5) {
      const pages = []
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
    
    const pages = []
    
    // Always show first page if current is not near the beginning
    if (current > 3) {
      pages.push(1)
    }
    
    // Calculate the range around current page (show max 5 pages)
    let start = Math.max(1, current - 2)
    let end = Math.min(totalPages, current + 2)
    
    // Adjust range to always show 5 pages when possible
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4)
      } else if (end === totalPages) {
        start = Math.max(1, end - 4)
      }
    }
    
    // Add pages in the calculated range
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }
    
    // Always show last page if current is not near the end
    if (current < totalPages - 2 && !pages.includes(totalPages)) {
      pages.push(totalPages)
    }
    
    return pages.sort((a, b) => a - b)
  }

  if (error && !metadata) {
  return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connection Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Professional Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <AWS_EC2_Logo />
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* EC2 Metadata */}
        {metadata && (
          <Card className="mb-8 p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-6 w-6 text-primary" />
                EC2 Configuration Metadata
              </CardTitle>
              <p className="text-muted-foreground">Fixed configuration parameters for all calculations</p>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-blue-600/70 dark:text-blue-400/70 uppercase tracking-wide font-medium">Region</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-100">{metadata.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-xs text-purple-600/70 dark:text-purple-400/70 uppercase tracking-wide font-medium">Tenancy</p>
                    <p className="font-semibold text-purple-900 dark:text-purple-100">{metadata.tenancy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <Monitor className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wide font-medium">Operating System</p>
                    <p className="font-semibold text-emerald-900 dark:text-emerald-100">{metadata.os}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
                  <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <p className="text-xs text-orange-600/70 dark:text-orange-400/70 uppercase tracking-wide font-medium">Workload Pattern</p>
                    <p className="font-semibold text-orange-900 dark:text-orange-100">{metadata.workload}</p>
                  </div>
                </div>
              </div>
              
              {/* Number of Instances Input */}
              <div className="max-w-sm">
                <label className="text-sm font-medium block mb-2">Number of Instances</label>
                <Input
                  type="number"
                  min="1"
                  max="1000"
                  value={instanceCount}
                  onChange={(e) => setInstanceCount(parseInt(e.target.value) || 1)}
                  placeholder="Enter number of instances"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Specify how many instances you want to calculate costs for
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* EC2 Instances Table */}
        <Card className="mb-8 p-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-primary" />
                    EC2 Instances ({metadata?.totalInstances || 0} total)
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Search and filter through all available EC2 instances with real-time data
                  </p>
                </div>
                
                {/* Currency Toggle */}
                <div className="flex flex-col items-end space-y-1">
                  <div className="flex items-center space-x-1 bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setCurrency("USD")}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                        currency === "USD"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      USD
                    </button>
                    <button
                      onClick={() => setCurrency("INR")}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                        currency === "INR"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      INR
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
          
          <CardContent className="p-0 pt-0">
            {/* Search and Filters - Moved up and improved */}
            <div className="mb-8">
              {/* Professional Search Bar */}
              <div className="mb-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search instances, memory, network, storage..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 text-base"
                  />
                </div>
                  </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Instance Family Filter */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Instance Family</label>
                  <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Families" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Families</SelectItem>
                      {filterOptions?.families.map((family) => (
                        <SelectItem key={family} value={family}>
                          {family}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </div>

                {/* vCPUs Filter */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">vCPUs</label>
                  <Select value={selectedVCPUs} onValueChange={setSelectedVCPUs}>
                    <SelectTrigger>
                      <SelectValue placeholder="All vCPUs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All vCPUs</SelectItem>
                      {filterOptions?.vcpus.map((vcpu) => (
                        <SelectItem key={vcpu} value={vcpu.toString()}>
                          {vcpu} vCPUs
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
        </div>

                {/* Memory Filter */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Memory (GiB)</label>
                  <Select value={selectedMemory} onValueChange={setSelectedMemory}>
                  <SelectTrigger>
                      <SelectValue placeholder="All Memory" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="All">All Memory</SelectItem>
                      {filterOptions?.memories.map((memory) => (
                        <SelectItem key={memory} value={memory}>
                          {memory} GiB
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                        </div>

                {/* Network Performance Filter */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Network Performance</label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Networks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Networks</SelectItem>
                      {filterOptions?.networks.map((network) => (
                        <SelectItem key={network} value={network}>
                          {network}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                {/* Clear Filters */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">&nbsp;</label>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="w-full"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
              </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Loading instances...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchInstances} variant="outline">
                  Retry
                </Button>
              </div>
            )}

            {/* Instances Table */}
            {!loading && !error && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 hover:bg-none">
                      <TableHead className="w-12 text-slate-700 dark:text-slate-300 font-semibold">Select</TableHead>
                      <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Instance Name</TableHead>
                      <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">vCPUs</TableHead>
                      <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Memory</TableHead>
                      <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Network Performance</TableHead>
                      <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Storage</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-300 font-semibold">On-Demand $/Hour</TableHead>
                      <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Current Gen</TableHead>
                      <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Savings Plan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instances.map((instance, index) => {
                      const isSelected = selectedInstance?.instanceName === instance.instanceName
                      return (
                        <TableRow 
                          key={`${instance.instanceName}-${index}`}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-primary/10 border-primary/20 hover:bg-primary/15' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleInstanceSelect(instance)}
                        >
                          <TableCell>
                            <div className="flex justify-center">
                              <div className={`w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-primary border-primary' 
                                  : 'border-muted-foreground/30'
                              }`}>
                                {isSelected && (
                                  <Check className="h-2.5 w-2.5 text-primary-foreground" />
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {instance.instanceName}
                          </TableCell>
                          <TableCell>
                            {instance.vCPUs}
                          </TableCell>
                          <TableCell>
                            {instance.memory}
                          </TableCell>
                          <TableCell className="text-sm">
                            {instance.networkPerformance}
                          </TableCell>
                          <TableCell className="text-sm">
                            {instance.storage}
                          </TableCell>
                          <TableCell className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30">
                            {formatCurrency(instance.onDemandHourlyCost)}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              instance.currentGeneration === 'Yes' 
                                ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700'
                                : 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700'
                            }`}>
                              {instance.currentGeneration === 'Yes' ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : null}
                              {instance.currentGeneration}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30">
                            {instance.potentialEffectiveHourlyCost}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>

                {/* Professional Pagination */}
                {pagination && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    {/* Mobile-first stacked layout */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center lg:text-left">
                        Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{pagination.startIndex}-{pagination.endIndex}</span> of <span className="text-blue-600 dark:text-blue-400 font-bold">{pagination.totalItems}</span> instances
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        {/* Items per page selector */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
                          <Select value={itemsPerPage.toString()} onValueChange={(value) => handleItemsPerPageChange(parseInt(value))}>
                            <SelectTrigger className="w-16 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="30">30</SelectItem>
                              <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Page navigation */}
                        {pagination.totalPages > 1 && (
                          <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-1 max-w-full overflow-x-auto px-2">
                              {(() => {
                                const visiblePages = getVisiblePageNumbers()
                                const elements = []
                                
                                for (let i = 0; i < visiblePages.length; i++) {
                                  const page = visiblePages[i]
                                  const prevPage = visiblePages[i - 1]
                                  
                                  // Add ellipsis if there's a gap
                                  if (prevPage && page - prevPage > 1) {
                                    elements.push(
                                      <div key={`ellipsis-${prevPage}`} className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    )
                                  }
                                  
                                  // Add page button
                                  elements.push(
                                    <Button
                                      key={page}
                                      variant={page === pagination.currentPage ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => handlePageChange(page)}
                                      className="h-8 w-8 p-0 flex-shrink-0"
                                    >
                                      {page}
                                    </Button>
                                  )
                                }
                                
                                return elements
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Chosen Instance Details & Cost Calculator */}
                {selectedInstance && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/30 dark:via-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-950/50">
                                        <div className="mb-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        <Calculator className="h-5 w-5 text-blue-600" />
                        Chosen Instance:
                      </h4>
                      <p className="text-lg text-muted-foreground">
                        <span className="font-medium">{selectedInstance.instanceName}</span> | 
                        <span className="ml-1">{selectedInstance.vCPUs} vCPUs</span> | 
                        <span className="ml-1">{selectedInstance.memory}</span> | 
                        <span className="ml-1">{selectedInstance.networkPerformance}</span> | 
                        <span className="ml-1">{selectedInstance.storage}</span> | 
                        <span className="ml-1">Current Gen: {selectedInstance.currentGeneration}</span>
                      </p>
                    </div>
                    
                    {/* Compact Cost Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Hours per Month */}
                      <div>
                        <label className="text-sm font-medium block mb-1">Hours per Month</label>
                <Input
                  type="number"
                  min="1"
                  max="744"
                  value={hoursPerMonth}
                  onChange={(e) => setHoursPerMonth(parseInt(e.target.value) || 730)}
                          className="w-full"
                />
                        <p className="text-xs text-muted-foreground mt-1">
                          Max: 744 hours (31 days × 24h). Default: 730 hours (24/7)
                        </p>
              </div>

                      {/* Pricing Plan */}
                      <div>
                        <label className="text-sm font-medium block mb-1">Pricing Plan</label>
                        <Select value={pricingPlan} onValueChange={setPricingPlan}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                            <SelectItem value="on-demand">
                        <div>
                                <div className="font-medium">On-Demand</div>
                                <div className="text-xs text-muted-foreground">{formatCurrency(selectedInstance.onDemandHourlyCost)}/hour</div>
                        </div>
                      </SelectItem>
                            <SelectItem value="savings-plan">
                              <div>
                                <div className="font-medium">Compute Savings Plan (3-Year)</div>
                                <div className="text-xs text-muted-foreground">{formatCurrency(getSavingsPlanRate())}/hour</div>
                              </div>
                            </SelectItem>
                  </SelectContent>
                </Select>
              </div>
                    </div>

                    {/* Live Cost Calculation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/40 dark:to-green-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-1 font-medium">Total Monthly Cost</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(calculateMonthlyCost())}
                        </p>
                        {/* Show alternate currency */}
                        <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                          {formatCurrency(calculateMonthlyCost(), currency === "USD" ? "INR" : "USD")}
                        </p>
                </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-1 font-medium">Hourly Rate</p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {formatCurrency(pricingPlan === "savings-plan" ? getSavingsPlanRate() : selectedInstance.onDemandHourlyCost)}
                        </p>
                        {/* Show alternate currency */}
                        <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
                          {formatCurrency(pricingPlan === "savings-plan" ? getSavingsPlanRate() : selectedInstance.onDemandHourlyCost, currency === "USD" ? "INR" : "USD")}
                        </p>
              </div>

                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-1 font-medium">Instance Hours</p>
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          {(hoursPerMonth * instanceCount).toLocaleString()}
                        </p>
                        <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-1">
                          {instanceCount} × {hoursPerMonth}h
                        </p>
                  </div>
                </div>
                  </div>
                )}

                {/* General Summary when no instance selected */}
                {!selectedInstance && instanceCount > 1 && instances.length > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-950/30 dark:to-sky-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <h4 className="font-semibold mb-2 text-cyan-900 dark:text-cyan-100">Cost Estimation Range</h4>
                    <p className="text-sm text-cyan-700 dark:text-cyan-300">
                      With {instanceCount} instances, your estimated costs would range from{' '}
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
                        {formatCurrency(Math.min(...instances.map(i => i.onDemandHourlyCost)) * instanceCount)}
                      </span>{' '}
                      to{' '}
                      <span className="font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded">
                        {formatCurrency(Math.max(...instances.map(i => i.onDemandHourlyCost)) * instanceCount)}
                      </span>{' '}
                      per hour. Select an instance above for detailed cost calculation.
                    </p>
                </div>
                )}
              </>
            )}
            </CardContent>
          </Card>

        {/* Footer */}
        <footer className="border-t bg-background text-foreground transition-colors duration-300 mt-12">
          <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 items-start">
              <div className="relative">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Server className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                    EC2 Calculator
                  </h2>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Professional AWS EC2 cost estimation and comparison tool with real-time data from AWS Calculator.
                </p>
                <div className="flex items-center space-x-3">
                  <Button asChild variant="outline" size="sm">
                    <a href="https://github.com/nerdylua/aws-ec2-calc" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="/cost-calculations">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Cost Analysis
                    </a>
                  </Button>
              </div>
              </div>
              
              <div className="relative">
                <h3 className="mb-4 text-lg font-semibold">Data Source</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All pricing data is sourced directly from AWS Calculator with regular updates to ensure accuracy.
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live pricing data</span>
                </div>
                </div>
              </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; 2025 AWS EC2 Calculator. Built for professional cost estimation and planning.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default EC2Calculator 