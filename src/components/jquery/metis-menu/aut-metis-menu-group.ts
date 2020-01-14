import { customElement, bindable, BindingMode, containerless, INode } from '@aurelia/runtime';



@containerless()
@customElement('aut-metis-menu-group')

export class JQueryMetisGroup {

    @bindable({ mode: BindingMode.toView }) public text: string;

    @bindable({ mode: BindingMode.oneTime }) public groupClass: string = '';
    @bindable({ mode: BindingMode.oneTime }) public iconClass: string = '';
    @bindable({ mode: BindingMode.oneTime }) public arrowClass: string = ' fa arrow';

    @bindable({ mode: BindingMode.oneTime }) public active: string | boolean = false;
    @bindable({ mode: BindingMode.oneTime }) public showArrow: string | boolean = true;



    constructor(@INode private element: Element) {}

    private afterAttach() {

        this.active = this.active === true
            || this.active === 'true'
            || ((this.active === undefined || this.active == null) && this.element.hasAttribute('active'));

        this.showArrow = this.showArrow === true
            || this.showArrow === 'true'
            || ((this.showArrow === undefined || this.showArrow == null) && this.element.hasAttribute('showArrow'));
    }
}
