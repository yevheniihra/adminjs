"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _reactRedux = require("react-redux");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SidebarFooter = () => {
  const branding = (0, _reactRedux.useSelector)(state => state.branding);
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: "lg",
    mb: "md",
    "data-css": "sidebar-footer"
  }, branding.withMadeWithLove && /*#__PURE__*/_react.default.createElement(_designSystem.MadeWithLove, null));
};
var _default = exports.default = (0, _allowOverride.default)(SidebarFooter, 'SidebarFooter');