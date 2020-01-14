import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-card-title')
export class BootstrapCardTitle {

  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;

}
