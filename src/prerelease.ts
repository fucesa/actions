import * as childProcess from "child_process";
import * as path from "path";

const packageJson =
  path.dirname(require.resolve("package-name")) + "/package.json";
const { version } = require(packageJson);

import * as core from "@actions/core";
// import * as github from '@actions/github'

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
    const releaseBranch = core.getInput("release-branch");

    const branch = await exec("git rev-parse --abbrev-ref HEAD");

    console.log("Release branch set to: ", releaseBranch);

    let appVersion = "";
    if (branch === releaseBranch) {
      appVersion = version;
    } else {
      appVersion = await exec("git rev-parse --short HEAD");
    }

    console.log("Version: ", appVersion);
    console.log("Branch: ", branch);

    core.setOutput("app-version", appVersion);
    core.setOutput("branch", branch);
  } catch (error) {
    core.setFailed(`Debug-action failure: ${error}`);
  }
};

run();

export default run;
