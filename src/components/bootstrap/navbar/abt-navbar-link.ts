import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-navbar-link')
export class BootstrapNavBarLink {
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.oneTime }) public id: string;

  @bindable({ mode: BindingMode.toView }) public href: string;

  @bindable({ mode: BindingMode.toView }) public linkClass: string;
  @bindable({ mode: BindingMode.toView }) public linkStyle: string;

  @bindable({ mode: BindingMode.toView }) public active: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public disabled: boolean | string = false;

  @bindable({ mode: BindingMode.twoWay }) public click: Function;


  private navItem: Element;
  private navItemLink: Element;


  private afterAttach() {
    let isActive = Boolean(this.active) || this.navItem.hasAttribute('active');
    let isDisabled = Boolean(this.disabled) || this.navItem.hasAttribute('disabled');
    if (isActive) {
      this.navItemLink.classList.add('active');
      this.navItemLink.classList.remove('disabled');
    }
    if (isDisabled) {
      this.navItemLink.classList.remove('active');
      this.navItemLink.classList.add('disabled');
    }
  }


  private onClick(event: Event) {
    if (this.click) {
      this.click({ event: event });
    }
    return true;
  }
}
