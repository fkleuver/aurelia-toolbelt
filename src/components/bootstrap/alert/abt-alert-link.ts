import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-alert-link')
export class BootstrapAlertLink {
  @bindable({ mode: BindingMode.oneTime }) public id: string = '';
  @bindable({ mode: BindingMode.toView }) public href: string = '';
  @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string = false;
}
