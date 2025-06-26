"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, BarChart3, Calculator, DollarSign, Info, CheckCircle2, AlertTriangle, Sun, Moon } from "lucide-react"
import Link from "next/link"

// Simple components for the cost calculations page
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className || ''}`} {...props} />
))
CardContent.displayName = "CardContent"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variantClasses = variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
  const sizeClasses = size === "sm" ? "h-9 rounded-md px-3" : "h-10 px-4 py-2"
  
  return (
    <button ref={ref} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`} {...props} />
  )
})
Button.displayName = "Button"

const CostCalculationsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Calculator
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Cost Calculations & Breakeven Analysis</h1>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full h-10 w-10 p-0"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Show Calculations Header */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              Show Calculations
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Breakeven Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Breakeven Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6 text-muted-foreground">
                A cost-optimized strategy for your utilization is found by calculating the breakeven point when Compute Savings Plans instances are more cost effective to use than On-Demand Instances.
              </p>

              <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
                <div className="space-y-3 text-sm">
                  <p><strong>Compute Savings Plans rate</strong> for [Instance Type] in the Asia Pacific (Mumbai) for 3 Year term and No Upfront = <span className="text-green-600 font-bold">[Savings Plan Rate] USD</span></p>
                  
                  <p><strong>Hours in the commitment:</strong> 365 days × 24 hours × 3 years = <span className="text-blue-600 font-bold">26,280 hours</span></p>
                  
                  <p><strong>Total Commitment:</strong> [Savings Plan Rate] × 26,280 hours = <span className="text-purple-600 font-bold">[Total Commitment] USD</span></p>
                  
                  <p><strong>Upfront:</strong> No Upfront (0% of Total Commitment) = <span className="text-orange-600 font-bold">0.00 USD</span></p>
                  
                  <p><strong>Hourly cost for Compute Savings Plans</strong> = (Total Commitment - Upfront cost) ÷ Hours in the term</p>
                  
                  <p><strong>Normalized Compute Savings Plans monthly price:</strong> (Upfront ÷ 36 months) + (Savings Plan Rate × 730 hours) = <span className="text-green-600 font-bold">[Monthly Savings Plan Cost]</span></p>
                  
                  <p><strong>On-Demand hourly price:</strong> <span className="text-red-600 font-bold">[On-Demand Rate] USD</span></p>
                  
                  <p><strong>Normalized On-Demand monthly price:</strong> [On-Demand Rate] × 730 hours = <span className="text-red-600 font-bold">[Monthly On-Demand Cost]</span></p>
                  
                  <p><strong>Breakeven percentage:</strong> [Monthly Savings Plan Cost] ÷ [Monthly On-Demand Cost] = <span className="text-yellow-600 font-bold">[Breakeven %]</span></p>
                  
                  <p><strong>Breakeven point:</strong> [Breakeven %] × 730 hours per month = <span className="text-yellow-600 font-bold">[Breakeven Hours] hours</span></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Utilization Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              Utilization Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-lg font-medium text-green-800 dark:text-green-200">
                  For instance utilization over the breakeven point, <span className="font-bold">[Breakeven Hours] hours</span>, it is more cost effective to choose Compute Savings Plans instances than On-Demand Instances.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Compute Savings Plans Cost Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Compute Savings Plans Cost
                  </h4>
                  <div className="space-y-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-sm space-y-2">
                      <p>[Number of Instances] Compute Savings Plans instances × $0.00 upfront cost = <span className="font-bold">$0.00 USD</span></p>
                      <p className="text-green-700 dark:text-green-300"><strong>Compute Savings Plans instances (upfront):</strong> $0.00 USD</p>
                      <p>[Number of Instances] instances × 730 hours in a month = [Total Instance Hours] Compute Savings Plans instance hours per month</p>
                      <p>[Total Instance Hours] instance hours per month × [Savings Plan Rate] USD = <span className="font-bold text-green-600">[Monthly Savings Plan Cost] USD</span></p>
                      <p className="text-green-700 dark:text-green-300"><strong>Normalized Compute Savings Plans instances (monthly):</strong> [Monthly Savings Plan Cost] USD</p>
                    </div>
                  </div>
                </div>

                {/* On-Demand Cost Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    On-Demand Cost
                  </h4>
                  <div className="space-y-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-sm space-y-2">
                      <p>[On-Demand Hours] On-Demand instance hours per month × [On-Demand Rate] USD = <span className="font-bold">[On-Demand Monthly Cost] USD</span></p>
                      <p className="text-blue-700 dark:text-blue-300"><strong>On-Demand (monthly):</strong> [On-Demand Monthly Cost] USD</p>
                      <p>[On-Demand Monthly Cost] USD On-Demand (monthly) + [Monthly Savings Plan Cost] USD Normalized Compute Savings Plans instances (monthly) = <span className="font-bold text-primary">[Total Monthly Cost] USD</span></p>
                      <p className="text-lg font-bold text-primary"><strong>Total cost (monthly):</strong> [Total Monthly Cost] USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Important Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200">
                <Info className="h-4 w-4 inline mr-2" />
                Please note that you will pay an hourly commitment for Savings Plans and your usage will be accrued at a discounted rate against this commitment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CostCalculationsPage 