import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { last } from 'strman';

@valueConverter('last')
export class LastValueConverter {
    public toView(value: string, n: number): string {
        return last(value, n);
    }
}
