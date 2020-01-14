
import { customElement, bindable, BindingMode } from '@aurelia/runtime';

@customElement('aut-scrollup')
export class ScrollUpCustomElement {

  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public threshold: number | string = 150;
  @bindable({ mode: BindingMode.twoWay }) public beforeScrollUp: Function;
  @bindable({ mode: BindingMode.twoWay }) public afterScrollUp: Function;
  @bindable({ mode: BindingMode.twoWay }) public shownScrollUp: Function;
  @bindable({ mode: BindingMode.twoWay }) public hideScrollUp: Function;

  private scrollupButton: HTMLButtonElement;

  private checkScrollTop() {
    if (this.threshold <= 0) {
      this.threshold = 0;
    }
    if (document.body.scrollTop > this.threshold || document.documentElement.scrollTop > this.threshold) {
      this.scrollupButton.style.display = 'block';
      if (this.shownScrollUp) {
        this.shownScrollUp();
      }
    } else {
      this.scrollupButton.style.display = 'none';
      if (this.hideScrollUp) {
        this.hideScrollUp();
      }
    }
  }

  private goToUp() {
    if (this.beforeScrollUp) {
      this.beforeScrollUp();
    }
    if (!document.body.scroll) {
      window.scrollTo(0, 0);
      if (this.afterScrollUp) {
        this.afterScrollUp();
      }
      return;
    }
    document.body.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    document.documentElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (this.afterScrollUp) {
      this.afterScrollUp();
    }
  }

  private afterAttach() {
    /*
    let isMultipleInstanceAvailable = document.getElementsByClassName('aut-scrollup').length > 1;
    if (isMultipleInstanceAvailable) {
      throw Error('You cannot have multiple instances of [aut-scrollup] component, please check your DOM');
    }
    */
    this.threshold = Number(this.threshold);
    if ((window.onscroll === undefined || window.onscroll === null) ) {
      window.onscroll = () => this.checkScrollTop();
    }
  }
}
