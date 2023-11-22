import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public } from './pages/public'
import path from './ultils/path'
import { getCategories } from './store/app/asyncAction'
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
