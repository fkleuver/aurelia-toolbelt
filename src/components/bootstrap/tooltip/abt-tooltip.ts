import { customElement, bindable, BindingMode, containerless } from '@aurelia/runtime';

export type TooltipPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type TooltipBoundary = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@customElement('abt-tooltip')
export class BootstrapTooltipCustomElement {

  @bindable({ mode: BindingMode.toView }) public container: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public delay: number | object = 0;
  @bindable({ mode: BindingMode.toView }) public placement: TooltipPlacement | Function = 'top';
  @bindable({ mode: BindingMode.toView }) public selector: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public animation: boolean | string = true;
  @bindable({ mode: BindingMode.toView }) public html: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public trigger: string = 'hover focus';
  @bindable({ mode: BindingMode.toView }) public offset: number | string = 0;
  @bindable({ mode: BindingMode.toView }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ mode: BindingMode.toView }) public boundary: TooltipBoundary = 'scrollParent';
  @bindable({ mode: BindingMode.toView }) public template: string =
    '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';

  @bindable({ mode: BindingMode.twoWay }) public bsShow: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsShown: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHide: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHidden: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsInserted: Function;

  private tooltip: Element;
  private parentElement: HTMLElement;

  private afterAttach() {
    this.parentElement = this.tooltip.parentElement;
    let slotContent = this.html ? this.tooltip.innerHTML : this.tooltip.textContent;

    this.offset = Number(this.offset);
    this.animation = (this.animation === '' && this.tooltip.hasAttribute('animation')) || this.animation.toString() === 'true';
    this.container = (this.container === '' && this.tooltip.hasAttribute('container')) || this.container.toString() === 'true';
    this.html = (this.html === '' && this.tooltip.hasAttribute('html')) || this.html.toString() === 'true';
    this.selector = (this.selector === '' && this.tooltip.hasAttribute('selector')) || this.selector.toString() === 'true';

    // @ts-ignore
    $(this.parentElement).tooltip({
      'title': slotContent,
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

    this.tooltip.remove();

    if (this.bsShow) {
      // @ts-ignore
      $(this.parentElement).on('show.bs.tooltip', () => {
        if (this.bsShow) {
          this.bsShow();
        }
      });
    }

    if (this.bsShown) {
      // @ts-ignore
      $(this.parentElement).on('shown.bs.tooltip', () => {
        if (this.bsShown) {
          this.bsShown();
        }
      });
    }

    if (this.bsHide) {
      // @ts-ignore
      $(this.parentElement).on('hide.bs.tooltip', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }

    if (this.bsHidden) {
      // @ts-ignore
      $(this.parentElement).on('hidden.bs.tooltip', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }

    if (this.bsInserted) {
      // @ts-ignore
      $(this.parentElement).on('inserted.bs.tooltip', () => {
        if (this.bsInserted) {
          this.bsInserted();
        }
      });
    }
  }

  private afterDetach() {
    $(this.parentElement).tooltip('dispose');
  }

}
