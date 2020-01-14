import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { binDecode } from 'strman';

@valueConverter('bindecode')
export class BinDecodeValueConverter {
    public toView(value: string): string {
        return binDecode(value);
    }
}
