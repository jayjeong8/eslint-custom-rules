import { RuleTester } from "eslint";
import koreanTextFriendly from "./korean-text-friendly.js";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2017 },
});

ruleTester.run("korean-text friendly", koreanTextFriendly, {
  valid: [{ code: 'const test = "성공했어요";' }],
  invalid: [
    {
      code: 'const test = "성공했습니다";',
      output: 'const test = "성공했어요";',
      errors: 1,
    },
  ],
});
