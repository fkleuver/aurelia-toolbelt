import { containerless, BindingMode, bindable, customElement } from '@aurelia/runtime';

@containerless()
@customElement('abt-navbar-brand')
export class BootstrapNavBarBrand {
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.twoWay }) public click: Function;
  @bindable({ mode: BindingMode.oneTime }) public id: string;

  @bindable({ mode: BindingMode.toView }) public href: string;
  @bindable({ mode: BindingMode.toView }) public heading: boolean | string = false;

  private navbarBrand: Element;
  private navbarBrandTemplate: Element;

  private onClick(event: Event) {

    if (this.click) {
      this.click({ event: event });
    }

    return true;

  }

  private afterAttach() {
    let isHeading = Boolean(this.heading) || this.navbarBrandTemplate.hasAttribute('heading');
    if (isHeading) {
      this.navbarBrand.classList.add('abt-navbar-brand-heading');
    } else {
      this.navbarBrand.classList.remove('abt-navbar-brand-heading');
    }
  }
}
