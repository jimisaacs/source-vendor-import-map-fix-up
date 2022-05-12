import { init } from "./src/server.ts";

const port = 8080;
const server = await init();
server.listen({ port });
console.log(`This server is up and running on http://localhost:${port}/`);
