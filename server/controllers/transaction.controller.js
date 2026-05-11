const Transaction = require("../model/transaction.model");
const ErrorHandler = require("../utils/error");
const mongoose = require("mongoose");


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
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;
        
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

const getSummary = async(req, res, next)=>{
    try {
        const summary = await Transaction.aggregate([
            {
                $match:{userId: new mongoose.Types.ObjectId(req.user.id)}
            },
            {
                $group: {
                _id:null,
                totalIncome:{
                    $sum:{
                        $cond:[{$eq:["$type", "income"]}, "$amount", 0],
                    }},
                totalExpense:{
                    $sum:{
                        $cond:[{$eq:["$type", "expense"]}, "$amount", 0],
                    }}
            }},
            {
                $project:{
                        _id:0,
                        totalIncome: 1,
                        totalExpense: 1,
                        balance:{$subtract:["$totalIncome", "$totalExpense"]}
                        }
            }
        ]);
        const result= summary.length > 0 ? summary[0]: {totalIncome:0, totalExpense:0, balance:0};
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getCategorySummary = async (req, res, next)=>{
    try {
        const categorySummary = await Transaction.aggregate([
            {
                $match:{userId: new mongoose.Types.ObjectId(req.user.id), type: "expense"}
            },
            {
                $group:{_id:"$category", total:{$sum: "$amount"}}
            }
        ]);
        res.status(200).json(categorySummary);
    } catch (error) {
        next(error);
    }
}

module.exports = {addTransaction, getTransactions, getSummary, getCategorySummary}