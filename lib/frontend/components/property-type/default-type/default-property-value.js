"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DefaultPropertyValue = props => {
  const {
    property,
    record
  } = props;
  const rawValue = record === null || record === void 0 ? void 0 : record.params[property.path];
  if (typeof rawValue === 'undefined') {
    return null;
  }
  if (property.availableValues) {
    const option = property.availableValues.find(opt => opt.value === rawValue);
    if (!option) {
      return rawValue;
    }
    return /*#__PURE__*/_react.default.createElement(_designSystem.Badge, null, (option === null || option === void 0 ? void 0 : option.label) || rawValue);
  }
  return rawValue;
};
var _default = exports.default = (0, _allowOverride.default)(DefaultPropertyValue, 'DefaultPropertyValue');