import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-navbar-dropdown-mega-item')
export class BootstrapNavBarDropDownMegaItem {
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.oneTime }) public id: string;

}
