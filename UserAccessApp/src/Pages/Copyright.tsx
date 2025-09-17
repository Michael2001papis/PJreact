
// Pages/Copyright.tsx..
/*-(עמוד זכויות יוצרים מלא ומקצועי להגנה משפטית על רכיבי האתר)-*/
import { useNavigate } from 'react-router-dom';
import { FaCopyright, FaShieldAlt, FaExclamationTriangle, FaGavel, FaFileContract, FaLock, FaHome, FaArrowLeft, FaCode, FaPalette, FaImage, FaDatabase, FaCog } from 'react-icons/fa';
/*-(קומפוננטת React שמייצגת את עמוד זכויות היוצרים)-*/
export default function Copyright() {
  const navigate = useNavigate();
  /*-(פונקציית מעבר לעמוד הבית לאחר לחיצה על כפתור אישור)-*/
  const handleAccept = () => {
    navigate('/home');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* כותרת ראשית */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-6">
            <FaCopyright className="text-6xl text-red-500" />
            <FaShieldAlt className="text-6xl text-blue-500" />
            <FaGavel className="text-6xl text-purple-500" />
          </div>
          <h1 className="text-6xl font-bold gradient-text mb-4">
            זכויות יוצרים
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            הגנה משפטית מלאה על כל רכיבי האתר והתוכן
          </p>
        </div>

        {/* אזהרה משפטית */}
        <div className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-8 animate-slide-in">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <FaExclamationTriangle className="text-3xl text-red-500" />
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">אזהרה משפטית</h2>
          </div>
          <p className="text-lg font-semibold text-red-700 dark:text-red-300">
            השימוש באתר זה ובכל רכיב ממנו כפוף לזכויות יוצרים מחמירות והגנה משפטית מלאה!
          </p>
        </div>

        {/* תוכן ראשי */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8 text-right text-lg leading-relaxed dark:text-gray-300">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaFileContract className="text-blue-500" />
                <span>הבעלות וההגנה</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                אתר זה, לרבות כל רכיביו, הינו רכושו הבלעדי והמוגן של <strong>מיכאל פפיסמדוב</strong>. כל תוכן, עיצוב, מבנה, קוד, שירות או ממשק המופיע בו – נוצר, נכתב, תוכנת ועוצב בבלעדיות, ומוגן בזכויות יוצרים, סימני מסחר, וחוקים ישראליים ובינלאומיים.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaLock className="text-green-500" />
                <span>רכיבים מוגנים</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                זכויות היוצרים חלות במפורש על הרכיבים הבאים:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaCode className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">קוד מקור: HTML, CSS, JavaScript, TypeScript, React</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaPalette className="text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">עיצוב גרפי, אנימציות, UI/UX ייחודיים</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaImage className="text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">תמונות, לוגואים, אייקונים ואלמנטים גרפיים</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaDatabase className="text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">מבני נתונים, API, חיבורים חיצוניים</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaCog className="text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">מנגנוני אבטחה והגדרות משתמשים</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaFileContract className="text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">תכנים כתובים, כותרות ותיאורים</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaShieldAlt className="text-indigo-500" />
                    <span className="text-gray-700 dark:text-gray-300">מבנה האתר וארגון הקבצים</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaGavel className="text-yellow-500" />
                    <span className="text-gray-700 dark:text-gray-300">פונטים מותאמים אישית וגרפיקות</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaExclamationTriangle className="text-red-500" />
                <span>איסורים והגבלות</span>
              </h2>
              <p className="text-red-700 dark:text-red-300 font-medium">
                חל איסור מוחלט להעתיק, לשכפל, לפרסם, לתרגם, להפיץ, לבצע הנדסה הפוכה, או להשתמש בכל דרך שהיא, בכל רכיב מהאתר – בין אם למטרות פרטיות, מסחריות או ציבוריות – ללא אישור כתוב, משפטי, רשמי ומפורש ממפתח האתר.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-l-4 border-purple-500 rounded-r-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaGavel className="text-purple-500" />
                <span>השלכות משפטיות</span>
              </h2>
              <p className="text-purple-700 dark:text-purple-300">
                הפרת זכויות יוצרים זו עילה משפטית מיידית לתביעה. כל פעולה אסורה תגרור נקיטת צעדים משפטיים חמורים, כולל פנייה לעורכי דין, דרישת פיצוי כספי משמעותי, צווי מניעה, והגשת תביעה אזרחית ו/או פלילית לפי חוק.
              </p>
            </div>

            <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
              <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FaCopyright className="text-gray-600" />
                <span>כל הזכויות שמורות</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                © מיכאל פפיסמדוב | {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAccept}
            className="action-btn-primary flex items-center space-x-2 rtl:space-x-reverse"
          >
            <FaHome />
            <span>אישור קריאה - עמוד הבית</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="action-btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
          >
            <FaArrowLeft />
            <span>חזור</span>
          </button>
        </div>
      </div>
    </div>
  );
}
/*--*/