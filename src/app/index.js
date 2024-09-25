import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from "react-router-dom";
import router from "../router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        {
          router.routes.map(({ path, element  }) => (
            <Route key={path} path={path} element={element} />
          ))
        }
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
