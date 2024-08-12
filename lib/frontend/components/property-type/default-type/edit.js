"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _recordPropertyIsEqual = require("../record-property-is-equal");
var _propertyLabel = require("../utils/property-label");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/explicit-function-return-type */
const Edit = props => {
  var _record$errors;
  const {
    property,
    record
  } = props;
  const error = (_record$errors = record.errors) === null || _record$errors === void 0 ? void 0 : _record$errors[property.path];
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), property.availableValues ? /*#__PURE__*/_react.default.createElement(SelectEdit, props) : /*#__PURE__*/_react.default.createElement(TextEdit, props), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};
const SelectEdit = props => {
  var _record$params;
  const {
    record,
    property,
    onChange
  } = props;
  if (!property.availableValues) {
    return null;
  }
  const propValue = ((_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.path]) ?? '';
  const selected = property.availableValues.find(av => av.value === propValue);
  return /*#__PURE__*/_react.default.createElement(_designSystem.Select, _extends({
    value: selected,
    options: property.availableValues,
    onChange: s => onChange(property.path, (s === null || s === void 0 ? void 0 : s.value) ?? ''),
    isDisabled: property.isDisabled
  }, property.props));
};
const TextEdit = props => {
  var _record$params2;
  const {
    property,
    record,
    onChange
  } = props;
  const propValue = ((_record$params2 = record.params) === null || _record$params2 === void 0 ? void 0 : _record$params2[property.path]) ?? '';
  const [value, setValue] = (0, _react.useState)(propValue);
  (0, _react.useEffect)(() => {
    if (value !== propValue) {
      setValue(propValue);
    }
  }, [propValue]);
  return /*#__PURE__*/_react.default.createElement(_designSystem.Input, _extends({
    id: property.path,
    name: property.path,
    required: property.isRequired,
    onChange: e => setValue(e.target.value),
    onBlur: () => onChange(property.path, value)
    // handle clicking ENTER
    ,
    onKeyDown: e => e.keyCode === 13 && onChange(property.path, value),
    value: value,
    disabled: property.isDisabled
  }, property.props));
};
var _default = exports.default = (0, _allowOverride.default)( /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual), 'DefaultEditProperty');