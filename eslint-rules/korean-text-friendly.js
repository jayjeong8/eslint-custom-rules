import textReplacements from "./textReplacements.json" with { type: "json" };

const rule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "",
      recommended: false,
    },
    fixable: "code",
    schema: false,
    messages: {
      changeText:
        "'{{ original }}'을(를) '{{ suggested }}'로 변경하면 자연스러워요.",
    },
  },

  create(context) {
    function validateAndReplaceText(node) {
      const replacementList = Object.entries(textReplacements);
      const oldValue = node.value;
      const newValue = replacementList.reduce(
        (acc, [original, suggested]) =>
          acc.includes(original)
            ? acc.replace(new RegExp(original, "g"), suggested)
            : acc,
        oldValue,
      );

      if (newValue !== oldValue) {
        context.report({
          node,
          messageId: "changeText",
          data: { original: oldValue, suggested: newValue },
          fix: (fixer) => {
            if (node.type === "JSXText") {
              return fixer.replaceText(node, newValue);
            }

            return fixer.replaceText(node, `"${newValue}"`);
          },
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          validateAndReplaceText(node);
        }
      },
      JSXText(node) {
        validateAndReplaceText(node);
      },
    };
  },
};

export default rule;
