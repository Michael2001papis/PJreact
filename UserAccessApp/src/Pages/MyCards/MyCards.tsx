
// Pages/MyCards.tsx..
/*-(ייבוא הוקים וטיפוסי כרטיסים מה-API)-*/
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchCards, Card } from "../../API/cards";
import { FaSearch, FaSort, FaPlus, FaEdit, FaTrash, FaPhone, FaMapMarkerAlt, FaIdCard, FaCog, FaCrown, FaChartBar } from "react-icons/fa";
import { toast } from "react-toastify";
import LazyImage from "../../Components/LazyImage";
/*-(קומפוננטת MyCards - מציגה את כל הכרטיסים של המשתמש)-*/
const MyCards = () => {
  /*-(בדיקת הרשאות מנהל)-*/
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.username === 'admin@gmail.com' && user?.role === 'admin';

  /*-(סטייטים לניהול רשימת כרטיסים ומצב טעינה)-*/
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "phone" | "city">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [isEditMode, setIsEditMode] = useState(false);
  /*-(שליפת כרטיסים ברגע טעינת העמוד באמצעות useEffect)-*/
  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
        toast.success(`נטענו ${data.length} כרטיסים בהצלחה!`);
      } catch (error) {
        toast.error("שגיאה בטעינת הכרטיסים");
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  /*-(סינון ומיון הכרטיסים עם useMemo לביצועים טובים יותר)-*/
  const filteredAndSortedCards = useMemo(() => {
    const filtered = cards.filter(card => {
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
  }, [cards, searchQuery, sortBy, sortOrder]);

  /*-(פונקציות לניהול כרטיסים)-*/
  const toggleCardSelection = (id: number) => {
    setSelectedCards(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const deleteSelectedCards = () => {
    const remaining = cards.filter(card => !selectedCards.has(card._id));
    setCards(remaining);
    setSelectedCards(new Set());
    setIsEditMode(false);
    toast.success(`${selectedCards.size} כרטיסים נמחקו בהצלחה!`);
  };

  const addNewCard = () => {
    toast.info("תכונת הוספת כרטיס חדש תתווסף בקרוב!");
  };

  const editCard = (id: number) => {
    toast.info(`עריכת כרטיס ${id} - תכונה תתווסף בקרוב!`);
  };

  const deleteCard = (id: number) => {
    const remaining = cards.filter(card => card._id !== id);
    setCards(remaining);
    toast.success("הכרטיס נמחק בהצלחה!");
  };
  /*-(רינדור העמוד - כולל כותרת, כפתור, מצב טעינה ותצוגת כרטיסים)-*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="mx-auto max-w-7xl">
        {/* כותרת וסטטיסטיקות */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4 animate-glow">
            הכרטיסים שלי
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="stat-card animate-scale-in hover:animate-float">
              <div className="stat-number animate-pulse-slow">{cards.length}</div>
              <div className="stat-label">סה"כ כרטיסים</div>
            </div>
            <div className="stat-card animate-scale-in hover:animate-float" style={{ animationDelay: '0.1s' }}>
              <div className="stat-number text-blue-500 animate-pulse-slow">{filteredAndSortedCards.length}</div>
              <div className="stat-label">מוצגים</div>
            </div>
            {isEditMode && (
              <div className="stat-card animate-scale-in hover:animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="stat-number text-yellow-500 animate-pulse-slow">{selectedCards.size}</div>
                <div className="stat-label">נבחרו</div>
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
                    שליטה מנהלית בכרטיסים
                  </h2>
                  <p className="text-purple-600 dark:text-purple-300">
                    ניהול מתקדם של כל הכרטיסים במערכת
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`action-btn-${isEditMode ? 'danger' : 'primary'} flex items-center space-x-2 rtl:space-x-reverse`}
                >
                  <FaEdit />
                  <span>{isEditMode ? 'יציאה ממצב עריכה' : 'מצב עריכה'}</span>
                </button>
                
                {isEditMode && selectedCards.size > 0 && (
                  <button
                    onClick={deleteSelectedCards}
                    className="action-btn-danger flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <FaTrash />
                    <span>מחק נבחרים ({selectedCards.size})</span>
                  </button>
                )}
              </div>
            </div>
            
            {isEditMode && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <FaChartBar className="text-blue-500" />
                    <span className="font-semibold">סטטיסטיקות</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    סה"כ: {cards.length} | נבחרים: {selectedCards.size}
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <FaCog className="text-green-500" />
                    <span className="font-semibold">מצב עריכה</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    לחץ על כרטיסים כדי לבחור אותם
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <FaCrown className="text-purple-500" />
                    <span className="font-semibold">הרשאות מנהל</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    שליטה מלאה על כל הכרטיסים
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* פאנל בקרה */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* חיפוש */}
            <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש כרטיסים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pr-10"
              />
            </div>

            {/* מיון */}
            <div className="flex space-x-2 rtl:space-x-reverse">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "title" | "phone" | "city")}
                className="form-input flex-1"
              >
                <option value="title">מיון לפי שם</option>
                <option value="phone">מיון לפי טלפון</option>
                <option value="city">מיון לפי עיר</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="action-btn-primary px-4 py-3"
              >
                <FaSort className="text-lg" />
              </button>
            </div>

            {/* מצב עריכה */}
            <button
              onClick={() => {
                setIsEditMode(!isEditMode);
                setSelectedCards(new Set());
              }}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition-colors flex items-center space-x-2 rtl:space-x-reverse ${
                isEditMode 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              <FaEdit />
              <span>{isEditMode ? "סיום עריכה" : "מצב עריכה"}</span>
            </button>

            {/* הוספת כרטיס */}
            <button
              onClick={addNewCard}
              className="action-btn-primary px-6 py-3 flex items-center space-x-2 rtl:space-x-reverse"
            >
              <FaPlus />
              <span>הוסף כרטיס</span>
            </button>
          </div>

          {/* כפתורי פעולה בעריכה */}
          {isEditMode && selectedCards.size > 0 && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={deleteSelectedCards}
                className="action-btn-danger flex items-center space-x-2 rtl:space-x-reverse"
              >
                <FaTrash />
                <span>מחק נבחרים ({selectedCards.size})</span>
              </button>
            </div>
          )}
        </div>
        {/*-(הצגת הודעת טעינה או כרטיסים לפי מצב)-*/}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="spinner size-12"></div>
            <p className="text-gray-600 dark:text-gray-300 animate-pulse">טוען כרטיסים...</p>
          </div>
        ) : filteredAndSortedCards.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <FaSearch className="mx-auto text-6xl text-gray-400 mb-4 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {searchQuery ? "לא נמצאו כרטיסים" : "אין כרטיסים עדיין"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchQuery 
                ? "נסה לשנות את מילות החיפוש" 
                : "הוסף כרטיסים חדשים כדי להתחיל"
              }
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="action-btn-primary"
              >
                נקה חיפוש
              </button>
            ) : (
              <button
                onClick={addNewCard}
                className="action-btn-primary"
              >
                הוסף כרטיס ראשון
              </button>
            )}
          </div>
        ) : (
          /*-(רשימת הכרטיסים בתצוגת גריד רספונסיבית)-*/
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCards.map((card, index) => (
              <article
                key={card._id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in hover-lift card ${
                  isEditMode && selectedCards.has(card._id) ? "ring-2 ring-yellow-500" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  {/*-(תמונה ראשית של הכרטיס)-*/}
                  <LazyImage
                    src={card.image.url}
                    alt={card.image.alt}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2 rtl:space-x-reverse">
                    {isEditMode ? (
                      <input
                        type="checkbox"
                        className="size-6 text-yellow-600 rounded focus:ring-yellow-500"
                        checked={selectedCards.has(card._id)}
                        onChange={() => toggleCardSelection(card._id)}
                      />
                    ) : (
                      <>
                        <button
                          onClick={() => editCard(card._id)}
                          className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => deleteCard(card._id)}
                          className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {/*-(פרטי הכרטיס כולל טלפון, כתובת ומספר עסק)-*/}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {card.subtitle}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <p className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-600 transition-colors duration-200">
                      <FaPhone className="text-green-500" />
                      <span className="font-medium">טלפון:</span>
                      <span>{card.phone}</span>
                    </p>
                    <p className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-600 transition-colors duration-200">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span className="font-medium">עיר:</span>
                      <span>{card.address.city}, {card.address.country}</span>
                    </p>
                    <p className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-600 transition-colors duration-200">
                      <FaIdCard className="text-purple-500" />
                      <span className="font-medium">מספר כרטיס:</span>
                      <span className="font-mono">{card.bizNumber}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
/*-(ייצוא הקומפוננטה לשימוש בעמודים אחרים)-*/
export default MyCards;
/*--*/