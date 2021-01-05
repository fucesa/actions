import * as childProcess from "child_process";
import * as path from "path";

import * as core from "@actions/core";

// https://github.com/Saionaro/extract-package-version/blob/master/src/extract-version.js
function getVersion(): string {
  const workspace = process.env.GITHUB_WORKSPACE;

  let dir = core.getInput("path") || workspace;
  dir = path.resolve(dir as string);

  const packagePath = path.join(dir, "package.json");
  const pkg = require(packagePath);
  return pkg.version.toString();
}

function exec(command: string): Promise<string> {
  return new Promise((resolve, reject) =>
    childProcess.exec(command, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout.trim());
    })
  );
}

// https://stackoverflow.com/a/52171480/5239847
function hashString(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

function createNamespace(branchName: string) {
  const slug = branchName
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .substring(0, 10);

  return `${slug}-${hashString(branchName)}`;
}

const run = async (): Promise<void> => {
  try {
    console.log(core.getInput("release-branches"));
    const productionBranch = core.getInput("production-branch")?.trim();
    const releaseBranches = JSON.parse(
      core.getInput("release-branches")?.trim() ?? "[]"
    ) as String[];

    // https://github.com/nelonoel/branch-name/blob/master/index.js
    const branch =
      process.env.GITHUB_REF?.split("/").slice(2).join("/") ||
      (await exec("git rev-parse --abbrev-ref HEAD"));

    console.log("Production branch set to: ", productionBranch);
    console.log("Release branches set to: ", releaseBranches);

    let appVersion = "";
    if (productionBranch === branch) {
      //releaseBranches.includes(branch)
      appVersion = getVersion();
    } else {
      appVersion = await exec("git rev-parse --short HEAD");
    }

    let namespace = createNamespace(branch);
    if (releaseBranches.includes(branch)) {
      namespace = branch;
    }

    console.log("Version: ", appVersion);
    console.log("Branch: ", branch);

    core.setOutput("app-version", appVersion);
    core.setOutput("branch", branch);
    core.setOutput("namespace", namespace);
  } catch (error) {
    core.setFailed(`Debug-action failure: ${error}`);
  }
};

run();

export default run;