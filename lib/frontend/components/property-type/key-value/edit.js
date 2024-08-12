"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _propertyLabel = require("../utils/property-label");
var _flat = require("../../../../utils/flat");
var _useTranslation = require("../../../hooks/use-translation");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const EditKeyValuePair = props => {
  var _property$props, _property$props2;
  const {
    onKeyChange,
    onValueChange,
    onRemoveItem,
    property,
    objectValue,
    objectKey,
    error
  } = props;
  const {
    tm
  } = (0, _useTranslation.useTranslation)();
  const [currentValue, setValue] = (0, _react.useState)(objectValue ?? '');
  const [currentKey, setKey] = (0, _react.useState)(objectKey ?? '');
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    mb: "lg"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    justifyContent: "space-between",
    flexGrow: 1,
    flexShrink: 0
  }, /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error),
    mr: "lg",
    mb: "0px"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Input, _extends({
    placeholder: tm('keyPlaceholder'),
    onChange: e => setKey(e.target.value),
    onBlur: () => onKeyChange(objectKey, currentKey),
    onKeyDown: e => e.keyCode === 13 && onKeyChange(objectKey, currentKey),
    value: currentKey
  }, ((_property$props = property.props) === null || _property$props === void 0 ? void 0 : _property$props.keyInputProps) ?? {})), error && /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error.message)), /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    mb: "0px"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Input, _extends({
    placeholder: tm('valuePlaceholder'),
    onChange: e => setValue(e.target.value),
    onBlur: () => onValueChange(currentKey, currentValue),
    onKeyDown: e => e.keyCode === 13 && onValueChange(currentKey, currentValue),
    value: currentValue,
    disabled: !objectKey
  }, ((_property$props2 = property.props) === null || _property$props2 === void 0 ? void 0 : _property$props2.valueInputProps) ?? {})))), /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    rounded: true,
    ml: "sm",
    "data-testid": "delete-item",
    type: "button",
    size: "icon",
    onClick: () => onRemoveItem(currentKey),
    variant: "danger",
    flexGrow: 0,
    flexShrink: 1
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "TrashCan"
  })));
};
const Edit = props => {
  const {
    property,
    record,
    onChange,
    resource
  } = props;
  const {
    tm,
    tb
  } = (0, _useTranslation.useTranslation)();
  const [objectValue, setObjectValue] = (0, _react.useState)(_flat.flat.get(record.params, property.path) ?? {});
  const handleKeyChange = (oldKey, newKey) => {
    if (oldKey === newKey) return;
    const tmpValue = objectValue[oldKey];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      [oldKey]: _removedKey,
      ...objectCopy
    } = objectValue;
    objectCopy[newKey] = tmpValue ?? '';
    setObjectValue(parseObjectValue(objectCopy));
  };
  const handleValueChange = (key, value) => {
    objectValue[key] = value;
    setObjectValue(parseObjectValue({
      ...objectValue
    }));
  };
  const parseObjectValue = obj => Object.entries(obj).reduce((memo, [k, v]) => {
    if (!k || !k.length) return memo;
    memo[k] = v;
    return memo;
  }, {});

  /**
   * This is used to prevent empty/duplicate keys from being added to JSON
   */
  const getNextKey = previousId => {
    const nextId = previousId ? previousId + 1 : Object.keys(objectValue ?? {}).length + 1;
    const nextKey = `${tm('initialKey', resource.id, {
      number: nextId
    })}`;
    if (objectValue[nextKey] !== undefined) {
      return getNextKey(nextId);
    }
    return nextKey;
  };
  const addNewKeyValuePair = event => {
    event.preventDefault();
    const key = getNextKey();
    objectValue[key] = '';
    setObjectValue(parseObjectValue({
      ...objectValue
    }));
  };
  const handleRemoveItem = key => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      [key]: _removedKey,
      ...objectCopy
    } = objectValue;
    setObjectValue(parseObjectValue(objectCopy));
  };
  (0, _react.useEffect)(() => {
    onChange(property.path, objectValue);
  }, [objectValue]);
  const error = record.errors && record.errors[property.path];
  if (property.description === undefined) {
    property.description = tm('keyValuePropertyDefaultDescription', resource.id);
  }
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: !!error
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Section, property.props, Object.entries(objectValue).map(([key, value]) => /*#__PURE__*/_react.default.createElement(EditKeyValuePair, {
    key: key,
    property: property,
    objectValue: value,
    objectKey: key,
    onKeyChange: handleKeyChange,
    onValueChange: handleValueChange,
    onRemoveItem: handleRemoveItem,
    error: record.errors[`${property.path}${_flat.flat.DELIMITER}${key}`]
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    mt: "lg",
    variant: "primary",
    onClick: addNewKeyValuePair
  }, tb('addNewItem', resource.id))), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};
var _default = exports.default = Edit;