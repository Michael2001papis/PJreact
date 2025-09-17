
// hooks/useCards.ts..
/*-(ייבוא הוקים לניהול מצב ואפקט ב-React)-*/
import { useEffect, useState } from "react";
/*-(ייבוא טיפוס Card ופונקציה מה-API המקומי)-*/
import { Card, fetchCards } from "../API/cards";
/*-(הוק מותאם אישית: useCards - אחראי לשליפת כרטיסים מקומיים)-*/
export const useCards = () => {
  /*-(סטייטים לניהול נתוני הכרטיסים ומצב טעינה)-*/
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  /*-(אפקט ריצה חד פעמית לשליפת הנתונים המקומיים)-*/
  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (err) {
        console.error("Error loading cards:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);
  /*-(ההוק מחזיר את המידע והסטטוס לשימוש ברכיבים אחרים)-*/
  return { cards, loading };
};
/*--*/