import { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  Dropdown,
  DropdownItem,
  Spinner,
} from "flowbite-react";

function DashAnalytics() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [monthlySummary, setMonthlySummary] = useState([]);
  const [monthLimit, setMonthLimit] = useState(6);

  const [month, setMonth] = useState(
    new Date().getMonth() + 1
  );

  const [year, setYear] = useState(
    new Date().getFullYear()
  );

  const [categorySummary, setCategorySummary] =
    useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#14B8A6",
    "#F97316",
  ];

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${apiUrl}/api/v1/analytics/monthly-summary?monthLimit=${monthLimit}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        setMonthlySummary(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySummary();
  }, [monthLimit]);

  useEffect(() => {
    const fetchMonthlyCategorySummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${apiUrl}/api/v1/analytics/monthly-category-summary?month=${month}&year=${year}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        setCategorySummary(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyCategorySummary();
  }, [month, year]);

  const chartData = monthlySummary.map((item) => ({
    name: `${months[item._id.month - 1]} ${item._id.year}`,
    income: item.totalIncome,
    expense: item.totalExpense,
    balance: item.balance,
  }));

  const pieData = categorySummary.map((item) => ({
    name: item._id,
    value: item.totalExpense,
  }));

  const totalExpense = pieData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const currentYear = new Date().getFullYear();

  const yearRange = Array.from(
    { length: 5 },
    (_, i) => currentYear - i
  );

  const formatCurrency = (value) =>
    `ETB ${Number(value ?? 0).toLocaleString()}`;

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Understand spending patterns and financial trends.
          </p>
        </div>

        <Dropdown
          label={`Last ${monthLimit} Months`}
          color="light"
        >
          <DropdownItem
            onClick={() => setMonthLimit(6)}
          >
            Last 6 Months
          </DropdownItem>

          <DropdownItem
            onClick={() => setMonthLimit(12)}
          >
            Last 12 Months
          </DropdownItem>
        </Dropdown>
      </div>

      {/* MONTHLY TREND */}

      <Card className="shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Monthly Trend
          </h2>

          <p className="text-sm text-gray-500">
            Income, expenses and balance over time
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        ) : chartData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No analytics data available.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={380}
          >
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value)
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#22C55E"
                strokeWidth={3}
                activeDot={{ r: 7 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={3}
                activeDot={{ r: 7 }}
              />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3B82F6"
                strokeWidth={3}
                activeDot={{ r: 7 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* EXPENSE ANALYSIS */}

      <Card className="shadow-sm">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Expense Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Spending distribution by category
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={month}
              onChange={(e) =>
                setMonth(Number(e.target.value))
              }
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
            >
              {months.map((m, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                >
                  {m}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) =>
                setYear(Number(e.target.value))
              }
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
            >
              {yearRange.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* PIE CHART */}

          <div>
            {pieData.length === 0 ? (
              <div className="h-[350px] flex items-center justify-center text-gray-500">
                No category data available
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height={350}
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label={({ percent }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(value)
                    }
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* CATEGORY BREAKDOWN */}

          <div className="space-y-5">
            {categorySummary.map(
              (item, index) => {
                const percentage =
                  totalExpense > 0
                    ? (
                        (item.totalExpense /
                          totalExpense) *
                        100
                      ).toFixed(1)
                    : 0;

                return (
                  <div key={item._id}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            background:
                              COLORS[
                                index %
                                  COLORS.length
                              ],
                          }}
                        />

                        <span className="capitalize font-medium">
                          {item._id}
                        </span>
                      </div>

                      <span className="font-semibold">
                        {percentage}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          background:
                            COLORS[
                              index %
                                COLORS.length
                            ],
                        }}
                      />
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(
                        item.totalExpense
                      )}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DashAnalytics;