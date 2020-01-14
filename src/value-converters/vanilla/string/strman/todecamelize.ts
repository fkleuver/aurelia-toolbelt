import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { toDecamelize } from 'strman';

@valueConverter('todecamelize')
export class ToDecamelizeValueConverter {
    public toView(value: string): string {
        return toDecamelize(value);
    }
}
