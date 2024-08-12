"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _recordPropertyIsEqual = require("../record-property-is-equal");
var _propertyLabel = require("../utils/property-label");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Edit = props => {
  var _record$params;
  const {
    property,
    record,
    onChange
  } = props;
  const value = (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.path];
  const error = record.errors && record.errors[property.path];
  const handleUpdate = (0, _react.useCallback)(newValue => {
    onChange(property.path, newValue);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.RichTextEditor, {
    value: value,
    onChange: handleUpdate,
    options: property.props
  }), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
};
var _default = exports.default = (0, _allowOverride.default)( /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual), 'DefaultRichtextEditProperty');