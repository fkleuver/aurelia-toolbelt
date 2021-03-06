import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { at } from 'strman';

@valueConverter('at ')
export class AtValueConverter {
    public toView(value: string, index: number): string {
        return at(value, index);
    }
}
