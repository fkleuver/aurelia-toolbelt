import {  customElement, bindable, BindingMode, containerless, INode } from '@aurelia/runtime';


@containerless()
@customElement('abt-button-group')
export class BootstrapButtonGroup {

  @bindable({ mode: BindingMode.oneTime }) public id: string = '';
  @bindable({ mode: BindingMode.oneTime }) public label: string = '';
  @bindable({ mode: BindingMode.oneTime }) public size: string = 'md';
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

  @bindable({ mode: BindingMode.oneTime }) public toggle: boolean | string = false;

  @bindable({ mode: BindingMode.oneTime }) public vertical: boolean | string = false;

  constructor(@INode private element: Element) { }

  private afterAttach() {
    const onlyVerticalAttribute = (this.vertical === '' && this.element.hasAttribute('vertical'));
    this.vertical = onlyVerticalAttribute || this.vertical === 'true' || this.vertical === true;

    const onlyisToggleAttribute = (this.toggle === '' && this.element.hasAttribute('toggle'));
    this.toggle = onlyisToggleAttribute || this.toggle === 'true' || this.toggle === true;
  }

}
