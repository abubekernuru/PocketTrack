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



module.exports = {addTransaction}