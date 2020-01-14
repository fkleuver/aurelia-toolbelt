import { bindable, BindingMode, INode, IScheduler, customElement } from '@aurelia/runtime';

import * as $ from 'jquery';

@customElement('abt-navs')
export class BootstrapNavs {


  @bindable({ mode: BindingMode.toView }) public navsVerticalClass: string = 'col-sm-3';
  @bindable({ mode: BindingMode.toView }) public contentVerticalClass: string = 'col-sm-9';

  @bindable({ mode: BindingMode.toView }) public navsClass: string;
  @bindable({ mode: BindingMode.toView }) public navsStyle: string;

  @bindable({ mode: BindingMode.toView }) public contentClass: string;
  @bindable({ mode: BindingMode.toView }) public contentStyle: string;


  @bindable({ mode: BindingMode.oneTime }) public bsShow: Function;
  @bindable({ mode: BindingMode.oneTime }) public bsHide: Function;
  @bindable({ mode: BindingMode.oneTime }) public bsShown: Function;
  @bindable({ mode: BindingMode.oneTime }) public bsHidden: Function;


  @bindable({ mode: BindingMode.oneTime }) public tabs: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public pills: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public vertical: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public justify: boolean | string = false;
  @bindable({ mode: BindingMode.oneTime }) public fill: boolean | string = false;

  private beTab: boolean = true;
  private bePills: boolean = false;

  constructor(
    @INode private element: Element,
    @IScheduler private scheduler: IScheduler,
  ) { }

  private afterAttach() {

    const onlyPillsAttribute = (this.pills === '' && this.element.hasAttribute('pills'));
    this.pills = onlyPillsAttribute || this.pills.toString() === 'true';

    const onlyTabsAttribute = (this.tabs === '' && this.element.hasAttribute('tabs'));
    this.tabs = onlyTabsAttribute || this.tabs.toString() === 'true';

    const onlyVerticalAttribute = (this.vertical === '' && this.element.hasAttribute('vertical'));
    this.vertical = onlyVerticalAttribute || this.vertical.toString() === 'true';

    const onlyJustifiedAttribute = (this.justify === '' && this.element.hasAttribute('justify'));
    this.justify = onlyJustifiedAttribute || this.justify.toString() === 'true';

    const onlyFillAttribute = (this.fill === '' && this.element.hasAttribute('fill'));
    this.fill = onlyFillAttribute || this.fill.toString() === 'true';


    this.beTab = this.tabs;
    this.bePills = this.pills;


    if (this.justify && this.fill) {
      let error = new Error(`The [abt-navs] should have either 'fill' or 'justify' attributes, and not both of them simultaneously.`);
      throw error;
    }


    // NOTE(fkleuver): this is what maps directly to TaskQueue.queueTask in terms of timing (both use setTimeout), but I'm quite sure this is not actually needed. If it is, though, it might be preferable to use queueRenderTask instead (which uses rAF)
    this.scheduler.queueMacroTask(() => this.afterAttached());
  }

  private afterAttached() {
    // let children = this.element.children.item(0).children.item(0).getElementsByTagName('a[active]');
    // console.log( children.length );
    // $(children).tab('show');
    this.handle_events();
  }


  private handle_events() {
    // all a tags which are going to be tabs/pills
    let children = this.element.children.item(0).children.item(0).getElementsByTagName('a');

    if (this.bsShow) {
      $(children).on('show.bs.tab', (event: any) => {
        if (this.bsShow) {
          this.bsShow({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }

    if (this.bsShown) {
      $(children).on('shown.bs.tab', (event: any) => {
        if (this.bsShown) {
          this.bsShown({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }


    if (this.bsHide) {
      $(children).on('hide.bs.tab', (event: any) => {
        if (this.bsHide) {
          this.bsHide({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }

    if (this.bsHidden) {
      $(children).on('hidden.bs.tab', (event: any) => {
        if (this.bsHidden) {
          this.bsHidden({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }

  }

  private afterDetach() {
    let children = this.element.children.item(0).children.item(0).getElementsByTagName('a');
    $(children).off('show.bs.tab');
    $(children).off('shown.bs.tab');
    $(children).off('hide.bs.tab');
    $(children).off('hidden.bs.tab');
    $(children).tab('dispose');
  }
}
