const Transaction = require("../model/transaction.model");
const ErrorHandler = require("../utils/error");


const addTransaction = async (req, res, next) => {
    try {
        const {type, amount, category, description, date} = req.body;
        if (!type || !amount) {
            return next(new ErrorHandler("Type and amount are required", 400));
        }
        if (!["income", "expense"].includes(type)) {
            return next(new ErrorHandler("Invalid transaction type", 400));
        }
        if (!["food", "transport", "entertainment", "other"].includes(category)) {
            return next(new ErrorHandler("Invalid transaction category", 400));
        }
        const newTransaction = new Transaction({
            type,
            amount,
            category,
            description,
            date,
            userId: req.user.id
        });
        await newTransaction.save();
        res.status(201).json({
            success: true,
            message: "Transaction added sucessfully!",
            transaction: newTransaction
        });
    } catch (error) {
        next(error)
    }
}

const getTransactions = async(req, res, next)=>{
    try {
        const startIndex = parseInt(req.params.startIndex) || 0;
        const limit = parseInt(req.params.limit) || 9;
        const sortDirection = req.params.order === "asc" ? 1 : -1;
        
        const transactions = await Transaction.find({
            userId: req.user.id,
            ...(req.query.type && {type: req.query.type}),
            ...(req.query.category && {category: req.query.category}),
        })
        .sort({date: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const totalTransaction = await Transaction.countDocuments({userId: req.user.id});
        
        res.status(200).json({transactions, totalTransaction})
    } catch (error) {
        next(error)
    }
}


module.exports = {addTransaction, getTransactions}