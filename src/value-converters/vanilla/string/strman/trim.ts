import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { trim } from 'strman';

@valueConverter('trim')
export class TrimValueConverter {
    public toView(value: string, char?: string): string {
        return trim(value, char);
    }
}
