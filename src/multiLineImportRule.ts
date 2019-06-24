import * as Lint from 'tslint';
import * as utils from "tsutils";
import * as ts from 'typescript';

const DEAFULT_IMPORT_COUNT = 2;
interface Options {
    imports: number;
}

function parseOptions(ruleArguments: any[]): Options {
    const imports = (ruleArguments[0] || DEAFULT_IMPORT_COUNT) as number;

    return {imports};
}

const FAILURE_MESSAGE_MORE = (imports) => `If there are => ${imports} named imports then each of them have to be on new line`;
const FAILURE_MESSAGE_LESS = (imports) => `If there are < ${imports} named imports then they have to be on same line`;

export class Rule extends Lint.Rules.AbstractRule {

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments));
    }
}

function walk(ctx: Lint.WalkContext<Options>) {
    const {
        sourceFile,
        options: {imports}
    } = ctx;

    for (const token of utils.findImports(sourceFile, utils.ImportKind.AllImports)) {
        const parent = token.parent;
        const importClause = utils.isImportDeclaration(parent) ? parent.importClause : void 0;

        const importsSpecificNamedExports =
            importClause &&
            importClause.namedBindings &&
            utils.isNamedImports(importClause.namedBindings);

        if (!importsSpecificNamedExports) {
            continue;
        }

        const nameBindings = utils.isNamedImports(importClause.namedBindings) ? importClause.namedBindings : void 0;

        for (let i = 0; i < nameBindings.elements.length; i++) {
            const namedImport = nameBindings.elements[i];
            const escaped = namedImport.getFullText().replace(/ /g, '');

            if (nameBindings.elements.length >= imports) {
                if (escaped.charAt(0) !== '\n') {
                    ctx.addFailureAtNode(namedImport, FAILURE_MESSAGE_MORE(imports));
                }
            } else {
                if (escaped.charAt(0) === '\n') {
                    ctx.addFailureAtNode(namedImport, FAILURE_MESSAGE_LESS(imports));
                }
            }
        }
    }
}
