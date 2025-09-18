
// Home.tsx..
/*-(ייבוא ספריות והוקרים נחוצים)-*/
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Card, fetchCards } from "../../API/cards";
import { FaSearch, FaSort, FaHeart, FaShare, FaPhone, FaMapMarkerAlt, FaIdCard, FaCog, FaTrash, FaEdit, FaPlus, FaUsers, FaChartBar } from "react-icons/fa";
import { toast } from "react-toastify";
import LazyImage from "../../Components/LazyImage";
/*-(קומפוננטת Home - מציגה את כל הכרטיסים וכוללת חיפוש, מועדפים ושיתוף)-*/
const Home = () => {
  /*-(בדיקת הרשאות מנהל)-*/
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.username === 'admin@gmail.com' && user?.role === 'admin';

  /*-(סטייטים לכרטיסים ולמועדפים - כולל טעינה מה-localStorage)-*/
  const [cards, setCards] = useState<Card[]>([]);
  const [favorites, setFavorites] = useState<Card[]>(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "phone" | "city">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  /*-(שליפת כרטיסים מקומיים עם טיפול בשגיאות והצגת Toast)-*/
  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCards();
        setCards(data);
      } catch (err) {
        toast.error(`שגיאה בטעינת כרטיסים: ${err}`);
      } finally {
        setIsLoading(false);
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
      
      const matchesFavorites = !showFavoritesOnly || 
        favorites.some(fav => fav._id === card._id);
      
      return matchesSearch && matchesFavorites;
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
  }, [cards, searchQuery, showFavoritesOnly, favorites, sortBy, sortOrder]);
  /*-(הוספה או הסרה של כרטיס מרשימת המועדפים)-*/
  const toggleFavorite = (card: Card) => {
    let updatedFavorites;
    if (favorites.some(fav => fav._id === card._id)) {
      updatedFavorites = favorites.filter(fav => fav._id !== card._id);
      toast.info("הוסר מהמועדפים ❤️");
    } else {
      updatedFavorites = [...favorites, card];
      toast.success("נוסף למועדפים ❤️");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  /*-(שיתוף כרטיס דרך Gmail עם פרטים בסיסיים)-*/
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

  // פונקציות מנהל
  const toggleCardSelection = (cardId: number) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  const deleteSelectedCards = () => {
    if (selectedCards.size === 0) return;
    
    const updatedCards = cards.filter(card => !selectedCards.has(card._id));
    setCards(updatedCards);
    setSelectedCards(new Set());
    toast.success(`${selectedCards.size} כרטיסים נמחקו`);
  };

  const deleteCard = (cardId: number) => {
    setCards(prev => prev.filter(card => card._id !== cardId));
    toast.success("כרטיס נמחק");
  };

  const addNewCard = () => {
    // TODO: פתיחת מודל הוספת כרטיס
    toast.info("פונקציית הוספת כרטיס תהיה זמינה בקרוב");
  };
  /*-(רינדור כל עמוד הבית - כולל כותרת, חיפוש, סינון וכרטיסים מסוננים בעיצוב רספונסיבי)-*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="mx-auto max-w-7xl">
        {/* כותרת וסטטיסטיקות */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4 animate-glow">
            כרטיסי עסק
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="stat-card animate-scale-in hover:animate-float">
              <div className="stat-number animate-pulse-slow">{cards.length}</div>
              <div className="stat-label">סה"כ כרטיסים</div>
            </div>
            <div className="stat-card animate-scale-in hover:animate-float" style={{ animationDelay: '0.1s' }}>
              <div className="stat-number text-red-500 animate-pulse-slow">{favorites.length}</div>
              <div className="stat-label">מועדפים</div>
            </div>
            <div className="stat-card animate-scale-in hover:animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="stat-number text-green-500 animate-pulse-slow">{filteredAndSortedCards.length}</div>
              <div className="stat-label">מוצגים</div>
            </div>
          </div>
        </div>

        {/* פאנל מנהל */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg p-6 mb-8 animate-fade-in border-2 border-purple-200 dark:border-purple-800">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FaCog className="text-3xl text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    פאנל מנהל
                  </h2>
                  <p className="text-purple-600 dark:text-purple-300">
                    שליטה מלאה על הכרטיסים והמערכת
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setAdminMode(!adminMode)}
                  className={`action-btn-${adminMode ? 'danger' : 'primary'} flex items-center space-x-2 rtl:space-x-reverse`}
                >
                  <FaCog />
                  <span>{adminMode ? 'יציאה ממצב מנהל' : 'מצב מנהל'}</span>
                </button>
                
                {adminMode && (
                  <>
                    <button
                      onClick={addNewCard}
                      className="action-btn-success flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <FaPlus />
                      <span>הוסף כרטיס</span>
                    </button>
                    
                    {selectedCards.size > 0 && (
                      <button
                        onClick={deleteSelectedCards}
                        className="action-btn-danger flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <FaTrash />
                        <span>מחק נבחרים ({selectedCards.size})</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {adminMode && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <FaChartBar className="text-blue-500" />
                    <span className="font-semibold">סטטיסטיקות</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    סה"כ: {cards.length} | מועדפים: {favorites.length} | נבחרים: {selectedCards.size}
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <FaUsers className="text-green-500" />
                    <span className="font-semibold">משתמשים</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    ניהול משתמשים ושליטה בהרשאות
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <FaCog className="text-purple-500" />
                    <span className="font-semibold">הגדרות</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    הגדרות מערכת והתאמות
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* פאנל חיפוש וסינון */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* חיפוש */}
            <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

            {/* סינון מועדפים */}
            <label className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">הצג מועדפים בלבד</span>
            </label>

            {/* איפוס סינון */}
            <button
              onClick={() => {
                setSearchQuery("");
                setShowFavoritesOnly(false);
                setSortBy("title");
                setSortOrder("asc");
              }}
              className="action-btn-secondary px-6 py-3"
            >
              איפוס
            </button>
          </div>
        </div>

        {/* כרטיסים */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="spinner h-12 w-12"></div>
            <p className="text-gray-600 dark:text-gray-300 animate-pulse">טוען כרטיסים...</p>
          </div>
        ) : filteredAndSortedCards.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <FaSearch className="mx-auto text-6xl text-gray-400 mb-4 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              לא נמצאו כרטיסים
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              נסה לשנות את מילות החיפוש או הסינון
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setShowFavoritesOnly(false);
                setSortBy("title");
                setSortOrder("asc");
              }}
              className="action-btn-primary"
            >
              איפוס סינון
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCards.map((card, index) => (
              <div
                key={card._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-scale-in hover:animate-float card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <LazyImage 
                    src={card.image.url} 
                    alt={card.image.alt} 
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3 flex space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => toggleFavorite(card)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                        favorites.some(fav => fav._id === card._id)
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <FaHeart className="text-lg" />
                    </button>
                    <button
                      onClick={() => shareCard(card)}
                      className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <FaShare className="text-lg" />
                    </button>
                    
                    {/* כפתורי מנהל */}
                    {isAdmin && adminMode && (
                      <>
                        <button
                          onClick={() => toggleCardSelection(card._id)}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                            selectedCards.has(card._id)
                              ? "bg-purple-500 text-white ring-2 ring-purple-300"
                              : "bg-white/80 text-gray-600 hover:bg-purple-500 hover:text-white"
                          }`}
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
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};
/*-(ייצוא הקומפוננטה לשימוש במערכת)-*/
export default Home;
/*--*/