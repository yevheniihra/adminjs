"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LayoutElementRenderer = void 0;
var _react = _interopRequireDefault(require("react"));
var DesignSystem = _interopRequireWildcard(require("@adminjs/design-system"));
var _propertyType = _interopRequireDefault(require("../../property-type"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LayoutElementRenderer = props => {
  const {
    layoutElement,
    resource,
    where,
    record,
    onChange
  } = props;
  const {
    props: layoutProps,
    properties: propertyNames,
    layoutElements: innerLayoutElements,
    component
  } = layoutElement;
  const {
    children,
    ...other
  } = layoutProps;
  const properties = propertyNames.map(name => resource.properties[name]);
  const Component = DesignSystem[component];
  if (!Component) {
    return /*#__PURE__*/_react.default.createElement(DesignSystem.MessageBox, {
      size: "sm",
      message: "Javascript Error",
      variant: "danger",
      py: "xl"
    }, "There is no component by the name of", /*#__PURE__*/_react.default.createElement(DesignSystem.Badge, {
      size: "sm",
      variant: "danger",
      mx: "default"
    }, component), "in @adminjs/design-system. Change", /*#__PURE__*/_react.default.createElement(DesignSystem.Badge, {
      size: "sm",
      variant: "danger",
      mx: "default"
    }, `@${component}`), "to available component like @Header");
  }
  return /*#__PURE__*/_react.default.createElement(Component, other, properties.map(property => /*#__PURE__*/_react.default.createElement(DesignSystem.Box, {
    flexGrow: 1,
    key: property.propertyPath
  }, /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: where,
    property: property,
    resource: resource,
    record: record,
    onChange: onChange
  }))), innerLayoutElements.map((innerLayoutElement, i) => /*#__PURE__*/_react.default.createElement(LayoutElementRenderer, _extends({}, props, {
    // eslint-disable-next-line react/no-array-index-key
    key: i,
    layoutElement: innerLayoutElement
  }))), children);
};
exports.LayoutElementRenderer = LayoutElementRenderer;
var _default = exports.default = LayoutElementRenderer;