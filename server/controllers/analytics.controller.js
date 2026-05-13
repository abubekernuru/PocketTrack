const Transaction = require("../model/transaction.model");
const ErrorHandler = require("../utils/error");
const mongoose = require("mongoose");

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

module.exports = {getSummary, getCategorySummary}