
// rsc/validations/SigninSchema.joi.ts..
/*- ייבוא הספרייה Joi לאימות נתונים -*/
import Joi from "joi";
/*- סכימת Joi לאימות טופס התחברות -*/
export const SignInJoiSchema = Joi.object({
  /*- אימות אימייל: נדרש, עם פורמט תקין -*/
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  /*- אימות סיסמה:
      - אורך: 8-20 תווים
      - לפחות אות קטנה, אות גדולה, מספר ותו מיוחד
  -*/
  password: Joi.string()
    .ruleset.pattern(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{8,20}$/,
    )
    .rule({
      message: `"password" must be 8-20 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-)`,
    })
    .required(),
});
/*--*/