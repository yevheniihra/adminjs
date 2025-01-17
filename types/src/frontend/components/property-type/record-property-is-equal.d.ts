import { EditPropertyProps, ShowPropertyProps } from './base-property-props';
/**
 * Function used in React memo to compare if previous property value and next
 * property value are the same.
 *
 * @private
 */
export declare const recordPropertyIsEqual: (prevProps: Readonly<EditPropertyProps | ShowPropertyProps>, nextProps: Readonly<EditPropertyProps | ShowPropertyProps>) => boolean;
