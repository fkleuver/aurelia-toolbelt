import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { appendArray } from 'strman';

@valueConverter('appendarray')
export class AppendArrayValueConverter {
    public toView(value: string, append: string[]): string {
        return appendArray(value, append);
    }
}
