
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
          title: "עיצוב גרפי מקצועי",
          subtitle: "מיכאל פפיסמדוב",
          description: "שירותי עיצוב גרפי, לוגואים, כרטיסי ביקור ועיצוב אתרים. ניסיון של 5+ שנים בתחום.",
          phone: "050-1234567",
          address: {
            city: "תל אביב",
            country: "ישראל",
          },
          bizNumber: "998877",
          image: {
            url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400",
            alt: "עיצוב גרפי מקצועי",
          },
        },
        /*------------ כרטיס שני לדוגמה ------------*/
        {
          _id: 2,
          title: "פיתוח אתרים מתקדם",
          subtitle: "Full Stack Developer",
          description: "פיתוח אתרים ואפליקציות עם React, Node.js, TypeScript. פתרונות מותאמים אישית.",
          phone: "050-7654321",
          address: {
            city: "הרצליה",
            country: "ישראל",
          },
          bizNumber: "112233",
          image: {
            url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
            alt: "פיתוח אתרים",
          },
        },
        /*------------ כרטיס שלישי לדוגמה ------------*/
        {
          _id: 3,
          title: "ייעוץ עסקי",
          subtitle: "יועץ עסקי מקצועי",
          description: "ייעוץ אסטרטגי לעסקים קטנים ובינוניים. פיתוח תוכניות עסקיות וניהול פרויקטים.",
          phone: "052-9876543",
          address: {
            city: "ירושלים",
            country: "ישראל",
          },
          bizNumber: "445566",
          image: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            alt: "ייעוץ עסקי",
          },
        },
        /*------------ כרטיס רביעי לדוגמה ------------*/
        {
          _id: 4,
          title: "שירותי חשבונאות",
          subtitle: "רואה חשבון מוסמך",
          description: "שירותי חשבונאות מלאים לעסקים ופרטיים. הגשת דוחות, ייעוץ מס וניהול כספי.",
          phone: "053-1112233",
          address: {
            city: "חיפה",
            country: "ישראל",
          },
          bizNumber: "778899",
          image: {
            url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
            alt: "שירותי חשבונאות",
          },
        },
        /*------------ כרטיס חמישי לדוגמה ------------*/
        {
          _id: 5,
          title: "מסעדת הבית",
          subtitle: "אוכל ביתי אותנטי",
          description: "מסעדה משפחתית עם אוכל ביתי מסורתי. מנות טריות ואיכותיות, אווירה חמימה ומשפחתית.",
          phone: "054-5556667",
          address: {
            city: "נצרת",
            country: "ישראל",
          },
          bizNumber: "334455",
          image: {
            url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
            alt: "מסעדת הבית",
          },
        },
        /*------------ כרטיס שישי לדוגמה ------------*/
        {
          _id: 6,
          title: "חנות בגדים אופנתית",
          subtitle: "Fashion Store",
          description: "חנות בגדים אופנתית עם מיטב המותגים. בגדי נשים, גברים וילדים. שירות מקצועי ואיכותי.",
          phone: "050-8889990",
          address: {
            city: "אשדוד",
            country: "ישראל",
          },
          bizNumber: "667788",
          image: {
            url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
            alt: "חנות בגדים",
          },
        },
        /*------------ כרטיס שביעי לדוגמה ------------*/
        {
          _id: 7,
          title: "פיצה דלישס",
          subtitle: "הפיצה הכי טעימה בעיר",
          description: "מסעדת פיצה איטלקית אותנטית עם חומרי גלם איכותיים מהאיטליה. מתמחים בפיצות דקות ופיצות עבה, עם מגוון רחב של תוספות טריות",
          phone: "03-1234567",
          address: {
            city: "תל אביב",
            country: "ישראל",
          },
          bizNumber: "123456789",
          image: {
            url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
            alt: "פיצה דלישס",
          },
        },
        /*------------ כרטיס שמיני לדוגמה ------------*/
        {
          _id: 8,
          title: "קפה אומנותי",
          subtitle: "Coffee & Art",
          description: "קפה ייחודי המשלב אומנות וקפה איכותי. מקום מושלם לעבודה, מפגשים או פשוט ליהנות מאווירה מיוחדת",
          phone: "04-9876543",
          address: {
            city: "חיפה",
            country: "ישראל",
          },
          bizNumber: "998877665",
          image: {
            url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
            alt: "קפה אומנותי",
          },
        },
        /*------------ כרטיס תשיעי לדוגמה ------------*/
        {
          _id: 9,
          title: "ספורט ופיטנס",
          subtitle: "Fitness Center",
          description: "מרכז כושר מודרני עם ציוד מתקדם ומדריכים מקצועיים. שיעורי פילאטיס, יוגה, אירובי ואימונים אישיים",
          phone: "052-1112233",
          address: {
            city: "רמת גן",
            country: "ישראל",
          },
          bizNumber: "554433221",
          image: {
            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
            alt: "מרכז כושר",
          },
        },
        /*------------ כרטיס עשירי לדוגמה ------------*/
        {
          _id: 10,
          title: "ספרות וקומיקס",
          subtitle: "Book & Comic Store",
          description: "חנות ספרים ייחודית המתמחה בספרות ישראלית ובינלאומית, קומיקס, מנגה וספרי ילדים. אירועי חתימה ופעילויות",
          phone: "03-5556667",
          address: {
            city: "ירושלים",
            country: "ישראל",
          },
          bizNumber: "112233445",
          image: {
            url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
            alt: "חנות ספרים",
          },
        },
        /*------------ כרטיס אחד עשר לדוגמה ------------*/
        {
          _id: 11,
          title: "טכנולוגיה ומוצרים",
          subtitle: "Tech Store",
          description: "חנות טכנולוגיה מתקדמת עם מוצרי אלקטרוניקה, מחשבים, טלפונים חכמים ואביזרים. שירות טכני מקצועי",
          phone: "050-7778889",
          address: {
            city: "באר שבע",
            country: "ישראל",
          },
          bizNumber: "667788990",
          image: {
            url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
            alt: "חנות טכנולוגיה",
          },
        },
        /*------------ כרטיס שנים עשר לדוגמה ------------*/
        {
          _id: 12,
          title: "יוגה ומדיטציה",
          subtitle: "Yoga Studio",
          description: "סטודיו יוגה מקצועי עם שיעורים למתחילים ומתקדמים. שיעורי יוגה, מדיטציה, פילאטיס וריקוד. אווירה רגועה ומרגיעה",
          phone: "054-3334445",
          address: {
            city: "פתח תקווה",
            country: "ישראל",
          },
          bizNumber: "334455667",
          image: {
            url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
            alt: "סטודיו יוגה",
          },
        },
      ]);
    }, 1000); // הדמיה של עיכוב בקבלת המידע
  });
};
/*--*/