// 打包：cargo build --release → dist/any-kareokie-source-youtube-<版本>.zip（source.json、執行檔、README、TERMS、LICENSE）。
// 不簽章（見 README）。zip 用 PowerShell 的 Compress-Archive，不另外裝套件
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "source.json"), "utf8"));
const target = process.env.CARGO_TARGET_DIR ?? path.join(DIR, "target");
const cargo = process.platform === "win32" ? path.join(os.homedir(), ".cargo", "bin", "cargo.exe") : "cargo";

const b = spawnSync(cargo, ["build", "--release"], { cwd: DIR, stdio: "inherit", env: { ...process.env, CARGO_TARGET_DIR: target } });
if (b.status !== 0) process.exit(1);

const stage = path.join(DIR, "dist", "stage");
fs.rmSync(stage, { recursive: true, force: true });
fs.mkdirSync(stage, { recursive: true });
fs.copyFileSync(path.join(target, "release", "source-youtube.exe"), path.join(stage, manifest.exec));
for (const f of ["source.json", "README.md", "TERMS.md", "LICENSE"]) fs.copyFileSync(path.join(DIR, f), path.join(stage, f));

const zip = path.join(DIR, "dist", `any-kareokie-source-youtube-${manifest.version}.zip`);
fs.rmSync(zip, { force: true });
const z = spawnSync("powershell", ["-NoProfile", "-Command", `Compress-Archive -Path '${stage}\\*' -DestinationPath '${zip}'`], { stdio: "inherit" });
if (z.status !== 0) process.exit(1);
fs.rmSync(stage, { recursive: true, force: true });
console.log(`已打包：${zip}`);
