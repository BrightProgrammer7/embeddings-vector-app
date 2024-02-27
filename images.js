import { client } from "./weaviate";
import { readdirSync } from 'fs';

// Read multiple img
const imgFiles = readdirSync("./img");
// Converte img to base64 & Store it to cooresponding class in schema.
const promises = imgFiles.map(async (imgFile) => {
  const b64 = toBase64(`./img/${imgFile}`);

  await client.data
    .creator()
    .withClassName("Meme")
    .withProperties({
      image: b64,
      text: imgFile.split(".")[0].split("_").join(" "),
    })
    .do();
});

const res = await Promise.all(promises).done();
console.log(res);
