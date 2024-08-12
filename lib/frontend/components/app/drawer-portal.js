"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DrawerPortal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _client = require("react-dom/client");
var _designSystem = require("@adminjs/design-system");
var _styledComponents = require("styled-components");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @alias DrawerPortalProps
 * @memberof DrawerPortal
 */

const DRAWER_PORTAL_ID = 'drawerPortal';
const DRAWER_PORTAL_WRAPPER_ID = 'drawerPortalWrapper';
const DrawerWrapper = ({
  onMount
}) => {
  (0, _react.useEffect)(() => {
    onMount();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: window.THEME
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Drawer, {
    id: DRAWER_PORTAL_ID,
    className: "hidden",
    "data-css": "drawer"
  }));
};
const getOrCreatePortalContainer = id => {
  let container = document.getElementById(id);
  if (!container) {
    container = window.document.createElement('div');
    container.id = id;
    window.document.body.appendChild(container);
  }
  return container;
};

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
const DrawerPortal = ({
  children,
  width
}) => {
  const [drawerElement, setDrawerElement] = (0, _react.useState)(document.getElementById(DRAWER_PORTAL_ID));
  const handleDrawerMount = () => {
    setDrawerElement(document.getElementById(DRAWER_PORTAL_ID));
  };
  (0, _react.useEffect)(() => {
    const innerWrapperElement = getOrCreatePortalContainer(DRAWER_PORTAL_WRAPPER_ID);
    if (!drawerElement && window) {
      const drawerRoot = (0, _client.createRoot)(innerWrapperElement);
      drawerRoot.render( /*#__PURE__*/_react.default.createElement(DrawerWrapper, {
        onMount: handleDrawerMount
      }));
    }
    return () => {
      const innerWrapper = document.getElementById(DRAWER_PORTAL_WRAPPER_ID);
      if (innerWrapper) document.body.removeChild(innerWrapper);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (drawerElement) {
      drawerElement.classList.remove('hidden');
      if (width) {
        drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString();
      }
      return () => {
        drawerElement.style.width = _designSystem.DEFAULT_DRAWER_WIDTH;
        drawerElement.classList.add('hidden');
        drawerElement.setAttribute('data-css', 'drawer-element');
      };
    }
    return () => undefined;
  }, [drawerElement]);
  if (!drawerElement) {
    return null;
  }
  return /*#__PURE__*/(0, _reactDom.createPortal)(children, drawerElement);
};
exports.DrawerPortal = DrawerPortal;
var _default = exports.default = DrawerPortal;