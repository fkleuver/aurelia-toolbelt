import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { slice } from 'strman';

@valueConverter('slice')
export class SliceValueConverter {
    public toView(value: string, beginSlice: number, endSlice: number): string {
        return slice(value, beginSlice, endSlice);
    }
}
