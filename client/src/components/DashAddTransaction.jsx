import { useState } from "react";
import { Button, Radio, Label, Select, Textarea, TextInput, Card } from "flowbite-react";
import { HiCalendar, HiCurrencyDollar } from "react-icons/hi";

function DashAddTransaction() {
  const [trxType, setTrxType] = useState("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitting:", { ...data, trxType, date });
  }

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
                icon={HiCurrencyDollar} 
                placeholder="0.00" 
                required 
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
                    checked={trxType === "income"}
                    onChange={() => setTrxType("income")}
                  />
                  <Label htmlFor="income" className="cursor-pointer text-green-600 font-medium">Income</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="expense"
                    name="trxType"
                    value="expense"
                    checked={trxType === "expense"}
                    onChange={() => setTrxType("expense")}
                  />
                  <Label htmlFor="expense" className="cursor-pointer text-red-600 font-medium">Expense</Label>
                </div>
              </div>
            </div>

            {/* Two-Column Grid for Category and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" value="Category" className="mb-2 block" />
                <Select id="category" name="category" required>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="date" value="Date" className="mb-2 block" />
                <TextInput 
                  id="date" 
                  type="date" 
                  icon={HiCalendar} 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" value="Description (Optional)" className="mb-2 block" />
              <Textarea id="description" name="description" placeholder="What was this for?" rows={3} />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium cursor-pointer">
              Save Transaction
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default DashAddTransaction;