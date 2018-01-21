import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

@containerless()
@customElement('abt-inputgroup-text')
export class BootstrapInputGroupTextCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
}
