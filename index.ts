import { Hono } from "hono";
import { z } from "zod";

interface Resource {
	name: string;
	type: string;
	label: string;
}

interface DB {
	data: Record<string, unknown>;
}

const getResources = (db: DB) => {
	return Object.entries(db.data).map(([name, value]) => {
		const type = Array.isArray(value) ? "plural" : "singular";
		const label =
			type === "singular" ? "object" : `${(value as Array<unknown>).length}x`;
		return { name, type, label };
	});
};

const validate = (db: DB) => {
	if (!("data" in db)) {
		return false;
	}
	return z.object({}).safeParse(db.data).success;
};

const checkResource = (resource: string, resources: Resource[]) => {
	return resources.some((r) => r.name === resource);
};

export async function createServer(db: DB) {
	const app = new Hono();

	// Make sure our db contains "data"
	if (!validate(db)) {
		app.get("/", (c) => c.text("Wrong data shape"));
		return app;
	}

	// Extract information about the resources in the db
	const resources = getResources(db);

	// Get / => returns home
	app.get("/", (c) => c.text("homepage"));

	// GET /db => returns all db data
	app.get("/db", (c) => c.json(db.data));

	// GET /:resource => if :resource is valid, returns db.data[resource]
	app.get("/:resource", (c) => {
		const { resource } = c.req.param();

		if (!checkResource(resource, resources)) {
			return c.text(`The requested resource (${resource}) is not available`);
		}

		return c.json(db.data[resource]);
	});
	return app;
}
