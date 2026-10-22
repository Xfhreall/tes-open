const { spawnSync, spawn } = require("child_process");
const { existsSync } = require("fs");

console.log("[server.js] cwd", process.cwd(), "node", process.version);
process.chdir(__dirname);

if (!existsSync(".next/BUILD_ID")) {
  const r = spawnSync("npx", ["next", "build"], { stdio: "inherit" });
  console.log("[server.js] build exit", r.status, r.signal, r.error);
  if (r.status !== 0) process.exit(1);
}
const p = spawn("npx", ["next", "start", "-H", "0.0.0.0", "-p", process.env.PORT || "3000"], { stdio: "inherit" });
p.on("exit", (c, s) => { console.log("[server.js] next start exit", c, s); process.exit(c ?? 1); });
