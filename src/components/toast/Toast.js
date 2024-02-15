
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Toasts = (props) => {


    const showToast = ((message, type="error") => {
        let emitter = {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
        let toastId = null;
        switch (type) {

            case "error":
                toastId = toast.error(message, emitter)
                break;
            case "loading":
                toastId = toast.loading(message, emitter)
                localStorage.setItem("loading", toastId)
                break;
            case "warning":
                toastId = toast.warning(message, emitter)
                break;
            case "success":
                toastId = toast.success(message, emitter)
                break;
            case "no_loading":
                toastId = toast.update(localStorage.getItem("loading"), { render: message, type: type, isLoading: false, progress: undefined, autoClose: 5000 });
                setTimeout(() => {
                    localStorage.removeItem("loading")
                }, 5000);
                break;
            default:
                toastId = toast.info(message, emitter)
                break;
        }
    })




    props.childRef.current = {
        showToast: showToast,
    };



    return (
        <ToastContainer

        />
    );
};

export default Toasts;
