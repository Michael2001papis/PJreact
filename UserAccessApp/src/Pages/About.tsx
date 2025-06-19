
// Pages/About.tsx
/*-(ייבוא כלי ניתוב לצורך מעבר בין עמודים)-*/
import { useNavigate } from 'react-router-dom';

/*-(קומפוננטת About - מציגה עמוד אודות לפרויקט)-*/
export default function About() {
  /*-(הפעלת ניתוב לעמודים אחרים באפליקציה)-*/
  const navigate = useNavigate();

  /*-(רינדור עמוד עם הסבר, כפתור טקסט אישי וכפתור חזרה לעמוד הבית)-*/
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold dark:text-white">אודות הפרויקט</h1>

      <p className="dark:text-gray-300 my-4">
        כאן יהיה הסבר מפורט על הפרויקט. (יש למלא טקסט אישי)
      </p>

      <button className="bg-purple-500 text-white px-4 py-2 rounded mr-4">
        הצגת טקסט אישי
      </button>

      <button onClick={() => navigate('/home')} className="bg-blue-500 text-white px-4 py-2 rounded">
        עמוד הבית
      </button>
    </div>
  );
}
/*--*/

// import { useNavigate } from 'react-router-dom';
// export default function About() {
//   const navigate = useNavigate();
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
/*--*/

