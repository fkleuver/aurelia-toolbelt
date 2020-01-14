import { customElement, bindable, BindingMode, containerless, INode } from '@aurelia/runtime';
import * as $ from 'jquery';
import 'jquery-lazy';

export type ScrollDirection = 'both' | 'vertical' | 'horizontal';

@containerless()
@customElement('aut-lazy-image')
export class JQueryLazyImage {

  @bindable({ mode: BindingMode.toView }) public backgroundMode: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public style: string;
  @bindable({ mode: BindingMode.oneTime }) public class: string;

  // General
  @bindable({ mode: BindingMode.toView }) public url: string;
  @bindable({ mode: BindingMode.toView }) public name: string = 'lazy';
  @bindable({ mode: BindingMode.toView }) public chainable: boolean = true;
  @bindable({ mode: BindingMode.toView }) public autoDestroy: boolean = true;
  @bindable({ mode: BindingMode.toView }) public bind: string = 'load';
  @bindable({ mode: BindingMode.toView }) public threshold: number = 500;
  @bindable({ mode: BindingMode.toView }) public visibleOnly: boolean = false;
  @bindable({ mode: BindingMode.toView }) public appendScroll: object = window;
  @bindable({ mode: BindingMode.toView }) public scrollDirection: ScrollDirection = 'both';
  @bindable({ mode: BindingMode.toView }) public imageBase: string = null;
  @bindable({ mode: BindingMode.toView }) public defaultImage: string = '';
  @bindable({ mode: BindingMode.toView }) public placeholder: string = null;
  @bindable({ mode: BindingMode.toView }) public delay: number = -1;
  @bindable({ mode: BindingMode.toView }) public combined: boolean = false;

  // Effect
  @bindable({ mode: BindingMode.toView }) public effect: string = 'show';
  @bindable({ mode: BindingMode.toView }) public effectTime: number = 0;

  // Throttle
  @bindable({ mode: BindingMode.toView }) public enableThrottle: boolean = true;
  @bindable({ mode: BindingMode.toView }) public throttle: number = 250;

  // Callbacks
  @bindable({ mode: BindingMode.twoWay }) public beforeLoad: Function;
  @bindable({ mode: BindingMode.twoWay }) public afterLoad: Function;
  @bindable({ mode: BindingMode.twoWay }) public error: Function;
  // @bindable({ mode: BindingMode.twoWay }) public onFinishedAll: Function;

  // Custom Loaders
  @bindable({ mode: BindingMode.twoWay }) public customLoader: Function;

  // Attribute

  constructor(@INode private element: Element) { }

  private afterAttach() {

    this.backgroundMode = this.backgroundMode === true || this.backgroundMode === 'true';

    if (this.customLoader !== undefined) {
      $(this.element.previousElementSibling).attr('data-loader', 'customLoader');
    }
    let config = {
      customLoader: this.customLoader,
      name: this.name,
      chainable: this.chainable,
      autoDestroy: this.autoDestroy,
      bind: this.bind,
      threshold: this.threshold,
      visibleOnly: this.visibleOnly,
      appendScroll: this.appendScroll,
      scrollDirection: this.scrollDirection,
      imageBase: this.imageBase,
      defaultImage: this.defaultImage,
      placeholder: this.placeholder,
      delay: this.delay,
      combined: this.combined,
      effect: this.effect,
      effectTime: this.effectTime,
      enableThrottle: this.enableThrottle,
      throttle: this.throttle,
      beforeLoad: this.beforeLoad,
      afterLoad: this.afterLoad,
      onError: this.error
      // ,onFinishedAll: this.onFinishedAll
    };
    // @ts-ignore
    $(this.element.previousElementSibling).lazy(config);
  }
}
