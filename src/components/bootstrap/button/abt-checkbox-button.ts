import { bindable, BindingMode, customElement, containerless, INode } from '@aurelia/runtime';
import { IDisposable } from '@aurelia/kernel';


@customElement('abt-checkbox-button')
@containerless()
export class BootstrapCheckboxButton {

  @bindable({ mode: BindingMode.twoWay }) public value: any;
  @bindable({ mode: BindingMode.twoWay }) public model: any;
  @bindable({ mode: BindingMode.twoWay }) public checked: any;
  @bindable({ mode: BindingMode.twoWay }) public matcher: any;
  @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string = false;


  @bindable({ mode: BindingMode.oneTime }) public id: string;

  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

  @bindable({ mode: BindingMode.oneTime }) public bsType: string = 'primary';


  private state: boolean;
  private subscription: IDisposable | null = null;

  constructor(@INode private element: Element/* TODO(fkleuver): add BindingEngine api back in , private bindingEngine: BindingEngine */) {
  }

  private changed() {
    if (this.disabled) {
      return;
    }

    this.state = !this.state;
    this.synchronizeModel(this.state);
  }

  private synchronizeModel(newState: any) {

    // console.log(`new state: ${newState}`);
    // console.log(`checked: ${this.checked}`);

    if (!Array.isArray(this.checked)) { // it is a boolean value
      this.checked = newState;
      return;
    }

    // console.log(`Is checked an Array: ${Array.isArray(this.checked)}`);
    // if (Array.isArray(this.checked)) {
    //   console.log(this.checked);
    // }
    // console.log(`value/model: ${this.value}/${this.model}`);
    // console.log(`matcher: ${this.matcher}`);
    // console.log('***********************************************************');

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
    if (Array.isArray(this.checked)) {
      const index = this.matcher
        ? this.checked.findIndex(x => this.matcher(x, this.value || this.model))
        : this.checked.indexOf(this.value || this.model);
      this.state = index !== -1;
    } else {
      this.state = newValue;
      // console.log(`state is now: ${this.state}`);
      // }
    }
  }

  private disposeSubscription() {
    if (this.subscription !== null) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }



  private beforeBind() {

    if (!this.element.hasAttribute) {
      console.warn(this.element);
    }

    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled'; // || this.element.hasAttribute('disabled');

    this.synchronizeView(this.checked);

  }

  private beforeUnbind() {
    this.disposeSubscription();
  }

}
