import "react-toastify/dist/ReactToastify.css";


const AdLogout = () => {
  localStorage.removeItem("data");
  window.location.replace('http://localhost:3000/');
  return(
    <div>

    </div>
  );
};

export default AdLogout;
