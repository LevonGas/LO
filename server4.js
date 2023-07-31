// 1

// import cluster from "cluster";
// import os from "os";
// import fetch from "node-fetch";
// import db from "./server2.js";


// const numCUPs = os.cpus().length;

// async function updateLinkStatus(link, workerId) {
//   const status = await fetchStatus(link);

//   try {
//     await db("links").where({ link }).update({
//       status,
//       updated_at: new Date(),
//     });
//     console.log(`Link ${link} Updated, from working ${workerId}`);
//   } catch (error) {
//     console.error(`Error updating the link ${link}:`, error);
//   }
// }

// async function fetchStatus(link) {
//   try {
//     const response = await fetch(link, { redirect: "manual" });
//     return response.status;
//   } catch (error) {
//     return -1;
//   }
// }

// async function main() {
//   try {
//     const links = await db("links").select("link");

//     if (links.length === 0) {
//       console.log("There are no links in the database. The work is completed.");
//       return;
//     }

//     const linksPerWorker = Math.ceil(links.length / numCUPs);

//     if (cluster.isPrimary) {
//       console.log(`Total number of links: ${links.length}`);
//       console.log(`Links for each worker: ${linksPerWorker}`);

//       for (let i = 0; i < numCUPs; i++) {
//         const start = i * linksPerWorker;
//         const end = start + linksPerWorker;
//         const workerLinks = links.slice(start, end);
//         const worker = cluster.fork();

//         worker.on("message", (message) => {
//           if (message === "ready") {
//             console.log(`Worker ${worker.process.pid} Ready to accept links`);
//             worker.send({ workerLinks });
//           } else if (message === "finished") {
//             console.log(`Worker ${worker.process.pid} Finished the work`);
//           }
//         });
//       }

//       cluster.on("exit", (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} Completed the work`);
//       });

//     } else {
//       process.on("message", async (message) => {
//         const { workerLinks } = message;

//         if (workerLinks.length === 0) {
//           console.log(
//             "Worker didn't get any links to process. The work is completed."
//           );
//           process.send("finished");
//           process.exit(0);
//         }

//         for (const link of workerLinks) {
//           try {
//             await updateLinkStatus(link.link, process.pid);
//           } catch (error) {
//             console.error(`Error updating the link ${link}:`, error);
//           }
//         }

//         console.log(`Worker ${process.pid} Finished the work`);
//         process.send("finished");
//       });

//       process.send("ready");
//     }
//   } catch (error) {
//     console.error("An error occurred while executing the task:", error);
//   }
// }


//     main().catch((err) => console.error(err));

//2

// import cluster from "cluster";
// import os from "os";
// import fetch from "node-fetch";
// import db from "./server2.js";

// const numCUPs = os.cpus().length;

// async function updateLinkStatus(link, id, workerId) {
//   const status = await fetchStatus(link);
//   try {
//     await db("links").where({ link: link, id: id }).update({
//       status,
//       updated_at: new Date(),
//     });
//     console.log(`Link ${link} Updated, from working ${workerId}, id ${id}`);
//   } catch (error) {
//     console.error(`Error updating the link ${link}:`, error);
//   }
// }

// async function fetchStatus(link) {
//   try {
//     const response = await fetch(link,{ redirect: "manual" });
//     return response.status;
   
//   } catch (error) {
//     return -1;
//   }
// }

// async function main() {
//   try {
//     const links = await db("links").select("link", "id");

//     if (links.length === 0) {
//       console.log("There are no links in the database. The work is completed.");
//       return;
//     }

//     const linksPerWorker = Math.ceil(links.length / numCUPs);

//     if (cluster.isPrimary) {
//       console.log(`Total number of links: ${links.length}`);
//       console.log(`Links for each worker: ${linksPerWorker}`);

//       for (let i = 0; i < numCUPs; i++) {
//         const start = i * linksPerWorker;
//         const end = start + linksPerWorker;
//         const workerLinks = links.slice(start, end);
//         const worker = cluster.fork();

