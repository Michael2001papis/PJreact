
// Pages/About.tsx..
/*-(ייבוא כלי ניתוב לצורך מעבר בין עמודים)-*/
import { useNavigate } from 'react-router-dom';
/*-(ייבוא סטייט לניהול הצגת טקסט אישי)-*/
import { useState } from 'react';
import { FaHeart, FaCode, FaGraduationCap, FaRocket, FaQuoteLeft, FaArrowLeft, FaEye, FaEyeSlash, FaHome, FaUser, FaLightbulb } from 'react-icons/fa';
/*-(קומפוננטת About - מציגה עמוד אודות לפרויקט)-*/
export default function About() {
  const navigate = useNavigate();
  const [showPersonalText, setShowPersonalText] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* כותרת ראשית */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold gradient-text mb-6">
            אודות הפרויקט
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            מסע אישי של למידה, התפתחות ובניית עתיד דרך קוד
          </p>
        </div>

        {/* כרטיסי מידע */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-in hover-lift">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <FaCode className="text-3xl text-blue-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">טכנולוגיה</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              React, TypeScript, Tailwind CSS, Redux Toolkit - טכנולוגיות מודרניות לבניית אפליקציות מתקדמות
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-in hover-lift" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <FaGraduationCap className="text-3xl text-green-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">למידה</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              פיתוח במסגרת קורס Fullstack ב-HackerU - מסע של למידה והתפתחות מקצועית
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-in hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <FaRocket className="text-3xl text-purple-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">חזון</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              בניית עתיד בטוח דרך קוד, התמדה ותקווה - לא רק פיתוח, אלא דרך חיים
            </p>
          </div>
        </div>

        {/* תוכן ראשי */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-6 text-right text-lg leading-relaxed dark:text-gray-300">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaUser className="text-blue-500" />
                <span>המסע האישי</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                UserAccessApp הוא לא רק אתר – הוא מייצג מסע אישי, לימודי ואנושי של אדם שבחר לקום, לבחור בחיים, ולהתחיל לבנות עתיד בטוח דרך קוד, התמדה ותקווה.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaCode className="text-green-500" />
                <span>המטרה הטכנית</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                האתר פותח במסגרת קורס לימודי ב־האקר-יו, כאפליקציית כניסת משתמשים לפי סוג – אישי, עסקי ומנהלי – עם מטרה אחת: להוכיח שאני מסוגל לבנות אפליקציה מלאה לבד, מרמת הקונספט ועד המימוש.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FaLightbulb className="text-purple-500" />
                <span>הפילוסופיה</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                מאז שאני זוכר את עצמי, עולם המחשבים היה לי מקלט – מקום שיכולתי להבין בו את עצמי, לבטא יצירתיות, ולהרגיש בשליטה. לא הכאב מגדיר אותי, אלא הבחירות שלי – ואחת מהן היא לבחור לבנות עתיד.
              </p>
            </div>

            <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8">
              <FaQuoteLeft className="text-4xl text-yellow-500 mx-auto mb-4" />
              <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
                "זה לא שאני כזה חכם, אני פשוט נשאר עם בעיות למשך זמן ארוך יותר"
              </blockquote>
              <cite className="text-gray-600 dark:text-gray-400">– אלברט איינשטיין</cite>
            </div>
          </div>
        </div>

        {/* כפתור טקסט אישי */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowPersonalText(!showPersonalText)}
            className="action-btn-primary flex items-center space-x-2 rtl:space-x-reverse mx-auto"
          >
            {showPersonalText ? <FaEyeSlash /> : <FaEye />}
            <span>{showPersonalText ? 'הסתר טקסט אישי' : 'הצג טקסט אישי'}</span>
          </button>
        </div>

        {/* טקסט אישי */}
        {showPersonalText && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center flex items-center justify-center space-x-3 rtl:space-x-reverse">
                <FaHeart className="text-red-500" />
                <span>הסיפור האישי</span>
              </h2>
              <div className="space-y-6 text-right text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>פרויקט זה נבנה על ידי <strong>מיכאל פפיסמדוב</strong>, תלמיד במסלול פיתוח Fullstack ב־HackerU.</p>
                <p>אני שמח וגאה שהצלחתי להשלים את הפרויקט הזה בכוחות עצמי, למרות הדרך המאתגרת והקשיים שבהם נתקלתי.</p>
                <p>במהלך העבודה השתמשתי בטכנולוגיות שונות ובשיפורים שלמדתי לאורך הקורס. את הדרך הנפלאה הזו ליוו המרצה שלי יונתן, שהדריך אותי, וכן חברים שתמכו.</p>
                <p>היו רגעים שבהם הרגשתי שאני לא אצליח – במיוחד בתחילת הדרך, כשעוד לא היה לי ביטחון. אבל החלטתי לא לוותר.</p>
                <p>מה שלמדתי מהפרויקט הזה, מעבר לטכנולוגיה, זה סבלנות, התמדה ואמונה בעצמי.</p>
                <p className="text-center text-xl font-semibold text-red-600 dark:text-red-400">תודה מעומק הלב לאמא שלי היקרה – בלי התמיכה שלה לא הייתי מצליח להגיע לאן שהגעתי.</p>
                <p>זהו רק הצעד הראשון במסע שלי. אני מצפה להמשיך ללמוד, ליצור ולהתקדם בפרויקטים הבאים.</p>
              </div>
            </div>
          </div>
        )}

        {/* כפתורי ניווט */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/home')}
            className="action-btn-primary flex items-center space-x-2 rtl:space-x-reverse"
          >
            <FaHome />
            <span>עמוד הבית</span>
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