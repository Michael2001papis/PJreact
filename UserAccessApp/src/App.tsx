
// App.tsx..
/*-(ייבוא רכיבים ודפים מהפרויקט)-*/
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import MyCards from "./Pages/MyCards/MyCards";
import Settings from "./Pages/Settings/Settings";
import Header from "./Components/Header";
/*-(ייבוא state מה־store של Redux)-*/
import { useAppSelector } from "./store";
/*-(ייבוא דפים נוספים בפרויקט)-*/
import Copyright from "./Pages/Copyright";
import Favorites from "./Pages/Favorites";
import NewProfile from "./Pages/NewProfile";
import About from "./Pages/About";
/*-(ייבוא רכיב Toast להודעות קופצות)-*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*-(קומפוננטת השורש של האפליקציה)-*/
function App() {
  /*-(שליפת המשתמש מה־store כדי לבדוק הרשאות גישה)-*/
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      {/*-(תפריט עליון עם פונקציית חיפוש)-*/}
      <Header onSearch={(term) => {
        console.log("Search term:", term); 
      }} />
      {/*-(הגדרת נתיבי הניווט באפליקציה לפי React Router)-*/}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/my-cards" element={user?.role === "business" ? <MyCards /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/signin" />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/new-profile" element={<NewProfile />} />
        <Route path="/about" element={<About />} />
        {/*-(נתיב ברירת מחדל לכל כתובת לא מוכרת)-*/}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
      {/*-(רכיב ToastContainer להצגת הודעות הצלחה/שגיאה)-*/}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
/*-(ייצוא קומפוננטת App כקומפוננטת ברירת מחדל)-*/
export default App;
/*--*/