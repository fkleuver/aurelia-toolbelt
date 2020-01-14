import { SharedIndex } from './../../../utilities/vanilla/sharedIndex';
import { customAttribute,  INode } from '@aurelia/runtime';
import { Uuid } from '../../../utilities/vanilla/uuid';

@customAttribute('aut-id')
export class IdCustomAttribute {

  private id: string;
  constructor(@INode private element: Element, private sharedIndex: SharedIndex, private idgeneratorV4: Uuid) {
  }

  private beforeBind() {
    let uuid = this.idgeneratorV4.Uuidv4ForId();
    let group = this.element.getAttribute('data-aut-id-group');
    if (!group) {
      this.element.setAttribute(uuid, 'data-aut-id-group');
      group = uuid;
    }
    this.id = 'a' + this.sharedIndex.getAndIncrement(group);
    this.element.id = this.id;
  }
}
