
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
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
        title="גלול למעלה"
      >
        <FaArrowUp />
      </button>
    )
  );
};
/*-(ייצוא הקומפוננטה לשימוש בפרויקט)-*/
export default ScrollToTopButton;
/*--*/