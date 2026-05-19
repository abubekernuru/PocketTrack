import { useEffect, useState } from "react";
import { Button, Radio, Label, Select, Textarea, TextInput, Card, Alert, Spinner } from "flowbite-react";
import { HiCalendar, HiCurrencyDollar } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_API_URL;

function DashAddTransaction() {
  const [formData, setFormData] = useState({
    type: "expense", // default
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "food",
    description: ""
  })
  const [trxnAddError, setTrxAddError] = useState(null);
  const [trxnAddSucess, setTrxAddSucess] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  if (trxnAddSucess) {
    const timer = setTimeout(() => {
      setTrxAddSucess(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [trxnAddSucess]);

  const handleTrxTypeChange = (value)=>{
    setFormData((prev)=>({...prev, type: value}))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setTrxAddError(null);
      const res = await fetch(`${apiUrl}/api/v1/transactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        setTrxAddError(data.message || "Something went wrong")
        setLoading(false);
        return;
      }
      setTrxAddSucess("Transaction saved succefully!")
      setLoading(false);
      setFormData({
            type: "expense",
            date: new Date().toISOString().split("T")[0],
            amount: "",
            category: "food",
            description: ""
        });
    } catch (error) {
      setTrxAddError(error.message);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData((prev)=>({...prev, [id]: id==="amount"? parseFloat(value): value}))
  }
  //(value === "" ? "" : parseFloat(value))
  // console.log(formData)
  return (
    <div className="p-3 md:p-10 w-full flex">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Add Transaction
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Keep track of your finances by logging your daily activity.
          </p>
        </div>

        {/* 2. Card Styling: Adds a border/shadow for a "Dashboard" feel */}
        <Card>
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
              <Textarea id="description" name="description" placeholder="What was this for? (optional)" rows={3} onChange={handleChange} value={formData.description} />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium cursor-pointer" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Saving...</span>
                </>
              ) : (
                  'Save Transaction'
              )}
            </Button>
            {trxnAddError && <Alert color="failure" className="mt-5">{trxnAddError}</Alert>}
            {trxnAddSucess && <Alert color="success" className="mt-5">{trxnAddSucess}</Alert>}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default DashAddTransaction;