
import { Alert, Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Pagination, Modal, ModalHeader, ModalBody, Spinner } from "flowbite-react";
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai"


import { HiOutlineExclamationCircle, HiOutlineSearch } from "react-icons/hi";

function DashGetTransactions() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [trxn, setTrxn] = useState([]);
  const [trxnError, setTrxnError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [trxnId, setTrxnId] = useState()

  useEffect(()=>{
    const fetchTrxns = async ()=>{
      try {
        setLoading(true);
        setTrxnError(null);
        const res = await fetch(`${apiUrl}/api/v1/transactions`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json();
        if(!res.ok){
          setTrxnError(data.message);
          setLoading(false);
          return;
        }
        if(res.ok){
          setTrxn(data.transactions)
          setLoading(false);
          if(data.transactions.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        // console.log(error)
        setLoading(false)
        setTrxnError(error.message)
      }
    }
    fetchTrxns();
  },[])



const getCategoryColor = (category) => {
  const colors = {
    salary: "success",
    food: "warning",
    transport: "info",
    entertainment: "secondary",
    utilities: "primary",
    healthCare: "danger",
    beauty: "light",
    familyandpersonal: "dark",
    houserent: "warning",
    other: "gray"
  };

  return colors[category] || "gray";
};


  const handleShowMore = async ()=>{
    try {
      const startIndex = trxn.length;
    const res = await fetch(`${apiUrl}/api/v1/transactions?startIndex=${startIndex}`, {
      method: 'GET',
      credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
          }
    })
    const data = await res.json();
    if(res.ok){
      setTrxn((prev)=>[...prev, ...data.transactions])
      if(data.transactions.length < 9){
        setShowMore(false);
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleDelete = async ()=>{
  try {
    setShowModal(false)
    const res = await fetch(`${apiUrl}/api/v1/transactions/delete/${trxnId}`, {
      method:'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    if(res.ok){
      setShowModal(false);
      setTrxn((prev)=>prev.filter((trxn)=>trxn._id !== trxnId))
    }
  } catch (error) {
    console.log(error)
  }
}

if(loading){
return (
  <div className="min-h-screen flex justify-center items-center">
    <Spinner size='xl' /> 
  </div>
);
}
if (trxn.length === 0) {
return (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    {/* Icon with a subtle background */}
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
      <HiOutlineSearch className="h-10 w-10 text-gray-500 dark:text-gray-400" />
    </div>
    <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      No transactions found
    </h3>
    <p className="mb-6 text-sm font-normal text-gray-500 dark:text-gray-400 max-w-sm">
      We couldn't find any transaction history for this period. Try adjusting your filters or start a new transfer.
    </p>
    {/* <Button color="gray" size="sm">
      Clear All Filters
    </Button> */}
  </div>
);
}
if (trxnError) {
return (
  <div className="p-5">
    <Alert color="failure">
      {trxnError}
    </Alert>
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
            <TableHeadCell>
              <span className="sr-only">Delete</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        
        <TableBody className="divide-y">
          {trxn && trxn.map((trx)=>(
          <TableRow key={trx._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <span
                  className={`font-semibold ${
                    trx.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {trx.type}
                </span>
            </TableCell>
            <TableCell className={trx.type==="income"? "text-green-500" :"text-red-500"}>{trx.type==="income"? "+" : "-"}ETB {trx.amount}</TableCell>
            <TableCell><Badge color={getCategoryColor(trx.category)} size="sm" className="w-fit">{trx.category}</Badge></TableCell>
            <TableCell>{trx.description}</TableCell>
            <TableCell>{new Date(trx.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Link to={`/updatetransaction/${trx._id}`}>
                <span size="sm" className='font-medium text-teal-500 hover:underline cursor-pointer'>
                  Edit
                </span>
              </Link>
            </TableCell>
            <TableCell>
                <span size="sm" className='cursor-pointer' onClick={()=>{setTrxnId(trx._id); setShowModal(true)}}>
                  <AiFillDelete color="red" />
                </span>
            </TableCell>
          </TableRow>))}
        </TableBody>
      </Table>
      {showMore && (
        <div className="flex justify-center w-full py-5">
          <button onClick={handleShowMore} className="px-6 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
    >Show More</button>
        </div>
      )}
      {showModal && (
        <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this transaction?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handleDelete} className="cursor-pointer">
                  Yes, I'm sure
                </Button>
                <Button color="alternative" onClick={() => setShowModal(false)} className="cursor-pointer">
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

export default DashGetTransactions;
