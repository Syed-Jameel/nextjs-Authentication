import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000} // Adjust this value as needed
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      progress={undefined}
    />
  );
}

export const showToast = (message, type = "info") => {
  toast[type](message);
};
