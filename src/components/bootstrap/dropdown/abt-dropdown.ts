import { customElement, inject, containerless, bindable, bindingMode, children, Disposable, BindingEngine } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BootstrapDropdownSelectedItemChanged } from './abt-dropdown-selected-item-changed';


@inject(Element, EventAggregator)
// @containerless()
@customElement('abt-dropdown')
export class BootstrapDropDown {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;

  private id: any;
  private isSplit: boolean = false;
  private isBusy: boolean = false;


  private itemsValuesOrModels: Array<any> = [];

  private task: Promise<void> | null = null;
  private subscription: Disposable | null = null;

  constructor(private element: Element, private ea: EventAggregator) { // , private bindingEngine: BindingEngine) {
  }



  // #region click for button not dropdown

  private onClicked(event: any) {

    event.preventDefault();

    if (!this.click || this.disabled) {
      return;
    }

    if (this.task) {
      return;
    }

    this.isBusy = true;

    this.task = Promise.resolve(this.click({ event: event, target: this.element }))
      .then(
      () => this.clickCompleted(),
      () => this.clickCompleted()
      );
  }

  private clickCompleted() {
    this.task = null;
    this.isBusy = false;
  }

  private disposeSubscription() {
    if (this.subscription !== null) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }

  // #endregion

  private attached() {

    this.isSplit = this.element.hasAttribute('split');
    this.id = this.element.children.item(0).getAttribute('id');
  }

  private bind() {
    // bound to nothing
    if (this.value === undefined) {
      return;
    }

    this.ea.subscribe(BootstrapDropdownSelectedItemChanged, (changed: BootstrapDropdownSelectedItemChanged) => {
      // not me
      if (changed.parentId !== this.id) {
        return;
      }

      // add to the itemsValueOrModel
      if (!changed.isValueChanged) {
        this.itemsValuesOrModels.push({ value: changed.selectedItem, text: changed.selectedText });
      }

      // bound to a single object
      this.value = changed.selectedItem;
      this.title = changed.selectedText;

    });
  }

  private valueChanged(newValue: any) {
    let found = this.itemsValuesOrModels.find(x => x.value === newValue);
    this.title = found.text;
    console.log(`value:${newValue}`);
  }

  private detached() {
    this.task = null;
    // this.element.previousElementSibling.removeEventListener('click', this.onClick);
  }

}
