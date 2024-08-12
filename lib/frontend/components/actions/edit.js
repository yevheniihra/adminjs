"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Edit = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _useRecord = _interopRequireDefault(require("../../hooks/use-record/use-record"));
var _useTranslation = require("../../hooks/use-translation");
var _utils = require("../../utils");
var _actionHeader = _interopRequireDefault(require("../app/action-header/action-header"));
var _propertyType = _interopRequireDefault(require("../property-type"));
var _appendForceRefresh = require("./utils/append-force-refresh");
var _layoutElementRenderer = _interopRequireDefault(require("./utils/layout-element-renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Edit = props => {
  const {
    record: initialRecord,
    resource,
    action
  } = props;
  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    setRecord
  } = (0, _useRecord.default)(initialRecord, resource.id);
  const {
    translateButton
  } = (0, _useTranslation.useTranslation)();
  const navigate = (0, _reactRouter.useNavigate)();
  (0, _react.useEffect)(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);
  const submit = event => {
    event.preventDefault();
    handleSubmit().then(response => {
      if (response.data.redirectUrl) {
        navigate((0, _appendForceRefresh.appendForceRefresh)(response.data.redirectUrl));
      }
    });
    return false;
  };
  const contentTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-content');
  const formTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'form');
  const footerTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-footer');
  const buttonTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-submit');
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    as: "form",
    onSubmit: submit,
    flex: true,
    flexDirection: "column",
    "data-css": formTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.DrawerContent, {
    "data-css": contentTag
  }, action !== null && action !== void 0 && action.showInDrawer ? /*#__PURE__*/_react.default.createElement(_actionHeader.default, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/_react.default.createElement(_layoutElementRenderer.default
  // eslint-disable-next-line react/no-array-index-key
  , _extends({
    key: i,
    layoutElement: layoutElement
  }, props, {
    where: "edit",
    onChange: handleChange,
    record: record
  }))) : resource.editProperties.map(property => /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: "edit",
    onChange: handleChange,
    property: property,
    resource: resource,
    record: record
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.DrawerFooter, {
    "data-css": footerTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    "data-css": buttonTag,
    "data-testid": "button-save",
    disabled: loading
  }, loading ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Fade",
    spin: true
  }) : null, translateButton('save', resource.id))));
};
const OverridableEdit = exports.Edit = exports.default = (0, _allowOverride.default)(Edit, 'DefaultEditAction');