"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CurrencyInputWrapper = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CurrencyInputWrapper = props => {
  const {
    id,
    initial,
    onChange,
    options
  } = props;
  const [value, setValue] = (0, _react.useState)(initial);
  const onValueChange = currentValue => {
    setValue(currentValue);
    onChange(currentValue);
  };
  return /*#__PURE__*/_react.default.createElement(_designSystem.CurrencyInput, _extends({
    id: id,
    name: id,
    value: value,
    onValueChange: onValueChange
  }, options));
};
const OverridableCurrencyInputWrapper = exports.default = exports.CurrencyInputWrapper = (0, _allowOverride.default)(CurrencyInputWrapper, 'CurrencyPropertyInputWrapper');