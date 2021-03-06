import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { ensureLeft } from 'strman';

@valueConverter('ensureleft')
export class EnsureLeftValueConverter {
    public toView(value: string, substr: string, caseSensitive?: boolean): string {
        return ensureLeft(value, substr, caseSensitive);
    }
}
