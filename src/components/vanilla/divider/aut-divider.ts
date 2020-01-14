import { SharedIndex } from './../../../utilities/vanilla/sharedIndex';

import { customElement, bindable, BindingMode, containerless, INode } from '@aurelia/runtime';

@customElement('aut-divider')
@containerless()
export class DividerCustomElement {

  @bindable({ mode: BindingMode.oneTime }) public id: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public vertical: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public color: string = '#b5b5b5';
  @bindable({ mode: BindingMode.toView }) public backgroundColor: string = '#fff';
  @bindable({ mode: BindingMode.toView }) public lineColor: string = '#dbdbdb';


  private divider: HTMLDivElement;

  constructor(@INode private element: Element, private sharedIndex: SharedIndex) {
  }

  private afterAttach() {

    this.vertical = (this.vertical === '' && this.element.hasAttribute('vertical')) || this.vertical.toString() === 'true';

    let value = this.divider.innerText;
    this.divider.innerText = '';
    this.divider.setAttribute('data-content', value);

    let css = `.is-divider-vertical[data-content]::after,.is-divider[data-content]::after{
      background:${this.backgroundColor}!important;color:${this.color}!important}
      .is-divider{border-top:.1rem solid ${this.lineColor}!important;}
      .is-divider-vertical::before{border-left:.1rem solid ${this.lineColor}!important;}
      `;
    // TODO(fkleuver): add this api to v2 // DOM.injectStyles(css, null, null, 'aut_divider_injected_style');
  }
}
