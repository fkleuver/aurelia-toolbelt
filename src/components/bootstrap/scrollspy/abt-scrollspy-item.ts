import { bindable, BindingMode, containerless, customElement } from '@aurelia/runtime';


@containerless()
@customElement('abt-scrollspy-item')
export class BootstrapScrollspyItem {


  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;


  @bindable({ mode: BindingMode.oneTime }) public id: string;

}
