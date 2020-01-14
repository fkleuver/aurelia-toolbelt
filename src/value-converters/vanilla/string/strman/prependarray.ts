import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { prependArray } from 'strman';

@valueConverter('prependarray')
export class PrependArrayValueConverter {
    public toView(value: string, prepends: string[]): string {
        return prependArray(value, prepends);
    }
}
