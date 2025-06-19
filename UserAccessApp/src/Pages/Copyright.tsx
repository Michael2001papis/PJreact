
// Pages/Copyright.tsx..
/*-(ייבוא פונקציית ניתוב לעמודים באפליקציה)-*/
import { useNavigate } from 'react-router-dom';

/*-(קומפוננטת Copyright - מציגה מידע משפטי על זכויות יוצרים)-*/
export default function Copyright() {
  /*-(הפעלת ניתוב לעמוד הבית לאחר לחיצה על כפתור אישור)-*/
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/home');
  };

  /*-(רינדור תוכן העמוד: טקסט זכויות יוצרים וכפתור מעבר)-*/
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold dark:text-white">זכויות יוצרים</h1>

      <p className="my-4 dark:text-gray-300">
        כל הזכויות שמורות © למיכאל פפיסמדוב. אין להעתיק, לשכפל או להפיץ את התוכן ללא רשות מפורשת.
      </p>

      <button
        onClick={handleAccept}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        אישור קריאה
      </button>
    </div>
  );
}
/*--*/

// import { useNavigate } from 'react-router-dom';
// export default function Copyright() {
//   const navigate = useNavigate();

//   const handleAccept = () => {
//     navigate('/home');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <h1 className="text-3xl font-bold dark:text-white">זכויות יוצרים</h1>
//       <p className="my-4 dark:text-gray-300">
//         כל הזכויות שמורות © למיכאל פפיסמדוב. אין להעתיק, לשכפל או להפיץ את התוכן ללא רשות מפורשת.
//       </p>
//       <button
//         onClick={handleAccept}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         אישור קריאה
//       </button>
//     </div>
//   );
// }
/*--*/
