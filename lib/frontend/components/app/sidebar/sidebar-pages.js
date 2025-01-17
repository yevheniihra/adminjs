"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _reactRouter = require("react-router");
var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers/view-helpers"));
var _useTranslation = require("../../../hooks/use-translation");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const h = new _viewHelpers.default();
const SidebarPages = props => {
  const {
    pages
  } = props;
  const {
    translateLabel
  } = (0, _useTranslation.useTranslation)();
  const location = (0, _reactRouter.useLocation)();
  const navigate = (0, _reactRouter.useNavigate)();
  if (!pages || !pages.length) {
    return null;
  }
  const isActive = page => !!location.pathname.match(`/pages/${page.name}`);
  const elements = pages.map(page => ({
    id: page.name,
    label: page.name,
    isSelected: isActive(page),
    icon: page.icon,
    href: h.pageUrl(page.name),
    onClick: (event, element) => {
      event.preventDefault();
      if (element.href) {
        navigate(element.href);
      }
    }
  }));
  return /*#__PURE__*/_react.default.createElement(_designSystem.Navigation, {
    label: translateLabel('pages'),
    elements: elements
  });
};
var _default = exports.default = (0, _allowOverride.default)(SidebarPages, 'SidebarPages');