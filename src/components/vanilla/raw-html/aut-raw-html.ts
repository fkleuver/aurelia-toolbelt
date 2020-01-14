
import { customElement, INode } from '@aurelia/runtime';

@customElement('aut-raw-html')
export class RawHtmlRenderer {


  private content: string;
  private renderer: HTMLDivElement;
  private dummy: HTMLDivElement;

  constructor(@INode private element: Element) {
  }

  private afterAttach() {

    this.content = this.dummy.innerHTML.replace('<!--slot-->' , '');
    this.dummy.remove();
  }


}
