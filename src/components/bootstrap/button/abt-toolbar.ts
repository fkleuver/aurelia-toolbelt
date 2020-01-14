import { customElement, bindable, BindingMode, containerless } from '@aurelia/runtime';


@containerless()
@customElement('abt-toolbar')
export class BootstrapToolbar {


  @bindable({ mode: BindingMode.oneTime }) public id: string = '';
  @bindable({ mode: BindingMode.oneTime }) public label: string = '';
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

}
