
// main.tsx..
/*-(ייבוא הספריות הדרושות לפרויקט React)-*/
import React from "react";
import ReactDOM from "react-dom/client";
/*-(ייבוא רכיב ניתוב ליצירת נתיבים באפליקציה)-*/
import { BrowserRouter } from "react-router-dom";
/*-(ייבוא Provider לניהול גלובלי של ה־Redux store)-*/
import { Provider } from "react-redux";
/*-(ייבוא קומפוננטת האפליקציה הראשית)-*/
import App from "./App";
/*-(ייבוא החנות המרכזית של Redux לניהול State)-*/
import { store } from "./store";
/*-(ייבוא קובץ העיצוב הכללי של האפליקציה)-*/
import "./index.css";
/*-(הפעלת האפליקציה והצגתה בתוך דיב ראשי בדף ה־HTML)-*/
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
/*--*/