"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _styledComponents = require("styled-components");
var _designSystem = require("@adminjs/design-system");
var _reactRouter = require("react-router");
var _viewHelpers = _interopRequireDefault(require("../../backend/utils/view-helpers/view-helpers"));
var _sidebar = _interopRequireDefault(require("./app/sidebar/sidebar"));
var _topBar = _interopRequireDefault(require("./app/top-bar"));
var _notice = _interopRequireDefault(require("./app/notice"));
var _allowOverride = _interopRequireDefault(require("../hoc/allow-override"));
var _routes = require("./routes");
var _useHistoryListen = _interopRequireDefault(require("../hooks/use-history-listen"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react/no-children-prop */

const GlobalStyle = (0, _styledComponents.createGlobalStyle)(["html,body,#app{margin:0;padding:0;width:100%;height:100%;color:", "}"], ({
  theme
}) => theme.colors.grey100);
const h = new _viewHelpers.default();
const App = () => {
  const [sidebarVisible, toggleSidebar] = (0, _react.useState)(false);
  const location = (0, _reactRouter.useLocation)();
  (0, _useHistoryListen.default)();
  (0, _react.useEffect)(() => {
    if (sidebarVisible) {
      toggleSidebar(false);
    }
  }, [location]);
  const resourceId = ':resourceId';
  const actionName = ':actionName';
  const recordId = ':recordId';
  const pageName = ':pageName';
  const dashboardUrl = h.dashboardUrl();
  const recordActionUrl = h.recordActionUrl({
    resourceId,
    recordId,
    actionName
  });
  const resourceActionUrl = h.resourceActionUrl({
    resourceId,
    actionName
  });
  const bulkActionUrl = h.bulkActionUrl({
    resourceId,
    actionName
  });
  const resourceUrl = h.resourceUrl({
    resourceId
  });
  const pageUrl = h.pageUrl(pageName);

  /**
   * When defining AdminJS routes, we use Routes component twice.
   * This results in warnings appearing in console, for example about not being able to locate
   * "/admin" route. They can be safely ignored though and should appear only
   * in development environment. The warnings originate from the difference between
   * "Switch" component that AdminJS had used in "react-router" v5 which was later replaced
   * with "Routes" in "react-router" v6. "Switch" would use the first "Route" component
   * that matched the provided path, while "Routes" searches for the best matching pattern.
   * In AdminJS we use "DrawerPortal" to display actions in a drawer when
   * "showInDrawer" option is set to true. The drawer should appear above the currently viewed
   * page, but "Routes" broke this behavior because it instead showed a record action route with
   * an empty background.
   * The current flow is that first "Routes" component includes "Resource" route component
   * for drawer-placed actions and the second "Routes" is entered for record actions
   * on a separate page.
   */
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_designSystem.Reset, null), /*#__PURE__*/_react.default.createElement(GlobalStyle, null), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    height: "100%",
    flex: true,
    "data-css": "app"
  }, sidebarVisible ? /*#__PURE__*/_react.default.createElement(_designSystem.Overlay, {
    onClick: () => toggleSidebar(!sidebarVisible)
  }) : null, /*#__PURE__*/_react.default.createElement(_sidebar.default, {
    isVisible: sidebarVisible,
    "data-css": "sidebar"
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    flexGrow: 1,
    flexDirection: "column",
    overflowY: "auto",
    bg: "bg",
    "data-css": "app-content"
  }, /*#__PURE__*/_react.default.createElement(_topBar.default, {
    toggleSidebar: () => toggleSidebar(!sidebarVisible)
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    position: "absolute",
    top: 0,
    zIndex: 2000,
    "data-css": "notice"
  }, /*#__PURE__*/_react.default.createElement(_notice.default, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: `${resourceUrl}/*`,
    element: /*#__PURE__*/_react.default.createElement(_routes.ResourceRoute, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: pageUrl,
    element: /*#__PURE__*/_react.default.createElement(_routes.PageRoute, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: dashboardUrl,
    element: /*#__PURE__*/_react.default.createElement(_routes.DashboardRoute, null)
  })), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: `${resourceActionUrl}/*`,
    element: /*#__PURE__*/_react.default.createElement(_routes.ResourceActionRoute, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: `${bulkActionUrl}/*`,
    element: /*#__PURE__*/_react.default.createElement(_routes.BulkActionRoute, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: `${recordActionUrl}/*`,
    element: /*#__PURE__*/_react.default.createElement(_routes.RecordActionRoute, null)
  })))));
};
var _default = exports.default = (0, _allowOverride.default)(App, 'Application');