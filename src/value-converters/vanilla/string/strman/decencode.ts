import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { decEncode } from 'strman';

@valueConverter('decencode')
export class DecEncodeValueConverter {
    public toView(value: string): string {
        return decEncode(value);
    }
}
