import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = 'Named import must be on new line';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
    }
}

class Walk extends Lint.RuleWalker {

    protected visitNamedImports(node: ts.NamedImports): void {
        if (node.elements.length <= 2) {
            super.visitNamedImports(node);
            return;
        }

        for (let i = 0; i < node.elements.length; i++) {
            const namedImport = node.elements[i];
            const escaped = namedImport.getFullText().replace(/ /g, '');

            if (escaped.charAt(0) !== '\n') {
                this.addFailureAtNode(namedImport, Rule.FAILURE_STRING);

                super.visitNamedImports(node);
                return;
            }
        }

        super.visitNamedImports(node);
    }
}
