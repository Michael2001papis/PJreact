
// Pages/Settings/Settings.tsx..
/*-(ייבוא הוקים לניהול מצבים ואפקטים)-*/
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaLanguage, FaFont, FaBell, FaPalette, FaMoon, FaSun, FaSave, FaUndo, FaCog, FaShieldAlt, FaEye } from "react-icons/fa";
/*-(קומפוננטת Settings - ניהול הגדרות משתמש מתקדמות)-*/
const Settings = () => {
  /*-(הגדרות ברירת מחדל למצב ראשוני)-*/
  const defaultSettings = {
    language: "he",
    fontSize: "normal",
    notifications: true,
    theme: "light",
    privacy: "public",
    dataSharing: false,
    autoSave: true,
  };
  /*-(סטייטים להגדרות השמורות בפועל)-*/
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || defaultSettings.language);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("fontSize") || defaultSettings.fontSize);
  const [notifications, setNotifications] = useState(() =>
    JSON.parse(localStorage.getItem("notifications") || JSON.stringify(defaultSettings.notifications))
  );
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || defaultSettings.theme);
  const [privacy, setPrivacy] = useState(() => localStorage.getItem("privacy") || defaultSettings.privacy);
  const [dataSharing, setDataSharing] = useState(() =>
    JSON.parse(localStorage.getItem("dataSharing") || JSON.stringify(defaultSettings.dataSharing))
  );
  const [autoSave, setAutoSave] = useState(() =>
    JSON.parse(localStorage.getItem("autoSave") || JSON.stringify(defaultSettings.autoSave))
  );
  
  /*-(סטייטים זמניים לעריכה לפני אישור סופי)-*/
  const [tempLanguage, setTempLanguage] = useState(language);
  const [tempFontSize, setTempFontSize] = useState(fontSize);
  const [tempNotifications, setTempNotifications] = useState(notifications);
  const [tempTheme, setTempTheme] = useState(theme);
  const [tempPrivacy, setTempPrivacy] = useState(privacy);
  const [tempDataSharing, setTempDataSharing] = useState(dataSharing);
  const [tempAutoSave, setTempAutoSave] = useState(autoSave);
  /*-(אפקט לעדכון גודל הטקסט והנושא בהתאם לבחירת המשתמש)-*/
  useEffect(() => {
    document.body.style.fontSize =
      fontSize === "large" ? "18px" :
      fontSize === "small" ? "14px" :
      "16px";
    
    // עדכון נושא
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [fontSize, theme]);
  /*-(שומר את ההגדרות הנבחרות ב-localStorage ומעדכן את הסטייטים הראשיים)-*/
  const handleApply = () => {
    setLanguage(tempLanguage);
    setFontSize(tempFontSize);
    setNotifications(tempNotifications);
    setTheme(tempTheme);
    setPrivacy(tempPrivacy);
    setDataSharing(tempDataSharing);
    setAutoSave(tempAutoSave);
    
    localStorage.setItem("language", tempLanguage);
    localStorage.setItem("fontSize", tempFontSize);
    localStorage.setItem("notifications", JSON.stringify(tempNotifications));
    localStorage.setItem("theme", tempTheme);
    localStorage.setItem("privacy", tempPrivacy);
    localStorage.setItem("dataSharing", JSON.stringify(tempDataSharing));
    localStorage.setItem("autoSave", JSON.stringify(tempAutoSave));
    
    toast.success("ההגדרות נשמרו בהצלחה! ✅");
  };
  
  /*-(מאפס את ההגדרות לערכי ברירת מחדל)-*/
  const handleReset = () => {
    setTempLanguage(defaultSettings.language);
    setTempFontSize(defaultSettings.fontSize);
    setTempNotifications(defaultSettings.notifications);
    setTempTheme(defaultSettings.theme);
    setTempPrivacy(defaultSettings.privacy);
    setTempDataSharing(defaultSettings.dataSharing);
    setTempAutoSave(defaultSettings.autoSave);
    toast.info("ההגדרות אופסו לברירת מחדל 🔄");
  };
  /*-(רינדור עמוד ההגדרות עם עיצוב ותגובות)-*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-6 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        {/*-(כותרת עם אייקון)-*/}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaCog className="text-5xl text-indigo-600 dark:text-indigo-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              הגדרות מתקדמות
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">התאם את החוויה שלך באפליקציה</p>
        </div>
        {/*-(הגדרת שפה)-*/}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <FaLanguage className="text-3xl text-blue-500 mr-4" />
            <h2 className="text-2xl font-semibold">שפה</h2>
          </div>
          <select
            value={tempLanguage}
            onChange={(e) => setTempLanguage(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="he">🇮🇱 עברית</option>
            <option value="en">🇺🇸 English</option>
            <option value="ru">🇷🇺 Русский</option>
          </select>
        </section>
        {/*-(שינוי גודל טקסט באתר)-*/}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <FaFont className="text-3xl text-green-500 mr-4" />
            <h2 className="text-2xl font-semibold">גודל טקסט</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["small", "normal", "large"].map((size) => (
              <button
                key={size}
                onClick={() => setTempFontSize(size)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  tempFontSize === size
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:shadow-md"
                }`}
              >
                <div className="text-center">
                  <div className={`font-bold mb-2 ${
                    size === "small" ? "text-sm" : size === "normal" ? "text-base" : "text-lg"
                  }`}>
                    {size === "small" ? "קטן" : size === "normal" ? "רגיל" : "גדול"}
                  </div>
                  <div className="text-xs opacity-75">
                    {size === "small" ? "14px" : size === "normal" ? "16px" : "18px"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
        {/*-(הגדרות נושא)-*/}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <FaPalette className="text-3xl text-purple-500 mr-4" />
            <h2 className="text-2xl font-semibold">נושא</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "light", label: "בהיר", icon: FaSun, color: "yellow" },
              { value: "dark", label: "כהה", icon: FaMoon, color: "indigo" }
            ].map(({ value, label, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setTempTheme(value)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  tempTheme === value
                    ? color === "yellow" 
                      ? "bg-yellow-600 text-white border-yellow-600 shadow-lg scale-105"
                      : "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:shadow-md"
                }`}
              >
                <div className="text-center">
                  <Icon className="text-3xl mx-auto mb-3" />
                  <div className="font-bold text-lg">{label}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/*-(אפשרות לקבלת התראות)-*/}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <FaBell className="text-3xl text-orange-500 mr-4" />
            <h2 className="text-2xl font-semibold">התראות</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center cursor-pointer p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <input
                type="checkbox"
                checked={tempNotifications}
                onChange={() => setTempNotifications(!tempNotifications)}
                className="size-6 accent-orange-500 cursor-pointer"
              />
              <span className="ml-4 text-lg">קבלת התראות למייל ולטלפון</span>
            </label>
            <label className="flex items-center cursor-pointer p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <input
                type="checkbox"
                checked={tempAutoSave}
                onChange={() => setTempAutoSave(!tempAutoSave)}
                className="size-6 accent-green-500 cursor-pointer"
              />
              <span className="ml-4 text-lg">שמירה אוטומטית של שינויים</span>
            </label>
          </div>
        </section>

        {/*-(הגדרות פרטיות)-*/}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <FaShieldAlt className="text-3xl text-red-500 mr-4" />
            <h2 className="text-2xl font-semibold">פרטיות ואבטחה</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-3">רמת פרטיות</label>
              <select
                value={tempPrivacy}
                onChange={(e) => setTempPrivacy(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="public">ציבורי - כל המשתמשים יכולים לראות</option>
                <option value="friends">חברים - רק חברים יכולים לראות</option>
                <option value="private">פרטי - רק אני יכול לראות</option>
              </select>
            </div>
            <label className="flex items-center cursor-pointer p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <input
                type="checkbox"
                checked={tempDataSharing}
                onChange={() => setTempDataSharing(!tempDataSharing)}
                className="size-6 accent-red-500 cursor-pointer"
              />
              <span className="ml-4 text-lg">אפשר שיתוף נתונים אנונימיים לשיפור השירות</span>
            </label>
          </div>
        </section>
        {/*-(כפתורים לשמירה או איפוס הגדרות)-*/}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleApply}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-3 rtl:space-x-reverse hover:scale-105"
            >
              <FaSave className="text-xl" />
              <span className="text-lg font-semibold">שמור הגדרות</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-3 rtl:space-x-reverse hover:scale-105"
            >
              <FaUndo className="text-xl" />
              <span className="text-lg font-semibold">איפוס לברירת מחדל</span>
            </button>
          </div>
          
          {/*-(סטטוס שמירה)-*/}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
              <FaEye className="text-blue-500" />
              <span>השינויים יישמרו אוטומטית ב-localStorage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/*-(ייצוא קומפוננטת Settings לשימוש באפליקציה)-*/
export default Settings;
/*--*/