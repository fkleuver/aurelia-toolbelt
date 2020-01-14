import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { between } from 'strman';

@valueConverter('between')
export class BetweenValueConverter {
    public toView(value: string, start: string, end: string): string[] {
        return between(value, start, end);
    }
}
