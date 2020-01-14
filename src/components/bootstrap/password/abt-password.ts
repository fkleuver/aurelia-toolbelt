import { JsTools } from './../../../utilities/vanilla/jsTools';
import { PasswordMeter, IResult } from 'password-meter';
import {
  bindable,
  customElement, BindingMode,
} from '@aurelia/runtime';

export type ButtonColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ErrorDisplayType = 'none' | 'tooltip' | 'list';

@customElement('abt-password')
export class PasswordCustomElement {

  @bindable({ mode: BindingMode.toView }) public inputClass: string;
  @bindable({ mode: BindingMode.toView }) public inputStyle: string;
  @bindable({ mode: BindingMode.toView }) public buttonClass: string;
  @bindable({ mode: BindingMode.toView }) public buttonStyle: string;
  @bindable({ mode: BindingMode.toView }) public buttonColorType: ButtonColorType = 'secondary';
  @bindable({ mode: BindingMode.toView }) public errorIcon: string = 'fa fa-times';
  @bindable({ mode: BindingMode.toView }) public showPasswordIcon: string = 'fa fa-eye';
  @bindable({ mode: BindingMode.toView }) public hidePasswordIcon: string = 'fa fa-eye-slash';
  @bindable({ mode: BindingMode.toView }) public progressBarHeight: string = '5px';
  @bindable({ mode: BindingMode.toView }) public errorDisplayType: ErrorDisplayType = 'none';
  @bindable({ mode: BindingMode.toView }) public showProgressBar: boolean | string = true;
  @bindable({ mode: BindingMode.toView }) public size: string = 'md';
  @bindable({ mode: BindingMode.toView }) public showPercent: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public passwordVisibility: boolean | string = true;

  @bindable({ mode: BindingMode.twoWay }) public text: string;
  @bindable({ mode: BindingMode.twoWay }) public scoreRange: object = null;
  @bindable({ mode: BindingMode.twoWay }) public requirements: object = null;

  @bindable({ mode: BindingMode.twoWay }) public passwordChanged: Function;

  private isInvisible: boolean = true;
  private txtPassword: HTMLInputElement;
  private btnPassword: HTMLButtonElement;
  private iconPassword: HTMLElement;
  private errorsList: HTMLDivElement;
  private passwordTemplate: Element;

  private progressBarValue = 0;
  private percentValue = '';

  private progressBarClass: string = null;
  private progressBarColor: string = null;

  private passwordMeter: PasswordMeter;

  constructor(private jsTools: JsTools) {
  }


  private afterAttach() {

    // tslint:disable-next-line:max-line-length
    this.showProgressBar = (this.showProgressBar === '' && this.passwordTemplate.hasAttribute('show-progress-bar')) || this.showProgressBar.toString() === 'true';
    this.showPercent = (this.showPercent === '' && this.passwordTemplate.hasAttribute('show-percent')) || this.showPercent.toString() === 'true';
    // tslint:disable-next-line:max-line-length
    this.passwordVisibility = (this.passwordVisibility === '' && this.passwordTemplate.hasAttribute('password-visibility')) || this.passwordVisibility.toString() === 'true';
    let req = this.requirements;
    let range = this.getScoreRangeInfo(this.scoreRange);
    this.passwordMeter = new PasswordMeter(req, range);

    if (this.text && this.text.length > 0) {
      this.textChanged(this.text);
    }
  }

  private passwordVisibilityToggle() {
    if (this.isInvisible) {
      this.isInvisible = false;
      $(this.txtPassword).attr('type', 'text');
    } else {
      this.isInvisible = true;
      $(this.txtPassword).attr('type', 'password');
    }
  }

  private generateErrorsAsHtml(errors: any): string {
    let html = '';
    if (errors) {
      for (let index = 0; index < errors.length; index++) {
        const element = errors[index];
        html += `<div class="abt-password-error-item"><i class="abt-password-error-icon ${this.errorIcon}" aria-hidden="true"></i>${element}</div>`;
      }
    }
    return html;
  }

  private getScoreRangeInfo(scoreRange: any): any {
    let option: any = {};
    let color = '';
    let isClass: boolean = false;
    let scores = Object.keys(scoreRange);
    for (let index = 0; index < scores.length; index++) {
      let key = scores[index];
      let message = scoreRange[key].message;
      option[key] = message;
    }
    return option;
  }

  private getMinColorInfo(scoreRange: any): any {
    let scores = Object.keys(scoreRange);
    let color = null;
    let isClass = false;
    let key = scores[0];
    let message = scoreRange[key].message;
    color = scoreRange[key].color;
    isClass = color.startsWith('.');
    return {
      color: color,
      isClass: isClass
    };
  }

  private getColorInfo(scoreRange: any, status: string): any {
    let scores = Object.keys(scoreRange);
    let color = null;
    let isClass = false;
    for (let index = 0; index < scores.length; index++) {
      let key = scores[index];
      let message = scoreRange[key].message;
      if (message === status) {
        color = scoreRange[key].color;
        isClass = color.startsWith('.');
        break;
      }
    }
    if (!color) {
      return null;
    }
    return {
      color: color,
      isClass: isClass
    };
  }

  private textChanged(value: string) {

    if (!this.scoreRange) {
      throw Error("The 'score-range' property can not be null.");
    }

    if (!this.jsTools.isObject(this.scoreRange)) {
      throw Error("The 'score-range' property must be an object.");
    }

    let result = this.passwordMeter.getResult(value);
    let colorStatus = this.getColorInfo(this.scoreRange, result.status);

    if (colorStatus) {
      if (colorStatus.isClass) {
        this.progressBarClass = colorStatus.color.replace('.', '');
        this.progressBarColor = null;
      } else {
        this.progressBarClass = null;
        this.progressBarColor = colorStatus.color;
      }
    }

    if (result.score >= 0) {
      this.progressBarValue = result.percent;
      if (this.showPercent && result.score > 0) {
        this.percentValue = result.percent + '%';
      }
    } else {
      this.percentValue = '';
      this.progressBarValue = 100;
      colorStatus = this.getMinColorInfo(this.scoreRange);
      if (colorStatus.isClass) {
        this.progressBarClass = colorStatus.color.replace('.', '');
        this.progressBarColor = null;
      } else {
        this.progressBarClass = null;
        this.progressBarColor = colorStatus.color;
      }
    }

    if (result.score < 0) {
      this.percentValue = '';
      if (this.errorDisplayType === 'tooltip') {
        $(this.txtPassword).tooltip({
          'title': this.generateErrorsAsHtml(result.errors),
          'html': true,
          'animation': true,
          'placement': 'bottom',
          // tslint:disable-next-line:max-line-length
          'template': '<div class="tooltip" role="tooltip"><div class="arrow"></div><div style="max-width: 350px;" class="tooltip-inner text-left text-nowrap"></div></div>'
        });
        this.errorsList.innerHTML = '';
      } else if (this.errorDisplayType === 'list') {
        $(this.txtPassword).tooltip('dispose');
        this.errorsList.innerHTML = this.generateErrorsAsHtml(result.errors);
      } else {
        $(this.txtPassword).tooltip('dispose');
        this.errorsList.innerHTML = '';
      }
    }
    if (result.score === 0 || !result.errors) {
      $(this.txtPassword).tooltip('dispose');
      this.errorsList.innerHTML = '';
      if (result.score === 0) {
        this.percentValue = '';
      }
    }

    if (this.passwordChanged) {
      this.passwordChanged({
        result: result,
        colorStatus: colorStatus
      });
    }
  }
}
