import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Services,
  DetailPitch,
  News,
  FAQ,
  Pitches,
  VerifyEmail,
} from "./pages/public";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.NEWS} element={<News />} />
          <Route path={path.PITCHES} element={<Pitches />} />
          <Route
            path={path.DETAIL_PITCH__CATEGORY__PITCHID__TITLE}
            element={<DetailPitch />}
          />
          <Route path={path.OUR_SERVICE} element={<Services />} />

          <Route path={path.FAQ} element={<FAQ />} />
        </Route>
        <Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
