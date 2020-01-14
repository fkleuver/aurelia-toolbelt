import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-navbar-toggler')
export class BootstrapNavBarToggler {
  @bindable({ mode: BindingMode.toView }) public togglerIcon: string = 'navbar-toggler-icon';
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.oneTime }) public id: string;
}
