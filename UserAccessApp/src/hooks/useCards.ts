

// hooks/useCards.ts..
/*-(ייבוא הוקים לניהול מצב ואפקט ב-React)-*/
import { useEffect, useState } from "react";

/*-(ייבוא טיפוס Card מה-API המקומי)-*/
import { Card } from "../API/cards";

/*-(כתובת ה-API שממנו נמשוך את הכרטיסים)-*/
const API_ENDPOINT = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

/*-(הוק מותאם אישית: useCards - אחראי לשליפת כרטיסים מהשרת)-*/
export const useCards = () => {
  /*-(סטייטים לניהול נתוני הכרטיסים ומצב טעינה)-*/
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /*-(אפקט ריצה חד פעמית לשליפת הנתונים עם טיפול בשגיאות)-*/
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Card[] = await response.json();
        setCards(data);
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  /*-(ההוק מחזיר את המידע והסטטוס לשימוש ברכיבים אחרים)-*/
  return { cards, loading };
};
/*--*/

// // hooks/useCards.ts..
// /*-(ייבוא הוקים לניהול מצב ואפקט ב-React)-*/
// import { useEffect, useState } from "react";

// /*-(ייבוא טיפוס Card מה-API המקומי)-*/
// import { Card } from "../API/cards";

// /*-(כתובת ה-API שממנו נמשוך את הכרטיסים)-*/
// const API_ENDPOINT = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

// /*-(הוק מותאם אישית: useCards - אחראי לשליפת כרטיסים מהשרת)-*/
// export const useCards = () => {
//   /*-(סטייטים לניהול נתוני הכרטיסים ומצב טעינה)-*/
//   const [cards, setCards] = useState<Card[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   /*-(אפקט ריצה חד פעמית לשליפת הנתונים עם טיפול בשגיאות)-*/
//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const response = await fetch(API_ENDPOINT);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Card[] = await response.json();
//         setCards(data);
//       } catch (err) {
//         console.error("Error fetching cards:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCards();
//   }, []);

//   /*-(ההוק מחזיר את המידע והסטטוס לשימוש ברכיבים אחרים)-*/
//   return { cards, loading };
// };
// /*--*/

// // import { useEffect, useState } from "react";
// // import { Card } from "../API/cards";
// // const API_ENDPOINT = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
// // export const useCards = () => {
// //   const [cards, setCards] = useState<Card[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   useEffect(() => {
// //     const fetchCards = async () => {
// //       try {
// //         const response = await fetch(API_ENDPOINT);
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const data: Card[] = await response.json();
// //         setCards(data);
// //       } catch (err) {
// //         console.error("Error fetching cards:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchCards();
// //   }, []);
// //   return { cards, loading };
// // };
// /*--*/


