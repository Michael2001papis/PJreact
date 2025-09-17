
// src/Pages/NewProfile.tsx
/*-(ייבוא ספריות לניהול טפסים, סטייטים, Toastים וסגנונות)-*/
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaUserPlus, FaUsers, FaEdit, FaTrash, FaLanguage, FaShieldAlt, FaLock, FaArrowLeft } from 'react-icons/fa';
/*-(הגדרת טיפוסי מידע לטופס ולמשתמש)-*/
interface NewProfileForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location?: string;
  street?: string;
  city: string;
  userType: string;
  languages?: string[];
}
interface User extends NewProfileForm {
  id: number;
}
/*-(קומפוננטת NewProfile - יצירה, עריכה וניהול משתמשים עם טבלה)-*/
export default function NewProfile() {
  /*-(בדיקת הרשאות - רק מנהל יכול לגשת)-*/
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.username === 'admin@gmail.com' && user?.role === 'admin';

  /*-(חיבור הטופס עם RHF וולידציה בסיסית)-*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProfileForm>();
  /*-(סטייטים לניהול המשתמשים, מצב עריכה, שפות ועוד)-*/
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });
  const [showTable, setShowTable] = useState(users.length > 0);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLang, setNewLang] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  /*-(שמירת המשתמשים ב-localStorage בכל שינוי)-*/
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    setShowTable(users.length > 0);
  }, [users]);
  /*-(הוספת משתמש חדש לרשימה)-*/
  const onSubmit = (data: NewProfileForm) => {
    setLoading(true);
    const newUser: User = { ...data, languages, id: Date.now() };
    setTimeout(() => {
      setUsers((prev) => [...prev, newUser]);
      reset();
      setLanguages([]);
      setNewLang('');
      setLoading(false);
      toast.success('המשתמש נוסף בהצלחה');
    }, 1000);
  };
  /*-(עדכון משתמש קיים לפי ID)-*/
  const handleUpdateSubmit = (data: NewProfileForm) => {
    if (editingUserId === null) return;
    setLoading(true);
    const updatedUser: User = { ...data, languages, id: editingUserId };
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUserId ? updatedUser : user))
      );
      reset();
      setLanguages([]);
      setNewLang('');
      setEditingUserId(null);
      setIsEditing(false);
      setLoading(false);
      toast.info('המשתמש עודכן בהצלחה');
    }, 1000);
  };
  /*-(מחיקת משתמש בודד לפי ID)-*/
  const handleDelete = (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש הזה?')) {
      const updated = users.filter((user) => user.id !== id);
      setUsers(updated);
    }
  };
  /*-(מחיקת כל המשתמשים)-*/
  const handleDeleteAll = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל המשתמשים?')) {
      setUsers([]);
    }
  };
  /*-(טעינת משתמש לעריכה)-*/
  const handleEdit = (user: User) => {
    reset(user);
    setLanguages(user.languages || []);
    setIsEditing(true);
    setEditingUserId(user.id);
  };
  /*-(הוספת שפה חדשה לרשימת השפות של המשתמש)-*/
  const handleAddLanguage = () => {
    const lang = newLang.trim();
    if (lang && !languages.includes(lang)) {
      setLanguages((prev) => [...prev, lang]);
      setNewLang('');
    }
  };
  /*-(הסרת שפה מרשימת השפות)-*/
  const removeLanguage = (index: number) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };
  /*-(בדיקת הרשאות - אם לא מנהל, הצג הודעת שגיאה)-*/
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-fade-in">
            <div className="mb-6">
              <FaShieldAlt className="mx-auto text-6xl text-red-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                גישה מוגבלת
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                רק מנהל המערכת יכול ליצור פרופילים חדשים
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FaLock className="text-yellow-600" />
                  <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                    הרשאה נדרשת: מנהל מערכת
                  </span>
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="action-btn-primary w-full flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <FaArrowLeft />
                <span>חזור לעמוד הקודם</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*-(רינדור הטופס והטבלה עם כל הפונקציונליות והעיצוב)-*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" limit={1} />
      <div className="max-w-7xl mx-auto">
        {/*-(כותרת עמוד וטופס פרופיל)-*/}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            ניהול משתמשים
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            יצירה, עריכה וניהול פרופילי משתמשים
          </p>
        </div>
        {/* טופס יצירת משתמש */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <FaUserPlus className="text-3xl text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isEditing ? 'עריכת משתמש' : 'יצירת משתמש חדש'}
            </h2>
          </div>
          
          <form
            onSubmit={handleSubmit(isEditing ? handleUpdateSubmit : onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/*-(שדות טופס רגילים עם שגיאות ולידציה)-*/}
            <div>
              <label className="form-label">שם פרטי *</label>
              <input 
                {...register('firstName', { required: 'שדה חובה' })} 
                placeholder="הכנס שם פרטי" 
                className={`form-input ${errors.firstName ? 'border-red-500' : ''}`} 
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="form-label">שם משפחה *</label>
              <input 
                {...register('lastName', { required: 'שדה חובה' })} 
                placeholder="הכנס שם משפחה" 
                className={`form-input ${errors.lastName ? 'border-red-500' : ''}`} 
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
            <div>
              <label className="form-label">טלפון *</label>
              <input 
                {...register('phone', { required: 'שדה חובה' })} 
                placeholder="הכנס מספר טלפון" 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">אימייל *</label>
              <input 
                {...register('email', { required: 'שדה חובה' })} 
                placeholder="הכנס כתובת אימייל" 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">מיקום</label>
              <input 
                {...register('location')} 
                placeholder="הכנס מיקום" 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">רחוב</label>
              <input 
                {...register('street')} 
                placeholder="הכנס שם רחוב" 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">עיר *</label>
              <input 
                {...register('city', { required: 'שדה חובה' })} 
                placeholder="הכנס שם עיר" 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">סוג משתמש *</label>
              <select {...register('userType', { required: 'שדה חובה' })} className="form-input">
                <option value="">בחר סוג משתמש</option>
                <option value="personal">אישי</option>
                <option value="business">עסקי</option>
                <option value="admin">מנהלי</option>
              </select>
            </div>
            {/*-(הוספת שפות לטופס בצורה דינאמית)-*/}
            <div className="col-span-1 md:col-span-2">
              <label className="form-label flex items-center space-x-2 rtl:space-x-reverse">
                <FaLanguage className="text-blue-500" />
                <span>שפות</span>
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newLang} 
                  onChange={(e) => setNewLang(e.target.value)} 
                  className="form-input flex-1" 
                  placeholder="הכנס שפה חדשה" 
                />
                <button 
                  type="button" 
                  onClick={handleAddLanguage} 
                  className="action-btn-primary px-4 py-3"
                >
                  הוסף
                </button>
              </div>
              {languages.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">שפות שנבחרו:</p>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                      >
                        {lang}
                        <button 
                          onClick={() => removeLanguage(idx)} 
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/*-(כפתורים לפעולה: אישור, ניקוי והוספה עתידית)-*/}
            <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4">
              <button 
                type="submit" 
                className={`action-btn-success flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner size-4"></div>
                    <span>טוען...</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    <span>{isEditing ? 'עדכון משתמש' : 'יצירת משתמש'}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setLanguages([]);
                  setNewLang('');
                  setIsEditing(false);
                  setEditingUserId(null);
                }}
                className="action-btn-secondary flex-1"
              >
                ניקוי שדות
              </button>
            </div>
          </form>
        </div>
        {/*-(טבלת המשתמשים במידה ויש כאלה)-*/}
        {showTable && users.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-0">
                <FaUsers className="text-3xl text-green-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  רשימת משתמשים ({users.length})
                </h2>
              </div>
              <button 
                onClick={handleDeleteAll} 
                className="action-btn-danger flex items-center space-x-2 rtl:space-x-reverse"
              >
                <FaTrash />
                <span>מחיקת כל המשתמשים</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <th className="p-4 text-right font-semibold">שם פרטי</th>
                    <th className="p-4 text-right font-semibold">שם משפחה</th>
                    <th className="p-4 text-right font-semibold">טלפון</th>
                    <th className="p-4 text-right font-semibold">אימייל</th>
                    <th className="p-4 text-right font-semibold">עיר</th>
                    <th className="p-4 text-right font-semibold">סוג</th>
                    <th className="p-4 text-right font-semibold">שפות</th>
                    <th className="p-4 text-right font-semibold">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-colors duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-4 font-medium text-gray-800 dark:text-white">{user.firstName}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{user.lastName}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{user.phone}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{user.city}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.userType === 'admin' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : user.userType === 'business'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {user.userType === 'admin' ? 'מנהל' : user.userType === 'business' ? 'עסקי' : 'אישי'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {user.languages?.map((lang, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button 
                            onClick={() => handleEdit(user)} 
                            className="action-btn-secondary px-3 py-1 text-sm flex items-center space-x-1 rtl:space-x-reverse"
                          >
                            <FaEdit />
                            <span>עריכה</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)} 
                            className="action-btn-danger px-3 py-1 text-sm flex items-center space-x-1 rtl:space-x-reverse"
                          >
                            <FaTrash />
                            <span>מחיקה</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/*--*/