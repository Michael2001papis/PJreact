
// Home.tsx..
/*-(ייבוא ספריות והוקרים נחוצים)-*/
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../API/cards";
import { FcLike } from "react-icons/fc";
import { IoIosShareAlt } from "react-icons/io";
import { toast } from "react-toastify";
/*-(קומפוננטת Home - מציגה את כל הכרטיסים וכוללת חיפוש, מועדפים ושיתוף)-*/
const Home = () => {
  /*-(סטייטים לכרטיסים ולמועדפים - כולל טעינה מה-localStorage)-*/
  const [cards, setCards] = useState<Card[]>([]);
  const [favorites, setFavorites] = useState<Card[]>(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  /*-(שליפת שאילתת חיפוש מה-URL בעזרת useLocation)-*/
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase().trim() || "";
  /*-(שליפת כרטיסים מה-API עם טיפול בשגיאות והצגת Toast)-*/
  useEffect(() => {
    fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards")
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => toast.error(`שגיאה בטעינת כרטיסים: ${err}`));
  }, []);
  /*-(סינון הכרטיסים לפי מילות החיפוש מה-URL)-*/
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery) ||
    card.phone.includes(searchQuery) ||
    card.bizNumber.includes(searchQuery) ||
    card.address.city.toLowerCase().includes(searchQuery)
  );
  /*-(הוספה או הסרה של כרטיס מרשימת המועדפים)-*/
  const toggleFavorite = (card: Card) => {
    let updatedFavorites;
    if (favorites.some(fav => fav._id === card._id)) {
      updatedFavorites = favorites.filter(fav => fav._id !== card._id);
      toast.info("הוסר מהמועדפים ❤️");
    } else {
      updatedFavorites = [...favorites, card];
      toast.success("נוסף למועדפים ❤️");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  /*-(שיתוף כרטיס דרך Gmail עם פרטים בסיסיים)-*/
  const shareCard = (card: Card) => {
    const subject = `כרטיס עסקי: ${card.title}`;
    const body = `
שם: ${card.title}
טלפון: ${card.phone}
כתובת: ${card.address.city}, ${card.address.country}
מספר כרטיס: ${card.bizNumber}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("פתיחת Gmail לשיתוף הכרטיס...");
  };
  /*-(רינדור כל עמוד הבית - כולל כותרת וכרטיסים מסוננים בעיצוב רספונסיבי)-*/
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold dark:text-white mb-6">Cards Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCards.map(card => (
            <div key={card._id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <img src={card.image.url} alt={card.image.alt} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p>{card.subtitle}</p>
                <p>{card.phone}</p>
                <p>{card.address.city}, {card.address.country}</p>
                <p>{card.bizNumber}</p>
                <div className="flex justify-end space-x-3 text-xl">
                  <FcLike onClick={() => toggleFavorite(card)} className="cursor-pointer" />
                  <IoIosShareAlt onClick={() => shareCard(card)} className="cursor-pointer text-blue-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
/*-(ייצוא הקומפוננטה לשימוש במערכת)-*/
export default Home;
/*--*/