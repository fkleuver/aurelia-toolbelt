import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { removeEmptyStrings } from 'strman';

@valueConverter('removeemptystrings')
export class RemoveEmptyStringsValueConverter {
    public toView(strings: string[]): string[] {
        return removeEmptyStrings(strings);
    }
}
