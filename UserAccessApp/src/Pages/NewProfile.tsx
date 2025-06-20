
// src/Pages/NewProfile.tsx
/*-(ייבוא ספריות לניהול טפסים, סטייטים, Toastים וסגנונות)-*/
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  /*-(רינדור הטופס והטבלה עם כל הפונקציונליות והעיצוב)-*/
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" limit={1} />
      {/*-(כותרת עמוד וטופס פרופיל)-*/}
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">יצירת פרופיל משתמש חדש</h1>
      <form
        onSubmit={handleSubmit(isEditing ? handleUpdateSubmit : onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        {/*-(שדות טופס רגילים עם שגיאות ולידציה)-*/}
        <div>
          <input {...register('firstName', { required: 'שדה חובה' })} placeholder="שם פרטי *" className={`input ${errors.firstName ? 'border-red-500' : ''}`} />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register('lastName', { required: 'שדה חובה' })} placeholder="שם משפחה *" className={`input ${errors.lastName ? 'border-red-500' : ''}`} />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <input {...register('phone', { required: true })} placeholder="טלפון *" className="input" />
        <input {...register('email', { required: true })} placeholder="אימייל *" className="input" />
        <input {...register('location')} placeholder="מיקום" className="input" />
        <input {...register('street')} placeholder="רחוב" className="input" />
        <input {...register('city', { required: true })} placeholder="עיר *" className="input" />
        <select {...register('userType', { required: true })} className="input">
          <option value="">בחר סוג משתמש *</option>
          <option value="personal">אישי</option>
          <option value="business">עסקי</option>
          <option value="admin">מנהלי</option>
        </select>
        {/*-(הוספת שפות לטופס בצורה דינאמית)-*/}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">שפות</label>
          <div className="flex gap-2">
            <input type="text" value={newLang} onChange={(e) => setNewLang(e.target.value)} className="input flex-1" placeholder="הוסף שפה" />
            <button type="button" onClick={handleAddLanguage} className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600">הוסף</button>
          </div>
          {languages.length > 0 && (
            <p className="mt-2 text-sm dark:text-gray-300">
              שפות שנבחרו:
              {languages.map((lang, idx) => (
                <span key={idx} className="inline-block bg-blue-200 dark:bg-gray-700 px-2 py-1 m-1 rounded">
                  {lang}
                  <button onClick={() => removeLanguage(idx)} className="ml-1 text-red-600">×</button>
                </span>
              ))}
            </p>
          )}
        </div>
        {/*-(כפתורים לפעולה: אישור, ניקוי והוספה עתידית)-*/}
        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between gap-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold w-full">
            {loading ? 'טוען...' : isEditing ? 'עדכון משתמש' : 'אישור'}
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
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg font-semibold w-full"
          >
            ניקוי שדות
          </button>
          <button type="button" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold w-full">
            + הוסף משתמש שותף
          </button>
        </div>
      </form>
      {/*-(טבלת המשתמשים במידה ויש כאלה)-*/}
      {showTable && users.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold dark:text-white">רשימת משתמשים</h2>
            <button onClick={handleDeleteAll} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
              מחיקת כל המשתמשים
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-right border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <th className="p-2">שם פרטי</th>
                  <th className="p-2">שם משפחה</th>
                  <th className="p-2">טלפון</th>
                  <th className="p-2">אימייל</th>
                  <th className="p-2">עיר</th>
                  <th className="p-2">סוג</th>
                  <th className="p-2">שפות</th>
                  <th className="p-2">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-600 border-t text-sm">
                    <td className="p-2">{user.firstName}</td>
                    <td className="p-2">{user.lastName}</td>
                    <td className="p-2">{user.phone}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.city}</td>
                    <td className="p-2">{user.userType}</td>
                    <td className="p-2">{user.languages?.join(', ')}</td>
                    <td className="p-2 space-x-2 rtl:space-x-reverse">
                      <button onClick={() => handleEdit(user)} className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded">עריכה</button>
                      <button onClick={() => handleDelete(user.id)} className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded">מחיקה</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
/*--*/