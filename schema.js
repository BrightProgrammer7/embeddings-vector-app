import { client } from "./weaviate.js";

// Create a schema for db that contains an image property
const schemaConfig = {
  class: "Meme",
  // pytorch nn
  //   vectorizer: "img2vec-neural",
  vectorizer: "text2vec-openai",
  // hirarchical navigable small worlds to search data in db
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
    "text2vec-openai": {
      textFields: ["text"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};

// update schema
await client.schema.classCreator().withClass(schemaConfig).do();
// const res = await client.schema.classCreator().withClass(schemaConfig).do();
// console.log(res)
