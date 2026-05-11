import {Card} from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react';
import {LuTrendingUp, LuCreditCard, LuWallet} from 'react-icons/lu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';


function DashDashboardContent() {
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({})
  const [catSummary, setCatSummary] = useState([]);

  useEffect(()=>{
    const summaryData = async()=>{
      try {
        setLoading(true);
        const res = await fetch('/api/transactions/summary',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if(!res.ok){
          setError(data.message);
          setLoading(false);
          return;
        }
        if(res.ok){
          setLoading(false);
          setSummary(data);
        }
        // console.log(data)
      } catch (error) {
        console.log(error)
        setLoading(false);
        setError(error.message)
      }
    }
    summaryData();  
  },[]);

  useEffect(()=>{
    const catSummaryData = async ()=>{
      try {
        setCatLoading(true)
        const res = await fetch(`/api/transactions/category-summary`, {
          method: 'GET',
          headers: {
            'Content-Type':'application/json'
          }
        });
        const data = await res.json();
        if(!res.ok){
          setCatLoading(false);
          setError(data.message);
          return;
        }
        if(res.ok){
          setCatSummary(data);
          // console.log(data)
        }
      } catch (error) {
        setError(error.message);
        setCatLoading(false);
      }
    }
    catSummaryData();
  },[])


  //bar chart data
  const data = useMemo(() => [
  {
    name: 'income',
    amount: summary.totalIncome || 0
  },
  {
    name: 'expense',
    amount: summary.totalExpense || 0
  },
  {
    name: 'balance',
    amount: summary.balance || 0
  }
], [summary]);

// bar chart colors
const colors = ["#22c55e", "#ef4444", summary.balance >= 0 ? "#22c55e" : "#ef4444"]
// pie chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// pie chart data
const categoryData = catSummary.map((item)=>({
  name: item._id, value: item.total
})) 

  
if(loading){
    return (
        <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Loading...
        </div>
    );}
// if(catLoading){
//     return (
//         <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
//           Loading...
//         </div>
//     );}
  if(error){
    return(
          <div className="mb-2 text-xl font-bold tracking-tight text-red-900">
            {error}
        </div>)
    }
  return (
    <div className='flex flex-col'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center md:justify-items-stretch">
        <Card className="w-full max-w-sm">
          {/* icon for income */}
          <div className="flex items-center justify-center p-4">
            <LuTrendingUp className="w-12 h-12 text-green-500" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Total Income
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            {summary.totalIncome} ETB
          </p>
        </Card>
        <Card className="w-full max-w-sm">
          <div className="flex items-center justify-center p-4">
            <LuCreditCard className="w-12 h-12 text-red-500" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Total Expenses
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            {summary.totalExpense} ETB
          </p>
        </Card>
        <Card className="w-full max-w-sm">
          <div className="flex items-center justify-center p-4">
            <LuWallet className="w-12 h-12 text-green-500" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Balance
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            {summary.balance} ETB
          </p>
        </Card>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        {/* Bar chart */}
        <div>
          <Card className='mt-6'>
            <div className="mb-4">
              <h5 className="text-xl font-bold text-gray-900 dark:text-white">Overview</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">Income vs Expense vs Balance</p>
            </div>
              {summary && (
          /* let's add dynamic colors for the 3 bars,  */
          <div className="w-full h-[300px] mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`, ""]} />
                  {/* remove hover effect let's go */}
                <Bar dataKey="amount"  radius={[6, 6, 0, 0]} isAnimationActive={false}>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
              )}
          </Card>
        </div>
        {/* <Pie chart/> */}
        <div className=''>
          <Card className="mt-6">
            <div className="mb-4">
              <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                Spending by Category
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expense breakdown
              </p>
            </div>
                <div className="w-full h-[300px] mt-10">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`, ""]}/>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashDashboardContent








  
