import { createServer } from "./index.ts";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const schema = z.object({
	name: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

const app = new Hono();

app.get("/", (c) => c.text("hono"));

app.get("/:name", zValidator("param", schema), (c) =>
	c.text(`Hello ${c.req.param("name")}`),
);

const server = Bun.serve({
	fetch: app.fetch,
});

console.log(`Listening on http://localhost:${server.port}`);
