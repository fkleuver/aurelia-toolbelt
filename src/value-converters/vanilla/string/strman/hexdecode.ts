import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { hexDecode } from 'strman';

@valueConverter('hexdecode')
export class HexDecodeValueConverter {
    public toView(value: string): string {
        return hexDecode(value);
    }
}
