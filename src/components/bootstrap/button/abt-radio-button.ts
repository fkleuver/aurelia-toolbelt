import { inject, bindable, BindingMode, Disposable, BindingEngine, customElement, containerless } from '@aurelia/runtime';



@inject(Element, BindingEngine)
@customElement('abt-radio-button')
@containerless()
export class BootstrapRadioButton {

  @bindable({ mode: BindingMode.twoWay }) public value: any;
  @bindable({ mode: BindingMode.twoWay }) public model: any;
  @bindable({ mode: BindingMode.twoWay }) public checked: any;
  @bindable({ mode: BindingMode.twoWay }) public matcher: any;
  @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string = false;


  @bindable({ mode: BindingMode.oneTime }) public id: string;

  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

  @bindable({ mode: BindingMode.oneTime }) public bsType: string = 'primary';

  @bindable({ mode: BindingMode.oneTime }) public name: string = '';

  private state: boolean;
  private subscription: Disposable | null = null;

  private radioButton: HTMLInputElement;

  constructor(@INode private element: Element, private bindingEngine: BindingEngine) {
  }

  private changed() {
    if (this.disabled) {
      return;
    }

    this.synchronizeModel();
  }

  private synchronizeModel() {

    this.checked = (this.model !== undefined)
      ? this.model
      : this.value;

      // to change the active class on labels on model change
      this.state = this.radioButton.checked;
  }

  private synchronizeView() { // private
    if (this.model !== undefined) {
      this.radioButton.checked = this.matcher
        ? this.matcher(this.checked, this.model)
        : this.checked === this.model;
    } else if (this.value) {
      this.radioButton.checked = this.matcher
        ? this.matcher(this.checked, this.value)
        : this.checked === this.value;
    }

    // to change the active class on labels on model change at init time
    this.state = this.radioButton.checked;

  }


  private beforeBind() {

    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled'; // || this.element.hasAttribute('disabled');
    this.synchronizeView();
  }


}
