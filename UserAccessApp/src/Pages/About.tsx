
// Pages/About.tsx..
/*-(ייבוא כלי ניתוב לצורך מעבר בין עמודים)-*/
import { useNavigate } from 'react-router-dom';
/*-(ייבוא סטייט לניהול הצגת טקסט אישי)-*/
import { useState } from 'react';
/*-(קומפוננטת About - מציגה עמוד אודות לפרויקט)-*/
export default function About() {
  const navigate = useNavigate();
  const [showPersonalText, setShowPersonalText] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold dark:text-white mb-4 text-center">אודות הפרויקט</h1>
      {/*--(טקסט קבוע שמוצג תמיד)--*/}
      <div className="dark:text-gray-300 text-right max-w-3xl mb-6 text-base space-y-4 leading-relaxed">
        <p>
          UserAccessApp הוא לא רק אתר – הוא מייצג מסע אישי, לימודי ואנושי של אדם שבחר לקום, לבחור בחיים, ולהתחיל לבנות עתיד בטוח דרך קוד, התמדה ותקווה.
        </p>
        <p>
          האתר פותח במסגרת קורס לימודי ב־האקר-יו, כאפליקציית כניסת משתמשים לפי סוג – אישי, עסקי ומנהלי – עם מטרה אחת: להוכיח שאני מסוגל לבנות אפליקציה מלאה לבד, מרמת הקונספט ועד המימוש.
        </p>
        <p>
          מאז שאני זוכר את עצמי, עולם המחשבים היה לי מקלט – מקום שיכולתי להבין בו את עצמי, לבטא יצירתיות, ולהרגיש בשליטה. גדלתי בלי הרבה ביטחון באנשים, ולפעמים בלי אמון בעצמי. נכנסתי לעולם הזה מוקדם, גם למקומות שפחות כדאי. אבל עם הזמן הבנתי: לא הכאב מגדיר אותי, אלא הבחירות שלי – ואחת מהן היא לבחור לבנות עתיד.
        </p>
        <p>
          האתר אולי טיוטה, אבל החזון אמיתי: אני לא בונה רק קוד – אני בונה את עצמי. אני לומד כדי להצליח, לא למען כסף, אלא למען העתיד. בעיניי, הייטק הוא לא רק מקצוע. הוא הזדמנות. הוא דרך חיים.
        </p>
        <p>
          אני לא שותה, לא יוצא למועדונים, לא בורח. אני בוחר להתמודד. אני עוזר למי שאיבד כיוון – בין אם זה אחיי, משפחתי או יום אחד – המשתמש הבא שיגיע לאתר שלי.
        </p>
        <p>
          עיצוב אישי, קוד עם מסר, ותשוקה ללמוד ולהתפתח – זה מה שמוביל את הפרויקט הזה.
        </p>
        <p className="italic text-sm text-gray-500 dark:text-gray-400 text-center">
          ❝ זה לא שאני כזה חכם, אני פשוט נשאר עם בעיות למשך זמן ארוך יותר ❞ – אלברט איינשטיין
        </p>
      </div>
      <button
        onClick={() => setShowPersonalText(!showPersonalText)}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        {showPersonalText ? 'הסתר טקסט אישי' : 'הצגת טקסט אישי'}
      </button>
      {showPersonalText && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-3xl text-right space-y-4 leading-loose text-lg text-gray-800 dark:text-gray-100">
          <p>פרויקט זה נבנה על ידי מיכאל פפיסמדוב, תלמיד במסלול פיתוח Fullstack ב־HackerU.</p>
          <p>אני שמח וגאה שהצלחתי להשלים את הפרויקט הזה בכוחות עצמי, למרות הדרך המאתגרת והקשיים שבהם נתקלתי.</p>
          <p>במהלך העבודה השתמשתי בטכנולוגיות שונות ובשיפורים שלמדתי לאורך הקורס. את הדרך הנפלאה הזו ליוו המרצה שלי יונתן, שהדריך אותי, וכן חברים שתמכו.</p>
          <p>היו רגעים שבהם הרגשתי שאני לא אצליח – במיוחד בתחילת הדרך, כשעוד לא היה לי ביטחון. אבל החלטתי לא לוותר.</p>
          <p>מה שלמדתי מהפרויקט הזה, מעבר לטכנולוגיה, זה סבלנות, התמדה ואמונה בעצמי.</p>
          <p>תודה מעומק הלב לאמא שלי היקרה – בלי התמיכה שלה לא הייתי מצליח להגיע לאן שהגעתי.</p>
          <p>זהו רק הצעד הראשון במסע שלי. אני מצפה להמשיך ללמוד, ליצור ולהתקדם בפרויקטים הבאים.</p>
        </div>
      )}
      <button
        onClick={() => navigate('/home')}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
      >
        עמוד הבית
      </button>
    </div>
  );
}
/*--*/


// // Pages/About.tsx
// /*-(ייבוא כלי ניתוב לצורך מעבר בין עמודים)-*/
// import { useNavigate } from 'react-router-dom';

// /*-(קומפוננטת About - מציגה עמוד אודות לפרויקט)-*/
// export default function About() {
//   /*-(הפעלת ניתוב לעמודים אחרים באפליקציה)-*/
//   const navigate = useNavigate();

//   /*-(רינדור עמוד עם הסבר, כפתור טקסט אישי וכפתור חזרה לעמוד הבית)-*/
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <h1 className="text-3xl font-bold dark:text-white">אודות הפרויקט</h1>

//       <p className="dark:text-gray-300 my-4">
//         כאן יהיה הסבר מפורט על הפרויקט. (יש למלא טקסט אישי)
//       </p>

//       <button className="bg-purple-500 text-white px-4 py-2 rounded mr-4">
//         הצגת טקסט אישי
//       </button>

//       <button onClick={() => navigate('/home')} className="bg-blue-500 text-white px-4 py-2 rounded">
//         עמוד הבית
//       </button>
//     </div>
//   );
// }
// /*--*/

// // import { useNavigate } from 'react-router-dom';
// // export default function About() {
// //   const navigate = useNavigate();
// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
// //       <h1 className="text-3xl font-bold dark:text-white">אודות הפרויקט</h1>
// //       <p className="dark:text-gray-300 my-4">
// //         כאן יהיה הסבר מפורט על הפרויקט. (יש למלא טקסט אישי)
// //       </p>
// //       <button className="bg-purple-500 text-white px-4 py-2 rounded mr-4">
// //         הצגת טקסט אישי
// //       </button>
// //       <button onClick={() => navigate('/home')} className="bg-blue-500 text-white px-4 py-2 rounded">
// //         עמוד הבית
// //       </button>
// //     </div>
// //   );
// // }
// /*--*/



