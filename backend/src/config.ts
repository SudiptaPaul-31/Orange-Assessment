import dotenv from "dotenv";

const result = dotenv.config();

console.log("dotenv:", result);
console.log("key:", process.env.GEMINI_API_KEY);

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY not found");
}

export const GEMINI_API_KEY = apiKey;