

// src/API/cards.ts..
/*------------ הגדרת מבנה כרטיס (Card) עם כל השדות הנדרשים ------------*/
export interface Card {
  _id: number; // מזהה ייחודי לכל כרטיס
  title: string; // כותרת הכרטיס
  subtitle: string; // כותרת משנה
  description: string; // תיאור הכרטיס
  phone: string; // מספר טלפון ליצירת קשר
  address: {
    city: string; // עיר
    country: string; // מדינה
  };
  bizNumber: string; // מספר עסק ייחודי
  image: {
    url: string; // קישור לתמונה
    alt: string; // טקסט חלופי לתמונה
  };
}

/*------------ פונקציה המדמה קריאה ל-API ומחזירה מערך כרטיסים ------------*/
export const fetchCards = (): Promise<Card[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        /*------------ כרטיס ראשון לדוגמה ------------*/
        {
          _id: 1,
          title: "My First Card",
          subtitle: "First Card Subtitle",
          description: "Personal business card for my design work.",
          phone: "050-1234567",
          address: {
            city: "Tel Aviv",
            country: "Israel",
          },
          bizNumber: "998877",
          image: {
            url: "https://via.placeholder.com/400x200?text=Card+1",
            alt: "Card 1 Image",
          },
        },
        /*------------ כרטיס שני לדוגמה ------------*/
        {
          _id: 2,
          title: "My Second Card",
          subtitle: "Second Card Subtitle",
          description: "Freelance developer contact card.",
          phone: "050-7654321",
          address: {
            city: "Herzliya",
            country: "Israel",
          },
          bizNumber: "112233",
          image: {
            url: "https://via.placeholder.com/400x200?text=Card+2",
            alt: "Card 2 Image",
          },
        },
      ]);
    }, 1000); // הדמיה של עיכוב בקבלת המידע
  });
};
/*--*/


// // src/API/cards.ts..
// /*------------ הגדרת מבנה כרטיס (Card) עם כל השדות הנדרשים ------------*/
// export interface Card {
//   _id: number; // מזהה ייחודי לכל כרטיס
//   title: string; // כותרת הכרטיס
//   subtitle: string; // כותרת משנה
//   description: string; // תיאור הכרטיס
//   phone: string; // מספר טלפון ליצירת קשר
//   address: {
//     city: string; // עיר
//     country: string; // מדינה
//   };
//   bizNumber: string; // מספר עסק ייחודי
//   image: {
//     url: string; // קישור לתמונה
//     alt: string; // טקסט חלופי לתמונה
//   };
// }

// /*------------ פונקציה המדמה קריאה ל-API ומחזירה מערך כרטיסים ------------*/
// export const fetchCards = (): Promise<Card[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         /*------------ כרטיס ראשון לדוגמה ------------*/
//         {
//           _id: 1,
//           title: "My First Card",
//           subtitle: "First Card Subtitle",
//           description: "Personal business card for my design work.",
//           phone: "050-1234567",
//           address: {
//             city: "Tel Aviv",
//             country: "Israel",
//           },
//           bizNumber: "998877",
//           image: {
//             url: "https://via.placeholder.com/400x200?text=Card+1",
//             alt: "Card 1 Image",
//           },
//         },
//         /*------------ כרטיס שני לדוגמה ------------*/
//         {
//           _id: 2,
//           title: "My Second Card",
//           subtitle: "Second Card Subtitle",
//           description: "Freelance developer contact card.",
//           phone: "050-7654321",
//           address: {
//             city: "Herzliya",
//             country: "Israel",
//           },
//           bizNumber: "112233",
//           image: {
//             url: "https://via.placeholder.com/400x200?text=Card+2",
//             alt: "Card 2 Image",
//           },
//         },
//       ]);
//     }, 1000); // הדמיה של עיכוב בקבלת המידע
//   });
// };
// /*--*/

// // הגדרת מבנה כרטיס (Card)
// // export interface Card {
// //   _id: number; 
// //   title: string; 
// //   subtitle: string; 
// //   description: string; 
// //   phone: string; 
// //   address: {
// //     city: string; 
// //     country: string; 
// //   };
// //   bizNumber: string; 
// //   image: {
// //     url: string; 
// //     alt: string; 
// //   };
// // }
// // export const fetchCards = (): Promise<Card[]> => {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       resolve([
// //         {
// //           _id: 1,
// //           title: "My First Card",
// //           subtitle: "First Card Subtitle",
// //           description: "Personal business card for my design work.",
// //           phone: "050-1234567",
// //           address: {
// //             city: "Tel Aviv",
// //             country: "Israel",
// //           },
// //           bizNumber: "998877",
// //           image: {
// //             url: "https://via.placeholder.com/400x200?text=Card+1",
// //             alt: "Card 1 Image",
// //           },
// //         },
// //         {
// //           _id: 2,
// //           title: "My Second Card",
// //           subtitle: "Second Card Subtitle",
// //           description: "Freelance developer contact card.",
// //           phone: "050-7654321",
// //           address: {
// //             city: "Herzliya",
// //             country: "Israel",
// //           },
// //           bizNumber: "112233",
// //           image: {
// //             url: "https://via.placeholder.com/400x200?text=Card+2",
// //             alt: "Card 2 Image",
// //           },
// //         },
// //       ]);
// //     }, 1000);
// //   });
// // };
// /*--*/
