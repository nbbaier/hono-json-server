import { openapi } from "./api.ts";
console.log(openapi);

// // @ts-ignore
// import data from "./db.json";
// import { Hono } from "hono";

// type DB = typeof data & { [key: string]: any };
// const db: DB = data;
// type Options = { homepage?: string };

// function createJsonServer(db: DB, options: Options = {}) {
//   const app = new Hono();

//   app.get("/", (c) => c.text("Hello, world!"));
//   app.get("/db", (c) => c.json(db));
//   app.post("/db", async (_, next) => {
//     console.log("middleware 1 start");
//     await next();
//     console.log("middleware 1 end");
//   });
//   app.post("/db", (c) => c.json(db));
//   return app;
// }

// const app = createJsonServer(db, { homepage: "https://github.com" });

// // app.get("/:name", (c) => {
// //   const name = c.req.param().name as string;
// //   const queries = c.req.queries();
// //   let data = db[name];
// //   return c.json(data);
// // });
// // app.get("/:name/:id", (c) => {
// //   const { name, id } = c.req.param();
// //   const output = db[name].find(
// //     (item: { id: number }) => item.id === parseInt(id)
// //   );
// //   return c.json(output);
// // });

// const server = Bun.serve({
//   // port: 3000,
//   fetch: app.fetch,
// });

// console.log(`Listening on http://localhost:${server.port}`);

// //   if (queries && queries.q) {
// //   const output = db[name].filter(
// //     (item: { id: number } & { [key: string]: any }) =>
// //       item.title.includes(queries.q[0] as string)
// //   );
// //   return c.json(output);
// // }
