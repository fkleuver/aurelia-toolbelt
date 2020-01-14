import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { equal } from 'strman';

@valueConverter('equal')
export class EqualValueConverter {
    public toView(stringA: string, stringB: string): boolean {
        return equal(stringA, stringB);
    }
}
