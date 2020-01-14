import { customElement, containerless, bindable, BindingMode, INode } from '@aurelia/runtime';


import * as $ from 'jquery';
import 'metismenu';

@containerless()
@customElement('aut-metis-menu')
export class JQueryMetisMenu {

    private metismenu: HTMLUListElement;

    @bindable({ mode: BindingMode.oneTime }) public class: string = '';
    @bindable({ mode: BindingMode.oneTime }) public style: string = '';

    @bindable({ mode: BindingMode.twoWay }) public showMenu: Function;
    @bindable({ mode: BindingMode.twoWay }) public shownMenu: Function;
    @bindable({ mode: BindingMode.twoWay }) public hideMenu: Function;
    @bindable({ mode: BindingMode.twoWay }) public hiddenMenu: Function;


    constructor(@INode private element: Element) {
    }

    private afterAttach() {
        // @ts-ignore
        $(this.metismenu).metisMenu()
            .on('show.metismenu', (event: any) => {
                console.log(`show menu: ${JSON.stringify(event)}`);

                console.log(this.showMenu);
                let localEvent = this.showMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('shown.metismenu', (event: any) => {

                /** auto scroll */

                // var navbarHeight = $('.navbar').height();

                // $('body,html').animate({
                //     scrollTop: $(event.target).parent('li').position().top - navbarHeight
                //   }, 600);
                /***************************************************************************** */

                console.log(`shown menu: ${JSON.stringify(event)}`);

                let localEvent = this.shownMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('hide.metismenu', (event: any) => {

                console.log(`hide menu: ${JSON.stringify(event)}`);

                let localEvent = this.hideMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('hidden.metismenu', (event: any) => {

                console.log(`menu hidden: ${JSON.stringify(event)}`);

                let localEvent = this.hiddenMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            });
    }

    private afterDetach() {
        // dispose to avoid memory leak
        // @ts-ignore
        $(this.metismenu).metisMenu('dispose');
    }

}
