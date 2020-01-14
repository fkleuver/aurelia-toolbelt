import { customElement, bindable, BindingMode, containerless } from '@aurelia/runtime';

@containerless()
@customElement('abt-tokenize-item')
export class BootstrapTokenizeItemCustomElement {

    @bindable({ mode: BindingMode.toView }) public class: string;
    @bindable({ mode: BindingMode.toView }) public style: string;
    @bindable({ mode: BindingMode.toView }) public value: string;
}
