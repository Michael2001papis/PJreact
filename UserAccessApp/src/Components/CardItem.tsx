
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
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-scale-in group">
      {/*-תמונה של הכרטיס-*/}
      <div className="relative overflow-hidden">
        <img 
          src={card.image.url} 
          alt={card.image.alt} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {/*-תוכן הכרטיס-*/}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">{card.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{card.subtitle}</p>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">📞 {card.phone}</p>
          <p className="flex items-center gap-2">📍 {card.address.city}, {card.address.country}</p>
          <p className="flex items-center gap-2">🆔 {card.bizNumber}</p>
        </div>
        {/*-אזור האייקונים לפעולות (לייק ושיתוף)-*/}
        <div className="flex justify-end gap-4 text-xl mt-4">
          <FcLike
            onClick={onToggleFavorite}
            className={`cursor-pointer hover:scale-125 transition-all duration-300 ${isFavorite ? "opacity-100 animate-pulse-slow" : "opacity-50 hover:opacity-100"}`}
          />
          <IoIosShareAlt
            onClick={onShare}
            className="cursor-pointer text-blue-500 hover:text-blue-700 hover:scale-125 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};
/*-(ייצוא הקומפוננטה לשימוש בקבצים אחרים)-*/
export default CardItem;
/*--*/