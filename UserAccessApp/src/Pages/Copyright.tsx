
// Pages/Copyright.tsx..
/*-(עמוד זכויות יוצרים מלא ומקצועי להגנה משפטית על רכיבי האתר)-*/
import { useNavigate } from 'react-router-dom';
/*-(קומפוננטת React שמייצגת את עמוד זכויות היוצרים)-*/
export default function Copyright() {
  const navigate = useNavigate();
  /*-(פונקציית מעבר לעמוד הבית לאחר לחיצה על כפתור אישור)-*/
  const handleAccept = () => {
    navigate('/home');
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-3xl text-right">
        {/*-(כותרת מרכזית של עמוד זכויות היוצרים)-*/}
        <h1 className="text-3xl font-bold dark:text-white text-center mb-6">זכויות יוצרים</h1>
        {/*-(הסבר משפטי מעמיק עם רשימת רכיבי ההגנה)-*/}
        <div className="space-y-6 text-base dark:text-gray-300 leading-7 text-right">
          <p className="font-bold text-red-600 dark:text-red-400 text-lg">
            אזהרה משפטית: השימוש באתר זה ובכל רכיב ממנו כפוף לזכויות יוצרים מחמירות והגנה משפטית מלאה!
          </p>
          <p>
            אתר זה, לרבות כל רכיביו, הינו רכושו הבלעדי והמוגן של מיכאל פפיסמדוב. כל תוכן, עיצוב, מבנה, קוד, שירות או ממשק המופיע בו – נוצר, נכתב, תוכנת ועוצב בבלעדיות, ומוגן בזכויות יוצרים, סימני מסחר, וחוקים ישראליים ובינלאומיים.
          </p>
          <p>
            זכויות היוצרים חלות במפורש על הרכיבים הבאים (לרבות אך לא רק):
            <ul className="list-disc list-inside mt-2 pr-4">
              <li>מבנה האתר, היררכיית קבצים, ארגון תיקיות ורכיבי מערכת</li>
              <li>קוד מקור: HTML, CSS, JavaScript, TypeScript, React ועוד</li>
              <li>רכיבי React, פונקציות מותאמות אישית, Hooks, Redux, ממשקי ניהול</li>
              <li>עיצוב גרפי, אנימציות, סגנונות, צבעוניות, UI/UX ייחודיים</li>
              <li>תכנים כתובים: כותרות, טקסטים, הסברים, תיאורים, שמות שדות ועוד</li>
              <li>כל תמונה, סרטון, צליל, לוגו, אייקון, סמל, רקע ואלמנט גרפי</li>
              <li>שירותי API, קישוריות חיצונית, חיבורים לנתונים צד שלישי</li>
              <li>פונטים מותאמים אישית, גרפיקות ומאפיינים עיצוביים</li>
              <li>הגדרות משתמשים, מנגנוני אבטחה, ומבני נתונים</li>
            </ul>
          </p>
          <p className="text-red-500 dark:text-red-300 font-medium">
            חל איסור מוחלט להעתיק, לשכפל, לפרסם, לתרגם, להפיץ, לבצע הנדסה הפוכה, או להשתמש בכל דרך שהיא, בכל רכיב מהאתר – בין אם למטרות פרטיות, מסחריות או ציבוריות – ללא אישור כתוב, משפטי, רשמי ומפורש ממפתח האתר.
          </p>
          <p>
            הפרת זכויות יוצרים זו עילה משפטית מיידית לתביעה. כל פעולה אסורה תגרור נקיטת צעדים משפטיים חמורים, כולל פנייה לעורכי דין, דרישת פיצוי כספי משמעותי, צווי מניעה, והגשת תביעה אזרחית ו/או פלילית לפי חוק.
          </p>
          <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
            כל הזכויות שמורות © מיכאל פפיסמדוב | {new Date().getFullYear()}
          </p>
        </div>
        {/*-(כפתור לאישור קריאה ולמעבר לעמוד הבית)-*/}
        <div className="text-center">
          <button
            onClick={handleAccept}
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded"
          >
            אישור קריאה
          </button>
        </div>
      </div>
    </div>
  );
}
/*--*/