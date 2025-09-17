
// Pages/Profile.tsx..
/*-(ייבוא ספריות וכלים לניהול טפסים, ולידציה ומידע מהסטייט)-*/
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useAppSelector } from "../../store";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaShieldAlt, FaUndo, FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope, FaCrown, FaBriefcase, FaUserTie } from "react-icons/fa";
/*-(הגדרת מבנה הנתונים של טופס הפרופיל)-*/
interface ProfileForm {
  username: string;
  phone: string;
  city: string;
  profilePic: string;
  bio: string;
  website: string;
  linkedin: string;
}
/*-(סכמת ולידציה באמצעות Joi לכל שדה בטופס)-*/
const schema = Joi.object<ProfileForm>({
  username: Joi.string().min(3).required().label("שם משתמש"),
  phone: Joi.string().min(9).required().label("טלפון"),
  city: Joi.string().required().label("עיר"),
  profilePic: Joi.string().uri().allow("").label("תמונת פרופיל"),
  bio: Joi.string().max(500).allow("").label("ביוגרפיה"),
  website: Joi.string().uri().allow("").label("אתר אישי"),
  linkedin: Joi.string().uri().allow("").label("LinkedIn"),
});
/*-(קומפוננטת Profile - טופס ניהול פרופיל אישי כולל עריכה, מחיקה, ואיפוס)-*/
function Profile() {
  /*-(שליפת המשתמש מהסטייט והגדרת מצבים שונים בקומפוננטה)-*/
  const user = useAppSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [profileData, setProfileData] = useState<ProfileForm>(() => {
    const saved = localStorage.getItem('profileData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      username: user?.username || "admin@gmail.com",
      phone: "050-1234567",
      city: "תל אביב",
      profilePic: "/images/e2ed726deca511eb7e7b03a2996ad15e.jpg",
      bio: "מפתח Full Stack עם ניסיון בפיתוח אפליקציות מודרניות",
      website: "https://michael-portfolio.com",
      linkedin: "https://linkedin.com/in/michael-papismadov",
    };
  });
  /*-(חיבור הטופס ל-react-hook-form כולל ולידציה עם Joi)-*/
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: joiResolver(schema),
    defaultValues: profileData,
  });
  /*-(שומר את הנתונים החדשים של הטופס ומעדכן את מצב העריכה)-*/
  const onSubmit = (data: ProfileForm) => {
    setProfileData(data);
    localStorage.setItem('profileData', JSON.stringify(data));
    setEditMode(false);
    toast.success("הפרופיל נשמר בהצלחה ✅");
  };

  /*-(שמירת הנתונים ב-localStorage בכל שינוי)-*/
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);
  /*-(מחיקת פרופיל עם אישור כפול)-*/
  const handleDelete = () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הפרופיל?")) {
      localStorage.removeItem('profileData');
      setProfileData({
        username: user?.username || "",
        phone: "",
        city: "",
        profilePic: "",
        bio: "",
        website: "",
        linkedin: "",
      });
      toast.error("🗑️ הפרופיל נמחק");
    }
  };
  /*-(איפוס פרופיל לברירת מחדל עם שני אישורים)-*/
  const handleReset = () => {
    if (window.confirm("האם אתה בטוח שאתה רוצה לאפס את ההגדרות?")) {
      if (window.confirm("זה ימחק את כל הנתונים שלך. אתה בטוח?")) {
        const defaultData = {
          username: user?.username || "",
          phone: "",
          city: "",
          profilePic: "",
          bio: "",
          website: "",
          linkedin: "",
        };
        setProfileData(defaultData);
        localStorage.setItem('profileData', JSON.stringify(defaultData));
        toast.info("🔄 הפרופיל אופס בהצלחה");
      }
    }
  };

  /*-(פונקציה לקבלת אייקון לפי סוג המשתמש)-*/
  const getUserIcon = () => {
    switch (user?.role) {
      case "admin": return <FaCrown className="text-yellow-500" />;
      case "business": return <FaBriefcase className="text-blue-500" />;
      default: return <FaUser className="text-green-500" />;
    }
  };

  /*-(פונקציה לקבלת שם התפקיד בעברית)-*/
  const getRoleName = () => {
    switch (user?.role) {
      case "admin": return "מנהל מערכת";
      case "business": return "משתמש עסקי";
      default: return "משתמש רגיל";
    }
  };
  /*-(רינדור רכיב פרופיל - טופס לעריכה או תצוגה רגילה)-*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6">
      {/*-(כרטיס פרופיל - עיצוב ראשי)-*/}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-4xl text-black dark:text-white">
        {/*-(כותרת עם אייקון תפקיד)-*/}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {getUserIcon()}
            <h1 className="text-4xl font-bold text-center">פרופיל אישי</h1>
          </div>
        </div>
        {editMode ? (
          /*-(מצב עריכה - טופס לשינוי פרטים עם שדות ולידציה)-*/
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/*-(שדות בסיסיים)-*/}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">שם משתמש *</label>
                  <input {...register("username")} placeholder="שם משתמש" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">טלפון *</label>
                  <input {...register("phone")} placeholder="050-1234567" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">עיר *</label>
                  <input {...register("city")} placeholder="תל אביב" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
              </div>
              
              {/*-(שדות מתקדמים)-*/}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">תמונת פרופיל</label>
                  <input {...register("profilePic")} placeholder="https://example.com/image.jpg" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">אתר אישי</label>
                  <input {...register("website")} placeholder="https://my-website.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
                  <input {...register("linkedin")} placeholder="https://linkedin.com/in/username" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>}
                </div>
              </div>
            </div>
            
            {/*-(שדה ביוגרפיה)-*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ביוגרפיה</label>
              <textarea {...register("bio")} placeholder="ספר על עצמך..." rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-black bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
            </div>
            
            {/*-(כפתורי פעולה)-*/}
            <div className="flex gap-4 justify-center pt-4">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                <FaEdit />
                <span>שמור שינויים</span>
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200">
                ביטול
              </button>
            </div>
          </form>
        ) : (
          /*-(מצב תצוגה - הצגת פרטי הפרופיל עם כפתורים לפעולה)-*/
          <div className="space-y-8">
            {/*-(תמונת פרופיל ומידע בסיסי)-*/}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profileData.profilePic || "/images/e2ed726deca511eb7e7b03a2996ad15e.jpg"}
                  alt="Profile"
                  className="size-32 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-500 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
                  {getUserIcon()}
                </div>
              </div>
              <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">{profileData.username}</h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{getRoleName()}</p>
            </div>

            {/*-(פרטי קשר)-*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaPhone className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">טלפון</p>
                    <p className="font-medium">{profileData.phone || "לא מוגדר"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaMapMarkerAlt className="text-green-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">עיר</p>
                    <p className="font-medium">{profileData.city || "לא מוגדר"}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaEnvelope className="text-purple-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">אימייל</p>
                    <p className="font-medium text-sm">{user?.username}</p>
                  </div>
                </div>
                {profileData.website && (
                  <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <FaUser className="text-indigo-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">אתר אישי</p>
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                        {profileData.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*-(ביוגרפיה)-*/}
            {profileData.bio && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">אודותיי</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profileData.bio}</p>
              </div>
            )}

            {/*-(קישורים חברתיים)-*/}
            {(profileData.website || profileData.linkedin) && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">קישורים</h3>
                <div className="flex flex-wrap gap-4">
                  {profileData.website && (
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      <FaUser />
                      <span>אתר אישי</span>
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors">
                      <FaUserTie />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/*-(כפתורי פעולה)-*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => setEditMode(true)} className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FaEdit />
                <span>ערוך פרופיל</span>
              </button>
              <button onClick={() => setShowPermissionsModal(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FaShieldAlt />
                <span>הרשאות</span>
              </button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FaTrash />
                <span>מחק פרופיל</span>
              </button>
              <button onClick={handleReset} className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FaUndo />
                <span>איפוס פרופיל</span>
              </button>
            </div>
          </div>
        )}
        {/*-(מודאל להצגת אינדיקציה להרשאות המשתמש)-*/}
        {showPermissionsModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl text-center text-black dark:text-white">
              <div className="flex items-center justify-center mb-6">
                <FaShieldAlt className="text-4xl text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold">הרשאות משתמש</h2>
              </div>
              
              <div className="text-right space-y-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-600 rounded-xl p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    {getUserIcon()}
                    <span className="mr-2">{getRoleName()}</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {user?.role === "admin" 
                      ? "גישה מלאה לכל התכונות במערכת, כולל ניהול משתמשים והגדרות מערכת"
                      : user?.role === "business"
                      ? "גישה לניהול כרטיסים אישיים, צפייה בכרטיסים וניהול פרופיל"
                      : "גישה בסיסית לצפייה בכרטיסים וניהול פרופיל אישי"
                    }
                  </p>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>• צפייה בכרטיסי עסקים</p>
                  <p>• ניהול פרופיל אישי</p>
                  {user?.role === "business" && <p>• ניהול כרטיסים אישיים</p>}
                  {user?.role === "admin" && <p>• ניהול משתמשים והגדרות מערכת</p>}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowPermissionsModal(false)} 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  הבנתי
                </button>
                <button 
                  onClick={() => {
                    setShowPermissionsModal(false);
                    setEditMode(true);
                  }} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  ערוך פרופיל
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/*-(ייצוא קומפוננטת Profile לשימוש בפרויקט)-*/
export default Profile;
/*--*/