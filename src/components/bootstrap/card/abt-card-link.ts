import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-card-link')
export class BootstrapCardLink {

  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;

  @bindable({ mode: BindingMode.toView }) public href: string;
  @bindable({ mode: BindingMode.toView }) public target: string;

}
