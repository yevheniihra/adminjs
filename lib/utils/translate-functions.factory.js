"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatName = exports.createFunctions = void 0;
var _startCase = _interopRequireDefault(require("lodash/startCase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @memberof TranslateFunctions
 * @alias TranslateFunction
 */

/**
 * Translate Functions are the helper functions which you can use to translate
 * your application.
 *
 * On the fronted they can be used with {@link useTranslation} hook. On the backend
 * they are injected to any {@link AdminJS} instance and {@link ActionContext}.
 */

const formatName = name => name.split('.').join('&#46;');
exports.formatName = formatName;
const translate = (i18n, key, name, resourceId, options) => {
  const realOptions = (typeof resourceId === 'string' ? options : resourceId) || {};
  const formattedName = formatName(name);
  let keys = [`${key}.${formattedName}`];
  if (resourceId) {
    keys = [`resources.${resourceId}.${key}.${formattedName}`, ...keys];
  }
  if (i18n.exists(keys)) {
    return i18n.t(keys, realOptions);
  }
  return realOptions.defaultValue ?? (0, _startCase.default)(name);
};
const createFunctions = i18n => {
  const translateAction = (actionName, resourceId, options) => translate(i18n, 'actions', actionName, resourceId, options);
  const translateButton = (buttonLabel, resourceId, options) => translate(i18n, 'buttons', buttonLabel, resourceId, options);
  const translateLabel = (label, resourceId, options) => translate(i18n, 'labels', label, resourceId, options);
  const translateProperty = (propertyName, resourceId, options) => translate(i18n, 'properties', propertyName, resourceId, options);
  const translateMessage = (messageName, resourceId, options) => translate(i18n, 'messages', messageName, resourceId, options);
  return {
    translateAction,
    ta: translateAction,
    translateButton,
    tb: translateButton,
    translateLabel,
    tl: translateLabel,
    translateProperty,
    tp: translateProperty,
    translateMessage,
    tm: translateMessage,
    t: i18n.t,
    translate: i18n.t
  };
};
exports.createFunctions = createFunctions;