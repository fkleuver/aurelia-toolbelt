import { BindingMode, bindable, customElement } from '@aurelia/runtime';

@customElement('abt-progress')
export class BootstrapProgress {
  @bindable({ mode: BindingMode.oneTime }) public id: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public height: string;

}
