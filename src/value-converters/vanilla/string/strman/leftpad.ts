import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { leftPad } from 'strman';

@valueConverter('leftpad')
export class LeftPadValueConverter {
    public toView(value: string, length: number, char?: string): string {
        return leftPad(value, length, char);
    }
}
