module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(739);
/******/ 	};
/******/ 	// initialize runtime
/******/ 	runtime(__webpack_require__);
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 82:
/***/ (function(__unusedmodule, exports) {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 102:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 129:
/***/ (function(module) {

module.exports = require("child_process");

/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const file_command_1 = __webpack_require__(102);
const utils_1 = __webpack_require__(82);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 739:
/***/ (function(__unusedmodule, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(129);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(622);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(470);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_2__);



// https://github.com/Saionaro/extract-package-version/blob/master/src/extract-version.js
function getVersion() {
    const workspace = process.env.GITHUB_WORKSPACE;
    let dir = _actions_core__WEBPACK_IMPORTED_MODULE_2__.getInput("path") || workspace;
    dir = path__WEBPACK_IMPORTED_MODULE_1__.resolve(dir);
    const packagePath = path__WEBPACK_IMPORTED_MODULE_1__.join(dir, "package.json");
    const pkg = __webpack_require__(875)(packagePath);
    return pkg.version.toString();
}
function exec(command) {
    return new Promise((resolve, reject) => child_process__WEBPACK_IMPORTED_MODULE_0__.exec(command, (error, stdout) => {
        if (error)
            reject(error);
        resolve(stdout.trim());
    }));
}
const run = async () => {
    var _a;
    try {
        const releaseBranch = _actions_core__WEBPACK_IMPORTED_MODULE_2__.getInput("release-branch");
        // https://github.com/nelonoel/branch-name/blob/master/index.js
        const branch = ((_a = process.env.GITHUB_REF) === null || _a === void 0 ? void 0 : _a.split("/").slice(2).join("/")) ||
            (await exec("git rev-parse --abbrev-ref HEAD"));
        console.log("Release branch set to: ", releaseBranch);
        let appVersion = "";
        if (branch === releaseBranch) {
            appVersion = getVersion();
        }
        else {
            appVersion = await exec("git rev-parse --short HEAD");
        }
        console.log("Version: ", appVersion);
        console.log("Branch: ", branch);
        _actions_core__WEBPACK_IMPORTED_MODULE_2__.setOutput("app-version", appVersion);
        _actions_core__WEBPACK_IMPORTED_MODULE_2__.exportVariable("APP_VERSION", appVersion);
        _actions_core__WEBPACK_IMPORTED_MODULE_2__.setOutput("branch", branch);
        _actions_core__WEBPACK_IMPORTED_MODULE_2__.exportVariable("BRANCH_NAME", branch);
    }
    catch (error) {
        _actions_core__WEBPACK_IMPORTED_MODULE_2__.setFailed(`Debug-action failure: ${error}`);
    }
};
run();
/* harmony default export */ __webpack_exports__["default"] = (run);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzIjpbInQtcHJlcmVsZWFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEtBQUssSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUV0Qyx5RkFBeUY7QUFDekYsU0FBUyxVQUFVO0lBQ2pCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFFL0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDN0MsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBYSxDQUFDLENBQUM7SUFFbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbkQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxJQUFJLENBQUMsT0FBZTtJQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQ3JDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzNDLElBQUksS0FBSztZQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLEdBQUcsR0FBRyxLQUFLLElBQW1CLEVBQUU7O0lBQ3BDLElBQUk7UUFDRixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEQsK0RBQStEO1FBQy9ELE1BQU0sTUFBTSxHQUNWLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLDBDQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNwRCxDQUFDLE1BQU0sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztRQUVsRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXRELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLE1BQU0sS0FBSyxhQUFhLEVBQUU7WUFDNUIsVUFBVSxHQUFHLFVBQVUsRUFBRSxDQUFDO1NBQzNCO2FBQU07WUFDTCxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUN2RDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzVDO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsR0FBRyxFQUFFLENBQUM7QUFFTixlQUFlLEdBQUcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNoaWxkUHJvY2VzcyBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9TYWlvbmFyby9leHRyYWN0LXBhY2thZ2UtdmVyc2lvbi9ibG9iL21hc3Rlci9zcmMvZXh0cmFjdC12ZXJzaW9uLmpzXG5mdW5jdGlvbiBnZXRWZXJzaW9uKCk6IHN0cmluZyB7XG4gIGNvbnN0IHdvcmtzcGFjZSA9IHByb2Nlc3MuZW52LkdJVEhVQl9XT1JLU1BBQ0U7XG5cbiAgbGV0IGRpciA9IGNvcmUuZ2V0SW5wdXQoXCJwYXRoXCIpIHx8IHdvcmtzcGFjZTtcbiAgZGlyID0gcGF0aC5yZXNvbHZlKGRpciBhcyBzdHJpbmcpO1xuXG4gIGNvbnN0IHBhY2thZ2VQYXRoID0gcGF0aC5qb2luKGRpciwgXCJwYWNrYWdlLmpzb25cIik7XG4gIGNvbnN0IHBrZyA9IHJlcXVpcmUocGFja2FnZVBhdGgpO1xuICByZXR1cm4gcGtnLnZlcnNpb24udG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gZXhlYyhjb21tYW5kOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICBjaGlsZFByb2Nlc3MuZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuICAgICAgcmVzb2x2ZShzdGRvdXQudHJpbSgpKTtcbiAgICB9KVxuICApO1xufVxuXG5jb25zdCBydW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVsZWFzZUJyYW5jaCA9IGNvcmUuZ2V0SW5wdXQoXCJyZWxlYXNlLWJyYW5jaFwiKTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZWxvbm9lbC9icmFuY2gtbmFtZS9ibG9iL21hc3Rlci9pbmRleC5qc1xuICAgIGNvbnN0IGJyYW5jaCA9XG4gICAgICBwcm9jZXNzLmVudi5HSVRIVUJfUkVGPy5zcGxpdChcIi9cIikuc2xpY2UoMikuam9pbihcIi9cIikgfHxcbiAgICAgIChhd2FpdCBleGVjKFwiZ2l0IHJldi1wYXJzZSAtLWFiYnJldi1yZWYgSEVBRFwiKSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlJlbGVhc2UgYnJhbmNoIHNldCB0bzogXCIsIHJlbGVhc2VCcmFuY2gpO1xuXG4gICAgbGV0IGFwcFZlcnNpb24gPSBcIlwiO1xuICAgIGlmIChicmFuY2ggPT09IHJlbGVhc2VCcmFuY2gpIHtcbiAgICAgIGFwcFZlcnNpb24gPSBnZXRWZXJzaW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcFZlcnNpb24gPSBhd2FpdCBleGVjKFwiZ2l0IHJldi1wYXJzZSAtLXNob3J0IEhFQURcIik7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJWZXJzaW9uOiBcIiwgYXBwVmVyc2lvbik7XG4gICAgY29uc29sZS5sb2coXCJCcmFuY2g6IFwiLCBicmFuY2gpO1xuXG4gICAgY29yZS5zZXRPdXRwdXQoXCJhcHAtdmVyc2lvblwiLCBhcHBWZXJzaW9uKTtcbiAgICBjb3JlLmV4cG9ydFZhcmlhYmxlKFwiQVBQX1ZFUlNJT05cIiwgYXBwVmVyc2lvbik7XG5cbiAgICBjb3JlLnNldE91dHB1dChcImJyYW5jaFwiLCBicmFuY2gpO1xuICAgIGNvcmUuZXhwb3J0VmFyaWFibGUoXCJCUkFOQ0hfTkFNRVwiLCBicmFuY2gpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvcmUuc2V0RmFpbGVkKGBEZWJ1Zy1hY3Rpb24gZmFpbHVyZTogJHtlcnJvcn1gKTtcbiAgfVxufTtcblxucnVuKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bjtcbiJdfQ==

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 875:
/***/ (function(module) {

function webpackEmptyContext(req) {
	if (typeof req === 'number' && __webpack_require__.m[req])
  return __webpack_require__(req);
try { return require(req) }
catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e }
var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 875;

/***/ })

/******/ },
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function getDefault() { return module['default']; } :
/******/ 				function getModuleExports() { return module; };
/******/ 			__webpack_require__.d(getter, 'a', getter);
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getter */
/******/ 	!function() {
/******/ 		// define getter function for harmony exports
/******/ 		var hasOwnProperty = Object.prototype.hasOwnProperty;
/******/ 		__webpack_require__.d = function(exports, name, getter) {
/******/ 			if(!hasOwnProperty.call(exports, name)) {
/******/ 				Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ }
);