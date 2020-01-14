import { customElement, bindable, BindingMode, useShadowDOM, containerless } from '@aurelia/runtime';

@containerless()
@customElement('aut-clock')
export class ClockCustomElement {

  // Private fields:
  private value: Date;
  private timer: any;
  /*  ************************************************* */

  /* One Time bindings */
  @bindable({ mode: BindingMode.oneTime }) public text: string = 'Aurelia is awesome';
  @bindable({ mode: BindingMode.oneTime }) public color: string = '#753B85';
  @bindable({ mode: BindingMode.oneTime }) public shadowColor: string = ''; // = '#C8167A';
  @bindable({ mode: BindingMode.oneTime }) public fontSize: string | number = '40';
  /* ************************************************************************* */

  /** One way bindings */
  @bindable({ mode: BindingMode.toView }) public locale: string = 'en';
  @bindable({ mode: BindingMode.toView }) public dateFormat: string = 'YYYY/MM/DD';
  @bindable({ mode: BindingMode.toView }) public be24Hours: string | boolean = true;

  @bindable({ mode: BindingMode.toView }) public showText: string | boolean = true;
  @bindable({ mode: BindingMode.toView }) public showDate: string | boolean = true;
  @bindable({ mode: BindingMode.toView }) public showTime: string | boolean = true;
  /* ************************************************************************* */


  private afterAttach() {

    this.value = new Date();
    let self = this;

    return new Promise(resolve => {

      this.timer = setInterval(() => {
        self.value = new Date();
      }, 1000);

      resolve();

    });
  }

  private afterDetach() {
    clearTimeout(this.timer);
  }

}
