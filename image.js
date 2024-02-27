import { client } from "./weaviate.js";
import { readFileSync } from "fs";

// Read one img
// const img = readFileSync("./img/hi-mom.jpg");
const img = readFileSync("./test.jpg");

// Converte img to buffer then base64
const b64 = Buffer.from(img).toString("base64");

// Store img to  cooresponding class in the schema.
const res = await client.data
  .creator()
  .withClassName("Meme")
  .withProperties({
    image: b64,
    text: "matrix meme",
  })
  .do();

// Weaviate will automatically use the neural network in the background to vectorize it and update the embedding.
console.log(res);
