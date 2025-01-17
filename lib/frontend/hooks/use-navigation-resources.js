"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useNavigationResources = useNavigationResources;
var _reactRouter = require("react-router");
var _react = require("react");
var _useLocalStorage = _interopRequireDefault(require("./use-local-storage/use-local-storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-param-reassign */

const isSelected = (href, location) => {
  const regExp = new RegExp(`${href}($|/)`);
  return !!location.pathname.match(regExp);
};
function useNavigationResources(resources) {
  const [openElements, setOpenElements] = (0, _useLocalStorage.default)('sidebarElements', {});
  const navigate = (0, _reactRouter.useNavigate)();
  const location = (0, _reactRouter.useLocation)();
  const enrichResource = (0, _react.useMemo)(() => (resource, icon) => ({
    href: resource.href || undefined,
    icon,
    isSelected: isSelected(resource.href, location),
    label: resource.name,
    id: resource.id,
    onClick: event => {
      if (resource.href) {
        event.preventDefault();
        navigate(resource.href);
      }
    }
  }), [location, navigate]);

  // grouping resources into parents
  const map = resources
  // first filter out resources which are not visible
  .filter(res => {
    var _res$navigation;
    return res.href && ((_res$navigation = res.navigation) === null || _res$navigation === void 0 ? void 0 : _res$navigation.show) !== false;
  }).reduce((memo, resource) => {
    var _resource$navigation, _resource$navigation3;
    // in case resource has the same name as parent we namespace it wit "resource-""
    const key = ((_resource$navigation = resource.navigation) === null || _resource$navigation === void 0 ? void 0 : _resource$navigation.name) || ['resource', resource.name].join('-');
    if (!resource.navigation || resource.navigation.name === null) {
      var _resource$navigation2;
      memo[key] = enrichResource(resource, (_resource$navigation2 = resource.navigation) === null || _resource$navigation2 === void 0 ? void 0 : _resource$navigation2.icon);
    } else if (memo[key] && memo[key].elements && (_resource$navigation3 = resource.navigation) !== null && _resource$navigation3 !== void 0 && _resource$navigation3.name) {
      memo[key].elements.push(enrichResource(resource));
    } else {
      var _resource$navigation4, _resource$navigation5;
      memo[key] = {
        elements: [enrichResource(resource)],
        label: (_resource$navigation4 = resource.navigation) === null || _resource$navigation4 === void 0 ? void 0 : _resource$navigation4.name,
        icon: (_resource$navigation5 = resource.navigation) === null || _resource$navigation5 === void 0 ? void 0 : _resource$navigation5.icon,
        onClick: () => setOpenElements({
          ...openElements,
          [key]: !openElements[key]
        }),
        isOpen: !!openElements[key]
      };
    }
    return memo;
  }, {});
  return Object.values(map);
}
var _default = exports.default = useNavigationResources;