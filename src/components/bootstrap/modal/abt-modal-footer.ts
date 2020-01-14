import { BindingMode, bindable, containerless, customElement } from '@aurelia/runtime';


@containerless()
@customElement('abt-modal-footer')
export class BootstrapModalFooter {
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

}
