import { defineConfig } from "orval";
import "dotenv/config";

export default defineConfig({
  rc: {
    output: {
      target: "./src/lib/api/rc-generated/index.ts",
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/lib/api/axios-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: `${process.env.NEXT_PUBLIC_API_URL}/swagger.json`,
      filters: {
        mode: "exclude",
        tags: ["default"],
      },
    },
  },
  fetch: {
    input: `${process.env.NEXT_PUBLIC_API_URL}/swagger.json`,
    output: {
      target: "./src/app/_lib/api/fetch-generated/index.ts",
      client: "fetch",
      override: {
        mutator: {
          path: "./src/app/_lib/fetch.ts",
          name: "customFetch",
        },
      },
    },
  },
});
