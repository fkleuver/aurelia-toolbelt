import { customElement, bindable, BindingMode, INode } from '@aurelia/runtime';

import * as $ from 'jquery';

import 'aureliatoolbelt-thirdparty/bootstrap-toggle/bootstrap-toggle.js';
import { IDisposable } from '@aurelia/kernel';

@customElement('abt-toggle')
export class BootstrapToggleCustomElement {


  /*  One-Time bindable properties */
  @bindable({ mode: BindingMode.oneTime }) private on: string = 'On';
  @bindable({ mode: BindingMode.oneTime }) private off: string = 'Off';
  @bindable({ mode: BindingMode.oneTime }) private onType: string = 'primary';
  @bindable({ mode: BindingMode.oneTime }) private offType: string = 'secondary';
  @bindable({ mode: BindingMode.oneTime }) private css: string = '';
  @bindable({ mode: BindingMode.oneTime }) private size: string = 'normal';
  @bindable({ mode: BindingMode.oneTime }) private width: number | null = null;
  @bindable({ mode: BindingMode.oneTime }) private height: number | null = null;
  /*  ************************************** */


  @bindable({ mode: BindingMode.toView }) private class: string = '';
  @bindable({ mode: BindingMode.toView }) private style: string = '';

  /*  Two-Way bindable properties */
  @bindable({ mode: BindingMode.twoWay }) public value: any;
  @bindable({ mode: BindingMode.twoWay }) public model: any;
  @bindable({ mode: BindingMode.twoWay }) public checked: any;
  @bindable({ mode: BindingMode.twoWay }) public matcher: Function;
  @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string = false;
  @bindable({ mode: BindingMode.twoWay }) public rtl: boolean | string = false;
  /*  ************************************** */

  private checkbox: HTMLInputElement;
  private subscription: IDisposable | null = null;

  constructor(@INode private element: Element /* TODO(fkleuver): add BindingEngine api back in , private bindingEngine: BindingEngine */) {
  }

  private disabledChanged(newValue: boolean | string) {
    if (newValue) {

      this.checkbox.setAttribute('disabled', 'disabled');

      if (this.checkbox.parentElement.children[1]) {

        this.checkbox.parentElement.classList.add('disabled');
        this.checkbox.parentElement.classList.add('disabled-cursor');

        this.checkbox.parentElement.children[1].children[0].classList.add('disabled-cursor');
        this.checkbox.parentElement.children[1].children[1].classList.add('disabled-cursor');
        this.checkbox.parentElement.children[1].children[2].classList.add('disabled-cursor');
      }

    } else {
      if (this.checkbox.hasAttribute('disabled')) {

        this.checkbox.removeAttribute('disabled');

        if (this.checkbox.parentElement.children[1]) {

          this.checkbox.parentElement.classList.remove('disabled');
          this.checkbox.parentElement.classList.remove('disabled-cursor');

          this.checkbox.parentElement.children[1].children[0].classList.remove('disabled-cursor');
          this.checkbox.parentElement.children[1].children[1].classList.remove('disabled-cursor');
          this.checkbox.parentElement.children[1].children[2].classList.remove('disabled-cursor');
        }

      }
    }
  }

  private onChanged() {

    if (this.disabled) {
      return;
    }

    let newValue = this.element.children.item(0).children.item(0).classList.contains('off');

    this.synchronizeModel(!newValue);
  }

  private synchronizeModel(newState: any) {

    if (!Array.isArray(this.checked)) { // it is a boolean value
      this.checked = newState;
      return;
    }

    if (newState && (
      (this.matcher && this.checked.findIndex(x => this.matcher(x, this.value || this.model)) === -1)
      ||
      (this.checked.indexOf(this.value || this.model) === -1)
    )) {
      this.checked.push(this.value || this.model);
    } else if (!newState) {
      const index = this.matcher
        ? this.checked.findIndex(x => this.matcher(x, this.value || this.model))
        : this.checked.indexOf(this.value || this.model);

      if (index !== -1) {
        this.checked.splice(index, 1);
      }
    }
  }

  private checkedChanged(newValue: any) { // public: Array|undefined, Array|undefined

    this.disposeSubscription();
    // subscribe to the current array's mutation

    if (Array.isArray(this.checked)) {
      // TODO(fkleuver): need to add a similar API back into the runtime
      // this.subscription = this.bindingEngine.collectionObserver(this.checked)
      //   .subscribe(() => {
      //     // console.log('sync array view');
      //     this.synchronizeView(newValue);
      //   });
    }
    // console.log('sync  view');
    this.synchronizeView(newValue);
  }

  private synchronizeView(newValue: any) { // private

    let state = newValue;

    if (Array.isArray(this.checked)) {
      const index = this.matcher
        ? this.checked.findIndex(x => this.matcher(x, this.value || this.model))
        : this.checked.indexOf(this.value || this.model);

      state = index !== -1;
    }

    if (state) {
      // @ts-ignore
      $(this.checkbox).prop('checked', true).change();

      // this.checkbox.setAttribute('checked', true);
    } else {
      // @ts-ignore
      $(this.checkbox).prop('checked', false).change();

      // this.checkbox.removeAttribute('checked');

    }
  }

  private afterAttach() {
    // @ts-ignore
    $(this.checkbox).bootstrapToggle({
      on: this.on,
      off: this.off,
      size: this.size,
      onstyle: this.onType,
      offstyle: this.offType,
      width: this.width,
      height: this.height
    });

    if (this.disabled) {
      this.checkbox.parentElement.classList.add('disabled');
      this.checkbox.parentElement.classList.add('disabled-cursor');

      this.checkbox.parentElement.children[1].children[0].classList.add('disabled-cursor');
      this.checkbox.parentElement.children[1].children[1].classList.add('disabled-cursor');
      this.checkbox.parentElement.children[1].children[2].classList.add('disabled-cursor');

    }
  }

  private beforeBind() {

    // const onlyDisabledAttribute = (this.disabled === '' && this.element.hasAttribute('disabled'));
    this.disabled = (this.disabled === '' && this.element.hasAttribute('disabled')) || (this.disabled && this.disabled.toString() === 'true');
    // const onlyCheckedAttribute = (this.checked === '' && this.element.hasAttribute('checked'));


    if (!Array.isArray(this.checked)) {

      this.checked = (this.checked === '' && this.element.hasAttribute('checked')) || (this.checked && this.checked.toString() === 'true');
    }


    this.disabledChanged(this.disabled);
    this.synchronizeView(this.checked);
  }

  private beforeUnbind() {
    this.disposeSubscription();
  }

  private disposeSubscription() {
    if (this.subscription !== null) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }
}
