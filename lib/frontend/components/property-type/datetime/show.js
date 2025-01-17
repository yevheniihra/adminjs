"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
var _mapValue = _interopRequireDefault(require("./map-value"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Show = props => {
  const {
    property,
    record
  } = props;
  const value = (0, _mapValue.default)(record.params[property.path], property.type);
  return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
    label: property.label
  }, value);
};
var _default = exports.default = (0, _allowOverride.default)(Show, 'DefaultDatetimeShowProperty');