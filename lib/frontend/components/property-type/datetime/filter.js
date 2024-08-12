"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var BackendFilter = _interopRequireWildcard(require("../../../../backend/utils/filter/filter"));
var _useTranslation = require("../../../hooks/use-translation");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PARAM_SEPARATOR
} = BackendFilter;
const Filter = props => {
  const {
    property,
    filter,
    onChange
  } = props;
  const {
    translateProperty
  } = (0, _useTranslation.useTranslation)();
  const fromKey = `${property.path}${PARAM_SEPARATOR}from`;
  const toKey = `${property.path}${PARAM_SEPARATOR}to`;
  const fromValue = filter[fromKey];
  const toValue = filter[toKey];
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    variant: "filter"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, `- ${translateProperty('from')}: `), /*#__PURE__*/_react.default.createElement(_designSystem.DatePicker, {
    value: fromValue,
    onChange: date => onChange(fromKey, date),
    propertyType: property.type
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    mt: "default"
  }, `- ${translateProperty('to')}: `), /*#__PURE__*/_react.default.createElement(_designSystem.DatePicker, {
    value: toValue,
    onChange: date => onChange(toKey, date),
    propertyType: property.type
  }));
};
var _default = exports.default = (0, _allowOverride.default)(Filter, 'DefaultDatetimeFilterProperty');