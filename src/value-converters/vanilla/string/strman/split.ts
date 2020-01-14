import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { split } from 'strman';

@valueConverter('split')
export class SplitValueConverter {
    public toView(value: string, separator: string, limit?: number): string[] {
        return split(value, separator, limit);
    }
}
