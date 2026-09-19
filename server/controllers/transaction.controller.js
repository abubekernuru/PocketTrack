const Transaction = require("../model/transaction.model");
const ErrorHandler = require("../utils/error");
const mongoose = require("mongoose");


const addTransaction = async (req, res, next) => {
    try {
        const {type, amount, category, description, date} = req.body;

        // validate required fields

        if (!type) {
            return next(new ErrorHandler("Transaction type is required", 400));
        }
        if ( amount === undefined || amount === null || amount === "") {
            return next(new ErrorHandler("Transaction amount is required", 400));
        }
        if (!category) {
            return next(new ErrorHandler("Transaction category is required", 400));
        }

        // validate transaction type and category

        const allowedTypes = ["income", "expense"];
        if (!allowedTypes.includes(type)) {
            return next(new ErrorHandler("Invalid transaction type", 400));
        }
        const allowedCategories = ["food", "transport", "entertainment","salary","utilities","healthCare", "unlimited-data", "airtime/data","beauty","familyandpersonal", "houserent","other"];

        if (!allowedCategories.includes(category)) {
            return next(new ErrorHandler("Invalid transaction category", 400));
        }

        // validate amount

        const numericAmount = Number(amount);
        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return next(new ErrorHandler("Transaction amount must be a positive number", 400));
        }

        // validate description

        const cleanDescription = typeof description === "string" ? description.trim() : "";
        if (cleanDescription.length > 500){
            return next(
                new ErrorHandler( "Description cannot exceed 500 characters", 400)
            )
        }

        // validate date

        let transactionDate;
        if (date) {
            transactionDate = new Date(date);
            if (isNaN(transactionDate)) {
                return next(new ErrorHandler("Invalid transaction date", 400));
            }
        } else {
            transactionDate = new Date();
        }

        const newTransaction = new Transaction({
            type,
            amount: numericAmount,
            category,
            description: cleanDescription,
            date: transactionDate,
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

// const getTransactions = async(req, res, next)=>{
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;

//         const sortDirection = req.query.order === "asc" ? 1 : -1;
        
//         const transactions = await Transaction.find({
//             userId: req.user.id,
//             ...(req.query.type && {type: req.query.type}),
//             ...(req.query.trxnId && {_id: req.query.trxnId}),
//             ...(req.query.category && {category: req.query.category}),
//         })
//         .sort({date: sortDirection})
//         .skip(startIndex)
//         .limit(limit);

//         const totalTransaction = await Transaction.countDocuments({userId: req.user.id});
        
//         res.status(200).json({transactions, totalTransaction})
//     } catch (error) {
//         next(error)
//     }
// }


const getTransactions = async (req, res, next) => {
    try {
        // 1. Parse and validate pagination parameters

        const startIndex = Number.parseInt(req.query.startIndex, 10) || 0;
        const requestedLimit = Number.parseInt(req.query.limit, 10) || 9;

        if (startIndex < 0) {
            return next(
                new ErrorHandler(
                    "startIndex cannot be negative",
                    400
                )
            );
        }

        if (requestedLimit <= 0) {
            return next(
                new ErrorHandler(
                    "limit must be greater than 0",
                    400
                )
            );
        }

        // Prevent clients from requesting an excessive number
        // of transactions in a single request.
        const limit = Math.min(requestedLimit, 50);

        // 2. Validate sort direction

        const order = req.query.order || "desc";

        if (!["asc", "desc"].includes(order)) {
            return next(
                new ErrorHandler(
                    "Invalid sort order. Use asc or desc",
                    400
                )
            );
        }

        const sortDirection = order === "asc" ? 1 : -1;

        // 3. Build the transaction filter

        const filter = {
            userId: req.user.id,
        };

        if (req.query.type) {
            filter.type = req.query.type;
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.trxnId) {
            filter._id = req.query.trxnId;
        }

        // 4. Fetch transactions

        const transactions = await Transaction.find(filter)
            .sort({ date: sortDirection })
            .skip(startIndex)
            .limit(limit);

        // 5. Count matching transactions

        const totalTransaction =
            await Transaction.countDocuments(filter);

        res.status(200).json({
            success: true,
            transactions,
            totalTransaction,
        });
    } catch (error) {
        next(error);
    }
};


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

// const updateTransaction = async (req, res, next)=>{
//     try {
//         const transaction = await Transaction.findById(req.params.trxnId);
//         if(!transaction){
//             return next(new ErrorHandler("Transaction not found.", 401))
//         }
//         if(!req.user.isAdmin && req.user.id !== transaction.userId.toString()){
//             return next(new ErrorHandler("You are not allowed to update this transaction.", 401))
//         }
//         const updateTrxn = await Transaction.findByIdAndUpdate(req.params.trxnId, {
//             $set:{
//                 type: req.body.type,
//                 amount: req.body.amount,
//                 category: req.body.category,
//                 description: req.body.description,
//                 date: req.body.date
//             }
//         }, {new: true});
//         res.status(200).json(updateTrxn);
//     } catch (error) {
//         next(error)
//     }
// }

const updateTransaction = async (req, res, next) => {
    try {
        const { trxnId } = req.params;

        // 1. Validate transaction ID
        if (!mongoose.Types.ObjectId.isValid(trxnId)) {
            return next(
                new ErrorHandler(
                    "Invalid transaction ID",
                    400
                )
            );
        }

        const {
            type,
            amount,
            category,
            description,
            date,
        } = req.body;

        // 2. Validate required fields

        if (!type) {
            return next(
                new ErrorHandler(
                    "Transaction type is required",
                    400
                )
            );
        }

        if (amount === undefined || amount === null || amount === "") {
            return next(
                new ErrorHandler(
                    "Transaction amount is required",
                    400
                )
            );
        }

        if (!category) {
            return next(
                new ErrorHandler(
                    "Transaction category is required",
                    400
                )
            );
        }

        // --------------------------------------------------
        // 3. Validate transaction type
        // --------------------------------------------------

        const allowedTypes = ["income", "expense"];

        if (!allowedTypes.includes(type)) {
            return next(
                new ErrorHandler(
                    "Invalid transaction type",
                    400
                )
            );
        }

        // 4. Validate category

        const allowedCategories = [
            "food",
            "transport",
            "entertainment",
            "salary",
            "utilities",
            "healthCare",
            "beauty",
            "familyandpersonal",
            "houserent",
            "unlimited-data",
            "airtime/data",
            "other",
        ];

        if (!allowedCategories.includes(category)) {
            return next(
                new ErrorHandler(
                    "Invalid transaction category",
                    400
                )
            );
        }

        // 5. Validate amount

        const numericAmount = Number(amount);

        if (
            !Number.isFinite(numericAmount) ||
            numericAmount <= 0
        ) {
            return next(
                new ErrorHandler(
                    "Transaction amount must be a positive number",
                    400
                )
            );
        }

        // 6. Validate description

        const cleanDescription =
            typeof description === "string"
                ? description.trim()
                : "";

        if (cleanDescription.length > 500) {
            return next(
                new ErrorHandler(
                    "Description cannot exceed 500 characters",
                    400
                )
            );
        }

        // 7. Validate date

        let transactionDate;

        if (date) {
            transactionDate = new Date(date);

            if (Number.isNaN(transactionDate.getTime())) {
                return next(
                    new ErrorHandler(
                        "Invalid transaction date",
                        400
                    )
                );
            }
        } else {
            transactionDate = new Date();
        }

        // 8. Build update data

        const updateData = {
            type,
            amount: numericAmount,
            category,
            description: cleanDescription,
            date: transactionDate,
        };

        // 9. Update only the authenticated user's transaction

        const filter = {
            _id: trxnId,
            userId: req.user.id,
        };

        if (req.user.isAdmin) {
            delete filter.userId;
        }

        const updatedTransaction =
            await Transaction.findOneAndUpdate(
                filter,
                { $set: updateData },
                {
                    new: true,
                    runValidators: true,
                }
            );
        // 10. Transaction not found / not authorized

        if (!updatedTransaction) {
            return next(
                new ErrorHandler(
                    "Transaction not found or you are not allowed to update it",
                    404
                )
            );
        }

        // 11. Return updated transaction

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully!",
            transaction: updatedTransaction,
        });
    } catch (error) {
        next(error);
    }
};

const deleteTransaction = async (req, res, next)=>{
    try {
        const transaction = await Transaction.findById(req.params.trxnId);
        if(!transaction){
            return next(new ErrorHandler("Transaction not found.", 401))
        }
        if(!req.user.isAdmin && req.user.id !== transaction.userId.toString()){
            return next(new ErrorHandler("You are not allowed to delete this transaction.", 401))
        }
        await Transaction.findByIdAndDelete(req.params.trxnId);
        res.status(200).json({"message": "Transaction is deleted succesfully!"})
    } catch (error) {
        next(error)
    }
}



module.exports = {addTransaction, getTransactions, getSummary, getCategorySummary, updateTransaction, deleteTransaction}