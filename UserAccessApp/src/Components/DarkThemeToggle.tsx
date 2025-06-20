
// Components/DarkThemeToggle.tsx..
/*-(ייבוא הוקים מניהול סטייט ואפקטים ב-React)-*/
import { useEffect, useState } from "react";
/*-(קומפוננטת DarkThemeToggle - כפתור למעבר בין מצב כהה ובהיר)-*/
const DarkThemeToggle = () => {
  /*-(הגדרת מצב התחלה לפי localStorage אם המשתמש בחר במצב כהה)-*/
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  /*-(כל שינוי ב-isDark יעדכן את ה-class של ה-root ואת localStorage)-*/
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  /*-(רינדור כפתור המעבר בין הנושאים - כולל אנימציה ועיצוב)-*/
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};
/*-(ייצוא הקומפוננטה לשימוש במקומות אחרים באפליקציה)-*/
export default DarkThemeToggle;
/*--*/