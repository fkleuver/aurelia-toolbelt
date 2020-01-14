import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-navbar-collapser')
export class BootstrapNavBarCollapser {
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;

}
