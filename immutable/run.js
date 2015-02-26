if (typeof Proxy === "undefined" || typeof WeakMap === "undefined") {
  throw new Error("Run this script with `--harmony --harmony-proxies`");
}

var I = require("./");