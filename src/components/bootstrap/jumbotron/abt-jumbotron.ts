import { containerless, customElement, INode, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-jumbotron')
export class BootstrapJumbotron {



  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

  @bindable({ mode: BindingMode.oneTime }) public fluid: boolean | string = false;


  constructor(@INode private element: Element) {
  }


  private afterAttach() {

    const onlyDismissibleAttribute = (this.fluid === '' && this.element.hasAttribute('fluid'));
    this.fluid = onlyDismissibleAttribute || this.fluid.toString() === 'true';

  }

}
