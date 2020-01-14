import { customElement, BindingMode, bindable, containerless, DOM } from '@aurelia/runtime';
import * as $ from 'jquery';


export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';

@containerless()
@customElement('abt-listgroup-item')
export class ListGroupItemCustomElement {
  @bindable({ mode: BindingMode.oneTime }) public id: string;
  @bindable({ mode: BindingMode.toView }) public href: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public type: ColorType;
  @bindable({ mode: BindingMode.twoWay }) public click: Function;
  @bindable({ mode: BindingMode.toView }) public active: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public disabled: boolean | string = false;


  private listGroupItemTemplate: Element;
  private listGroupItem: HTMLLinkElement;

  private afterAttach() {

    let isActive = (this.active === '' && this.listGroupItemTemplate.hasAttribute('active')) || this.active.toString() === 'true';
    let isDisabled = (this.disabled === '' && this.listGroupItemTemplate.hasAttribute('disabled')) || this.disabled.toString() === 'true';

    if (isActive) {
      this.listGroupItem.classList.add('active');
    }
    if (isDisabled) {
      this.listGroupItem.classList.add('disabled');
      $(this.listGroupItem).addClass('abt-listgroup-item-disabled');
    }
    if ((this.href || this.click) && !isDisabled) {
      this.listGroupItem.setAttribute('href', this.href);
    }/* else {
      $(this.listGroupItem).addClass('abt-listgroup-item-disabled');
    }*/

    if (this.type) {
      this.listGroupItem.classList.add(`list-group-item-${this.type}`);
    }

  }


  private onClick(event: Event) {
    if (this.click) {
      this.click({ event: event });
      return false;
    } else {
      return true;
    }
  }

}
