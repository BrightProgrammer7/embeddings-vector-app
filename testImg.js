import { readFileSync, writeFileSync } from "fs";
import { Buffer } from "buffer";
import { client } from "./weaviate.js";
// Read test img and convert it to base64
const test = Buffer.from(readFileSync("./test.jpg")).toString("base64");

// Provide an image as a query input
const resImage = await client.graphql
  .get()
  .withClassName("Meme")
  .withFields(["image"])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

// Database will use HNSW to quickly find similar looking images.
const result = resImage.data.Get.Meme[0].image;

// Write result to filesystem
writeFileSync("./result.jpg", result, "base64");