//         worker.on("message", (message) => {
//           if (message === "ready") {
//             console.log(`Worker ${worker.process.pid} Ready to accept links`);
//             worker.send({ workerLinks });
//           } else if (message === "finished") {
//             console.log(`Worker ${worker.process.pid} Finished the work`);
//           }
//         });
//       }

//       cluster.on("exit", (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} Completed the work`);
//       });
//     } else {
//       process.on("message", async (message) => {
//         const { workerLinks } = message;

//         if (workerLinks.length === 0) {
//           console.log(
//             "Worker didn't get any links to process. The work is completed."
//           );
//           process.send("finished");
//           process.exit(0);
//         }

//         for (const link of workerLinks) {
//           try {
      
//             await updateLinkStatus(link.link, link.id, process.pid);
//           } catch (error) {
//             console.error(`Error updating the link ${link.link}:`, error);
//           }
//         }

//         console.log(`Worker ${process.pid} Finished the work`);
//          process.send("finished");
//       });
//        process.send("ready");
//     }
//   } catch (error) {
//     console.error("An error occurred while executing the task:", error);
//   }
// }

// main().catch((err) => console.error(err));

//3

// import cluster from "cluster";
// import os from "os";
// import fetch from "node-fetch";
// import db from "./server2.js";

// const numCUPs = os.cpus().length;

// async function updateLinkStatus(link, id, workerId) {
//   const status = await fetchStatus(link);
//   try {
//     await db("links").where({ link: link, id: id }).update({
//       status,
//       updated_at: new Date(),
//     });
//     console.log(`Link ${link} Updated, from working ${workerId}, id ${id}`);
//   } catch (error) {
//     console.error(`Error updating the link ${link}:`, error);
//   }
// }

// async function fetchStatus(link) {
//   try {
//     console.log('mtav fetchStatus functia');
//     const response = await fetch(link,{ redirect: "manual" });
//     console.log('fetch arvech hmi returna anumm');
//     return response.status;
   
//   } catch (error) {
//     return -1;
//   }
// }

// async function main() {
//   try {
//     const links = await db("links").select("link", "id");

//     if (links.length === 0) {
//       console.log("There are no links in the database. The work is completed.");
//       return;
//     }

//     const linksPerWorker = Math.ceil(links.length / numCUPs);

//     if (cluster.isPrimary) {
//       console.log(`Total number of links: ${links.length}`);
//       console.log(`Links for each worker: ${linksPerWorker}`);

//       for (let i = 0; i < numCUPs; i++) {
//         const start = i * linksPerWorker;
//         const end = start + linksPerWorker;
//         const workerLinks = links.slice(start, end);
//         const worker = cluster.fork();

//         worker.on("message", (message) => {
//           if (message === "ready") {
//             console.log(`Worker ${worker.process.pid} Ready to accept links`);
//             worker.send({ workerLinks });
//           } else if (message === "finished") {
//             console.log(`Worker ${worker.process.pid} Finished the work`);
//           }
//         });
//       }

//       cluster.on("exit", (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} Completed the work`);
//       });
//     } else {
//       process.on("message", async (message) => {
//         const { workerLinks } = message;

//         if (workerLinks.length === 0) {
//           console.log(
//             "Worker didn't get any links to process. The work is completed."
//           );
//           process.send("finished");
//           process.exit(0);
//         }

//         for (const link of workerLinks) {
//           try {
//           console.log(link.id, link.link);
//             await updateLinkStatus(link.link, link.id, process.pid);
//           } catch (error) {
//             console.error(`Error updating the link ${link.link}:`, error);
//           }
//         }

//         console.log(`Worker ${process.pid} Finished the work`);
//          process.send("finished");
//       });
//        process.send("ready");
//     }
//   } catch (error) {
//     console.error("An error occurred while executing the task:", error);
//   }
// }

// main().catch((err) => console.error(err));

