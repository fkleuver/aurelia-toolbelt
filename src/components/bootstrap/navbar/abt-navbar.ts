import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

export type ExpandSize = 'sm' | 'md' | 'lg' | 'xl';
export type NavbarColorType = 'light' | 'dark';
export type NavPlacement = '' | 'fixed-top' | 'fixed-bottom' | 'sticky-top';
export type BackgroundColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@customElement('abt-navbar')
@containerless()
export class BootstrapNavBar {
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.oneTime }) public id: string;

  @bindable({ mode: BindingMode.toView }) public navbarColorType: NavbarColorType = 'light';
  @bindable({ mode: BindingMode.toView }) public backgroundColorType: BackgroundColorType = 'light';
  @bindable({ mode: BindingMode.toView }) public expandSize: ExpandSize = 'lg';
  @bindable({ mode: BindingMode.toView }) public placement: NavPlacement = '';

  private navbar: Element;
  private navbarCollapse: Element;

  private afterAttach() {

    if (this.navbarColorType) {
      this.navbar.classList.add(`navbar-${this.navbarColorType}`);
    }
    if (this.backgroundColorType) {
      this.navbar.classList.add(`bg-${this.backgroundColorType}`);
    }
    if (this.expandSize) {
      this.navbar.classList.add(`navbar-expand-${this.expandSize}`);
    } else {
      this.navbar.classList.remove(`navbar-expand-${this.expandSize}`);

    }

    let navbarToggler = <HTMLButtonElement>this.navbar.querySelector('.abt-navbar-toggler');
    let navbarCollapser = <HTMLDivElement>this.navbar.querySelector('.abt-navbar-collapser');
    if (navbarToggler && navbarCollapser) {
      navbarToggler.setAttribute('data-target', `#${navbarCollapser.id}`);
      navbarToggler.setAttribute('aria-controls', `${navbarCollapser.id}`);
    }
  }
}
