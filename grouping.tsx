/** @jsx jsx */
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { FC } from "hono/jsx";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import titleize from "titleize";
import { jwt } from "hono/jwt";

const app = new Hono();

app.use(
	"/auth/*",
	jwt({
		secret: "it-is-very-secret",
	}),
);

app.get("/auth/page", (c) => {
	return c.text("You are authorized");
});

// app.get(
//   "/page/*",
//   jsxRenderer(({ children }) => {
//     return (
//       <html>
//         <body>
//           <header>Menu</header>
//           <div>{children}</div>
//         </body>
//       </html>
//     );
//   })
// );

// const RequestUrlBadge: FC = () => {
//   const c = useRequestContext();
//   return <b>{c.req.url}</b>;
// };

// app.get("/page/info", (c) => {
//   return c.render(
//     <div>
//       You are accessing: <RequestUrlBadge />
//     </div>
//   );
// });

// app.get("/page/:header", (c) => {
//   return c.render(<h1>{titleize(c.req.param("header"))}</h1>);
// });

// app.get("/", (c) => c.text("hi"));

Bun.serve({
	fetch: app.fetch,
});

console.log(showRoutes(app));
