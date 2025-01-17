"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireDefault(require("react"));
var _xss = _interopRequireDefault(require("xss"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Show = props => {
  const {
    property,
    record
  } = props;
  const value = record.params[property.path] || '';
  const createMarkup = html => ({
    __html: (0, _xss.default)(html)
  });
  return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
    label: property.label
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    py: "xl",
    px: ['0', 'xl'],
    border: "default"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    dangerouslySetInnerHTML: createMarkup(value)
  })));
};
var _default = exports.default = (0, _allowOverride.default)(Show, 'DefaultRichtextShowProperty');