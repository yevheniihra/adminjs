"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentLoader = void 0;
var path = _interopRequireWildcard(require("path"));
var fs = _interopRequireWildcard(require("fs"));
var _ = require(".");
var _fileResolver = require("../../utils/file-resolver");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class ComponentLoader {
  components = {};
  add(name, filePath, caller = 'add') {
    const resolvedFilePath = ComponentLoader.resolveFilePath(filePath, caller);
    if (this.components[name] && this.components[name].filePath !== resolvedFilePath || ComponentLoader.defaultComponents.includes(name)) {
      throw new Error(`Component '${name}' is already defined, use .override() instead`);
    }
    this.components[name] = {
      overrides: false,
      filePath: resolvedFilePath
    };
    return name;
  }
  override(name, filePath, caller = 'override') {
    const resolvedFilePath = ComponentLoader.resolveFilePath(filePath, caller);
    if (!this.components[name] && !ComponentLoader.defaultComponents.includes(name)) {
      throw new Error(`Component '${name}' is not defined, use .add() instead`);
    }
    this.components[name] = {
      overrides: true,
      filePath: resolvedFilePath
    };
    return name;
  }
  __unsafe_addWithoutChecks(name, filePath, caller = '__unsafe_addWithoutChecks') {
    const resolvedFilePath = ComponentLoader.resolveFilePath(filePath, caller);
    this.components[name] = {
      overrides: false,
      filePath: resolvedFilePath
    };
    return name;
  }
  clear() {
    this.components = {};
  }
  getComponents() {
    return Object.entries(this.components).reduce((result, [key, component]) => {
      result[key] = component.filePath;
      return result;
    }, {});
  }
  __unsafe_merge(componentLoader) {
    this.components = {
      ...componentLoader.components,
      ...this.components
    };
  }
  static resolveFilePath(filePath, caller) {
    const extensions = ['.jsx', '.js', '.ts', '.tsx'];
    const src = path.isAbsolute(filePath) ? filePath : (0, _fileResolver.relativeFilePathResolver)(filePath, new RegExp(`.*.{1}${caller}`));
    const {
      ext: originalFileExtension
    } = path.parse(src);
    for (const extension of extensions) {
      const forcedExt = extensions.includes(originalFileExtension) ? '' : extension;
      const {
        root,
        dir,
        name,
        ext
      } = path.parse(src + forcedExt);
      const fileName = path.format({
        root,
        dir,
        name,
        ext
      });
      if (fs.existsSync(fileName)) {
        return path.format({
          root,
          dir,
          name
        });
      }
    }
    throw new _.ConfigurationError(`Trying to bundle file '${src}' but it doesn't exist`, 'AdminJS.html');
  }
  static defaultComponents = ['LoggedIn', 'NoRecords', 'SidebarResourceSection', 'SidebarFooter', 'SidebarBranding', 'Sidebar', 'TopBar', 'Breadcrumbs', 'FilterDrawer', 'NoticeBox', 'Version', 'SidebarPages', 'PropertyHeader', 'RecordInList', 'RecordsTableHeader', 'RecordsTable', 'SelectedRecords', 'StyledBackButton', 'ActionHeader', 'ActionButton', 'BulkActionRoute', 'DashboardRoute', 'RecordActionRoute', 'ResourceActionRoute', 'ResourceRoute', 'PageRoute', 'RouteWrapper', 'Application', 'DefaultEditAction', 'DefaultBulkDeleteAction', 'DefaultListAction', 'DefaultNewAction', 'DefaultShowAction', 'DefaultArrayShowProperty', 'DefaultArrayListProperty', 'DefaultArrayEditProperty', 'DefaultBooleanEditProperty', 'DefaultBooleanFilterProperty', 'DefaultBooleanListProperty', 'DefaultBooleanShowProperty', 'BooleanPropertyValue', 'DefaultCurrencyEditProperty', 'DefaultCurrencyShowProperty', 'DefaultCurrencyListProperty', 'DefaultCurrencyFilterProperty', 'CurrencyPropertyInputWrapper', 'DefaultDatetimeEditProperty', 'DefaultDatetimeShowProperty', 'DefaultDatetimeListProperty', 'DefaultDatetimeFilterProperty', 'DefaultPropertyValue', 'DefaultShowProperty', 'DefaultListProperty', 'DefaultEditProperty', 'DefaultFilterProperty', 'DefaultMixedShowProperty', 'DefaultMixedListProperty', 'DefaultMixedEditProperty', 'DefaultPasswordEditProperty', 'DefaultPhoneEditProperty', 'DefaultPhoneFilterProperty', 'DefaultPhoneListProperty', 'DefaultPhoneShowProperty', 'DefaultReferenceEditProperty', 'DefaultReferenceShowProperty', 'DefaultReferenceListProperty', 'DefaultReferenceFilterProperty', 'DefaultReferenceValue', 'DefaultRichtextEditProperty', 'DefaultRichtextListProperty', 'DefaultRichtextShowProperty', 'DefaultTextareaEditProperty', 'DefaultTextareaShowProperty', 'PropertyDescription', 'PropertyLabel'];
}
exports.ComponentLoader = ComponentLoader;