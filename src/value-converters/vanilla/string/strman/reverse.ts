import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { reverse } from 'strman';

@valueConverter('reverse')
export class ReverseValueConverter {
    public toView(value: string): string {
        return reverse(value);
    }
}
