
// src/Components/ScrollToTopButton.tsx..
/*-(ייבוא כלים מניהול מצבים ואייקון החץ למעלה)-*/
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
/*-(קומפוננטת ScrollToTopButton - כפתור שמחזיר לראש הדף)-*/
const ScrollToTopButton = () => {
  /*-(סטייט שמפעיל את הכפתור רק כשגוללים מספיק למטה)-*/
  const [show, setShow] = useState(false);
  /*-(הוספת מאזין לגלילה שמעדכן את הסטייט בהתאם למיקום במסך)-*/
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  /*-(פונקציה שמבצעת גלילה חלקה לראש העמוד בלחיצה על הכפתור)-*/
  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });
  /*-(רינדור הכפתור רק אם show = true, כולל עיצוב ואנימציה)-*/
  return (
    show && (
      <button
        onClick={scrollUp}
        className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:scale-110 hover:animate-float z-50"
        title="גלול למעלה"
      >
        <FaArrowUp className="text-lg animate-bounce-slow" />
      </button>
    )
  );
};
/*-(ייצוא הקומפוננטה לשימוש בפרויקט)-*/
export default ScrollToTopButton;
/*--*/