"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));
var _errorMessage = require("../app/error-message");
var _app = require("../app");
var _wrapper = _interopRequireDefault(require("./utils/wrapper"));
var _drawerPortal = _interopRequireDefault(require("../app/drawer-portal"));
var _filterDrawer = _interopRequireDefault(require("../app/filter-drawer"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ResourceAction = props => {
  const params = (0, _reactRouter.useParams)();
  const {
    resources
  } = props;
  const {
    resourceId,
    actionName
  } = params;
  const [filterVisible, setFilterVisible] = (0, _react.useState)(false);
  const [tag, setTag] = (0, _react.useState)('');
  const resource = resources.find(r => r.id === resourceId);
  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  }
  const action = resource.resourceActions.find(r => r.name === actionName);
  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }
  const toggleFilter = action.showFilter ? () => setFilterVisible(!filterVisible) : undefined;
  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_drawerPortal.default, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth,
    showFilter: action.showFilter
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action,
    toggleFilter: toggleFilter,
    tag: tag
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: action,
    resource: resource,
    setTag: setTag
  }), action.showFilter ? /*#__PURE__*/_react.default.createElement(_filterDrawer.default, {
    key: filterVisible.toString(),
    resource: resource,
    isVisible: filterVisible,
    toggleFilter: toggleFilter
  }) : '');
};
const mapStateToProps = state => ({
  resources: state.resources
});
var _default = exports.default = (0, _allowOverride.default)((0, _reactRedux.connect)(mapStateToProps)(ResourceAction), 'ResourceActionRoute');