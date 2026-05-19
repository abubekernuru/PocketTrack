
import { Alert, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Modal, ModalHeader, ModalBody, Spinner } from "flowbite-react";

import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai"
import { FaTimes, FaCheck } from 'react-icons/fa';


import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashUsers() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null)

  useEffect(()=>{
    const fetchuserss = async ()=>{
      try {
        setLoading(true);
        setUsersError(null);
        const res = await fetch(`${apiUrl}/api/user`, {
          credentials: 'include',
        })
        const data = await res.json();
        if(!res.ok){
          setUsersError(data.message);          
          return;
        }
          setUsers(data.users);
          if(data.users && data.users.length < 9){
            setShowMore(false);
          }
      } catch (error) {
          setUsersError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchuserss();
  },[])


  const handleShowMore = async ()=>{
    try {
      const startIndex = users.length;
      const res = await fetch(`${apiUrl}/api/user?startIndex=${startIndex}`, {
        method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          },
          credentials: 'include',
    })
    const data = await res.json();
    if(res.ok){
      setUsers((prev)=>[...prev, ...data.users])
      if(data.users.length < 9){
        setShowMore(false);
      }
    }
  } catch (error) {
    console.log(error)
  }
}

  const handleDeleteUser = async ()=>{
    if(!userId) return;
    try {
      setShowModal(false)
      const res = await fetch(`${apiUrl}/api/user/delete/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json();
      if(res.ok){
      setShowModal(false);
      setUsers((prev)=>prev.filter((user)=>user._id !== userId))
      }
    } catch (error) {
      setUsersError(error.message); 
    } finally{
      setShowModal(false);
    }
  }
  if (loading) {
      return   <div className="min-h-screen flex justify-center items-center"><Spinner size='xl' /></div>
    }

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Date Created</TableHeadCell>
            <TableHeadCell>User Image</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableRow>
        </TableHead>
        
        <TableBody className="divide-y">
          {users && users.length > 0 ? users.map((user)=>(
          <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.createdAt ? user.createdAt.split("T")[0] : 'N/A'}
            </TableCell>
            <TableCell >
              <img
                alt="profile image"
                src={user.profilePicture}
                className="w-12 h-10 rounded-full shadow-lg object-cover"
              />
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isAdmin ?<FaCheck className="text-green-500"/>: <FaTimes className="text-red-500" />}</TableCell>
            <TableCell>
              <span size="sm" className='cursor-pointer' onClick={()=>{setUserId(user._id); setShowModal(true)}}>
                  <AiFillDelete color="red" />
                </span>
            </TableCell>
          </TableRow>)):(
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {usersError && (
          <Alert color="failure" className="mb-4" onDismiss={() => setUsersError(null)}>
              {usersError}
          </Alert>
      )}
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
                <Button color="red" onClick={handleDeleteUser} className="cursor-pointer">
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

export default DashUsers;
