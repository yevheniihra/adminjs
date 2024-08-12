"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotFoundError = void 0;
var _errorType = require("../../../utils/error-type.enum");
var CONSTANTS = _interopRequireWildcard(require("../../../constants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const buildUrl = page => `${CONSTANTS.DOCS}/${page}`;

/**
 * Error which is thrown when given record/resource/action hasn't been found.
 *
 * @category Errors
 */
class NotFoundError extends Error {
  /**
   * HTTP Status code: 404
   */

  /**
   * Base error message and type which is stored in the record
   */

  /**
   * Any custom message which should be seen in the UI
   */

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
    this.statusCode = 404;
    this.baseMessage = message;
    this.baseError = {
      message,
      type: _errorType.ErrorTypeEnum.NotFound
    };
    this.message = msg;
    this.name = _errorType.ErrorTypeEnum.NotFound;
  }
}
exports.NotFoundError = NotFoundError;
var _default = exports.default = NotFoundError;