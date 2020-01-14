import { customElement, bindable, BindingMode, containerless, DOM } from '@aurelia/runtime';

export type FloatInputPlacement = 'sm' | 'md' | 'lg';
@containerless()
@customElement('abt-float-input')
export class BootstrapFloatInput {
  @bindable({ mode: BindingMode.oneTime }) public id: string;
  @bindable({ mode: BindingMode.toView }) public style: string;
  @bindable({ mode: BindingMode.toView }) public class: string;
  @bindable({ mode: BindingMode.toView }) public placeholder: string ;
  @bindable({ mode: BindingMode.toView }) public placeholderFontSize: string ;
  @bindable({ mode: BindingMode.toView }) public labelFontSize: string ;
  @bindable({ mode: BindingMode.toView }) public placeholderOpacity: string ;
  @bindable({ mode: BindingMode.toView }) public placeholderTop: string;
  @bindable({ mode: BindingMode.toView }) public size: FloatInputPlacement = 'md';
  @bindable({ mode: BindingMode.toView }) public type: string = 'text';
  @bindable({ mode: BindingMode.toView }) public labelColor: string ;
  @bindable({ mode: BindingMode.toView }) public placeholderColor: string ;
  @bindable({ mode: BindingMode.toView }) public required: boolean | string = false;
  @bindable({ mode: BindingMode.toView }) public readonly: boolean | string = false;
  @bindable({ mode: BindingMode.twoWay }) public value: string;
  private floatInput: HTMLInputElement;
  private floatInputLabel: HTMLLabelElement;
  private floatInputTemplate: Element;

  private afterAttach() {

    if (this.value) {
    this.floatInput.value = this.value;
    }

  let t =  this.floatInputTemplate.hasAttribute('required');
  let tt =  this.floatInputTemplate.hasAttribute('readonly');



     const isRequired = (this.required === '' && this.floatInputTemplate.hasAttribute('required')) || this.required.toString() === 'true';
     const isReadOnly = (this.readonly === '' && this.floatInputTemplate.hasAttribute('readonly')) || this.readonly.toString() === 'true';

     this.floatInput.required = isRequired;
     this.floatInput.readOnly = isReadOnly;


    let id = this.floatInputLabel.id;
    let fontSize = '';
    let top = '';

    if (!this.floatInput.classList.contains('form-control')) {
      this.floatInput.classList.add('form-control');
    }
    if (this.floatInput.classList.contains('form-control-sm')) {
      this.size = 'sm';
    }
    if (this.floatInput.classList.contains('form-control-lg')) {
      this.size = 'lg';
    }

    if (this.size === 'sm') {
      this.floatInput.classList.add('form-control-sm');
      fontSize = '90%';
      top = '.5em';
    } else if (this.size === 'lg' || this.floatInput.classList.contains('form-control-lg')) {
      this.floatInput.classList.add('form-control-lg');
      fontSize = '120%';
      top = '.7em';
    } else {
      this.floatInput.classList.remove('form-control-sm');
      this.floatInput.classList.remove('form-control-lg');
      fontSize = '100%';
      top = '.7em';
    }

    if (this.floatInput.classList.contains('form-control')) {
      this.floatInputLabel.classList.add('has-float-label');

      let style = `
                  #${id}.has-float-label .form-control:placeholder-shown:not(:focus) + * {
                    color : ${this.placeholderColor || 'black'} !important;
                    font-size: ${this.placeholderFontSize || fontSize} !important;
                    opacity: ${this.placeholderOpacity || '.5'} !important;
                    top: ${this.placeholderTop || top} !important;
                  }
                  #${id}.has-float-label label, #${id}.has-float-label > span
                  {
                    color : ${this.labelColor || 'black'} !important;
                    font-size: ${this.labelFontSize || '75%'} !important;
                  }`;

      // TODO(fkleuver): add this api to v2 // DOM.injectStyles(style, null, null, 's' + id);
    }
  }
}
