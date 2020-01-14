import { customAttribute, INode } from '@aurelia/runtime';
import { Uuid } from '../../../utilities/vanilla/uuid';

@customAttribute('aut-id-group')
export class UuidCustomAttribute {

  private id: string;
  constructor(@INode private element: Element, private idgeneratorV4: Uuid) {
  }
  private beforeBind() {

    // @ts-ignore
    if (this.value) {
      // @ts-ignore
      this.element.setAttribute(this.value, 'data-aut-id-group');
    } else {
      this.element.setAttribute(this.idgeneratorV4.Uuidv4ForId(), 'data-aut-id-group');
    }

  }

}
