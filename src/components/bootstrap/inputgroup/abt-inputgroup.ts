import { customElement, bindable, BindingMode, containerless } from '@aurelia/runtime';


export type Size = 'sm' | 'md' | 'lg';

@containerless()
@customElement('abt-inputgroup')
export class BootstrapInputGroupCustomElement {
  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public size: Size = 'md';
  @bindable({ mode: BindingMode.oneTime }) public id: string;

  private inputGroup: Element;
  private inputGroupTemplate: Element;
  private afterAttach() {

    if (this.size === 'sm') {
      this.inputGroup.classList.add('input-group-sm');
    } else if (this.size === 'lg') {
      this.inputGroup.classList.add('input-group-lg');
    } else {
      this.inputGroup.classList.remove('input-group-sm');
      this.inputGroup.classList.remove('input-group-lg');
    }
  }

}
