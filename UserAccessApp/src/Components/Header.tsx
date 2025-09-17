
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
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white shadow-lg dark:from-gray-900 dark:to-gray-800 animate-fade-in">
      {/*-(כפתור ניווט לעמוד הבית)-*/}
      <Link to="/home" className="text-2xl font-bold hover:underline animate-glow">
        Home
      </Link>
      {/*-(ניווט בין עמודים לפי סוג המשתמש)-*/}
      <nav className="flex items-center space-x-6 text-lg">
        {user?.role === "business" && (
          <Link to="/my-cards" className="hover:underline transition-all duration-300 hover:animate-float">My Cards</Link>
        )}
        {user && (
          <>
            <Link to="/profile" className="hover:underline transition-all duration-300 hover:animate-float">פרופיל אישי</Link>
            <Link to="/settings" className="hover:underline transition-all duration-300 hover:animate-float">הגדרות</Link>
            <Link to="/favorites" className="hover:underline transition-all duration-300 hover:animate-float">מועדפים</Link>
            {user?.role === "admin" && (
              <Link to="/new-profile" className="hover:underline transition-all duration-300 hover:animate-float bg-yellow-500 px-3 py-1 rounded-full text-black font-semibold">יצירת פרופיל חדש</Link>
            )}
            <Link to="/copyright" className="hover:underline transition-all duration-300 hover:animate-float">זכויות יוצרים</Link>
            <Link to="/about" className="hover:underline transition-all duration-300 hover:animate-float">אודות</Link>
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
          className="rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
        <DarkThemeToggle />
        {user ? (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-white px-4 py-2 text-blue-600 transition-all duration-300 hover:bg-gray-100 hover:animate-float font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signin"
            className="rounded-lg bg-white px-4 py-2 text-blue-600 transition-all duration-300 hover:bg-gray-100 hover:animate-float font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
/*--*/