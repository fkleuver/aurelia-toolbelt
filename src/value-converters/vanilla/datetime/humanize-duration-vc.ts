
import { valueConverter } from '@aurelia/runtime';

const humanizeDuration = require('humanize-duration');

@valueConverter('humanize')
export class HumanizeValueConverter {
  public toView(value: number, options: any): string {

    return humanizeDuration(value, options);

  }
}
