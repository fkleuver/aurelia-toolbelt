import { customElement, containerless, bindable, BindingMode, INode } from '@aurelia/runtime';


@containerless()
@customElement('at-milestone-container')
export class AureliaToolbeltMilestoneContainer {

  @bindable({ mode: BindingMode.oneTime }) public topBorder: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public bottomBorder: boolean | string = false;

  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

  constructor(@INode private element: Element) { }


  public afterAttach() {

    const onlyTopBorderAttribute = (this.topBorder === '' && this.element.hasAttribute('top-border'));
    this.topBorder = onlyTopBorderAttribute || this.topBorder === 'true' || this.topBorder === true;

    const onlyBottomBorderAttribute = (this.bottomBorder === '' && this.element.hasAttribute('bottom-border'));
    this.bottomBorder = onlyBottomBorderAttribute || this.bottomBorder === 'true' || this.bottomBorder === true;

  }

}
