import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-alert-heading')
export class BootstrapAlertHeading {
  @bindable({ mode: BindingMode.oneTime }) public id: string = '';
}
