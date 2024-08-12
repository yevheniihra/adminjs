"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = exports.default = void 0;
var _reactI18next = require("react-i18next");
var _translateFunctions = require("../../utils/translate-functions.factory");
/**
 * Extends {@link TranslateFunctions}. Apart from that it also returns all the properties
 * defined below.
 *
 * ```javascript
 * import { useTranslation } from 'adminjs'
 *
 * const MyComponent = () => {
 *   const { translateButton } = useTranslation()
 *
 *   return (
 *     <Box>
 *       <Button variant="primary" onClick={...}>{translateButton('save')}<Button>
 *     </Box>
 *   )
 * }
 * ```
 *
 * @memberof useTranslation
 * @alias UseTranslationResponse
 *
 * @property {TranslateFunction} ... All functions defined in {@link TranslateFunctions}
 */

/**
 * @classdesc
 * Extends the useTranslation hook from react-i18next library.
 *
 * Returns all the {@link TranslateFunctions} + methods returned by the original
 * useTranslation method from react-i18next like: `i18n` instance and `ready` flag.
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 * @returns {UseTranslationResponse}
 */
const useTranslation = () => {
  // eslint-disable-next-line no-shadow
  const {
    i18n,
    ...rest
  } = (0, _reactI18next.useTranslation)();
  const translateFunctions = (0, _translateFunctions.createFunctions)(i18n);
  return {
    ...rest,
    i18n,
    ...translateFunctions
  };
};
exports.useTranslation = useTranslation;
var _default = exports.default = useTranslation;