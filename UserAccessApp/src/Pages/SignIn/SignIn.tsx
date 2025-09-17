
// Pages/SignIn/SignIn.tsx..
/*-(ייבוא ספריות רלוונטיות לניהול טפסים, ולידציה, ניתוב, סטייט ו־JWT)-*/
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useAppDispatch } from "../../store";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../API/users";
/*-(הגדרת מבנה שדות הטופס)-*/
interface SignInForm {
  username: string;
  password: string;
}
/*-(סכמת ולידציה לטופס ההתחברות עם הודעות מותאמות)-*/
const schema = Joi.object<SignInForm>({
  username: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});
/*-(קומפוננטת SignIn - טופס התחברות עם ולידציה ושליחת בקשה לשרת)-*/
const SignIn = () => {
  /*-(חיבור הטופס לוולידציה וניהול שגיאות עם React Hook Form)-*/
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({ resolver: joiResolver(schema) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  /*-(פונקציית שליחה - טיפול בהתחברות מקומית)-*/
  const onSubmit = async (data: SignInForm) => {
    setLoading(true);
    try {
      const result = await loginUser(data.username, data.password);
      
      if (result.success && result.user) {
        dispatch(login({ username: result.user.email, role: result.user.role }));
        navigate("/home");
      } else {
        alert(`שגיאה בהתחברות: ${result.error || "פרטי התחברות לא נכונים"}`);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "שגיאה לא ידועה";
      alert(`שגיאה בהתחברות: ${msg}`);
    } finally {
      setLoading(false);
    }
  };
  /*-(רינדור טופס ההתחברות עם עיצוב, אנימציה, טעינה וולידציה)-*/
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Sign In
        </h2>
        {/*-(שדה אימייל עם ולידציה)-*/}
        <div>
          <input
            placeholder="Email"
            {...register("username")}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>
        {/*-(שדה סיסמה עם ולידציה)-*/}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        {/*-(כפתור שליחה עם מצב טעינה)-*/}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded font-semibold text-white transition duration-200 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
/*-(ייצוא קומפוננטת SignIn לשימוש באפליקציה)-*/
export default SignIn;
/*--*/