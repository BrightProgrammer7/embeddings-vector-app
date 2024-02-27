import { client } from "./weaviate.js";

// Store img to  cooresponding class in the schema.
const res = await client.data
  .creator()
  .withClassName("Meme")
  .withProperties({
    // image: b64,
    text: "mr robot",
  })
  .do();

// Weaviate will automatically use the neural network in the background to vectorize it and update the embedding.
console.log(res);