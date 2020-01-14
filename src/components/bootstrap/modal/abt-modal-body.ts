import { BindingMode, bindable, containerless, customElement } from '@aurelia/runtime';


@containerless()
@customElement('abt-modal-body')
export class BootstrapModalBody {
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

}
