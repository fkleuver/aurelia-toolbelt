import { BindingMode, bindable, containerless, customElement } from '@aurelia/runtime';


@containerless()
@customElement('abt-modal-title')
export class BootstrapModalTitle {


  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

}
