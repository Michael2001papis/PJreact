// src/API/users.ts
// מערכת משתמשים מקומית לבדיקות

export interface User {
  email: string;
  password: string;
  role: "user" | "business" | "admin";
  name: string;
}

// רשימת משתמשים מקומיים
export const localUsers: User[] = [
  {
    email: "admin@gmail.com",
    password: "Abc!123Abc",
    role: "admin",
    name: "מנהל מערכת"
  },
  {
    email: "business@test.com",
    password: "Business123!",
    role: "business", 
    name: "משתמש עסקי"
  },
  {
    email: "user@test.com",
    password: "User123!",
    role: "user",
    name: "משתמש רגיל"
  }
];

// פונקציית התחברות מקומית
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = localUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        resolve({ success: true, user });
      } else {
        resolve({ success: false, error: "פרטי התחברות לא נכונים" });
      }
    }, 1000); // הדמיה של עיכוב רשת
  });
};
