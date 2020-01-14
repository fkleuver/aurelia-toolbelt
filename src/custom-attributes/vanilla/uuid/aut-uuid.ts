import { customAttribute, INode } from '@aurelia/runtime';
import { Uuid } from '../../../utilities/vanilla/uuid';

@customAttribute('aut-uuid')
export class AUTUuidCustomAttribute {

  private id: string;
  constructor(@INode private element: Element, private idgeneratorV4: Uuid) {
  }
  private beforeBind() {
    this.id = 'a' + this.idgeneratorV4.uuidv4().replace(new RegExp('-', 'g'), '');
    // @ts-ignore
    if (this.value) {
      // @ts-ignore
      this.element.setAttribute(this.value, this.id);
    } else {
      this.element.id = this.id;

    }
  }

}
