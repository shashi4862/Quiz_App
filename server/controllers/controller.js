import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

export async function getQuestions(req, res) {
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

export async function insertQuestions(req, res) {
    try {
        // Insert questions and answers into the database using the QuestionModel
        const insertedData = await Questions.insertMany({ questions, answers });
        res.json({ msg: "Data Saved Successfully", data: insertedData });
    } catch (error) {
        console.error("Error inserting questions:", error);
        res.status(500).json({ error: "Failed to insert questions" });
    }
}

export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Question Deleted Successfully" });
    } catch (error) {
        res.json({ error })
    }
}

export async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error('Data Not Provided...!');

        // Assuming Results is your Mongoose model
        await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully...!" })
    } catch (error) {
        res.json({ error })
    }
}

