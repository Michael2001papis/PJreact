
// src/Components/CardItem.tsx..
/*-(ייבוא טיפוס כרטיס וספריות אייקונים)-*/
import { Card } from "../API/cards";
import { FcLike } from "react-icons/fc";
import { IoIosShareAlt } from "react-icons/io";

/*-(הגדרת סוג הפרופס שהקומפוננטה מקבלת)-*/
interface Props {
  card: Card; // הנתונים של הכרטיס
  isFavorite: boolean; // האם הכרטיס מסומן כמועדף
  onToggleFavorite: () => void; // פעולה לסימון/ביטול מועדף
  onShare: () => void; // פעולה לשיתוף הכרטיס
}

/*-(קומפוננטת CardItem להצגת כרטיס בודד עם עיצוב ופעולות)-*/
const CardItem = ({ card, isFavorite, onToggleFavorite, onShare }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      {/*-תמונה של הכרטיס-*/}
      <img src={card.image.url} alt={card.image.alt} className="w-full h-48 object-cover" />

      {/*-תוכן הכרטיס-*/}
      <div className="p-4">
        <h2 className="text-xl font-bold">{card.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{card.subtitle}</p>
        <p className="text-sm">📞 {card.phone}</p>
        <p className="text-sm">📍 {card.address.city}, {card.address.country}</p>
        <p className="text-sm">🆔 {card.bizNumber}</p>

        {/*-אזור האייקונים לפעולות (לייק ושיתוף)-*/}
        <div className="flex justify-end gap-4 text-xl mt-3">
          <FcLike
            onClick={onToggleFavorite}
            className={`cursor-pointer hover:scale-110 transition ${isFavorite ? "opacity-100" : "opacity-50"}`}
          />
          <IoIosShareAlt
            onClick={onShare}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

/*-(ייצוא הקומפוננטה לשימוש בקבצים אחרים)-*/
export default CardItem;
/*--*/

// import { Card } from "../API/cards";
// import { FcLike } from "react-icons/fc";
// import { IoIosShareAlt } from "react-icons/io";
// interface Props {
//   card: Card;
//   isFavorite: boolean;
//   onToggleFavorite: () => void;
//   onShare: () => void;
// }
// const CardItem = ({ card, isFavorite, onToggleFavorite, onShare }: Props) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
//       <img src={card.image.url} alt={card.image.alt} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h2 className="text-xl font-bold">{card.title}</h2>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{card.subtitle}</p>
//         <p className="text-sm">📞 {card.phone}</p>
//         <p className="text-sm">📍 {card.address.city}, {card.address.country}</p>
//         <p className="text-sm">🆔 {card.bizNumber}</p>
//         <div className="flex justify-end gap-4 text-xl mt-3">
//           <FcLike
//             onClick={onToggleFavorite}
//             className={`cursor-pointer hover:scale-110 transition ${isFavorite ? "opacity-100" : "opacity-50"}`}
//           />
//           <IoIosShareAlt
//             onClick={onShare}
//             className="cursor-pointer text-blue-500 hover:text-blue-700"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CardItem;
/*--*/




