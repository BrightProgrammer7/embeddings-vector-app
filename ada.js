import dotenv from "dotenv";
dotenv.config();

// OpenAI URL and Headers
const openAiHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API}`,
};

async function createEmbedding(textToEmbed) {
  let response = await fetch(`https://api.openai.com/v1/embeddings`, {
    method: "POST",
    headers: openAiHeaders,
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input: textToEmbed,
    }),
  });
  if (response.ok) {
    response.json().then((data) => {
      console.log(data.data[0].embedding);
      return data;
    });
  }
}

createEmbedding("Hello, world!");


//  PDF Library
//  Read PDF
//  Chunk PDFs into paragraphs
//  Store as Vectors
//  Search and return as part of queries