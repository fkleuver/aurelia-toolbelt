import { customElement, bindable, BindingMode, containerless } from '@aurelia/runtime';
@containerless()

@customElement('abt-inputgroup-text')
export class BootstrapInputGroupTextCustomElement {
  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.oneTime }) public id: string;

}
