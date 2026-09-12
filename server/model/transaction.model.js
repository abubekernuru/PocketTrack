// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//     userId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     type:{
//         type: String,
//         enum: ["income", "expense"],
//         required: true
//     },
//     amount:{
//         type: Number,
//         required: true
//     },
//     category:{
//         type: String,
//         enum: ["food", "transport", "entertainment","salary","utilities","healthCare","beauty","familyandpersonal", "houserent", "unlimited-data", "airtime/data","other"],
//         default: "other"
//     },
//     description:{
//         type: String
//     },
//     date:{
//         type: Date,
//         default: Date.now
//     }
// }, {timestamps: true})


// const Transaction = mongoose.model("Transaction", transactionSchema);
// module.exports = Transaction;


const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: {
                values: ["income", "expense"],
                message: "Transaction type must be income or expense",
            },
            required: [true, "Transaction type is required"],
        },

        amount: {
            type: Number,
            required: [true, "Transaction amount is required"],
            min: [0.01, "Transaction amount must be greater than 0"],
        },

        category: {
            type: String,
            enum: {
                values: [
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
                ],
                message: "Invalid transaction category",
            },
            required: [true, "Transaction category is required"],
            default: "other",
        },

        description: {
            type: String,
            trim: true,
            maxlength: [
                500,
                "Description cannot exceed 500 characters",
            ],
        },

        date: {
            type: Date,
            required: [true, "Transaction date is required"],
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;