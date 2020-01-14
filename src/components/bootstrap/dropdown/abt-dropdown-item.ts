import { customElement, containerless, bindable, BindingMode, INode } from '@aurelia/runtime';
import { BootstrapDropdownSelectedItemChanged } from './abt-dropdown-selected-item-changed';
import { IEventAggregator } from '@aurelia/kernel';

@containerless()
@customElement('abt-dropdown-item')
export class BootstrapDropdownItem {


  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public disabled: boolean | string = null;

  @bindable({ mode: BindingMode.twoWay }) public value: any;
  @bindable({ mode: BindingMode.twoWay }) public model: any;

  private dropdownId: any;

  private item: HTMLDivElement;

  constructor(
    @IEventAggregator private ea: IEventAggregator,
    @INode private element: Element,
  ) { }

  private afterAttach() {

    this.dropdownId = this.item.parentElement.parentElement.getAttribute('data-id');

    this.disabled = this.disabled === '' || this.disabled;

    if (this.model !== undefined || this.value !== undefined) {
      let selectedValue = this.model !== undefined
        ? this.model
        : this.value !== undefined
          ? this.value
          : undefined;
      this.ea.publish(new BootstrapDropdownSelectedItemChanged(this.dropdownId, selectedValue, this.item.innerText, false));
    }

  }

  private onClick() {

    if (this.disabled) {
      return;
    }

    if (this.model !== undefined || this.value !== undefined) {
      let selectedValue = this.model !== undefined
        ? this.model
        : this.value !== undefined
          ? this.value
          : undefined;
      this.ea.publish(new BootstrapDropdownSelectedItemChanged(this.dropdownId, selectedValue, this.item.innerText));
    }
  }
}

