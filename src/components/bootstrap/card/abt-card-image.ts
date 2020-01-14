import { containerless, customElement, bindable, BindingMode, INode } from '@aurelia/runtime';

@containerless()
@customElement('abt-card-image')
export class BootstrapCardImage {

    @bindable({ mode: BindingMode.oneTime }) public alt: string;
    @bindable({ mode: BindingMode.toView }) public style: string;
    @bindable({ mode: BindingMode.toView }) public class: string;

    @bindable({ mode: BindingMode.toView }) public src: string;

    private cssClass: string = 'card-img';

    constructor(@INode private element: Element) { }

    private afterAttach() {

        let beOnBottom = this.element.hasAttribute('bottom');
        let beOnTop = this.element.hasAttribute('top');

        if (beOnBottom && beOnTop) {
            let error = new Error(`The [abt-card-image] should have either 'top' or 'bottom' attributes, and not both of them simultaneously.`);
            throw error;
        }

        this.cssClass += beOnBottom ? '-bottom' : beOnTop ? '-top' : '';

    }

}
