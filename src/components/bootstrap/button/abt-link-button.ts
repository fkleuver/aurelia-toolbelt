import { customElement, containerless, bindable, BindingMode, INode } from '@aurelia/runtime';


@containerless()
@customElement('abt-link-button')
export class BootstrapLinkButton {

  @bindable({ mode: BindingMode.oneTime }) public type: string = 'primary';
  @bindable({ mode: BindingMode.oneTime }) public size: string = 'md';

  @bindable({ mode: BindingMode.oneTime }) public outline: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public block: boolean | string = false;

  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';

  @bindable({ mode: BindingMode.toView }) public href: string = '';
  @bindable({ mode: BindingMode.oneTime }) public id: string;

  @bindable({ mode: BindingMode.twoWay }) public click: Function;
  @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string;

  private isBusy: boolean = false;
  private task: Promise<void> | null = null;

  constructor(@INode private element: Element) { }

  private afterAttach() {

    const onlyOutlineAttribute = (this.outline === '' && this.element.hasAttribute('outline'));
    this.outline = onlyOutlineAttribute || this.outline === 'true' || this.outline === true;

    const onlyBlockAttribute = (this.block === '' && this.element.hasAttribute('block'));
    this.block = onlyBlockAttribute || this.block === 'true' || this.block === true;

    const onlyDisabledAttribute = (this.disabled === '' && this.element.hasAttribute('disabled'));
    this.disabled = onlyDisabledAttribute || this.disabled === 'true' || this.disabled === true;

  }

  private onClick(event: Event) {

    if (!this.click) {
      return true;
    }

    event.preventDefault();

    if (this.task || this.disabled) {
      return false;
    }

    this.isBusy = true;

    this.task = Promise.resolve(this.click({ event: event, target: event.target }))
      .then(
        () => this.clickCompleted(),
        () => this.clickCompleted()
      );

    return false;
  }

  private clickCompleted() {
    this.task = null;
    this.isBusy = false;
  }

  private afterDetach() {
    this.task = null;
  }
}
