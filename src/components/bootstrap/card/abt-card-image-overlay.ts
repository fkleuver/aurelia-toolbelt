import { containerless, customElement, bindable, BindingMode } from '@aurelia/runtime';

@containerless()
@customElement('abt-card-image-overlay')
export class BootstrapCardImageOverlay {

  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;

}
