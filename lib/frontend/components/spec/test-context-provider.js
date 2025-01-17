"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _server = require("react-router-dom/server");
var _styledComponents = require("styled-components");
var _designSystem = require("@adminjs/design-system");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const theme = (0, _designSystem.combineStyles)({});
const TestContextProvider = props => {
  const {
    children,
    location
  } = props;
  return /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_server.StaticRouter, {
    location: location || '/'
  }, children));
};
var _default = exports.default = TestContextProvider;