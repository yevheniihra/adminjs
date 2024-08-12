"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ErrorTypeEnum = void 0;
// eslint-disable-next-line no-shadow
let ErrorTypeEnum = exports.ErrorTypeEnum = /*#__PURE__*/function (ErrorTypeEnum) {
  ErrorTypeEnum["App"] = "AppError";
  ErrorTypeEnum["Configuration"] = "ConfigurationError";
  ErrorTypeEnum["Forbidden"] = "ForbiddenError";
  ErrorTypeEnum["NotFound"] = "NotFoundError";
  ErrorTypeEnum["NotImplemented"] = "NotImplementedError";
  ErrorTypeEnum["Record"] = "RecordError";
  ErrorTypeEnum["Validation"] = "ValidationError";
  return ErrorTypeEnum;
}({});
var _default = exports.default = ErrorTypeEnum;