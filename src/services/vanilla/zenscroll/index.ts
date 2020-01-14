import { ZenscrollService } from './zenscroll-service';
import * as zenscroll from 'zenscroll';
import { IContainer, Registration } from '@aurelia/kernel';

export const ZenscrollConfig = {
  register(container: IContainer) {
    container.register(Registration.instance(ZenscrollService, zenscroll));
  }
}
