import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { binEncode } from 'strman';

@valueConverter('binencode')
export class BinEncodeValueConverter {
    public toView(value: string): string {
        return binEncode(value);
    }
}
