import { BindingMode, bindable, containerless, customElement } from '@aurelia/runtime';


@containerless()
@customElement('abt-modal-header')
export class BootstrapModalHeader {

  private dismissible: boolean = false;

  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';


  private header: HTMLDivElement;

  private afterAttach() {
    let x = this.header.parentElement.parentElement.parentElement.getAttribute('data-abt-dismissible');
    this.dismissible = x === 'true';
  }

}
