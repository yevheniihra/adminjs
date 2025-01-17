"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PropertyHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _sortLink = _interopRequireDefault(require("../sort-link"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PropertyHeader = props => {
  const {
    property,
    titleProperty,
    display
  } = props;
  const isMain = property.propertyPath === titleProperty.propertyPath;
  return /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    className: isMain ? 'main' : undefined,
    display: display
  }, property.isSortable ? /*#__PURE__*/_react.default.createElement(_sortLink.default, props) : property.label);
};
const OverridablePropertyHeader = exports.PropertyHeader = exports.default = (0, _allowOverride.default)(PropertyHeader, 'PropertyHeader');