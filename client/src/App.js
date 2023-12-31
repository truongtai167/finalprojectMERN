import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Home,
  Public,
  FAQ,
  Services,
  DetailPitches,
  Blog,
  Pitches,
  FinalRegister,
  ResetPassword
} from './pages/public'
import {
  AdminLayout,
  CreatePitch,
  DashBoard,
  ManageOrder,
  ManagePitch,
  ManageUser
} from './pages/admin'
import {
  MemberLayout,
  Personal,
  History,
  Wishlist
} from './pages/member'
import path from './ultils/path'
import { getCategories } from './store/app/asyncAction'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Modal } from 'components';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        limit={3}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        {/*Public Route*/}
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.DETAIL_PITCH__CATEGORY__PID__TITLE} element={<DetailPitches />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route path={path.PITCHES} element={<Pitches />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        {/*Admin Route*/}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.CREATE_PITCH} element={<CreatePitch />} />
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PITCH} element={<ManagePitch />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>
        {/*Member Route*/}
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;