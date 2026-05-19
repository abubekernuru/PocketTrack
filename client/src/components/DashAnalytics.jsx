import { useEffect, useState } from 'react';
import {
  ComposedChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import {Card, Dropdown, DropdownItem, Spinner} from 'flowbite-react'

function DashAnalytics() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [monthlySummary, setMonthlySummary]= useState([]);
  const [monthLimit, setMonthLimit]= useState(6);
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

  const months = ["Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"];
  const chartData = monthlySummary.map((item)=>({
    name: `${months[item._id.month - 1]} ${item._id.year}`,
    income:item.totalIncome,
    expense:item.totalExpense,
    balance:item.balance
  }))

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
  </div>
  )
}

export default DashAnalytics;


