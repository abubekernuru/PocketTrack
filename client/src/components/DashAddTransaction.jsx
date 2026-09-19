import { useEffect, useState } from "react";
import { Button, Label, Select, Textarea, TextInput, Card, Alert, Spinner } from "flowbite-react";
import { HiCalendar, HiCurrencyDollar, HiPlusCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_API_URL;

function DashAddTransaction() {
  const [formData, setFormData] = useState({
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "food",
    description: ""
  });
  const [trxnAddError, setTrxAddError] = useState(null);
  const [trxnAddSucess, setTrxAddSucess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trxnAddSucess) {
      const timer = setTimeout(() => setTrxAddSucess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [trxnAddSucess]);

  const handleTrxTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: id === "amount" ? (value === "" ? "" : parseFloat(value)) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount) {``
      setTrxAddError("Please enter an amount.");
      return;
    }
    try {
      setLoading(true);
      setTrxAddError(null);
      const res = await fetch(`${apiUrl}/api/v1/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setTrxAddError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }
      setTrxAddSucess("Transaction saved successfully!");
      setFormData({ type: "expense", date: new Date().toISOString().split("T")[0], amount: "", category: "food", description: "" });
    } catch (error) {
      setTrxAddError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 md:p-10 w-full flex">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-700 dark:text-purple-300">
              <HiPlusCircle className="h-6 w-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Add Transaction</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Quickly log income or expenses — clean, simple and responsive.</p>
        </div>

        <Card className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount" value="Amount" className="mb-2 block" />
                <TextInput id="amount" name="amount" min="0" step="0.01" type="number" value={formData.amount} icon={HiCurrencyDollar} placeholder="0.00" required onChange={handleChange} className="shadow-sm" />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Enter amount (numbers only).</p>
              </div>

              <div>
                <Label value="Transaction Type" className="mb-2 block" />
                <div className="flex items-center gap-3 p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                  <button type="button" aria-pressed={formData.type === 'income'} onClick={() => handleTrxTypeChange('income')}
                    className={`px-4 py-2 rounded-full text-sm transition-shadow focus:outline-none ${formData.type === 'income' ? 'bg-green-600 text-white shadow' : 'bg-transparent text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 cursor-pointer'}`}>
                    Income
                  </button>
                  <button type="button" aria-pressed={formData.type === 'expense'} onClick={() => handleTrxTypeChange('expense')}
                    className={`px-4 py-2 rounded-full text-sm transition-shadow focus:outline-none ${formData.type === 'expense' ? 'bg-red-600 text-white shadow' : 'bg-transparent text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 cursor-pointer'}`}>
                    Expense
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" value="Category" className="mb-2 block" />
                <Select id="category" name="category" required onChange={handleChange} value={formData.category} className="shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500">
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="salary">Salary</option>
                  <option value="utilities">Utilities</option>
                  <option value="houserent">Rent</option>
                  <option value="unlimited-data">Unlimited data</option>
                  <option value="airtime/data">Airtime/Data</option>
                  <option value="beauty">Beauty</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="date" value="Date" className="mb-2 block" />
                <TextInput id="date" type="date" icon={HiCalendar} value={formData.date} onChange={handleChange} required className="shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
              </div>
            </div>

            <div>
              <Label htmlFor="description" value="Description (Optional)" className="mb-2 block" />
              <Textarea id="description" name="description" placeholder="What was this for? (optional)" rows={3} onChange={handleChange} value={formData.description} className="shadow-sm" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button type="submit" className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium" disabled={loading || !formData.amount}>
                {loading ? (<><Spinner size="sm" /><span className="pl-3">Saving...</span></>) : 'Save Transaction'}
              </Button>
              <button type="button" onClick={() => setFormData({ type: 'expense', date: new Date().toISOString().split("T")[0], amount: '', category: 'food', description: '' })} className="cursor-pointer w-full sm:w-auto px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Clear
              </button>
            </div>

            {trxnAddError && <Alert color="failure" className="mt-3" role="alert">{trxnAddError}</Alert>}
            {trxnAddSucess && <Alert color="success" className="mt-3" role="status">{trxnAddSucess}</Alert>}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default DashAddTransaction;
