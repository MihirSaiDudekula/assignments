import { Account } from "../models/models.js";
import mongoose from "mongoose";

// Retrieves the balance of the user whose userId is attached to the request (via authentication middleware).
export const getBalanceController = async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    });
}
// sessions - atomic transactions
// Start a Session: Create a new session when you want to perform a set of operations that should be grouped together.

// Perform Operations: Execute your read and write operations within the session. These operations are tracked by MongoDB as part of the session.

// Commit or Abort:

// Commit: If all operations are successful, commit the session. This finalizes all the changes made during the session.
// Abort: If something goes wrong, abort the session. This will undo all operations performed during the session, leaving the database in its original state.
export const transferController = async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);
    // .session(session) Associates the Query with a Session: By calling .session(session), you are telling MongoDB to include this query as part of a larger transaction or session. This ensures that all operations within this session are treated as a single unit of work.

    // Transaction Handling: When you perform operations within a session, MongoDB can handle these operations atomically. If you have multiple operations (e.g., reads and writes) and want to ensure they all succeed or fail together, you use a session. If something goes wrong, you can abort the transaction, and all changes made within the session will be rolled back.
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient funds"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid receiver account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount }}).session(session);
    await Account.updateOne({ userId: req.to }, { $inc: { balance: amount }}).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
}
