import { customElement, containerless, bindable, BindingMode } from '@aurelia/runtime';


@containerless()
@customElement('at-milestone')
export class AureliaToolbeltMilestone {


  @bindable({ mode: BindingMode.oneTime }) public type: string = 'secondary';
  @bindable({ mode: BindingMode.oneTime }) public icon: string = '';

  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

}
