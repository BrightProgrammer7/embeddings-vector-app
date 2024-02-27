import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

// initialize the client and target the “quickstart” index
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API,
});
const index = pc.index("quickstart");
