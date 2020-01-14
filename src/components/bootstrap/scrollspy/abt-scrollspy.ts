import { customElement, containerless, bindable, BindingMode, INode } from '@aurelia/runtime';


import * as $ from 'jquery';


@containerless()
@customElement('abt-scrollspy')
export class BootstrapScrollSpy {

  @bindable({ mode: BindingMode.oneTime }) public target: string;
  @bindable({ mode: BindingMode.oneTime }) public offset: number = 10;

  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.twoWay }) public bsScrollspy: Function;

  @bindable({ mode: BindingMode.oneTime }) public onBody: boolean | string = false;


  private spy: HTMLElement;

  constructor(@INode private element: Element) { }


  private afterAttach() {

    this.onBody = Boolean(this.onBody);
    this.offset = Number(this.offset);

    if (!this.onBody) {
      $(this.spy).scrollspy({ target: this.target[0] === '#' ? this.target : `#${this.target}`, offset: this.offset });

    } else {
      $('body').scrollspy({ target: this.target[0] === '#' ? this.target : `#${this.target}`, offset: this.offset });
    }

    if (this.bsScrollspy) {
      $(this.spy).on('activate.bs.scrollspy', () => {
        if (this.bsScrollspy) {
          this.bsScrollspy();
        }
      });
    }

  }


  private afterDetach() {
    $(this.spy).scrollspy('dispose');
  }

}
