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
  ResetPassword,
} from "./pages/public";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Model } from "./components";
function App() {
  const dispatch = useDispatch();
  const { isShowModel, modelChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="font-main relative">
      {isShowModel && <Model>{modelChildren}</Model>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.NEWS} element={<News />} />

          <Route
            path={path.DETAIL_PITCH__CATEGORY__BRAND__PITCHID__TITLE}
            element={<DetailPitch />}
          />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route path={path.PITCHES} element={<Pitches />} />
        </Route>
        <Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
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
        theme="colored"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
