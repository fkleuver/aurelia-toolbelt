import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { isUpperCase } from 'strman';

@valueConverter('isuppercase')
export class IsUpperCaseValueConverter {
    public toView(value: string): boolean {
        return isUpperCase(value);
    }
}
