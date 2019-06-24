import {helper} from './lintRunner';

const rule = 'multi-line-import';
const ruleWith5 = {
    name: 'multi-line-import',
    options: [5],
};

describe('multi-line-import', () => {
    it(`1 import 1 line no error`, () => {
        const src = `import { first } from 'test';`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    });

    it(`2 import 1 line with error`, () => {
        const src = `import { first, second } from 'test';`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(2);
    });

    it(`3 import 3 line no error`, () => {
        const src = `import {
            first,
            second,
            third,
        } from 'test';`;
        const result = helper({src, rule});

        expect(result.errorCount).toBe(0);
    });

    it('3 import 3 line with option >3 error ', () => {
        const src = `import {
            first,
            second,
            third,
        } from 'test';`;
        const result = helper({src, rule: ruleWith5});

        expect(result.errorCount).toBe(3);
    });

    it('3 import 2 line with option >3 error ', () => {
        const src = `import {
            first,
            second, third,
        } from 'test';`;
        const result = helper({src, rule: ruleWith5});

        expect(result.errorCount).toBe(2);
    });

    it('1 default import 1 line with option >3 no error ', () => {
        const src = `import test from 'test';`;
        const result = helper({src, rule: ruleWith5});

        expect(result.errorCount).toBe(0);
    });

    it(`testing failure 2> one line example error`, () => {
        const src = `import { first, second, third } from 'test';`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(3);
    });

    it('* import no error', () => {
        const src = `import * as Kek from 'test';`;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(0);
    });

    it(`1 * import and 1 namned import with error`, () => {
        const src = `
        import * as React from 'asd';
        import { first, second, third } from 'test';
        `;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(3);
    });

    it(`2 import with error`, () => {
        const src = `
        import { a } from 'asd';
        import { first, second, third } from 'test';
        `;
        const result = helper({src, rule});
        expect(result.errorCount).toBe(3);
    });

});
