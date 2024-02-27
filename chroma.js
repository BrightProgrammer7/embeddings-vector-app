import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import dotenv from "dotenv";
import http from "http";

// load the .env file
dotenv.config();
// Create a chroma client
const client = new ChromaClient({ path: "http://localhost:8000", database: "./chroma_db" });

// const app = http.createServer((req, res) => res.send("Hello VectorDB!"));
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });

// Define a embedding function using the text-embedding-3-large/small || text-embedding-ada-002 model of OpenaAI
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API,
});

// // create a Collection of embedding functions
// const collection = await client.createCollection("hi_mom", {}, embedder);
const collection = await client.createCollection({
  name: "vector_collection",
  metadata: {},
  embeddingFunction: embedder,
  persistDirectory: "./chroma_db",
});

// // Add Documents (DataPoints) to the Collection
// await collection.add(
//   ["id1", "id2"], // ids
//   undefined, // embeddings
//   [{ source: "my_source" }, { source: "my_source" }], // metadata
//   ["What is the meaning of life?", "just be alive"] // document
// );
await collection.add({
  ids: ["id1", "id2"],
  embeddings: [
    [1.2, 2.3, 4.5],
    [6.7, 8.2, 9.2],
  ],
  metadatas: [{ source: "my_source" }, { source: "my_source" }],
  documents: ["This is a document", "This is another document"],
});

// Query database by a string of Text
const results = await collection.query(undefined, 2, undefined, [
  "Am I really alive?",
]);

console.log(results);
