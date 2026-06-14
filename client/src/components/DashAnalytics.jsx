import { useEffect, useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Card, Dropdown, DropdownItem, Spinner } from "flowbite-react";

function DashAnalytics() {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Unified Filtering State Control System
  const [monthLimit, setMonthLimit] = useState(6);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // Data & Structural Async States
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [chartError, setChartError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const COLORS = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#14B8A6", // Teal
    "#F97316", // Orange
  ];

  // Fetch Monthly Trend Data
  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        setChartLoading(true);
        setChartError(null);
        const res = await fetch(
          `${apiUrl}/api/v1/analytics/monthly-summary?monthLimit=${monthLimit}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load trend analytics.");
        setMonthlySummary(data);
      } catch (error) {
        setChartError(error.message);
      } finally {
        setChartLoading(false);
      }
    };
    fetchMonthlySummary();
  }, [apiUrl, monthLimit]);

  // Fetch Category Outflow Allocations
  useEffect(() => {
    const fetchMonthlyCategorySummary = async () => {
      try {
        setCategoryLoading(true);
        setCategoryError(null);
        const res = await fetch(
          `${apiUrl}/api/v1/analytics/monthly-category-summary?month=${month}&year=${year}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load category summaries.");
        setCategorySummary(data);
      } catch (error) {
        setCategoryError(error.message);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchMonthlyCategorySummary();
  }, [apiUrl, month, year]);

  // Formatting Engine Utility
  const formatCurrency = (value) =>
    `ETB ${Number(value ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  // Optimizing Chart Vector Parsers via useMemo
  const chartData = useMemo(() => {
    return monthlySummary.map((item) => ({
      name: `${months[item._id.month - 1]} ${item._id.year.toString().slice(-2)}`,
      Income: item.totalIncome,
      Expenses: item.totalExpense,
      Balance: item.balance,
    }));
  }, [monthlySummary]);

  const { pieData, totalExpense, topCategory } = useMemo(() => {
    const activePie = categorySummary.map((item) => ({
      name: item._id,
      value: item.totalExpense,
    }));
    const sum = activePie.reduce((acc, curr) => acc + curr.value, 0);
    return {
      pieData: activePie,
      totalExpense: sum,
      topCategory: categorySummary[0] || null,
    };
  }, [categorySummary]);

  // Financial Metric KPIs Matrix Engine
  const metrics = useMemo(() => {
    const currentMonthTrend = monthlySummary[monthlySummary.length - 1] || {};
    const totalIncome = currentMonthTrend.totalIncome || 0;
    const currentExpenses = currentMonthTrend.totalExpense || totalExpense;

    const savingsRate = totalIncome > 0 ? ((totalIncome - currentExpenses) / totalIncome) * 100 : 0;
    
    // Chronological Evaluation Framework
    const today = new Date();
    const isCurrentRealMonth = today.getFullYear() === year && (today.getMonth() + 1) === month;
    
    // Dynamic operational divisor calculation
    let targetDaysCount;
    if (isCurrentRealMonth) {
      targetDaysCount = today.getDate(); // Divide solely by exact days elapsed so far
    } else {
      targetDaysCount = new Date(year, month, 0).getDate(); // Standard full calendar fallback
    }

    const averageDailyExpense = currentExpenses / (targetDaysCount || 1);

    return {
      savingsRate: savingsRate.toFixed(1),
      averageDailyExpense,
      netBalance: currentMonthTrend.balance || 0,
      daysEvaluated: targetDaysCount,
      isLiveMonth: isCurrentRealMonth
    };
  }, [monthlySummary, totalExpense, month, year]);

  const yearRange = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  }, []);

  const isAnyLoading = chartLoading || categoryLoading;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 lg:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* 1. UNIFIED FILTER & DASHBOARD CONTEXT HEADER */}
      <div className="flex flex-col gap-4 border-b border-gray-100 dark:border-gray-800 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Clarity Financial Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Production metrics, consumption analysis, and asset vector tracking.
          </p>
        </div>

        {/* Global Control Layout Drops */}
        <div className="flex flex-wrap items-center gap-2">
          <Dropdown label={`Trend: ${monthLimit} Months`} color="light" size="sm">
            <DropdownItem onClick={() => setMonthLimit(6)}>Last 6 Months</DropdownItem>
            <DropdownItem onClick={() => setMonthLimit(12)}>Last 12 Months</DropdownItem>
          </Dropdown>

          <Dropdown label={`Month: ${months[month - 1]}`} color="light" size="sm">
            {months.map((m, idx) => (
              <DropdownItem key={m} onClick={() => setMonth(idx + 1)}>
                {m}
              </DropdownItem>
            ))}
          </Dropdown>

          <Dropdown label={`Year: ${year}`} color="light" size="sm">
            {yearRange.map((yr) => (
              <DropdownItem key={yr} onClick={() => setYear(yr)}>
                {yr}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* 2. HIGH IMPACT KPI SUMMARY METRIC MATRIX */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isAnyLoading ? (
          [1, 2, 3, 4].map((loaderId) => (
            <Card key={loaderId} className="shadow-sm border-none bg-gray-50 dark:bg-gray-800/50 animate-pulse">
              <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="w-3/4 h-7 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="w-2/3 h-2.5 bg-gray-200 dark:bg-gray-700 rounded" />
            </Card>
          ))
        ) : (
          <>
            {/* KPI 1: Net Margin Savings Efficiency Indicator */}
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Savings Rate</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">{metrics.savingsRate}%</h3>
              <p className="text-xs text-gray-500 mt-1">Of baseline dynamic monthly inflow</p>
            </Card>

            {/* KPI 2: Velocity Run Burn Velocity */}
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Expense Rate</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">{formatCurrency(metrics.averageDailyExpense)}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Averaged over {metrics.daysEvaluated} recorded days {metrics.isLiveMonth && "(MTD)"}
              </p>
            </Card>

            {/* KPI 3: Outlier Center Monitor */}
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Spend Sector</p>
              <h3 className="mt-2 text-2xl font-bold capitalize tracking-tight truncate">
                {topCategory?._id || "No Outflows"}
              </h3>
              <p className="text-xs text-rose-500 font-medium mt-1">
                {topCategory ? `${formatCurrency(topCategory.totalExpense)} spent` : "Clear index"}
              </p>
            </Card>

            {/* KPI 4: Absolute Runway Velocity */}
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Month Delta</p>
              <h3 className={`mt-2 text-2xl font-bold tracking-tight ${metrics.netBalance >= 0 ? "text-green-500" : "text-rose-500"}`}>
                {formatCurrency(metrics.netBalance)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Net operational balance value</p>
            </Card>
          </>
        )}
      </div>

      {/* 3. BUSINESS CORE METRIC GRID ENGINE CONTAINER */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* VIEW COLUMN A: CASH FLOW HISTORICAL RENDERING */}
        <div className="lg:col-span-7 xl:col-span-8">
          <Card className="shadow-sm border-gray-100 dark:border-gray-800 h-full">
            <div>
              <h3 className="text-lg font-bold">Cash Flow Vector Trend</h3>
              <p className="text-xs text-gray-400">Comparing active revenue streams vs capital usage over regular intervals</p>
            </div>

            {chartLoading ? (
              <div className="flex flex-col justify-center items-center h-80 gap-3">
                <Spinner size="xl" />
                <p className="text-xs text-gray-400 animate-pulse">Syncing timeline indices...</p>
              </div>
            ) : chartError ? (
              <div className="flex justify-center items-center h-80 text-sm text-red-500">{chartError}</div>
            ) : chartData.length === 0 ? (
              <div className="flex justify-center items-center h-80 text-sm text-gray-400">No vector analysis models recorded.</div>
            ) : (
              <div className="h-80 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }} accessibilityLayer>
                    <defs>
                      <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" className="dark:stroke-gray-700" />
                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: '#1F2937', borderRadius: '8px', border: 'none', color: '#FFF' }} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area type="monotone" name="Income" dataKey="Income" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#incGrad)" />
                    <Area type="monotone" name="Expenses" dataKey="Expenses" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#expGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>

        {/* VIEW COLUMN B: ASSET ALLOCATION STRUCTURAL PIE CHART & LIST TABLES */}
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="shadow-sm border-gray-100 dark:border-gray-800 h-full">
            <div>
              <h3 className="text-lg font-bold">Category Distribution</h3>
              <p className="text-xs text-gray-400">Relative weight breakdown of specific capital distributions</p>
            </div>

            {categoryLoading ? (
              <div className="space-y-4 animate-pulse mt-6">
                <div className="h-36 mx-auto w-36 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Spinner size="md" />
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full w-full" />
                  </div>
                ))}
              </div>
            ) : categoryError ? (
              <div className="flex justify-center items-center h-80 text-sm text-red-500">{categoryError}</div>
            ) : pieData.length === 0 ? (
              <div className="flex justify-center items-center h-80 text-sm text-gray-400">No output categories mapped for this timeframe.</div>
            ) : (
              <div className="flex flex-col gap-6 mt-4">
                {/* Visual Chart Panel */}
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart accessibilityLayer>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Quantitative Context Progression Metrics List */}
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                  {categorySummary.map((item, index) => {
                    const percentage = totalExpense > 0 ? ((item.totalExpense / totalExpense) * 100).toFixed(1) : 0;
                    const sliceColor = COLORS[index % COLORS.length];

                    return (
                      <div key={item._id} className="text-xs">
                        <div className="flex items-center justify-between font-medium text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sliceColor }} />
                            <span className="capitalize truncate max-w-[120px]">{item._id}</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {percentage}% <span className="font-normal text-gray-400 ml-1">({formatCurrency(item.totalExpense)})</span>
                          </span>
                        </div>
                        {/* Dynamic Progress Indicator Segment */}
                        <div className="w-full h-1.5 mt-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: sliceColor,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

export default DashAnalytics;