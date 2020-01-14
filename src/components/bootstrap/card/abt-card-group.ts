import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-card-group')
export class BootstrapCardGroup {

  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;

}
