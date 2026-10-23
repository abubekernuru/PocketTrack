const Transaction = require("../model/transaction.model");
const ErrorHandler = require("../utils/error");
const mongoose = require("mongoose");

const {
    TRANSACTION_TYPES,
    TRANSACTION_CATEGORIES,
} = require("../constants/transaction.constants");


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

        if (!TRANSACTION_TYPES.includes(type)) {
            return next(new ErrorHandler("Invalid transaction type", 400));
        }
        const allowedCategories = TRANSACTION_CATEGORIES;


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


        // Validate transaction date
        let transactionDate;

        if (date !== undefined && date !== null && date !== "") {
            // Accept only YYYY-MM-DD strings
            if (
                typeof date !== "string" ||
                !/^\d{4}-\d{2}-\d{2}$/.test(date)
            ) {
                return next(
                    new ErrorHandler(
                        "Date must use YYYY-MM-DD format",
                        400
                    )
                );
            }

            // Reject impossible dates, such as February 30
            const parsedDate = new Date(`${date}T00:00:00.000Z`);

            if (
                Number.isNaN(parsedDate.getTime()) ||
                parsedDate.toISOString().slice(0, 10) !== date
            ) {
                return next(
                    new ErrorHandler("Invalid transaction date", 400)
                );
            }

            transactionDate = parsedDate;
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
        const startIndexParam = req.query.startIndex;
        const limitParam = req.query.limit;

        // Use defaults only when parameters are omitted
        const startIndex =
            startIndexParam === undefined ? 0 : Number(startIndexParam);

        const requestedLimit =
            limitParam === undefined ? 9 : Number(limitParam);

        // Validate startIndex
        if (
            startIndexParam !== undefined &&
            (
                typeof startIndexParam !== "string" ||
                !/^\d+$/.test(startIndexParam) ||
                !Number.isSafeInteger(startIndex)
            )
        ) {
            return next(
                new ErrorHandler("startIndex must be a valid non-negative integer", 400)
            );
        }

        // Validate limit
        if (
            limitParam !== undefined &&
            (
                typeof limitParam !== "string" ||
                !/^\d+$/.test(limitParam) ||
                !Number.isSafeInteger(requestedLimit) ||
                requestedLimit === 0
            )
        ) {
            return next(
                new ErrorHandler("limit must be a valid positive integer", 400)
            );
        }

        // Prevent excessively large database queries
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


        // 3. Validate optional filters

        const { type, category, trxnId } = req.query;

        if (type && !TRANSACTION_TYPES.includes(type)) {
            return next(
                new ErrorHandler("Invalid transaction type", 400)
            );
        }

        if (
            category &&
            !TRANSACTION_CATEGORIES.includes(category)
        ) {
            return next(
                new ErrorHandler("Invalid transaction category", 400)
            );
        }

        if (
            trxnId &&
            !mongoose.Types.ObjectId.isValid(trxnId)
        ) {
            return next(
                new ErrorHandler("Invalid transaction ID", 400)
            );
        }

        // Validate optional date filters
        const { startDate, endDate } = req.query;

        const isValidDate = (value) => {
            if (typeof value !== "string") return false;

            // Require YYYY-MM-DD format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                return false;
            }

            // Reject impossible dates, such as 2026-02-30
            const date = new Date(`${value}T00:00:00.000Z`);

            return (
                !Number.isNaN(date.getTime()) &&
                date.toISOString().slice(0, 10) === value
            );
        };

        if (startDate && !isValidDate(startDate)) {
            return next(
                new ErrorHandler(
                    "startDate must be a valid date in YYYY-MM-DD format",
                    400
                )
            );
        }

        if (endDate && !isValidDate(endDate)) {
            return next(
                new ErrorHandler(
                    "endDate must be a valid date in YYYY-MM-DD format",
                    400
                )
            );
        }

        if (startDate && endDate && startDate > endDate) {
            return next(
                new ErrorHandler("startDate cannot be after endDate", 400)
            );
        }

        // 4. Build one ownership-aware query filter

        const filter = {
            userId: req.user.id,
        };

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        if (trxnId) {
            filter._id = trxnId;
        }

        // Apply date-range filtering
        if (startDate || endDate) {
            filter.date = {};

            if (startDate) {
                filter.date.$gte = new Date(
                    `${startDate}T00:00:00.000Z`
                );
            }

            if (endDate) {
                // Exclusive next-day boundary includes the entire end date
                const endExclusive = new Date(
                    `${endDate}T00:00:00.000Z`
                );

                endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);

                filter.date.$lt = endExclusive;
            }
        }

        // 5. Fetch transactions

        const transactions = await Transaction.find(filter)
            .sort({ date: sortDirection })
            .skip(startIndex)
            .limit(limit);

        // 6. Count matching transactions

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

        if (!TRANSACTION_TYPES.includes(type)) {
            return next(
                new ErrorHandler(
                    "Invalid transaction type",
                    400
                )
            );
        }

        // 4. Validate category


        if (!TRANSACTION_CATEGORIES.includes(category)) {
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

// const deleteTransaction = async (req, res, next)=>{
//     try {
//         const transaction = await Transaction.findById(req.params.trxnId);
//         if(!transaction){
//             return next(new ErrorHandler("Transaction not found.", 401))
//         }
//         if(!req.user.isAdmin && req.user.id !== transaction.userId.toString()){
//             return next(new ErrorHandler("You are not allowed to delete this transaction.", 401))
//         }
//         await Transaction.findByIdAndDelete(req.params.trxnId);
//         res.status(200).json({"message": "Transaction is deleted succesfully!"})
//     } catch (error) {
//         next(error)
//     }
// }
const deleteTransaction = async (req, res, next)=>{
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

        // 2. Build Ownership aware filter
        const filter = {
            _id: trxnId,
            userId: req.user.id,
        };

        if (req.user.isAdmin) {
            delete filter.userId;           
        }

        // 3. delete the transaction
        const deletedTransaction = await Transaction.findOneAndDelete(filter);
        // 4. Transaction not found / not authorized
        if (!deletedTransaction) {
            return next(
                new ErrorHandler(
                    "Transaction not found or you are not allowed to delete it",
                    404
                )
            );
        }

        // 5. Return deleted transaction
        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully!",
        }); 

    } catch (error) {
        next(error)
    }
}



module.exports = {addTransaction, getTransactions, getSummary, getCategorySummary, updateTransaction, deleteTransaction}