
import { Alert, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";

function DashGetTransactions() {

  const [trxn, setTrxn] = useState([]);
  const [trxnError, setTrxnError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchTrxns = async ()=>{
      try {
        setLoading(true);
        setTrxnError(null);
        const res = await fetch('/api/transactions', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json();
        if(!res.ok){
          setTrxnError(data.message);
          setLoading(false);
          return;
        }
        if(res.ok){
          setTrxn(data.transactions)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
        setTrxnError(error.message)
      }
    }
    fetchTrxns();
  },[])
  if(loading){
    return <div>Loading...</div>
  }
  if (trxn.length === 0) {
  return (
    <div className="text-center py-10">
      No transactions found
    </div>
  );
}
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        
        <TableBody className="divide-y">
          {trxn && trxn.map((trx)=>(
          <TableRow key={trx._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {trx.type}
            </TableCell>
            <TableCell>{trx.amount}</TableCell>
            <TableCell>{trx.category}</TableCell>
            <TableCell>{trx.description}</TableCell>
            <TableCell>{new Date(trx.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>
            </TableCell>
          </TableRow>))}
        </TableBody>
      </Table>
      {trxnError && <Alert color="failure">{trxnError} </Alert>}
    </div>
  );
}

export default DashGetTransactions;
