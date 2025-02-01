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
    const textReplacements = {
      습니다: "어요",
    };

    return {
      Literal(node) {
        if (typeof node.value !== "string") return;

        let newValue = node.value;
        let hasReplacement = false;

        Object.entries(textReplacements).forEach(([original, suggested]) => {
          if (newValue.includes(original)) {
            newValue = newValue.replace(new RegExp(original, "g"), suggested);
            hasReplacement = true;
          }
        });

        if (hasReplacement) {
          context.report({
            node,
            messageId: "changeText",
            data: { original: node.value, suggested: newValue },
            fix(fixer) {
              return fixer.replaceText(node, `"${newValue}"`);
            },
          });
        }
      },
    };
  },
};

export default rule;
