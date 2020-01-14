import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-navbar-dropdown-item')
export class BootstrapNavBarDropDownItem {
  @bindable({ mode: BindingMode.oneTime }) public id: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public href: string;
  @bindable({ mode: BindingMode.twoWay }) public click: Function;

  private onClick(event: Event) {

    if (this.click) {
      this.click({ event: event });
    }
    return true;
  }
}
