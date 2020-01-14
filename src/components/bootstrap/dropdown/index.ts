
import { CustomElement } from '@aurelia/runtime';

export * from './abt-dropdown';
export * from './abt-dropdown-item';

// @ts-ignore
import * as BootstrapDropdownDividerTemplate from './abt-dropdown-divider.html';
// TODO(fkleuver): the import above requires loader/bundler plugins, so we may want to add e.g. CustomElement.fromHtml api or something to make our conventions plugin understand it more easily, as well as give the user a meaningful error when the plugin wasn't used
export const BootstrapDropdownDivider = CustomElement.define({ name: 'abt-dropdown-divider', template: BootstrapDropdownDividerTemplate });
// @ts-ignore
import * as BootstrapDropdownHeaderTemplate from './abt-dropdown-header.html';
// TODO(fkleuver): the import above requires loader/bundler plugins, so we may want to add e.g. CustomElement.fromHtml api or something to make our conventions plugin understand it more easily, as well as give the user a meaningful error when the plugin wasn't used
export const BootstrapDropdownHeader = CustomElement.define({ name: 'abt-dropdown-header', template: BootstrapDropdownHeaderTemplate });
