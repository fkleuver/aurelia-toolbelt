import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { containsAny } from 'strman';

@valueConverter('containsany')
export class ContainsAnyValueConverter {
    public toView(value: string, needles: string[], caseSensitive?: boolean): boolean {
        return containsAny(value, needles, caseSensitive);
    }
}
