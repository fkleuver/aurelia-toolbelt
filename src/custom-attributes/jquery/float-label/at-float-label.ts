import {
  bindable,
  BindingMode,
  containerless,
  customAttribute,
  DOM,
  INode
} from '@aurelia/runtime';

export type FloatInputDirection = 'auto' | 'rtl' | 'ltr';

const jfl = require('aureliatoolbelt-thirdparty/jquery.float-label/jquery.float-label.js');
// import 'aureliatoolbelt-thirdparty/jquery.float-label/jquery.float-label.css';

@customAttribute('at-float-label')
export class AureliaToolbeltFloatLabel {
  @bindable({ mode: BindingMode.oneTime })
  public class: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public style: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public direction: FloatInputDirection = 'auto';
  @bindable({ mode: BindingMode.toView, primary: true })
  public text: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public right: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public left: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public paddingTop: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public color: string = '';
  @bindable({ mode: BindingMode.oneTime })
  public fontSize: string = '';

  private label: HTMLLabelElement;
  private div: HTMLDivElement;

  constructor(@INode private element: HTMLInputElement) {
    // tslint:disable-next-line:max-line-length
    // TODO(fkleuver): add this api to v2 // DOM.injectStyles(`.at-float-label{position:relative;padding-top:18px}.at-float-label-rtl{right:0}.at-float-label-ltr{left:0}.at-float-label>.float-label{position:absolute;top:3px;-webkit-transition:top .3s ease-in-out,opacity .3s ease-in-out;transition:top .3s ease-in-out,opacity .3s ease-in-out;opacity:0;font-size:13px}.at-float-label>.float-label.show{top:-3px;opacity:1}` , null , null , 'float-label');
  }

  private isTextBox(element: Element) {
    let tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea') {
      return true;
    }
    if (tagName !== 'input') {
      return false;
    }
    let type = element.getAttribute('type').toLowerCase(),
      // if any of these input types is not supported by a browser, it will behave as input type text.
      inputTypes = [
        'text',
        'password',
        'number',
        'email',
        'tel',
        'url',
        'search',
        'date',
        'datetime',
        'datetime-local',
        'time',
        'month',
        'week'
      ];
    return inputTypes.indexOf(type) >= 0;
  }

  private insertAfter(newChild: Node, refChild: Node) {
    refChild.parentNode.insertBefore(newChild, refChild.nextSibling);
  }

  /*private injectJavascriptText(text: string, id?: string) {
    if (id) {
      if (document.getElementById(id)) {
        return;
      }
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = text;
    if (id) {
      script.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  private injectJavascriptUrl(url: string, id?: string) {
    if (id) {
      if (document.getElementById(id)) {
        return;
      }
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (id) {
      script.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }*/

  private isNullOrEmpty(text: string): boolean {
    if (text === undefined || text === null || text === '') {
      return true;
    } else {
      return false;
    }
  }
  private isBootstrapColor(text: string): boolean {
    if (text === undefined || text === null || text === '') {
      return false;
    }
    let btColors = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
      'muted',
      'white',
      'black'
    ];
    let result = btColors.indexOf(text) > -1;
    return result;
  }

  private afterAttach() {
    console.log(' ############  attache of at-float-label');
    console.log(this.element);
    console.log('############ attache of at-float-label');

    if (!this.isTextBox(this.element)) {
      Error('at-float-label works on `input` elements.');
    }

    let textContent =
      this.text === '' ? this.element.getAttribute('placeholder') : this.text;
    if (this.isNullOrEmpty(textContent)) {
      return;
    }
    this.element.classList.add('float-input');
    let dir = getComputedStyle(this.element).direction;
    let textAlign = this.element.style.textAlign;

    this.label = <HTMLLabelElement>document.createElement('LABEL');
    this.label.textContent = textContent;
    this.label.htmlFor = this.element.id;
    this.label.classList.add('float-label');

    if (this.color === '') {
      this.label.classList.add('text-black');
    } else {
      if (this.isBootstrapColor(this.color)) {
        this.label.classList.add('text-' + this.color);
      } else {
        this.label.style.color = this.color;
      }
    }

    if (this.direction === 'auto') {
      if (dir === 'rtl' || textAlign === 'right') {
        this.label.classList.add('at-float-label-rtl');
      } else {
        this.label.classList.add('at-float-label-ltr');
      }
    } else {
      this.label.classList.add(
        this.direction === 'ltr' ? 'at-float-label-ltr' : 'at-float-label-rtl'
      );
    }

    let parent = this.element.parentElement;
    if (parent instanceof HTMLDivElement) {
      this.div = parent;
      parent.classList.add('at-float-label');
      this.insertAfter(this.label, this.element);
    } else {
      this.div = <HTMLDivElement>document.createElement('DIV');
      this.div.setAttribute('class', 'at-float-label');
      this.div.appendChild(this.label);
      this.insertAfter(this.div, this.element);
      this.div.appendChild(this.element);
    }

    if (!this.isNullOrEmpty(this.class)) {
      this.class.split(' ').forEach(x => this.label.classList.add(x));
    }
    if (!this.isNullOrEmpty(this.style)) {
      this.label.setAttribute('style', this.style);
    }

    if (!this.isNullOrEmpty(this.paddingTop)) {
      this.div.style.paddingTop = this.paddingTop;
    }
    if (!this.isNullOrEmpty(this.right)) {
      if (this.label.classList.contains('at-float-label-rtl')) {
        this.label.style.right = this.right;
      }
    }
    if (!this.isNullOrEmpty(this.left)) {
      if (this.label.classList.contains('at-float-label-ltr')) {
        this.label.style.left = this.left;
      }
    }
    if (!this.isNullOrEmpty(this.fontSize)) {
      this.label.style.fontSize = this.fontSize;
    }
  }
}
