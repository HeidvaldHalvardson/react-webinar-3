import { useCallback, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Authorization from "./authorization";
import Profile from "./profile";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuth: state.authorization.isAuth,
    user: state.user.data,
  }))

  const callbacks = {
    getUser: useCallback(() => {store.actions.user.getUser()}, [store])
  }

  useEffect(() => {
    if (select.isAuth && Object.keys(select.user).length === 0) {
      callbacks.getUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Authorization />} />
        <Route path={'/profile'} element={<Profile />} />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
