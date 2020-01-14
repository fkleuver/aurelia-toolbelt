import { bindable, BindingMode, containerless, customElement } from '@aurelia/runtime';


@containerless()
@customElement('aut-metis-menu-item')
export class JQueryMetisItem {

    @bindable({ mode: BindingMode.toView }) public href: string | null = null;

}

