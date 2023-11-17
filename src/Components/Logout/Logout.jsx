import "react-toastify/dist/ReactToastify.css";
const Logout = () => {
  localStorage.removeItem("data");
  window.location.replace('http://localhost:3000/');

  return(
    <div>

    </div>
  );
};

export default Logout;
