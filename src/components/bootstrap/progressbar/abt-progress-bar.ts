import { BindingMode, bindable, customElement, DOM, containerless } from '@aurelia/runtime';
export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';
@customElement('abt-progress-bar')
@containerless()
export class BootstrapProgressBar {

  @bindable({ mode: BindingMode.toView }) public type: ColorType;
  @bindable({ mode: BindingMode.toView }) public color: string;
  @bindable({ mode: BindingMode.toView }) public gradientColor: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.twoWay }) public value: number | string = 0;
  @bindable({ mode: BindingMode.toView }) public max: number | string = 100;
  @bindable({ mode: BindingMode.toView }) public animated: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public striped: boolean | string = false;

  private isAnimated: boolean = false;
  private isStriped: boolean = false;
  private progressbar: Element;
  private progressbarTemplate: Element;

  private min: number = 0;
  private progressBarValue: number;

  private afterAttach() {
    let animated = (this.animated === '' && this.progressbarTemplate.hasAttribute('animated')) || this.animated.toString() === 'true';
    let striped = (this.striped === '' && this.progressbarTemplate.hasAttribute('striped')) || this.striped.toString() === 'true';

    this.value = Number(this.value);
    this.max = Number(this.max);

    if (this.min >= this.max) {
      Error(`Min value (${this.min}) should be less than max value ( ${this.max} )`);
      return;
    }


    if (this.color && this.gradientColor) {
      this.gradientColorChanged(this.gradientColor);
    }
  }

  private valueChanged(newValue: number | string) {
    newValue = Number(newValue);
    this.progressBarValue = ( newValue * 100 ) / Number(this.max);
  }

  private gradientColorChanged(newValue: string) {
    if (this.progressbar) {
      // TODO(fkleuver): add this api to v2 // DOM.injectStyles(`
      // #${this.progressbar.id}
      // {
      //   background: -webkit-gradient(linear, left top, right top, from(${this.color}),to(${newValue})) !important;
      //   background: -webkit-linear-gradient(left, ${this.color} 0%,${newValue} 100%) !important;
      //   background: -o-linear-gradient(left, ${this.color} 0%,${newValue} 100%) !important;
      //   background: linear-gradient(left, ${this.color} 0%,${newValue} 100%) !important;
      // }
      // `);
    }
  }


}
