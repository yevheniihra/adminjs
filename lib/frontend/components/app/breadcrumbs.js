"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Breadcrumbs = exports.BreadcrumbText = exports.BreadcrumbLink = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _useTranslation = require("../../hooks/use-translation");
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BreadcrumbLink = exports.BreadcrumbLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "breadcrumbs__BreadcrumbLink",
  componentId: "sc-tbb6y0-0"
})(["color:", ";font-family:", ";line-height:", ";font-size:", ";text-decoration:none;&:hover{color:", ";}&:after{content:'/';padding:0 ", ";}&:last-child{&:after{content:'';}}"], ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.font, ({
  theme
}) => theme.lineHeights.default, ({
  theme
}) => theme.fontSizes.default, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.space.default);
const BreadcrumbText = exports.BreadcrumbText = (0, _styledComponents.default)(_designSystem.Text).withConfig({
  displayName: "breadcrumbs__BreadcrumbText",
  componentId: "sc-tbb6y0-1"
})(["color:", ";font-family:", ";font-weight:", ";line-height:", ";font-size:", ";cursor:pointer;display:inline;&:after{content:'/';padding:0 ", ";}&:last-child{&:after{content:'';}}"], ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.font, ({
  theme
}) => theme.fontWeights.normal.toString(), ({
  theme
}) => theme.lineHeights.default, ({
  theme
}) => theme.fontSizes.default, ({
  theme
}) => theme.space.default);

/**
 * @memberof Breadcrumbs
 */

/**
 * @component
 * @private
 */
const Breadcrumbs = props => {
  const {
    resource,
    record,
    actionName
  } = props;
  const listAction = resource.resourceActions.find(({
    name
  }) => name === 'list');
  const action = resource.actions.find(a => a.name === actionName);
  const h = new _viewHelpers.default();
  const {
    translateLabel: tl
  } = (0, _useTranslation.useTranslation)();
  const contentTag = (0, _utils.getActionElementCss)(resource.id, actionName, 'breadcrumbs');
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1,
    className: (0, _designSystem.cssClass)('Breadcrumbs'),
    "data-css": contentTag
  }, /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: h.dashboardUrl()
  }, tl('dashboard')), listAction ? /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: resource.href ? resource.href : '/',
    className: record ? 'is-active' : ''
  }, resource.name) : /*#__PURE__*/_react.default.createElement(BreadcrumbText, null, resource.name), action && action.name !== 'list' && /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: "#"
  }, action.label));
};
const OverridableBreadcrumbs = exports.Breadcrumbs = exports.default = (0, _allowOverride.default)(Breadcrumbs, 'Breadcrumbs');