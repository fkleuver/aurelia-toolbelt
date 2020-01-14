import { customElement, containerless, bindable, BindingMode } from '@aurelia/runtime';
import { IBreadcrumbItem } from './breadcrumb-item';

@containerless()
@customElement('abt-breadcrumb')
export class BootstrapBreadcrumb {

  @bindable({ mode: BindingMode.toView }) public items: Array<IBreadcrumbItem>;

}
