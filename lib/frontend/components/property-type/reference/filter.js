"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Filter = props => {
  const {
    property,
    filter,
    onChange
  } = props;
  const [options, setOptions] = (0, _react.useState)([]);
  const api = new _apiClient.default();
  const handleChange = selected => {
    onChange(property.path, selected ? selected.value : '');
  };
  const loadOptions = async inputValue => {
    const records = await api.searchRecords({
      resourceId: property.reference,
      query: inputValue
    });
    const loadedOptions = records.map(r => ({
      value: r.id,
      label: r.title
    }));
    setOptions(loadedOptions);
    return loadedOptions;
  };
  const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path];
  const selected = (options || []).find(o => String(o.value) === String(value));
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_designSystem.SelectAsync, {
    variant: "filter",
    value: typeof selected === 'undefined' ? '' : selected,
    isClearable: true,
    cacheOptions: true,
    loadOptions: loadOptions,
    onChange: handleChange,
    defaultOptions: true
  }));
};
var _default = exports.default = (0, _allowOverride.default)(Filter, 'DefaultReferenceFilterProperty');