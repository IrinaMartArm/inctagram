import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

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
        position={'bottom-left'}
        rtl={false}
        theme={'colored'}
      />
    </div>
  )
}
