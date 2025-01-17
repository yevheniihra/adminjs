import React from 'react';
import AdminJS from '../../../adminjs';
export declare function getComponentHtml<T extends Record<string, unknown>>(Component: React.FC<T>, props: T, admin: AdminJS): Promise<string>;
export default getComponentHtml;
