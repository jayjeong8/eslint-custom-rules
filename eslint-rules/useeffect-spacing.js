const rule = {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce blank line before useEffect",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: "whitespace",
    schema: [],
  },

  create: function (context) {
    const sourceCode = context.getSourceCode();

    return {
      CallExpression(node) {
        if (node.callee.name !== "useEffect") return;

        const tokenBefore = sourceCode.getTokenBefore(node, {
          includeComments: true,
        });

        if (!tokenBefore) {
          return;
        }

        const linesBetween = node.loc.start.line - tokenBefore.loc.end.line;

        const noBlankLineBefore = linesBetween < 2;

        if (noBlankLineBefore) {
          context.report({
            node: node,
            message: "Expected blank line before useEffect hook",
            fix: function (fixer) {
              return fixer.insertTextBefore(node, "\n");
            },
          });
        }
      },
    };
  },
};

export default rule;
