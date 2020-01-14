import { customElement, BindingMode, bindable } from '@aurelia/runtime';

@customElement('abt-listgroup')
export class ListGroupCustomElement {
  @bindable({ mode: BindingMode.oneTime }) public id: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public flush: boolean | string = false;


  private listGroupTemplate: Element;
  private listGroup: Element;

  private afterAttach() {
    let isFlush = (this.flush === '' && this.listGroupTemplate.hasAttribute('active')) || this.flush.toString() === 'true';
    if (isFlush) {
      this.listGroup.classList.add('list-group-flush');
    }
  }

}
