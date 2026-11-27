import * as bootstrap from "https://v3-2-0--edge.netlify.com/bootstrap/index-combined.ts";

const functions = {}; const metadata = { functions: {} };


      try {
        const { default: func } = await import("file:///Users/jfritz/workspace/orbex-dashboard/netlify/edge-functions/gate.mjs");
        const handler = typeof func === "function" ? func : typeof func?.fetch === "function" ? func.fetch.bind(func) : func;

        if (typeof handler === "function") {
          functions["gate"] = handler;
          metadata.functions["gate"] = {"url":"file:///Users/jfritz/workspace/orbex-dashboard/netlify/edge-functions/gate.mjs"}
        } else {
          console.log("⬥ Failed to load Edge Function gate. The file does not seem to have a function, or an object with a `fetch` method, as the default export.");
        }
      } catch (error) {
        console.log("⬥ Failed to run Edge Function gate:");
        console.error(error);
      }
      

const boot = bootstrap.serve ?? bootstrap.boot;

boot(() => Promise.resolve(functions));