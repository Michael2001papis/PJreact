
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
      className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-all duration-500 hover:scale-110 ${
        isDark ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gradient-to-r from-yellow-400 to-orange-500"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-500 hover:animate-rotate ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};
/*-(ייצוא הקומפוננטה לשימוש במקומות אחרים באפליקציה)-*/
export default DarkThemeToggle;
/*--*/