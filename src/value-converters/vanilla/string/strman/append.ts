import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { append } from 'strman';

@valueConverter('append')
export class AppendValueConverter {
    public toView(...text: string[]): string {
        return append(...text);
    }
}
