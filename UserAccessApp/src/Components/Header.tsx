
// Components/Header.tsx..
/*-(ייבוא ספריות וכלים חיוניים עבור ה-Header)-*/
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/slices/authSlice";
import DarkThemeToggle from "./DarkThemeToggle";
import { useState } from "react";

/*-(קומפוננטת Header - תפריט עליון לכל העמודים באתר)-*/
export default function Header({ onSearch }: { onSearch: (term: string) => void }) {
  /*-(משתנים וסטייטים לניהול משתמש, ניתוב וחיפוש)-*/
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");

  /*-(פונקציה להתנתקות מהמערכת ומעבר למסך ההתחברות)-*/
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  /*-(פונקציה שמטפלת בשינויים בשדה החיפוש ומעבירה את הערך למעלה)-*/
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  /*-(מבנה ה-HTML של התפריט העליון - כולל ניווט, חיפוש, מצב כהה וכניסה/יציאה)-*/
  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/*-(כפתור ניווט לעמוד הבית)-*/}
      <Link to="/home" className="text-2xl font-bold hover:underline">
        Home
      </Link>

      {/*-(ניווט בין עמודים לפי סוג המשתמש)-*/}
      <nav className="flex space-x-6 text-lg items-center">
        {user?.role === "business" && (
          <Link to="/my-cards" className="hover:underline">My Cards</Link>
        )}
        {user && (
          <>
            <Link to="/profile" className="hover:underline">פרופיל אישי</Link>
            <Link to="/settings" className="hover:underline">הגדרות</Link>
            <Link to="/favorites" className="hover:underline">מועדפים</Link>
            <Link to="/new-profile" className="hover:underline">יצירת פרופיל חדש</Link>
            <Link to="/copyright" className="hover:underline">זכויות יוצרים</Link>
            <Link to="/about" className="hover:underline">אודות</Link>
          </>
        )}
      </nav>

      {/*-(שדה חיפוש, מתג מצב כהה, וכפתור כניסה או יציאה)-*/}
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="חיפוש..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-2 py-1 rounded dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
        />
        <DarkThemeToggle />
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signin"
            className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
/*--*/

// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../store";
// import { logout } from "../store/slices/authSlice";
// import DarkThemeToggle from "./DarkThemeToggle";
// import { useState } from "react";
// export default function Header({ onSearch }: { onSearch: (term: string) => void }) {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.auth.user);
//   const [searchTerm, setSearchTerm] = useState("");
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/signin");
//   };
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     onSearch(term);
//   };
//   return (
//     <header className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
//       <Link to="/home" className="text-2xl font-bold hover:underline">
//         Home
//       </Link>
//       <nav className="flex space-x-6 text-lg items-center">
//         {user?.role === "business" && <Link to="/my-cards" className="hover:underline">My Cards</Link>}
//         {user && (
//           <>
//             <Link to="/profile" className="hover:underline">פרופיל אישי</Link>
//             <Link to="/settings" className="hover:underline">הגדרות</Link>
//             <Link to="/favorites" className="hover:underline">מועדפים</Link>
//             <Link to="/new-profile" className="hover:underline">יצירת פרופיל חדש</Link>
//             <Link to="/copyright" className="hover:underline">זכויות יוצרים</Link>
//             <Link to="/about" className="hover:underline">אודות</Link>
//           </>
//         )}
//       </nav>
//       <div className="flex items-center space-x-4">
//         <input
//           type="search"
//           placeholder="חיפוש..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="px-2 py-1 rounded dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
//         />
//         <DarkThemeToggle />
//         {user ? (
//           <button
//             onClick={handleLogout}
//             className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             to="/signin"
//             className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
//           >
//             Sign In
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// }
/*--*/






