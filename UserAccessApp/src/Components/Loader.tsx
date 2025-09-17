
// src/Components/Loader.tsx..
/*-(קומפוננטת Loader - מציגה הודעת טעינה עם אנימציה)-*/
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-blue-600 dark:text-blue-300 animate-pulse-slow">
        טוען נתונים...
      </p>
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};
/*-(ייצוא הקומפוננטה לשימוש בפרויקטים אחרים)-*/
export default Loader;
/*--*/