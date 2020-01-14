import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { toSnakeCase } from 'strman';

@valueConverter('tosnakecase')
export class ToSnakeCaseValueConverter {
    public toView(value: string): string {
        return toSnakeCase(value);
    }
}
