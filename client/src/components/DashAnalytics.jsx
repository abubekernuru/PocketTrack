import { useEffect, useState } from 'react';
import {
  ComposedChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function DashAnalytics() {
  const [monthlySummary, setMonthlySummary]= useState([])
  useEffect(()=>{
    const fetchMonthlySummary = async ()=>{
      try {
        const res = await fetch(`/api/v1/analytics/monthly-summary`);
        const data = await res.json();
        if(!res.ok){
          return
        }
        setMonthlySummary(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMonthlySummary();
  },[])

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
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="income" stroke="#22c55e" dot={true} />
      <Line type="monotone" dataKey="expense" stroke="#ef4444" dot={true} />
      <Line type="monotone" dataKey="balance" stroke="#3b82f6" dot={true} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
  )
}

export default DashAnalytics;


