import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { toCamelCase } from 'strman';

@valueConverter('tocamelcase')
export class ToCamelCaseValueConverter {
    public toView(value: string): string {
        return toCamelCase(value);
    }
}
