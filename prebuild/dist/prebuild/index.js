module.exports=function(e,t){"use strict";var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var r=n[t]={i:t,l:false,exports:{}};var o=true;try{e[t].call(r.exports,r,r.exports,__webpack_require__);o=false}finally{if(o)delete n[t]}r.l=true;return r.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(993)}t(__webpack_require__);return startup()}({82:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue},87:function(e){e.exports=require("os")},102:function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(n(747));const s=r(n(87));const i=n(82);function issueCommand(e,t){const n=process.env[`GITHUB_${e}`];if(!n){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!o.existsSync(n)){throw new Error(`Missing file at path: ${n}`)}o.appendFileSync(n,`${i.toCommandValue(t)}${s.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},129:function(e){e.exports=require("child_process")},431:function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(n(87));const s=n(82);function issueCommand(e,t,n){const r=new Command(e,t,n);process.stdout.write(r.toString()+o.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const i="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=i+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const r=this.properties[n];if(r){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(r)}`}}}}e+=`${i}${escapeData(this.message)}`;return e}}function escapeData(e){return s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},470:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(431);const i=n(102);const u=n(82);const a=o(n(87));const c=o(n(622));var p;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(p=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const n=u.toCommandValue(t);process.env[e]=n;const r=process.env["GITHUB_ENV"]||"";if(r){const t="_GitHubActionsFileCommandDelimeter_";const r=`${e}<<${t}${a.EOL}${n}${a.EOL}${t}`;i.issueCommand("ENV",r)}else{s.issueCommand("set-env",{name:e},n)}}t.exportVariable=exportVariable;function setSecret(e){s.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){i.issueCommand("PATH",e)}else{s.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${c.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}return n.trim()}t.getInput=getInput;function setOutput(e,t){s.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){s.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=p.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){s.issueCommand("debug",{},e)}t.debug=debug;function error(e){s.issue("error",e instanceof Error?e.toString():e)}t.error=error;function warning(e){s.issue("warning",e instanceof Error?e.toString():e)}t.warning=warning;function info(e){process.stdout.write(e+a.EOL)}t.info=info;function startGroup(e){s.issue("group",e)}t.startGroup=startGroup;function endGroup(){s.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return r(this,void 0,void 0,function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n})}t.group=group;function saveState(e,t){s.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},622:function(e){e.exports=require("path")},747:function(e){e.exports=require("fs")},875:function(e){function webpackEmptyContext(e){if(typeof e==="number"&&__webpack_require__.m[e])return __webpack_require__(e);try{return require(e)}catch(t){if(t.code!=="MODULE_NOT_FOUND")throw t}var t=new Error("Cannot find module '"+e+"'");t.code="MODULE_NOT_FOUND";throw t}webpackEmptyContext.keys=function(){return[]};webpackEmptyContext.resolve=webpackEmptyContext;e.exports=webpackEmptyContext;webpackEmptyContext.id=875},993:function(e,t,n){"use strict";n.r(t);var r=n(129);var o=n.n(r);var s=n(622);var i=n.n(s);var u=n(470);var a=n.n(u);function getVersion(){const e=process.env.GITHUB_WORKSPACE;let t=u.getInput("path")||e;t=s.resolve(t);const r=s.join(t,"package.json");const o=n(875)(r);return o.version.toString()}function exec(e){return new Promise((t,n)=>r.exec(e,(e,r)=>{if(e)n(e);t(r.trim())}))}function hashString(e,t=0){let n=3735928559^t,r=1103547991^t;for(let t=0,o;t<e.length;t++){o=e.charCodeAt(t);n=Math.imul(n^o,2654435761);r=Math.imul(r^o,1597334677)}n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909);r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909);return(4294967296*(2097151&r)+(n>>>0)).toString(36)}function createNamespace(e){const t=e.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"").substring(0,10);return`${t}-${hashString(e)}`}const c=async()=>{var e,t,n,r;try{const o=(e=u.getInput("production-branch"))===null||e===void 0?void 0:e.trim();const s=JSON.parse((n=(t=u.getInput("release-branches"))===null||t===void 0?void 0:t.trim())!==null&&n!==void 0?n:"[]");const i=((r=process.env.GITHUB_REF)===null||r===void 0?void 0:r.split("/").slice(2).join("/"))||await exec("git rev-parse --abbrev-ref HEAD");console.log("Production branch set to: ",o);console.log("Release branches set to: ",s);let a="";if(o===i){a=getVersion()}else{a=await exec("git rev-parse --short HEAD")}let c=createNamespace(i);if(s.includes(i)){c=i}console.log("Version: ",a);console.log("Branch: ",i);console.log("Namespace: ",c);u.setOutput("app-version",a);u.setOutput("branch",i);u.setOutput("namespace",c)}catch(e){u.setFailed(`Debug-action failure: ${e}`)}};c();t["default"]=c}},function(e){"use strict";!function(){e.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})}}();!function(){e.n=function(t){var n=t&&t.__esModule?function getDefault(){return t["default"]}:function getModuleExports(){return t};e.d(n,"a",n);return n}}();!function(){var t=Object.prototype.hasOwnProperty;e.d=function(e,n,r){if(!t.call(e,n)){Object.defineProperty(e,n,{enumerable:true,get:r})}}}()});