
// Pages/Profile.tsx..
/*-(ייבוא ספריות וכלים לניהול טפסים, ולידציה ומידע מהסטייט)-*/
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useAppSelector } from "../../store";

/*-(הגדרת מבנה הנתונים של טופס הפרופיל)-*/
interface ProfileForm {
  username: string;
  phone: string;
  city: string;
  profilePic: string;
}

/*-(סכמת ולידציה באמצעות Joi לכל שדה בטופס)-*/
const schema = Joi.object<ProfileForm>({
  username: Joi.string().min(3).required().label("שם משתמש"),
  phone: Joi.string().min(9).required().label("טלפון"),
  city: Joi.string().required().label("עיר"),
  profilePic: Joi.string().uri().allow("").label("תמונת פרופיל"),
});

/*-(קומפוננטת Profile - טופס ניהול פרופיל אישי כולל עריכה, מחיקה, ואיפוס)-*/
function Profile() {
  /*-(שליפת המשתמש מהסטייט והגדרת מצבים שונים בקומפוננטה)-*/
  const user = useAppSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [profileData, setProfileData] = useState<ProfileForm>({
    username: user?.username || "admin@gmail.com",
    phone: (user as any)?.phone || "לא מוגדר",
    city: (user as any)?.city || "לא מוגדר",
    profilePic: "",
  });

  /*-(חיבור הטופס ל-react-hook-form כולל ולידציה עם Joi)-*/
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: joiResolver(schema),
    defaultValues: profileData,
  });

  /*-(שומר את הנתונים החדשים של הטופס ומעדכן את מצב העריכה)-*/
  const onSubmit = (data: ProfileForm) => {
    setProfileData(data);
    setEditMode(false);
    alert("הפרופיל נשמר בהצלחה ✅");
  };

  /*-(מחיקת פרופיל עם אישור כפול)-*/
  const handleDelete = () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הפרופיל?")) {
      alert("🗑️ הפרופיל נמחק");
    }
  };

  /*-(איפוס פרופיל לברירת מחדל עם שני אישורים)-*/
  const handleReset = () => {
    if (window.confirm("האם אתה בטוח שאתה רוצה לאפס את ההגדרות?")) {
      if (window.confirm("זה ימחק את כל הנתונים שלך. אתה בטוח?")) {
        setProfileData({
          username: "",
          phone: "",
          city: "",
          profilePic: "",
        });
        alert("🔄 הפרופיל אופס בהצלחה");
      }
    }
  };

  /*-(רינדור רכיב פרופיל - טופס לעריכה או תצוגה רגילה)-*/
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-6">

      {/*-(כרטיס פרופיל - עיצוב ראשי)-*/}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-xl text-black dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-6"> פרופיל אישי </h1>

        {editMode ? (
          /*-(מצב עריכה - טופס לשינוי פרטים עם שדות ולידציה)-*/
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
            <input {...register("username")} placeholder="שם משתמש" className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            {errors.username && <p className="text-red-400">{errors.username.message}</p>}

            <input {...register("phone")} placeholder="טלפון" className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}

            <input {...register("city")} placeholder="עיר" className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            {errors.city && <p className="text-red-400">{errors.city.message}</p>}

            <input {...register("profilePic")} placeholder="קישור לתמונת פרופיל" className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            {errors.profilePic && <p className="text-red-400">{errors.profilePic.message}</p>}

            <div className="flex gap-4 justify-end">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition">שמור</button>
              <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 px-6 py-2 rounded-xl shadow hover:bg-gray-600 transition">ביטול</button>
            </div>
          </form>
        ) : (
          /*-(מצב תצוגה - הצגת פרטי הפרופיל עם כפתורים לפעולה)-*/
          <>
            <img
              src={profileData.profilePic || "/images/e2ed726deca511eb7e7b03a2996ad15e.jpg"}
              alt="Profile"
              className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-500 shadow-lg"
            />
            <div className="text-right text-sm md:text-base space-y-2">
              <p><span className="font-bold">שם משתמש:</span> {profileData.username}</p>
              <p><span className="font-bold">טלפון:</span> {profileData.phone}</p>
              <p><span className="font-bold">עיר:</span> {profileData.city}</p>
            </div>

            {/*-(כפתורי פעולה: עריכה, מחיקה, אינדיקציה, איפוס)-*/}
            <div className="mt-6 space-y-2 w-full text-sm">
              <button onClick={() => setEditMode(true)} className="w-full bg-blue-600 text-white py-2 rounded-xl shadow-md hover:bg-blue-700 transition">✏️ ערוך פרופיל</button>
              <button onClick={handleDelete} className="w-full bg-red-600 text-white py-2 rounded-xl shadow-md hover:bg-red-700 transition">🗑️ מחק פרופיל</button>
              <button onClick={() => setShowPermissionsModal(true)} className="w-full bg-yellow-500 text-white py-2 rounded-xl shadow-md hover:bg-yellow-600 transition">🛡️ אינדיקציית הרשאות</button>
              <button onClick={handleReset} className="w-full bg-purple-600 text-white py-2 rounded-xl shadow-md hover:bg-purple-700 transition">🔄 איפוס פרופיל</button>
            </div>
          </>
        )}

        {/*-(מודאל להצגת אינדיקציה להרשאות המשתמש)-*/}
        {showPermissionsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 w-[90%] max-w-md shadow-xl text-center text-black dark:text-white">
              <h2 className="text-xl font-bold mb-4"> 🛡️ אינדיקציית הפרופיל - כללי </h2>
              <p className="text-sm mb-6"> פרופיל כללי – הרשאות בסיסיות </p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowPermissionsModal(false)} className="bg-green-600 text-white px-4 py-2 rounded">מאשר קריאה</button>
                <button onClick={() => {
                  setShowPermissionsModal(false);
                  setEditMode(true);
                }} className="bg-blue-600 text-white px-4 py-2 rounded">שינוי אינדיקציות</button>
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
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import Joi from "joi";
// import { useAppSelector } from "../../store";
// interface ProfileForm {
//   username: string;
//   phone: string;
//   city: string;
//   profilePic: string;
// }
// const schema = Joi.object<ProfileForm>({
//   username: Joi.string().min(3).required().label("שם משתמש"),
//   phone: Joi.string().min(9).required().label("טלפון"),
//   city: Joi.string().required().label("עיר"),
//   profilePic: Joi.string().uri().allow("").label("תמונת פרופיל"),
// });
// function Profile() {
//   const user = useAppSelector((state) => state.auth.user);
//   const [editMode, setEditMode] = useState(false);
//   const [showPermissionsModal, setShowPermissionsModal] = useState(false);
//   const [profileData, setProfileData] = useState<ProfileForm>({
//     username: user?.username || "admin@gmail.com",
//     phone: (user as any)?.phone || "לא מוגדר",
//     city: (user as any)?.city || "לא מוגדר",
//     profilePic: "",
//   });
//   const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
//     resolver: joiResolver(schema),
//     defaultValues: profileData,
//   });
//   const onSubmit = (data: ProfileForm) => {
//     setProfileData(data);
//     setEditMode(false);
//     alert("הפרופיל נשמר בהצלחה ✅");
//   };
//   const handleDelete = () => {
//     if (window.confirm("האם אתה בטוח שברצונך למחוק את הפרופיל?")) {
//       alert("🗑️ הפרופיל נמחק");
//     }
//   };
//   const handleReset = () => {
//     if (window.confirm("האם אתה בטוח שאתה רוצה לאפס את ההגדרות?")) {
//       if (window.confirm("זה ימחק את כל הנתונים שלך. אתה בטוח?")) {
//         setProfileData({
//           username: "",
//           phone: "",
//           city: "",
//           profilePic: "",
//         });
//         alert("🔄 הפרופיל אופס בהצלחה");
//       }
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-6">

