"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;
exports.outPath = void 0;
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
var util = _interopRequireWildcard(require("util"));
var _bundler = _interopRequireDefault(require("./bundler"));
var _generateUserComponentEntry = _interopRequireDefault(require("./generate-user-component-entry"));
var _constants = require("../../constants");
var _bundlerEnv = _interopRequireDefault(require("./bundler-env"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const entryPath = path.join(_constants.ADMIN_JS_TMP_DIR, '.entry.js');
const outPath = exports.outPath = path.join(_constants.ADMIN_JS_TMP_DIR, 'bundle.js');
async function build(admin, {
  write = false,
  watch = false
} = {}) {
  const {
    options: {
      bundler: bundlerOptions
    }
  } = admin;
  const entryFile = (0, _generateUserComponentEntry.default)(admin, _constants.ADMIN_JS_TMP_DIR);
  try {
    await util.promisify(fs.mkdir)(_constants.ADMIN_JS_TMP_DIR, {
      recursive: true
    });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  // if components bundle was requested and there are already bundled - return
  // that instead of bundling them again
  if (!write) {
    try {
      const existingBundle = await util.promisify(fs.readFile)(outPath, 'utf-8');
      return existingBundle;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
  await util.promisify(fs.writeFile)(entryPath, entryFile);
  const output = await (0, _bundler.default)({
    name: 'AdminJSCustom',
    input: entryPath,
    watch,
    file: write ? outPath : null,
    minify: _bundlerEnv.default === 'production',
    ...bundlerOptions
  });
  let jsOutput = output.code;
  if (output.map) {
    jsOutput += `
//# sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(JSON.stringify(output.map)).toString('base64')}
    `;
  }
  return jsOutput;
}