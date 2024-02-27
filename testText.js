import { client } from "./weaviate.js";
import { readFileSync, writeFileSync } from "fs";
// import {Buffer} from 'buffer';

// const test = Buffer.from(readFileSync("./test.jpg")).toString("base64");

// Provide an image as a query input
const resTxt = await client.graphql
  .get()
  .withClassName("Meme")
  .withFields(["text"])
  .withNearText({ concepts: ["mr robot"] })
  .withLimit(1)
  .do();

// Database will use HNSW to quickly find similar looking images.
const result = resTxt.data.Get.Meme[0].text;

// Write result to filesystem
writeFileSync("./result.txt", result);
