import * as childProcess from "child_process";

import * as core from "@actions/core";
import * as findup from "findup-sync";

var packageJson = require(findup("package.json") as string);

const { version } = require(packageJson);

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
