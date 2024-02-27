// import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";
import weaviate, {  ApiKey } from "weaviate-ts-client";
import dotenv from "dotenv";
dotenv.config();

// Initialize the API client and fetch the schema 
// const client = weaviate.client({
//     scheme: 'http',
//     host: 'localhost:8080',
// });

// const client: WeaviateClient = weaviate.client({

// Initialize the API client and fetch the schema from weaviate db and Text-embedding-ada-002-v2 model
export const client = weaviate.client({
  scheme: "https",
  host: "embeddings-vector-app-wjtf1n4i.weaviate.network",
  apiKey: new ApiKey(process.env.WEAVIATE_API),
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API },
});


const response = await client.misc
  .readyChecker()
  .do();
console.log(response);

// Get schema information from the server
const schemaRes = await client.schema.getter().do();

// Get array of classes
console.log(schemaRes);
