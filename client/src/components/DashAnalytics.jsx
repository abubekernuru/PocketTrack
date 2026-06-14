import { useEffect, useState } from 'react';
import {
  ComposedChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import {Card, Dropdown, DropdownItem, Spinner} from 'flowbite-react'

function DashAnalytics() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [monthlySummary, setMonthlySummary]= useState([]);
  const [monthLimit, setMonthLimit]= useState(6);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [categorySummary, setCategorySummary] = useState([]);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(()=>{
    const fetchMonthlySummary = async ()=>{
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/v1/analytics/monthly-summary?monthLimit=${monthLimit}`,{
          credentials: 'include'
        });
        const data = await res.json();
        if(!res.ok){
          setError(data.message);
          return
        }
        setMonthlySummary(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchMonthlySummary();
  },[monthLimit])

  useEffect(()=>{
    const fetchMonthlyCategorySummary = async ()=>{
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/v1/analytics/monthly-category-summary?month=${month}&year=${year}`,{
          credentials: 'include'
        });
        const data = await res.json();
        if(!res.ok){
          setError(data.message);
          return
        }
        setCategorySummary(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchMonthlyCategorySummary();
  },[month, year])

  const months = ["Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"];
  const chartData = monthlySummary.map((item)=>({
    name: `${months[item._id.month - 1]} ${item._id.year}`,
    income:item.totalIncome,
    expense:item.totalExpense,
    balance:item.balance
  }))

  const pieData = categorySummary.map((item)=>({
    name: item._id,
    value: item.totalExpense,
  }))
  const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4"
];

  return (
  <div>
    <Card>     
        <div className="mb-4 flex items-center justify-between">
        <div>
          <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              Monthly budget status
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
              Each months income, expense and balance
          </p>
        </div>
        <div>
          <Dropdown label={`Last ${monthLimit} months`} color="gray" className='cursor-pointer'>
            <DropdownItem onClick={() => setMonthLimit(6)}>Last 6 months</DropdownItem>
            <DropdownItem onClick={() => setMonthLimit(12)}>Last 12 months</DropdownItem>
          </Dropdown>
        </div>
        </div>
      <div>
        { loading ? (<Spinner size='xl' />) 
          : error ? 
          (<p className='text-red-500 font-medium'>{error}</p>)
          : chartData.length===0 ? 
            (<p className='text-gray-500'>No transaction data available for this period.</p>)
          :
        (<ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name) => [`ETB ${value.toLocaleString()}`, name]} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" dot={true} animationDuration={1000} activeDot={{r:6}} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" dot={true} animationDuration={1000} activeDot={{r:6}} />
          <Line type="monotone" dataKey="balance" stroke="#3b82f6" dot={true} animationDuration={1000} activeDot={{r:6}} />
          </ComposedChart>
        </ResponsiveContainer>)
        }
      </div>
    </Card>
    <Card className="mb-6">
      <div className="flex gap-4">

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="rounded-lg border"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border"
        >
          <option value={2026}>2026</option>
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>

      </div>

  <div className="mb-4">
    <h5 className="text-xl font-bold">
      Monthly Expense By Category
    </h5>

    <p className="text-sm text-gray-500">
      Breakdown of expenses for selected month
    </p>
  </div>

  <ResponsiveContainer width="100%" height={350}>
    <PieChart>

      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label
      >
        {pieData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip
        formatter={(value, name) => [`ETB ${value.toLocaleString()}`, name]}
      />

      <Legend />

    </PieChart>
  </ResponsiveContainer>

  <div>
    <h5 className="text-xl font-bold mb-4">
      Category Breakdown
    </h5>
    <div className="space-y-3">
      {categorySummary.map((item) => (
        <div
          key={item._id}
          className="flex justify-between border-b pb-2"
        >
          <span className="capitalize">
            {item._id}
          </span>
          <span className="font-semibold" formatter={(value, name) => [`ETB ${value.toLocaleString()}`, name]}>
          </span>
        </div>
      ))}
    </div>
  </div>

</Card>
  </div>
  )
}

export default DashAnalytics;


