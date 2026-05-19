import { useEffect, useState } from "react";
import { Button, Radio, Label, Select, Textarea, TextInput, Card, Alert, Spinner, Modal, ModalHeader, ModalBody } from "flowbite-react";
import { HiCalendar, HiCurrencyDollar, HiOutlineExclamationCircle } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTransaction() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({})
  const [trxnUpdateError, setTrxUpdateError] = useState(null);
  const [trxnUpdateSucess, setTrxUpdateSucess] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const { trxnId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
  if (trxnUpdateSucess) {
    const timer = setTimeout(() => {
      setTrxUpdateSucess(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [trxnUpdateSucess]);

  useEffect(()=>{
    const fetchTrxn = async ()=>{
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/v1/transactions?trxnId=${trxnId}`,{
          credentials: 'include'
        });
        const data = await res.json();

        if(!res.ok){
          setTrxUpdateError("Failed to load transaction")
          return
        }

        if(res.ok){
          setLoading(false);
          const fetchedTrxn = data.transactions[0];
          setFormData({
            ...fetchedTrxn,
            date: fetchedTrxn.date ? fetchedTrxn.date.split("T")[0] : ""
          })
        }
      } catch (error) {
        setTrxUpdateError(error.message)
      }
    }
    fetchTrxn();
  },[trxnId])
  const handleTrxTypeChange = (value)=>{
    setFormData((prev)=>({...prev, type: value}))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setSaveLoading(true);
      setTrxUpdateError(null);
      const res = await fetch(`${apiUrl}/api/v1/transactions/update/${trxnId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        setTrxUpdateError(data.message || "Something went wrong")
        return;
      }
      setTrxUpdateSucess("Transaction Updated succefully!")
      setTimeout(()=>{
        navigate('/dashboard?tab=allTransactions')
      }, 1500)
    } catch (error) {
      setTrxUpdateError(error.message);
    } finally {
      setSaveLoading(false);
    }
  }

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData((prev)=>({...prev, [id]: id==="amount"?(value === "" ? "" : parseFloat(value)): value}))
  }

  const handleDelete = async ()=>{
  try {
    setShowModal(false)
    setDeleteLoading(true)
    const res = await fetch(`${apiUrl}/api/v1/transactions/delete/${trxnId}`, {
      method:'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    if(res.ok){
      setShowModal(false);
      setTrxUpdateSucess("Transaction Deleted succefully!")
      setTimeout(()=>{
        navigate('/dashboard?tab=allTransactions')
      }, 1500)
    }
  } catch (error) {
    setTrxUpdateSucess("Failed to delete the transaction!")
  } finally {
    setDeleteLoading(false)
  }
}

  return (
    <div className="p-3 md:p-10 w-full flex">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Update Transaction
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Edit and update your transaction details below.
          </p>
        </div>

        {/* 2. Card Styling: Adds a border/shadow for a "Dashboard" feel */}
        <Card>
          { loading ? <div className="flex items-center justify-center p-6"><Spinner size='xl' /></div>:(
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Amount */}
            <div>
              <Label htmlFor="amount" value="Amount" className="mb-2 block" />
              <TextInput 
                id="amount" 
                name="amount"
                min="0" 
                step="0.01" 
                type="number" 
                value={formData.amount}
                icon={HiCurrencyDollar} 
                placeholder="0.00" 
                required
                onChange={handleChange}
              />
            </div>

            {/* 3. Type Selection (Radio instead of Checkbox) */}
            <div>
              <Label value="Transaction Type" className="mb-2 block" />
              <div className="flex gap-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Radio
                    id="income"
                    name="trxType"
                    value="income"
                    checked={formData.type === "income"}
                    onChange={()=>handleTrxTypeChange("income")}
                  />
                  <Label htmlFor="income" className="cursor-pointer text-green-600 font-medium">Income</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="expense"
                    name="trxType"
                    value="expense"
                    checked={formData.type === "expense"}
                    onChange={()=>handleTrxTypeChange("expense")}
                  />
                  <Label htmlFor="expense" className="cursor-pointer text-red-600 font-medium">Expense</Label>
                </div>
              </div>
            </div>

            {/* Two-Column Grid for Category and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" value="Category" className="mb-2 block" />
                <Select id="category" name="category" required onChange={handleChange} value={formData.category}>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="salary">Salary</option>
                  <option value="utilities">Utilities</option>
                  <option value="houserent">Rent</option>
                  <option value="beauty">Beauty</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="date" value="Date" className="mb-2 block" />
                <TextInput 
                  id="date" 
                  type="date" 
                  icon={HiCalendar} 
                  value={formData.date} 
                  onChange={handleChange} 
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" value="Description (Optional)" className="mb-2 block" />
              <Textarea id="description" name="description" placeholder="What was this for?" rows={3} onChange={handleChange} value={formData.description} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {/* Submit Button */}
              <Button type="submit" className="flex-1 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium cursor-pointer" disabled={saveLoading}>
                {saveLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Saving...</span>
                  </>
                ) : (
                    'Update Transaction'
                )}
              </Button>
              <Button type="button" className="flex-1 mt-2 bg-red-700 hover:bg-red-800 text-white font-medium cursor-pointer" disabled={deleteLoading} color={'failure'} outline onClick={()=>setShowModal(true)}>
                {deleteLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Deleting...</span>
                  </>
                ) : (
                    'Delete Transaction'
                )}
              </Button>
            </div>
            {trxnUpdateError && <Alert color="failure" className="mt-5">{trxnUpdateError}</Alert>}
            {trxnUpdateSucess && <Alert color="success" className="mt-5">{trxnUpdateSucess}</Alert>}
          </form>
        )}
        </Card>
      </div>
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

export default UpdateTransaction;