import { Application, Router } from "oak";
import { ssr } from "./ssr.tsx";

export function init() {
  const ssrRouter = new Router().get("/", (context) => {
    context.response.body = ssr();
  });

  const router = new Router()
    .get("/", (context) => {
      context.response.body = "Hello, World!\n";
    })
    .use("/ssr", ssrRouter.routes(), ssrRouter.allowedMethods());

  return new Application().use(router.routes(), router.allowedMethods());
}
