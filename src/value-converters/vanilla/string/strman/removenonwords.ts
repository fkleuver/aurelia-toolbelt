import { valueConverter } from '@aurelia/runtime';

// @ts-ignore
import { removeNonWords } from 'strman';

@valueConverter('removenonwords')
export class RemoveNonWordsValueConverter {
    public toView(value: string, replaced?: string): string {
        return removeNonWords(value, replaced);
    }
}
