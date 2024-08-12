"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConfigurationError = void 0;
var _errorType = require("../../../utils/error-type.enum");
var CONSTANTS = _interopRequireWildcard(require("../../../constants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const buildUrl = page => `${CONSTANTS.DOCS}/${page}`;

/**
 * Error which is thrown when user messed up something in the configuration
 *
 * @category Errors
 */
class ConfigurationError extends Error {
  /**
   * @param   {string}  fnName  name of the function, base on which error will
   * print on the output link to the method documentation.
   * @param {string} message
   */
  constructor(message, fnName) {
    const msg = `
    ${message}
    More information can be found at: ${buildUrl(fnName)}
    `;
    super(msg);
    this.message = msg;
    this.name = _errorType.ErrorTypeEnum.Configuration;
  }
}
exports.ConfigurationError = ConfigurationError;
var _default = exports.default = ConfigurationError;