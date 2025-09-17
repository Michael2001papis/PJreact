
// Favorites.tsx..
/*-(ייבוא הוקים לניהול מצב ואפקטים, וטיפוס כרטיסים מה-API)-*/
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Card } from "../API/cards";
import { FaHeart, FaEdit, FaTrash, FaShare, FaSearch, FaSort, FaEye, FaPhone, FaMapMarkerAlt, FaIdCard, FaArrowUp, FaCog, FaCrown } from "react-icons/fa";
import { toast } from "react-toastify";
import LazyImage from "../Components/LazyImage";
/*-(קומפוננטת Favorites - ניהול והצגת כרטיסים שסומנו כמועדפים)-*/
export default function Favorites() {
  /*-(בדיקת הרשאות מנהל)-*/
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.username === 'admin@gmail.com' && user?.role === 'admin';

  /*-(סטייטים לניהול רשימת מועדפים, מצב עריכה וכרטיסים שנבחרו)-*/
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "phone" | "city">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  /*-(שליפת המועדפים מה-localStorage בעת טעינה ראשונית)-*/
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  /*-(מחיקת כל המועדפים ושיוך מחודש של סטייטים)-*/
  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setSelectedIds(new Set());
    toast.success("כל המועדפים נמחקו בהצלחה!");
  };

  /*-(סינון ומיון המועדפים עם useMemo לביצועים טובים יותר)-*/
  const filteredAndSortedFavorites = useMemo(() => {
    const filtered = favorites.filter(card => {
      const matchesSearch = searchQuery === "" || 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.phone.includes(searchQuery) ||
        card.bizNumber.includes(searchQuery) ||
        card.address.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "phone":
          aValue = a.phone;
          bValue = b.phone;
          break;
        case "city":
          aValue = a.address.city.toLowerCase();
          bValue = b.address.city.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [favorites, searchQuery, sortBy, sortOrder]);

  /*-(שיתוף כרטיס)-*/
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
  /*-(מעבר בין מצב תצוגה למצב עריכה ובחירה)-*/
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedIds(new Set());
  };
  /*-(בחירה או הסרה של כרטיס מתוך רשימת הכרטיסים הנבחרים)-*/
  const toggleCardSelection = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };
  /*-(מחיקת כרטיסים שנבחרו בלבד מתוך רשימת המועדפים)-*/
  const deleteSelected = () => {
    const updated = favorites.filter(card => !selectedIds.has(card._id));
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setSelectedIds(new Set());
    if (updated.length === 0) setIsEditMode(false);
    toast.success(`${selectedIds.size} כרטיסים נמחקו מהמועדפים!`);
  };
  /*-(רינדור עמוד המועדפים - כולל כרטיסים, מצב עריכה, וכפתורים)-*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="mx-auto max-w-7xl">
        {/* כותרת וסטטיסטיקות */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-glow">
            מועדפים שלי
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2 rtl:space-x-reverse animate-scale-in hover:animate-float">
              <FaHeart className="text-red-500 animate-pulse-slow" />
              <span>סה"כ מועדפים: {favorites.length}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse animate-scale-in hover:animate-float" style={{ animationDelay: '0.1s' }}>
              <FaEye className="text-blue-500 animate-pulse-slow" />
              <span>מוצגים: {filteredAndSortedFavorites.length}</span>
            </div>
            {isEditMode && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse animate-scale-in hover:animate-float" style={{ animationDelay: '0.2s' }}>
                <FaEdit className="text-yellow-500 animate-pulse-slow" />
                <span>נבחרו: {selectedIds.size}</span>
              </div>
            )}
          </div>
        </div>

        {/* פאנל מנהל */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg p-6 mb-8 animate-fade-in border-2 border-purple-200 dark:border-purple-800">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FaCrown className="text-3xl text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    שליטה מנהלית במועדפים
                  </h2>
                  <p className="text-purple-600 dark:text-purple-300">
                    ניהול מתקדם של כרטיסי המועדפים
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={toggleEditMode}
                  className={`action-btn-${isEditMode ? 'danger' : 'primary'} flex items-center space-x-2 rtl:space-x-reverse`}
                >
                  <FaEdit />
                  <span>{isEditMode ? 'יציאה ממצב עריכה' : 'מצב עריכה'}</span>
                </button>
                
                {isEditMode && selectedIds.size > 0 && (
                  <button
                    onClick={deleteSelected}
                    className="action-btn-danger flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <FaTrash />
                    <span>מחק נבחרים ({selectedIds.size})</span>
                  </button>
                )}
              </div>
            </div>
            
            {isEditMode && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <FaCog className="text-blue-500" />
                  <span className="font-semibold text-gray-800 dark:text-white">מצב עריכה פעיל</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  לחץ על כרטיסים כדי לבחור אותם למחיקה. {selectedIds.size} כרטיסים נבחרו.
                </p>
              </div>
            )}
          </div>
        )}

        {favorites.length === 0 ? (
          /*-(תצוגת ברירת מחדל כאשר אין כרטיסים מועדפים)-*/
          <div className="text-center py-16">
            <FaHeart className="mx-auto text-8xl text-gray-300 mb-6" />
            <h3 className="text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
              אין מועדפים עדיין
            </h3>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              הוסף כרטיסים למועדפים כדי לראות אותם כאן
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors"
            >
              לך לעמוד הבית
            </button>
          </div>
        ) : (
          <>
            {/* פאנל חיפוש וסינון */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* חיפוש */}
                <div className="relative">
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="חיפוש במועדפים..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* מיון */}
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "title" | "phone" | "city")}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="title">מיון לפי שם</option>
                    <option value="phone">מיון לפי טלפון</option>
                    <option value="city">מיון לפי עיר</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <FaSort className="text-lg" />
                  </button>
                </div>

                {/* מצב עריכה */}
                <button
                  onClick={toggleEditMode}
                  className={`px-6 py-3 rounded-xl text-white font-semibold transition-colors ${
                    isEditMode 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  <FaEdit className="inline mr-2" />
                  {isEditMode ? "סיום עריכה" : "מצב עריכה"}
                </button>

                {/* איפוס */}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSortBy("title");
                    setSortOrder("asc");
                    setIsEditMode(false);
                    setSelectedIds(new Set());
                  }}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  איפוס
                </button>
              </div>
            </div>

            {/* כרטיסים */}
            {filteredAndSortedFavorites.length === 0 ? (
              <div className="text-center py-12">
                <FaSearch className="mx-auto text-6xl text-gray-400 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  לא נמצאו מועדפים
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  נסה לשנות את מילות החיפוש
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedFavorites.map((card, index) => (
                  <div
                    key={card._id}
                    className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in hover-lift ${
                      isEditMode && selectedIds.has(card._id) ? "ring-2 ring-red-500" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <LazyImage
                        src={card.image.url}
                        alt={card.image.alt}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2 rtl:space-x-reverse">
                        {isEditMode ? (
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-red-600 rounded focus:ring-red-500"
                            checked={selectedIds.has(card._id)}
                            onChange={() => toggleCardSelection(card._id)}
                          />
                        ) : (
                          <>
                            <button
                              onClick={() => shareCard(card)}
                              className="p-2 rounded-full bg-white bg-opacity-80 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                            >
                              <FaShare className="text-lg" />
                            </button>
                            <button
                              onClick={() => {
                                const updated = favorites.filter(fav => fav._id !== card._id);
                                localStorage.setItem("favorites", JSON.stringify(updated));
                                setFavorites(updated);
                                toast.success("הוסר מהמועדפים!");
                              }}
                              className="p-2 rounded-full bg-white bg-opacity-80 text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-red-600 transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {card.subtitle}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <p className="flex items-center space-x-2 rtl:space-x-reverse">
                          <FaPhone className="text-green-500" />
                          <span>{card.phone}</span>
                        </p>
                        <p className="flex items-center space-x-2 rtl:space-x-reverse">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <span>{card.address.city}, {card.address.country}</span>
                        </p>
                        <p className="flex items-center space-x-2 rtl:space-x-reverse">
                          <FaIdCard className="text-purple-500" />
                          <span className="font-mono">{card.bizNumber}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* כפתורי פעולה */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {isEditMode && selectedIds.size > 0 && (
                <button
                  onClick={deleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <FaTrash />
                  <span>מחק נבחרים ({selectedIds.size})</span>
                </button>
              )}
              <button
                onClick={clearFavorites}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 rtl:space-x-reverse"
              >
                <FaTrash />
                <span>מחק הכל</span>
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 rtl:space-x-reverse"
              >
                <FaArrowUp />
                <span>לראש הדף</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
/*--*/