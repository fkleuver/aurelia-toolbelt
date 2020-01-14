import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { htmlDecode } from 'strman';

@valueConverter('htmldecode')
export class HtmlDecodeValueConverter {
    public toView(value: string): string {
        return htmlDecode(value);
    }
}
