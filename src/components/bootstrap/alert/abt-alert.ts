import { customElement, bindable, BindingMode, INode, IScheduler } from '@aurelia/runtime';

import * as $ from 'jquery';

// @containerless()
@customElement('abt-alert')
export class BootstrapAlert {

  @bindable({ mode: BindingMode.oneTime }) public size: string = 'md';
  @bindable({ mode: BindingMode.oneTime }) public type: string = 'primary';
  @bindable({ mode: BindingMode.oneTime }) public animate: boolean | string = true;
  @bindable({ mode: BindingMode.oneTime }) public countdown: number | string = 0;


  @bindable({ mode: BindingMode.toView }) public style: string = '';
  @bindable({ mode: BindingMode.toView }) public class: string = '';
  @bindable({ mode: BindingMode.toView }) public dismissible: boolean | string = false;

  @bindable({ mode: BindingMode.toView }) public showAlert: boolean = true;

  @bindable({ mode: BindingMode.twoWay }) public bsShow: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsShown: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHide: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHidden: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsClose: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsClosed: Function;
  @bindable({ mode: BindingMode.twoWay }) public countdownChanged: Function;


  private alert: HTMLDivElement;

  private isHover: boolean;
  private countdown_timer: any;
  private local_countdown: number;

  constructor(
    @INode private element: Element,
    @IScheduler private scheduler: IScheduler,
  ) {}

  private afterAttach() {

    const onlyDismissibleAttribute = (this.dismissible === '' && this.element.hasAttribute('dismissible'));
    this.dismissible = onlyDismissibleAttribute || this.dismissible.toString() === 'true';

    const onlyAnimateAttribute = (this.animate === '' && this.element.hasAttribute('animate'));
    this.animate = onlyAnimateAttribute || this.animate === 'true' || this.animate === true;

    this.countdown = Number(this.countdown);

    if (this.bsClose) {
      $(alert).on('close.bs.alert', () => {
        if (this.bsClose) {
          this.bsClose();
        }
      });
    }

    if (this.bsClosed) {
      $(alert).on('closed.bs.alert', () => {
        if (this.bsClosed) {
          this.bsClosed();
        }
      });
    }

    // NOTE(fkleuver): this is what maps directly to TaskQueue.queueTask in terms of timing (both use setTimeout), but I'm quite sure this is not actually needed. If it is, though, it might be preferable to use queueRenderTask instead (which uses rAF)
    this.scheduler.queueMacroTask(() => this.afterAttached());
  }

  private afterAttached() {

    // negative count downs is not acceptable and zero means till eternity
    if (this.countdown > 0) {

      this.alert.addEventListener('mouseover', () => { this.isHover = true; });
      this.alert.addEventListener('mouseout', () => { this.isHover = false; });

      // tslint:disable-next-line:triple-equals
      if (this.showAlert == true) {
        this.local_countdown = Number(this.countdown);
        this.countdown_timer = setInterval(() => this.counter(), 1000);
      }
    }
  }

  private counter() {

    if (this.isHover) {
      return;
    }

    this.local_countdown--;
    if (this.countdownChanged) { this.countdownChanged({ current: this.local_countdown }); }

    if (this.local_countdown === 0) {

      clearInterval(this.countdown_timer);

      this.showAlert = false;                          // signals showAlertChanged
    }
  }


  private async showAlertChanged(newValue: boolean) {

    // the alert changes its state from hidden to show and it contains a countdown value, thus should start a timer
    if (newValue && this.countdown > 0) {

      this.local_countdown = Number(this.countdown);  //  resets the local_countdown for further show-alert = true
      this.countdown_timer = setInterval(() => this.counter(), 1000);
    }

    if (newValue) {

      let continueShow = true;

      if (this.bsShow) {
        continueShow = (await this.bsShow({ target: this.alert }));
      }

      continueShow = continueShow === undefined || continueShow === null ? true : continueShow;

      if (!continueShow) {
        this.showAlert = !newValue;
        return;
      }

      if (this.animate) {
        $(this.alert).fadeIn();
      } else {
        $(this.alert).show();
      }

      if (this.bsShown) {
        this.bsShown({ target: this.alert });
      }

    } else {

      let continueHide = true;

      if (this.bsHide) {
        continueHide = (await this.bsHide({ target: this.alert }));
      }

      continueHide = continueHide === undefined || continueHide === null ? true : continueHide;

      if (!continueHide) {
        this.showAlert = !newValue;
        return;
      }

      if (this.animate) {
        $(this.alert).fadeOut();
      } else {
        $(this.alert).hide();
      }

      // clears the interval, since the alert is already hidden so there is no need for a timer.
      clearInterval(this.countdown_timer);

      if (this.bsHidden) {
        this.bsHidden({ target: this.alert });
      }

    }

  }

  private afterDetach() {
    // this is necessary for those alerts with countdown that have not reached their time limit
    clearInterval(this.countdown_timer);

    $(this.alert).alert('close');
    $(this.alert).alert('dispose');
  }

}
