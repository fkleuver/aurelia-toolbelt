import { customElement, bindable, BindingMode, containerless, INode } from '@aurelia/runtime';


@containerless()
@customElement('abt-badge')
export class BootstrapBadge {

  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.oneTime }) public type: string = 'primary';
  // @bindable({ mode: BindingMode.toView }) public href: string | null = null;
  @bindable({ mode: BindingMode.toView }) public isPill: boolean | string = false;

  constructor(@INode private element: Element) { }

  private beforeBind() {
    const onlyIsPillAttribute = (this.isPill === '' && this.element.hasAttribute('is-pill'));
    this.isPill = onlyIsPillAttribute || this.isPill === 'true' || this.isPill === true;
  }

}
