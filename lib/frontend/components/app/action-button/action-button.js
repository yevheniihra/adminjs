"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
var _hooks = require("../../../hooks");
var _interfaces = require("../../../interfaces");
var _utils = require("../../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

/**
 * @alias ActionButtonProps
 * @memberof ActionButton
 */

/**
 * Renders Button which redirects to given action
 *
 * ### Usage
 *
 * ```
 * import { ActionButton } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
const ActionButton = props => {
  const {
    children,
    action,
    actionPerformed,
    resourceId,
    recordId,
    recordIds
  } = props;
  const {
    href,
    handleClick
  } = (0, _hooks.useAction)(action, {
    resourceId,
    recordId,
    recordIds
  }, actionPerformed);
  if (!action) {
    return null;
  }
  const firstChild = _react.default.Children.toArray(children)[0];
  if (!firstChild || typeof firstChild === 'string' || typeof firstChild === 'number' || typeof firstChild === 'boolean') {
    throw new Error('ActionButton has to have one child');
  }
  const contentTag = (0, _utils.getActionElementCss)(resourceId, action.name, 'button');
  const WrappedElement = /*#__PURE__*/_react.default.cloneElement(firstChild, {
    onClick: handleClick,
    'data-testid': (0, _interfaces.buildActionTestId)(action),
    'data-css': contentTag,
    href
  });
  return WrappedElement;
};
const OverridableActionButton = exports.ActionButton = exports.default = (0, _allowOverride.default)(ActionButton, 'ActionButton');