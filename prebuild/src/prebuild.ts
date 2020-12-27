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

const run = async (): Promise<void> => {
  try {
    const releaseBranch = core.getInput("release-branch")?.trim();

    // https://github.com/nelonoel/branch-name/blob/master/index.js
    const branch =
      process.env.GITHUB_REF?.split("/").slice(2).join("/") ||
      (await exec("git rev-parse --abbrev-ref HEAD"));

    console.log("Release branch set to: ", releaseBranch);

    let appVersion = "";
    if (branch === releaseBranch) {
      appVersion = getVersion();
    } else {
      appVersion = await exec("git rev-parse --short HEAD");
    }

    console.log("Version: ", appVersion);
    console.log("Branch: ", branch);

    core.setOutput("app-version", appVersion);
    core.exportVariable("APP_VERSION", appVersion);

    core.setOutput("branch", branch);
    core.exportVariable("BRANCH_NAME", branch);
  } catch (error) {
    core.setFailed(`Debug-action failure: ${error}`);
  }
};

run();

export default run;
