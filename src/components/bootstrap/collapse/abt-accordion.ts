import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';



@containerless()
@customElement('abt-accordion')
export class BootstrapAccordion {


  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.toView }) public style: string = '';


}
