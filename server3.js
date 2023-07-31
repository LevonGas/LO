import db from "./server2.js";
import path from "path";
import fs from "fs";
import parser from "csv-parser";

async function insertLinksInDb() {
  const filePath = path.resolve("./uploads/links.csv");
  const batchSize = 100;
  const dataArray = [];

  const processDataChunk = async (chunk) => {
    await db.transaction(async (trx) => {
      await db.batchInsert("links", chunk).transacting(trx);
    });
  };

  const pars = parser();
  let nameCSVheader = [];
  const readStream = fs.createReadStream(filePath);
  pars.on("headers", (headers) => {
    nameCSVheader = headers;
  });
  readStream.pipe(pars);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parser())
      .on("data", (data) => {
        dataArray.push({
          link: data[nameCSVheader[0]],
          created_at: new Date(),
          updated_at: new Date()
        });

        if (dataArray.length >= batchSize) {
          const chunk = dataArray.splice(0, batchSize);
          processDataChunk(chunk).catch((error) => reject(error));
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", async () => {
        if (dataArray.length > 0) {
          await processDataChunk(dataArray).catch((error) => reject(error));
        }

        resolve();
      });
  });
}

insertLinksInDb()
  .then(() => {
    console.log("Link insertion into the database successfully completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("ERROR:", error);
    process.exit(1);
  });
