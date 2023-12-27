import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleRefresh } from "./store/actions/userAction";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleRefresh())
    }
  }, [])
  return (
    <>
      <div style={{ margin: '-10px 0px -10px -10px' }}>
        <AppRoutes />
      </div>
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
        theme="light"
      />
    </>
  );
}

export default App;