//       {/* כרטיס פרופיל */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-xl text-black dark:text-white">
//         <h1 className="text-3xl font-bold text-center mb-6"> פרופיל אישי </h1>

//         {editMode ? (
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
//             <input
//               {...register("username")}
//               placeholder="שם משתמש"
//               className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             />
//             {errors.username && <p className="text-red-400">{errors.username.message}</p>}

//             <input
//               {...register("phone")}
//               placeholder="טלפון"
//               className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             />
//             {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}

//             <input
//               {...register("city")}
//               placeholder="עיר"
//               className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             />
//             {errors.city && <p className="text-red-400">{errors.city.message}</p>}

//             <input
//               {...register("profilePic")}
//               placeholder="קישור לתמונת פרופיל"
//               className="w-full px-4 py-2 rounded border text-black bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             />
//             {errors.profilePic && <p className="text-red-400">{errors.profilePic.message}</p>}

//             <div className="flex gap-4 justify-end">
//               <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition">שמור</button>
//               <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 px-6 py-2 rounded-xl shadow hover:bg-gray-600 transition">ביטול</button>
//             </div>
//           </form>
//         ) : (
//           <>
//             <img
//               src={profileData.profilePic || "/images/e2ed726deca511eb7e7b03a2996ad15e.jpg"}
//               alt="Profile"
//               className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-500 shadow-lg"
//             />
//             <div className="text-right text-sm md:text-base space-y-2">
//               <p><span className="font-bold">שם משתמש:</span> {profileData.username}</p>
//               <p><span className="font-bold">טלפון:</span> {profileData.phone}</p>
//               <p><span className="font-bold">עיר:</span> {profileData.city}</p>
//             </div>

//             <div className="mt-6 space-y-2 w-full text-sm">
//               <button onClick={() => setEditMode(true)} className="w-full bg-blue-600 text-white py-2 rounded-xl shadow-md hover:bg-blue-700 transition">✏️ ערוך פרופיל</button>
//               <button onClick={handleDelete} className="w-full bg-red-600 text-white py-2 rounded-xl shadow-md hover:bg-red-700 transition">🗑️ מחק פרופיל</button>
//               <button onClick={() => setShowPermissionsModal(true)} className="w-full bg-yellow-500 text-white py-2 rounded-xl shadow-md hover:bg-yellow-600 transition">🛡️ אינדיקציית הרשאות</button>
//               <button onClick={handleReset} className="w-full bg-purple-600 text-white py-2 rounded-xl shadow-md hover:bg-purple-700 transition">🔄 איפוס פרופיל</button>
//             </div>
//           </>
//         )}
//         {showPermissionsModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-700 rounded-xl p-6 w-[90%] max-w-md shadow-xl text-center text-black dark:text-white">
//               <h2 className="text-xl font-bold mb-4"> 🛡️ אינדיקציית הפרופיל - כללי </h2>
//               <p className="text-sm mb-6"> פרופיל כללי – הרשאות בסיסיות </p>
//               <div className="flex justify-center gap-4">
//                 <button onClick={() => setShowPermissionsModal(false)} className="bg-green-600 text-white px-4 py-2 rounded">מאשר קריאה</button>
//                 <button onClick={() => {
//                   setShowPermissionsModal(false);
//                   setEditMode(true);
//                 }} className="bg-blue-600 text-white px-4 py-2 rounded">שינוי אינדיקציות</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Profile;
/*--*/