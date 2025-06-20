
// src/Components/Loader.tsx..
/*-(קומפוננטת Loader - מציגה הודעת טעינה עם אנימציה)-*/
const Loader = () => {
  return (
    <div className="text-center py-10 animate-pulse text-blue-600 dark:text-blue-300">
      טוען נתונים...
    </div>
  );
};
/*-(ייצוא הקומפוננטה לשימוש בפרויקטים אחרים)-*/
export default Loader;
/*--*/