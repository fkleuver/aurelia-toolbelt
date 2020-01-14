import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';


export type Placement = 'up' | 'down' | 'right' | 'left';
@containerless()
@customElement('abt-navbar-dropdown')
export class BootstrapNavBarDropDown {
  @bindable({ mode: BindingMode.oneTime }) public fulWidth: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public title: string;
  @bindable({ mode: BindingMode.twoWay }) public click: Function;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public linkClass: string;
  @bindable({ mode: BindingMode.toView }) public linkStyle: string;
  @bindable({ mode: BindingMode.toView }) public menuClass: string;
  @bindable({ mode: BindingMode.toView }) public menuStyle: string;
  @bindable({ mode: BindingMode.toView }) public placement: Placement = 'down';

  private navDropDown: Element;
  private navListDropDown: Element;
  private dropDownMenu: Element;
  private navLinkDropDown: Element;

  private afterAttach() {

    switch (this.placement) {
      case 'up':
        this.navListDropDown.classList.add('dropup');
        break;
      case 'right':
        this.navListDropDown.classList.add('dropright');
        break;
      case 'left':
        this.navListDropDown.classList.add('dropleft');
        break;
      case 'down':
        this.navListDropDown.classList.add('dropdown');
        break;
    }

    // Fix bug #46
    // Needs more investigation for left and right placement.
    $(this.navListDropDown).on('shown.bs.dropdown', () => {
      if (!this.dropDownMenu.classList.contains('abt-dropdown-menu-position-calculated')) {
        let top = Number(window.getComputedStyle(this.dropDownMenu, null).getPropertyValue('top').replace('px', ''));
        let bottom = Number(window.getComputedStyle(this.dropDownMenu, null).getPropertyValue('bottom').replace('px', ''));
        switch (this.placement) {
          case 'up':
            bottom -= 10;
            top += 10;
            $(this.dropDownMenu).css('bottom', `${bottom}px`);
            break;
          case 'right':
            break;
          case 'left':
            break;
          case 'down':
            top -= 10;
            break;
        }
        $(this.dropDownMenu).css('top', `${top}px`);
        this.dropDownMenu.classList.add('abt-dropdown-menu-position-calculated');
      }
    });

    let isMegaMenuFullWidth = this.navDropDown.hasAttribute('full-width') || Boolean(this.fulWidth);

    if (isMegaMenuFullWidth) {
      this.navListDropDown.classList.add('navbar-megamenu-fullwidth');
    } else {
      this.navListDropDown.classList.remove('navbar-megamenu-fullwidth');
    }

  }


  private onClick(event: Event) {
    if (this.click) {
      this.click({ event: event });
    }
    return true;
  }
}
