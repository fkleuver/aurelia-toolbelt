import { customElement, bindable, BindingMode, containerless } from '@aurelia/runtime';

export type PopoverPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type PopoverBoundary = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@customElement('abt-popover')
export class BootstrapPopoverCustomElement {

  @bindable({ mode: BindingMode.toView }) public animation: boolean | string = true;
  @bindable({ mode: BindingMode.toView }) public container: boolean | string | Element = false;
  @bindable({ mode: BindingMode.toView }) public delay: number | object = 0;
  @bindable({ mode: BindingMode.toView }) public html: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public placement: PopoverPlacement | Function = 'right';
  @bindable({ mode: BindingMode.toView }) public selector: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public title: string | Element | Function = '';
  @bindable({ mode: BindingMode.toView }) public trigger: string = 'click';
  @bindable({ mode: BindingMode.toView }) public offset: number | string = 0;
  @bindable({ mode: BindingMode.toView }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ mode: BindingMode.toView }) public boundary: PopoverBoundary = 'scrollParent';
  @bindable({ mode: BindingMode.toView }) public template: string =
    '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>';

  @bindable({ mode: BindingMode.twoWay }) public bsShow: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsShown: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHide: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHidden: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsInserted: Function;

  private popover: Element;
  private popoverTemplate: Element;
  private parentElement: HTMLElement;

  private afterAttach() {
    this.parentElement = this.popover.parentElement;
    let slotContent = this.html ? this.popover.innerHTML : this.popover.textContent;

    this.offset = Number(this.offset);
    this.animation = (this.animation === '' && this.popoverTemplate.hasAttribute('animation')) || this.animation.toString() === 'true';
    this.container = (this.container === '' && this.popoverTemplate.hasAttribute('container')) || this.container.toString() === 'true';
    this.html = (this.html === '' && this.popoverTemplate.hasAttribute('html')) || this.html.toString() === 'true';
    this.selector = (this.selector === '' && this.popoverTemplate.hasAttribute('selector')) || this.selector.toString() === 'true';

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

    if (this.bsShow) {
      // @ts-ignore
      $(this.parentElement).on('show.bs.popover', () => {
        if (this.bsShow) {
          this.bsShow();
        }
      });
    }

    if (this.bsShown) {
      // @ts-ignore
      $(this.parentElement).on('shown.bs.popover', () => {
        if (this.bsShown) {
          this.bsShown();
        }
      });
    }

    if (this.bsHide) {
      // @ts-ignore
      $(this.parentElement).on('hide.bs.popover', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }
    if (this.bsHidden) {
      // @ts-ignore
      $(this.parentElement).on('hidden.bs.popover', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }

    if (this.bsInserted) {
      // @ts-ignore
      $(this.parentElement).on('inserted.bs.popover', () => {
        if (this.bsInserted) {
          this.bsInserted();
        }
      });
    }
  }

  private afterDetach() {
    // $(this.parentElement).popover('hide');
    $(this.parentElement).popover('dispose');
  }

}
