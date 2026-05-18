import { useEffect, useState } from 'react';
import DashboardSummaryCards from './dashboard/DashboardSummaryCards';
import DashboardOverviewChart from './dashboard/DashboardOverviewChart';
import DashboardCategoryChart from './dashboard/DashboardCategoryChart';
import { Spinner } from 'flowbite-react';


function DashMainOverview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({})
  const [catSummary, setCatSummary] = useState([]);

  useEffect(()=>{
    const fetchSummary = async()=>{
      try {
        setLoading(true);
        const res = await fetch('/api/v1/analytics/summary');
        const data = await res.json();
        if(!res.ok){
          setError(data.message);
          setLoading(false);
          return;
        }
          setSummary(data);
        
      } catch (error) {
        setLoading(false);
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary();  
  },[]);

  useEffect(()=>{
    const fetchCategorySummary = async ()=>{
      try {
        const res = await fetch(`/api/v1/analytics/by-category`);
        const data = await res.json();

        if(!res.ok){
          setError(data.message);
          return;
        }
          setCatSummary(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchCategorySummary();
  },[])

// pie chart data TRANSFORM DATA
const categoryData = catSummary.map((item)=>({
  name: item._id, value: item.total
})) 

  
  if (loading) {
    return   <div className="min-h-screen flex justify-center items-center"><Spinner size='xl' /></div>
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex flex-col'>

       {/* SUMMARY CARDS */}
      <DashboardSummaryCards summary={summary}/>

        {/* Bar and pie charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        
          <DashboardOverviewChart summary={summary} />
          <DashboardCategoryChart categoryData={categoryData} />

      </div>
    </div>
  )
}

export default DashMainOverview








  
