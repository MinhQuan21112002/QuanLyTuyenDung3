import React, { useState,useEffect } from "react";
import { Image } from '@chakra-ui/react'
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import "./Both.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector } from "react-redux";
import { loadUserInfo } from '../../redux/UserInfo/Action';
const UserInfo = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(loadUserInfo());
  }, []);
  const user = useSelector((store) => store.userInfo.data);

  const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
  
  const [passShow, setPassShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.fullName);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [cv_pdf, setCv_pdf] = useState(user.cv_pdf);
  const [language, setLanguage] = useState(user.language);
  const [skill, setSkill] = useState(user.skill);
  const [experience, setExperience] = useState(user.experience);
  const [description, setDescription] = useState(user.description);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [testAva, setTestAva] = useState("");
  const [testCV, setTestCV] = useState("");
  const [imageDataCV, setImageDataCV] = useState();
  const [imageDataAva, setImageDataAva] = useState(user.description);
  
console.log("testCV",testCV)
console.log("CV" ,cv_pdf)
console.log("test ava",testAva)
console.log("Ava",avatar)
 
if(testCV=="")
{
  console.log("ga vl")
}
  const submitHandlerPassword = async (e) => {
    e.preventDefault();
    if (oldPassword === "") {
      toast.error("Old password is required!", {
        position: "top-center",
      });
    } else if (oldPassword.length < 8) {
      toast.error("password must be 8 char!", {
        position: "top-center",
      });
    }
      else if (newPassword1 === "") {
      toast.error("New password is required!", {
        position: "top-center",
      });
    } else if (newPassword1.length < 8) {
      toast.error("password must be 8 char!", {
        position: "top-center",
      });
    } else if (newPassword2 === "") {
      toast.error("New password is required!", {
        position: "top-center",
      });
    } 
    else if (newPassword2.length < 8) {
      toast.error("password must be 8 char!", {
        position: "top-center",
      });
    } else {}


    let data = JSON.stringify({
      "password": oldPassword,
      "newPassword": newPassword1,
      "confirmPassword": newPassword2
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/user/password`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${accessToken}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log("haha");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Update Info Failed", {
        position: "top-center",
      });
    });

    toast.success("Update Password Successfuly", {
      position: "top-center",
    });
    navigate("/userInfo");
  }
  const SubmitHandler = async (e) => {
    e.preventDefault();
   
    try{
      
      if(testCV!=="")
      {
      const formDataCV = new FormData()
      formDataCV.append("file", testCV)
      
      const imageResponseCV = await axios.post(
          "http://localhost:8080/file/upload",
          formDataCV,
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          }
      )
     
      setCv_pdf(imageResponseCV.data.data); 
      console.log(cv_pdf)
        }

      if(testAva!=="")
      {
      const formDataAva = new FormData()
      formDataAva.append("file", testAva)

      const imageResponseAva = await axios.post(
          "http://localhost:8080/file/upload",
          formDataAva,
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          }
      )
    
        setAvatar(imageResponseAva.data.data)
        console.log(avatar)
      }


      let data = JSON.stringify({
        "fullName": fullName,
        "email": email,
        "phone": phone,
        "gender": gender,
        "address": address ,
        "dob": "",
        "cv_pdf": cv_pdf,
        "avatar": avatar,
        "language": language,
        "skill": skill,
        "experience": experience,
        "description": description
      });

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/profile`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log("haha");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update Info Failed", {
          position: "top-center",
        });
      });

      toast.success("Update Info Successfuly", {
        position: "top-center",
      });
      navigate("/userInfo");

  }
  catch (error) {
    
  }
}
  return (
    <section className="login_section">
  
      <div style={{ display: "flex" }}>
        <div className="left_section" elevation={5}>
          <div style={{ marginLeft: "10px" }}>
            <h2>Thông tin cá nhân</h2>
            <Image mr={'8px'} w={'100px'} h={'100px'} style={{marginBottom:"10px",marginTop:"20px"}}src={avatar} />
          
          
          
            <div className="form_input">
              
            <label htmlFor="email">  <p style={{marginRight: "5px" ,width:"130px"}}>
              <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
              Email</p></label>
              
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
              />
            </div>
            <div className="form_input">
              
              <label htmlFor="fullName">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Họ tên</p></label>
                
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  name="fullName"
                  id="fullName"
                />
              </div>
              <div className="form_input">
              
              <label htmlFor="address">  <p style={{marginRight: "5px" ,width:"130px"}}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Địa chỉ </p></label>
                
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  id="address"
                />
              </div>
              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Số điện thoại </p></label>
                
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  id="phone"
                  
                />
              </div>    

              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Giới tính </p></label>
                
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  name="sex"
                  id="sex"
                  
                />
              </div>    

              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Ngôn ngữ </p></label>
                
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  name="language"
                  id="language"
                  
                />
              </div>    

              
              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Kỹ năng </p></label>
                
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  name="skill"
                  id="skill"
                  
                />
              </div>    


              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Kinh nghiệm </p></label>
                
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  name="experience"
                  id="experience"
                  
                />
              </div>   


                  <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Mô tả </p></label>
                
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  id="description"
                  
                />
              </div>    

              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                CV </p></label>
                
                <input
                  type="file"
                  
                  onChange={(e) => setTestCV(e.target.files[0])}
                  name="cv_pdf"
                  id="cv_pdf"
                  
                />
              </div>    
              
              
              <div className="form_input">
              
              <label htmlFor="phone">  <p style={{marginRight: "5px",width:"130px" }}>
                <DoneIcon style={{ color: "#4a90e2", marginTop: "2%" }} />
                Avartar </p></label>
                
                <input
                  type="file"
                  onChange={(e) => setTestAva(e.target.files[0])}
                  name="avatar"
                  id="avatar"
                  
                />
              </div>    
              

              <button className="btn-update" onClick={SubmitHandler} >
              Cập nhật thông tin
            </button>    
          </div>
          {/* <div style={{ marginLeft: "0%", marginTop: "5%" ,width:"130px"}}>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button variant="outlined" style={{ marginLeft: "1%" }}>
                Register For Free
              </button>
            </Link>
          </div>
          <img
            src="https://static.naukimg.com/s/5/105/i/register.png"
            style={{ width: "40%", marginLeft: "45%", marginBottom: "10%" }}
            alt=""
          /> */}
        </div>
        <div className="form_data">
          <div className="form_heading">
            <p>Thay đổi mật khẩu</p>
          </div>
          <form>
          <div className="form_input">
              <label htmlFor="password">Mật khẩu cũ</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Enter Your Old password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Nhập mật khẩu mới</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={newPassword1}
                  onChange={(e) => setNewPassword1(e.target.value)}
                  name="newPassword1"
                  id="newPassword1"
                  placeholder="Enter Your New password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Nhập lại mật khẩu mới</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  name="newPassword2"
                  id="newPassword2"
                  placeholder="Enter Your New password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={submitHandlerPassword}>
              Cập nhật
            </button>
            {/* <button className="btn1">Login With OTP </button>
            <div>
              <hr
                style={{
                  width: "120%",
                  marginLeft: "-20px",
                  marginTop: "30px",
                }}
              />
              <button className="btn2 ">
                {" "}
                <img
                  style={{ width: "5%", marginTop: "1%" }}
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                  alt=""
                />{" "}
                Login With Google{" "}
              </button>
            </div> */}
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
