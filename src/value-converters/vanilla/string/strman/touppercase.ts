import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { toUpperCase } from 'strman';

@valueConverter('touppercase')
export class ToUpperCaseValueConverter {
    public toView(value: string): string {
        return toUpperCase(value);
    }
}
