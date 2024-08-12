"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));
var _errorMessage = _interopRequireDefault(require("../app/error-message"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Page = () => {
  const [pages] = (0, _reactRedux.useSelector)(state => [state.pages]);
  const params = (0, _reactRouter.useParams)();
  const {
    pageName
  } = params;
  const [isClient, setIsClient] = (0, _react.useState)(false);
  const currentPage = pages.find(page => page.name === pageName);
  (0, _react.useEffect)(() => {
    setIsClient(true);
  }, []);
  if (!currentPage) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
      title: "There is no page of given name"
    }, /*#__PURE__*/_react.default.createElement("p", null, "Page:", /*#__PURE__*/_react.default.createElement("b", null, ` "${pageName}" `), "does not exist."));
  }
  const Component = AdminJS.UserComponents[currentPage.component];
  if (!Component || !isClient) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
      title: "No component specified"
    }, /*#__PURE__*/_react.default.createElement("p", null, "You have to specify component which will render this Page"));
  }
  return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(Component, null));
};
var _default = exports.default = (0, _allowOverride.default)(Page, 'PageRoute');