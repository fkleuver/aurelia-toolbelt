import { containerless, customElement, bindable, BindingMode, INode } from '@aurelia/runtime';


@containerless()
@customElement('abt-accordion-item')
export class BootstrapAccordionItem {

  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.toView }) public style: string = '';

  @bindable({ mode: BindingMode.toView }) public title: string = '';

  @bindable({ mode: BindingMode.oneTime }) public active: boolean = false;

  private collapse: HTMLElement;

  constructor(@INode private element: Element) {
  }

  private onAnchorClick(event: Event) {
    event.preventDefault();
    return false;
  }

}
