import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { containsAll } from 'strman';

@valueConverter('containsall')
export class ContainsAllValueConverter {
    public toView(value: string, needles: string[], caseSensitive?: boolean): boolean {
        return containsAll(value, needles, caseSensitive);
    }
}
