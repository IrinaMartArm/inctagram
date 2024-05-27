import { ToastContainer } from "react-toastify";

export const Toast = () => {
  return (
    <div>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar
        limit={1}
        newestOnTop
        pauseOnFocusLoss
        position={"bottom-left"}
        rtl={false}
        theme={"colored"}
      />
    </div>
  );
};
