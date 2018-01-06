import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

export type PlacementType = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type BoundaryType = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@inject(Element)
@customElement('abt-popover')
export class BootstrapPopoverCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animation: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public container: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delay: number | object;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public html: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: PlacementType | Function = 'right';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selector: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string | Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public trigger: string = 'click';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public offset: string | number = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundary: BoundaryType = 'scrollParent';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public template: string =
    '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showPopover: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public popoverShown: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hidePopover: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public popoverHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public popoverInserted: Function;

  private popover: Element;
  private parentElement: HTMLElement;

  constructor(private element: Element) {

  }

  private attached() {
    this.parentElement = this.element.parentElement;
    let slotContent = this.html ? this.popover.innerHTML : this.popover.textContent;
    // @ts-ignore
    $(this.parentElement).popover({
      'content': slotContent,
      'title': this.title,
      'html': this.html,
      'template': this.template,
      'animation': this.animation,
      'placement': this.placement,
      'container': this.container,
      'delay': this.delay,
      'trigger': this.trigger,
      'offset': this.offset,
      'fallbackPlacement': this.fallbackPlacement,
      'boundary': this.boundary
    });
    this.popover.remove();
    if (this.showPopover) {
      $(this.parentElement).on('show.bs.popover', this.showPopover());
    }

    if (this.popoverShown) {
      $(this.parentElement).on('shown.bs.popover', this.popoverShown());
    }

    if (this.hidePopover) {
      $(this.parentElement).on('hide.bs.popover', this.hidePopover());
    }

    if (this.popoverHidden) {
      $(this.parentElement).on('hidden.bs.popover', this.popoverHidden());
    }

    if (this.popoverInserted) {
      $(this.parentElement).on('inserted.bs.popover', this.popoverInserted());
    }
  }

  private detached() {
    // $(this.parentElement).popover('hide');
    $(this.parentElement).popover('dispose');
  }

}
