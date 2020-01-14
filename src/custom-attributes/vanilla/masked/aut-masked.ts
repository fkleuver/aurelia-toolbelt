import { customAttribute, BindingMode, bindable, INode } from '@aurelia/runtime';

const InputMask = require('inputmask');

@customAttribute('aut-masked')
export class MaskedInputCustomAttribute {


  @bindable({ mode: BindingMode.toView, primary: true }) public mask: String;
  @bindable({ mode: BindingMode.toView }) public regex: String | RegExp;

  constructor(@INode private element: Element) {
  }


  private maskChanged(newMask: String) {
    // console.log(newMask);
    let im = new InputMask(newMask);
    im.mask(this.element);
  }

  private regexChanged(newRegex: String | RegExp) {
    let im = new InputMask({ regex: newRegex });
    im.mask(this.element);
  }

}
