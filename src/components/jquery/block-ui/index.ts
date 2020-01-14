import { IAutBlockUIOption } from './aut-block-ui-option';
import { IContainer, Registration } from '@aurelia/kernel';

export * from './aut-block-ui';

export const BlockUIConfig = {
  customize(option: IAutBlockUIOption) {
    return {
      register(container: IContainer) {
        container.register(Registration.instance(IAutBlockUIOption, option));
      }
    }
  }
};
