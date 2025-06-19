
// Favorites.tsx..
/*-(ייבוא הוקים לניהול מצב ואפקטים, וטיפוס כרטיסים מה-API)-*/
import { useState, useEffect } from "react";
import { Card } from "../API/cards";

/*-(קומפוננטת Favorites - ניהול והצגת כרטיסים שסומנו כמועדפים)-*/
export default function Favorites() {
  /*-(סטייטים לניהול רשימת מועדפים, מצב עריכה וכרטיסים שנבחרו)-*/
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  /*-(שליפת המועדפים מה-localStorage בעת טעינה ראשונית)-*/
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  /*-(מחיקת כל המועדפים ושיוך מחודש של סטייטים)-*/
  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setSelectedIds(new Set());
  };

  /*-(מעבר בין מצב תצוגה למצב עריכה ובחירה)-*/
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedIds(new Set());
  };

  /*-(בחירה או הסרה של כרטיס מתוך רשימת הכרטיסים הנבחרים)-*/
  const toggleCardSelection = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  /*-(מחיקת כרטיסים שנבחרו בלבד מתוך רשימת המועדפים)-*/
  const deleteSelected = () => {
    const updated = favorites.filter(card => !selectedIds.has(card._id));
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setSelectedIds(new Set());
    if (updated.length === 0) setIsEditMode(false);
  };

  /*-(רינדור עמוד המועדפים - כולל כרטיסים, מצב עריכה, וכפתורים)-*/
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 animate-fade-in">
        מועדפים שלי
      </h1>

      {favorites.length === 0 ? (
        /*-(תצוגת ברירת מחדל כאשר אין כרטיסים מועדפים)-*/
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-12 animate-fade-in">
          לא נמצאו כרטיסים במועדפים כרגע.
        </p>
      ) : (
        <>
          {/*-(תצוגת גריד של כרטיסים מועדפים)-*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in-slow">
            {favorites.map((card) => (
              <div
                key={card._id}
                className={`relative bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden hover:shadow-xl transform ${
                  isEditMode ? "hover:scale-[1.01]" : "hover:scale-[1.02]"
                }`}
              >
                {isEditMode && (
                  <input
                    type="checkbox"
                    className="absolute top-2 right-2 w-5 h-5"
                    checked={selectedIds.has(card._id)}
                    onChange={() => toggleCardSelection(card._id)}
                  />
                )}
                <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{card.phone}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {card.address.city}, {card.address.country}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/*-(כפתורים לפעולה: מחיקה, עריכה, חזרה לראש ועוד)-*/}
          <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              onClick={clearFavorites}
            >
              מחיקת כל המועדפים
            </button>

            <button
              className={`${
                isEditMode ? "bg-green-500" : "bg-yellow-500"
              } hover:brightness-110 text-white px-4 py-2 rounded-lg transition`}
              onClick={toggleEditMode}
            >
              {isEditMode ? "סיום עריכה" : "עריכה ובחירה"}
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              לראש המועדפים
            </button>

            {isEditMode && (
              <button
                className={`${
                  selectedIds.size === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                } text-white px-4 py-2 rounded-lg transition`}
                onClick={deleteSelected}
                disabled={selectedIds.size === 0}
              >
                מחק כרטיסים שנבחרו ({selectedIds.size})
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
/*--*/

// import { useState, useEffect } from "react";
// import { Card } from "../API/cards";
// export default function Favorites() {
//   const [favorites, setFavorites] = useState<Card[]>([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

//   useEffect(() => {
//     const storedFavorites = localStorage.getItem("favorites");
//     if (storedFavorites) {
//       setFavorites(JSON.parse(storedFavorites));
//     }
//   }, []);

//   const clearFavorites = () => {
//     localStorage.removeItem("favorites");
//     setFavorites([]);
//     setSelectedIds(new Set());
//   };

//   const toggleEditMode = () => {
//     setIsEditMode(!isEditMode);
//     setSelectedIds(new Set());
//   };

//   const toggleCardSelection = (id: number) => {
//     setSelectedIds(prev => {
//       const newSet = new Set(prev);
//       newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//       return newSet;
//     });
//   };

//   const deleteSelected = () => {
//     const updated = favorites.filter(card => !selectedIds.has(card._id));
//     localStorage.setItem("favorites", JSON.stringify(updated));
//     setFavorites(updated);
//     setSelectedIds(new Set());
//     if (updated.length === 0) setIsEditMode(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 animate-fade-in">
//         מועדפים שלי
//       </h1>

//       {favorites.length === 0 ? (
//         <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-12 animate-fade-in">
//           לא נמצאו כרטיסים במועדפים כרגע.
//         </p>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in-slow">
//             {favorites.map((card) => (
//               <div
//                 key={card._id}
//                 className={`relative bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden hover:shadow-xl transform ${
//                   isEditMode ? "hover:scale-[1.01]" : "hover:scale-[1.02]"
//                 }`}
//               >
//                 {isEditMode && (
//                   <input
//                     type="checkbox"
//                     className="absolute top-2 right-2 w-5 h-5"
//                     checked={selectedIds.has(card._id)}
//                     onChange={() => toggleCardSelection(card._id)}
//                   />
//                 )}
//                 <img
//                   src={card.image.url}
//                   alt={card.image.alt}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
//                     {card.title}
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-300">{card.phone}</p>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {card.address.city}, {card.address.country}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* כפתורים לפעולה */}
//           <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in">
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
//               onClick={clearFavorites}
//             >
//               מחיקת כל המועדפים
//             </button>

//             <button
//               className={`${
//                 isEditMode ? "bg-green-500" : "bg-yellow-500"
//               } hover:brightness-110 text-white px-4 py-2 rounded-lg transition`}
//               onClick={toggleEditMode}
//             >
//               {isEditMode ? "סיום עריכה" : "עריכה ובחירה"}
//             </button>

//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             >
//               לראש המועדפים
//             </button>

//             {isEditMode && (
//               <button
//                 className={`${
//                   selectedIds.size === 0
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-red-600 hover:bg-red-700"
//                 } text-white px-4 py-2 rounded-lg transition`}
//                 onClick={deleteSelected}
//                 disabled={selectedIds.size === 0}
//               >
//                 מחק כרטיסים שנבחרו ({selectedIds.size})
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
/*--*/


