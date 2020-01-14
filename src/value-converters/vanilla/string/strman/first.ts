import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { first } from 'strman';

@valueConverter('first')
export class FirstValueConverter {
    public toView(value: string, n: number): string {
        return first(value, n);
    }
}
