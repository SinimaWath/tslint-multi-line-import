import {Rule} from './multiLineImportRule';
import {getFixedResult, helper} from './lintRunner';

const rule = 'multi-line-import';

describe('multi-line-import', () => {
    it(`2 import 1 line no error`, () => {
        const src = `import { first, second } from 'test';`;
        const result = helper({src, rule});
        console.log(result);
        expect(result.errorCount).toBe(0);
    });

    it(`3 import 3 line no error`, () => {
        const src = `import {
            first, 
            second,
            third,
        } from 'test';`;
        const result = helper({src, rule});
        console.log(result);
        expect(result.errorCount).toBe(0);
    });

    it(`testing failure 2> one line example error`, () => {
        const src = `import { first, second, third } from 'test';`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(1);
    });

    it('* import no error', () => {
        const src = `import * as Kek from 'test';`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    })
});
