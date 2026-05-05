
import { useState } from "react";
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";
import { HiCalendar, HiCurrencyDollar } from "react-icons/hi";

function DashAddTransaction() {
  const [trxType, setTrxType] = useState("expense"); 
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); 
  function toggleType(type) {
    setTrxType(type);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // collect form data — for now just log the selected type
    console.log("Submitting transaction, type:", trxType);
    // TODO: wire to actual submit logic (API / redux)
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 p-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">Add your daily transaction</h1>
        {/* Explanation paragraph about the purpose of the expense tracker */}
        <p className="text-gray-500 dark:text-gray-400">Fill in the details of your transaction below.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Amount input */}
        <div>
        <div className="mb-2 block">
          <Label htmlFor="amount">Amount</Label>
        </div>
        {/* Amount only positive numbers */}
        <TextInput id="amount" min="0" type="number" icon={HiCurrencyDollar} placeholder="amount" required />
      </div>
        {/* Transaction type selection */}
        <div>
          <div className="mb-2 block">
            <Label>Type</Label>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="income"
                checked={trxType === "income"}
                onChange={() => toggleType("income")}
              />
              <Label htmlFor="income">Income</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="expense"
                checked={trxType === "expense"}
                onChange={() => toggleType("expense")}
              />
              <Label htmlFor="expense">Expense</Label>
            </div>
          </div>
        </div>
        {/* Category input */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="category">Category</Label>
          </div>
          <Select id="category" required>
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Other</option>
          </Select>
        </div>
          {/* Date input */}
        <div>
        <div className="mb-2 block">
          <Label htmlFor="date">Date</Label>
        </div>
        <TextInput id="date" type="date" icon={HiCalendar} placeholder="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      </div>
          {/* Description textarea */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description">Description</Label>
          </div>
          <Textarea id="description" placeholder="Leave your thought..." rows={4} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default DashAddTransaction;
