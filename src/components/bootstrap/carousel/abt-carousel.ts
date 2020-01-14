import { customElement, BindingMode, bindable } from '@aurelia/runtime';
import * as $ from 'jquery';

@customElement('abt-carousel')
export class CarouselCustomElement {
  @bindable({ mode: BindingMode.oneTime }) public prevTitle: string = 'Previous';
  @bindable({ mode: BindingMode.oneTime }) public nextTitle: string = 'Next';
  @bindable({ mode: BindingMode.oneTime }) public prevIcon: string = 'carousel-control-prev-icon';
  @bindable({ mode: BindingMode.oneTime }) public nextIcon: string = 'carousel-control-next-icon';

  @bindable({ mode: BindingMode.toView }) public navigator: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public indicator: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public interval: number | string = 5000;
  @bindable({ mode: BindingMode.toView }) public keyboard: boolean | string = true;
  @bindable({ mode: BindingMode.toView }) public pause: false | 'hover' = false;
  @bindable({ mode: BindingMode.toView }) public ride: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public wrap: boolean | string = true;

  @bindable({ mode: BindingMode.twoWay }) public bsSlide: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsSlid: Function;


  private showNavigator = false;
  private showIndicator = false;

  private carousel: Element;
  private carouselTemplate: Element;

  private afterAttach() {

    this.interval = Number(this.interval);
    this.showNavigator = (this.navigator === '' && this.carouselTemplate.hasAttribute('navigator')) || this.navigator.toString() === 'true';
    this.showIndicator = (this.indicator === '' && this.carouselTemplate.hasAttribute('indicator')) || this.navigator.toString() === 'true';
    this.keyboard = (this.keyboard === '' && this.carouselTemplate.hasAttribute('keyboard')) || this.keyboard.toString() === 'true';
    this.ride = (this.ride === '' && this.carouselTemplate.hasAttribute('ride')) || this.ride.toString() === 'true';
    this.wrap = (this.wrap === '' && this.carouselTemplate.hasAttribute('wrap')) || this.wrap.toString() === 'true';

    $(this.carousel).carousel({
      interval: this.interval,
      keyboard: this.keyboard,
      wrap: this.wrap,
      pause: this.pause
    });
    if (this.bsSlide) {
      $(this.carousel).on('slide.bs.carousel', () => {
        if (this.bsSlide) {
          this.bsSlide();
        }
      });
    }

    if (this.bsSlid) {
      $(this.carousel).on('slid.bs.carousel', () => {
        if (this.bsSlid) {
          this.bsSlid();
        }
      });
    }
  }

  private afterDetach() {
    $(this.carousel).carousel('dispose');
  }
}
