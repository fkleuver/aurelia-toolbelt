import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@customElement('abt-card')
@containerless()
export class BootstrapCard {


  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public width: string;

}
