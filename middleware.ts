import { Hono, MiddlewareHandler } from "hono";

const app = new Hono();

export const middleware: MiddlewareHandler = async (c, next) => {
  console.log("middleware");
  await next();
};

const router = new Hono();

router.get("/", async (c) => c.text("b"));

app.get("/", async (c) => {
  console.log("root route");
  return c.text("root");
});

app.route("/b", router);

app.get("/a", async (c) => {
  console.log("a route");
  return c.text("a");
});

export default app;
