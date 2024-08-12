"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _designSystem = require("@adminjs/design-system");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SortLink = props => {
  const {
    sortBy,
    property,
    direction
  } = props;
  const location = (0, _reactRouterDom.useLocation)();
  const isActive = (0, _react.useMemo)(() => sortBy === property.propertyPath, [sortBy, property]);
  const query = new URLSearchParams(location.search);
  const oppositeDirection = isActive && direction === 'asc' ? 'desc' : 'asc';
  const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`;
  query.set('direction', oppositeDirection);
  query.set('sortBy', property.propertyPath);
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: {
      search: query.toString()
    },
    className: (0, _designSystem.cssClass)('SortLink')
  }, property.label, isActive ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: sortedByIcon,
    color: "primary100",
    ml: "default"
  }) : '');
};
const checkSortProps = (prevProps, nextProps) => prevProps.direction === nextProps.direction && prevProps.property.propertyPath === nextProps.property.propertyPath && prevProps.sortBy === nextProps.sortBy;
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SortLink, checkSortProps);