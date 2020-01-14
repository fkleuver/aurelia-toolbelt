import { ToastrService } from './toastr-service';

import * as toastr from 'toastr';
import { IContainer, Registration } from '@aurelia/kernel';

function configure(container: IContainer, options?: ToastrOptions) {
  if (options !== void 0) {
    toastr.options.closeButton = true;
    toastr.options.progressBar = options.progressBar;
    toastr.options.preventDuplicates = options.preventDuplicates;
    toastr.options.positionClass = options.positionClass;
  }
  // TODO(fkleuver): need to loosen the typings for Registration.singleton so that a callback can be provided for lazy instances
  container.register(Registration.instance(ToastrService, new ToastrService(toastr)));
}

// TODO(fkleuver): need to add a cleaner api contract for a config export with optional customization
export const ToastrConfig = {
  register(container: IContainer) {
    configure(container);
  },
  customize(options: ToastrOptions) {
    return {
      register(container: IContainer) {
        configure(container, options);
      },
    };
  },
};

