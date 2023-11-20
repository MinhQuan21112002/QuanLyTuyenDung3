import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Box, Flex, Text ,Image, Badge} from "@chakra-ui/react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./style4.css";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { loadJob } from '../../redux/Job-posting/Action';
import uuid from "react-uuid";
import { Link} from "react-router-dom";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {storage} from "../../firebase.js"
import {v4} from "uuid";
const JobPosting = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    // getData(typeOfProduct).then((res) => setProductArr(res));
    dispatch(loadJob());
  }, []);
  
  const data = useSelector((store) => store.job.data);
  console.log(data.length)
  const jobList=data.slice(data.length-3,data.length);
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const navigate = useNavigate();

  // =============================================================================================================

  const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [number, setNumber] = useState("");
  const [workingForm, setWorkingForm] = useState("");
  const [sex, setSex] = useState("");
  const [experience, setExperience] = useState("");
  const [detailLocation, setDetailLocation] = useState("");
  const [detailJob, setDetailJob] = useState("");
  const [requirements, setRequirements] = useState("");
  const [interest, setInterest] = useState("");
  const [image, setImage] = useState("");

 const handleUpload=(e)=>{
    const storageRef = ref(storage, `/files/${e.target.files[0].name+v4()}`)
    uploadBytes(storageRef, e.target.files[0]).then(data=>{
      console.log(data)
      getDownloadURL(data.ref).then(url=>{
        setImage(url);
        console.log("image",url);
   
  })})
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.warning("name is required!", {
        position: "top-center",
      });
    } else if (position === "") {
      toast.error("position is required!", {
        position: "top-center",
      });
    } 
    else if (salary === "") {
      toast.error("salary is required!", {
        position: "top-center",
      });
    }
    else if (workingForm === "") {
      toast.error("workingForm is required!", {
        position: "top-center",
      });
    }
    else if (location === "") {
      toast.error("location is required!", {
        position: "top-center",
      });
    }
    else if (language === "") {
      toast.error("language is required!", {
        position: "top-center",
      });
    }   else if (sex === "") {
      toast.error("sex is required!", {
        position: "top-center",
      });
    }   else if (number === "") {
      toast.error("number is required!", {
        position: "top-center",
      });
    }   else if (detailLocation === "") {
      toast.error("detailLocation is required!", {
        position: "top-center",
      });
    }
    else if (experience === "") {
      toast.error("experience is required!", {
        position: "top-center",
      });
    }  else if (detailJob === "") {
      toast.error("detailJob is required!", {
        position: "top-center",
      });
    }  else if (requirements === "") {
      toast.error("requirements is required!", {
        position: "top-center",
      });
    }  else if (interest === "") {
      toast.error("interest is required!", {
        position: "top-center",
      });
    }
    else if (image ===  null) {
      toast.error("image is required!", {
        position: "top-center",
      });
    }
    else {
      try {
       
        console.log("image", image)
        const formData = new FormData()
        formData.append("file", image)

        const imageResponse = await axios.post(
            "http://localhost:8080/file/upload",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        const imageData= imageResponse.data.data
       
        console.log("hình anh tren firebase",imageResponse)
        let data = JSON.stringify({
          name,
          position,
          language,
          location,
          salary,
          number,workingForm,sex,experience,
          detailLocation,
          detailJob,
          requirements,
          interest,
          "image":imageData
          
        });
  
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://localhost:8080/job-posting`,
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
          toast.error("Upload Job Failed", {
            position: "top-center",
          });
        });
  
        toast.success("Upload Job Successfuly", {
          position: "top-center",
        });
        window.location.replace(`/job-posting`);
      } catch (error) {
       
      }
    }
  }


  return (
    <>
      <session>
        <div className="main">
          <div className="left_session3">
            <div
              style={{
                marginTop: "1px",
              }}
            >
              <img
                style={{ marginTop: "-80px", marginLeft: "70px" }}
                src="https://static.naukimg.com/s/7/104/assets/images/green-boy.c8b59289.svg"
                alt=""
              />
               <h2
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              >Công việc đăng gần đây</h2>
              <Box ml='10' width='60%'>
              
             
                {jobList.map((i) => 
                 {return i.status===true?
                       
                  <Box key={uuid()}>
                    <Link to={`/jobDetail_Recruiter/${i.id}`}>
                      <Box key={i.id} mt='50px'  boxShadow= 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'  mb='30px' p='20px'>
                      <Text fontSize='20px'>{i.name}</Text>
                      <Image src={i.image} />
                      </Box> 
                    </Link>
                  </Box>
                  :<div></div>
                 })}

              <button className="btn4">
              <Link to={`/allJob_Recruiter`}>
               Xem thêm
               </Link>
              </button>
              </Box>
             </div>
          </div>
          <div className="form_data1" >
            <div className="form_heading">
              <h2
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
                Đăng tin tuyển dụng
              </h2>
            </div>

            
            <form>
            
              
              <div className="form_input">
                <label htmlFor="name"> <Badge borderRadius='full' fontSize="14px" p="2"colorScheme='teal' > Tên công việc </Badge></label>
                <input style={{width:"100%"}}
                  type="text"
                  // value={email}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="Name"
                />
                
              </div>

              <div className="form_input">
              <label htmlFor="name"> <Badge borderRadius='full' fontSize="14px" p="2"colorScheme='teal' > Địa điểm chi tiết </Badge></label>
               
                <input
                style={{width:"100%"}}
                  type="position"
                  // value={username}
                  onChange={(e) => setDetailLocation(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>
              <div class="flex-container">
                <div className="form_input flex" style={{heigth:"20% !important"}}>
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' > Mức lương</Badge>
                </div>
               
               
                  
                    <input
                      // value={password}
                      onChange={(e) => setSalary(e.target.value)}
                      type="text"
                      name="salary"
                      id="salary"
                    />
                
                </div>
                <div className="form_input flex" style={{marginLeft:"10px"}}>
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px"  p="2"colorScheme='teal' > Hình thức làm việc</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setWorkingForm(e.target.value)}
                      type="text"
                      name="workingForm"
                      id="workingForm"
                    />
                
                </div>
              </div>

                <div class="flex-container">
                <div className="form_input flex">
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" p="2"colorScheme='teal' >Địa điểm</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      name="location"
                      id="location"
                    />
                
                </div>
                <div className="form_input flex" style={{marginLeft:"10px"}}>
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" p="2"colorScheme='teal' >Ngôn ngữ</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setLanguage(e.target.value)}
                      type="text"
                      name="language"
                      id="language"
                    />
                
                </div>
              </div>

              <div class="flex-container">
                <div className="form_input flex">
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' > Giới tính</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setSex(e.target.value)}
                      type="text"
                      name="sex"
                      id="sex"
                    />
                
                </div>
                <div className="form_input flex" style={{marginLeft:"10px"}}>
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' > Số lượng</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setNumber(e.target.value)}
                      type="text"
                      name="number"
                      id="number"
                    />
                
                </div>
              </div>

              <div class="flex-container">
                <div className="form_input flex">
                  <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' >Vị trí tuyển dụng</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setPosition(e.target.value)}
                      type="text"
                      name="detailLocation"
                      id="detailLocation"
                    />
                
                </div>
                <div className="form_input flex" style={{marginLeft:"10px"}}>
                <div htmlFor="name" style={{display:"block",paddingTop:"7%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' > Kinh nghiệm</Badge>
                </div>
                    <input
                      // value={password}
                      onChange={(e) => setExperience(e.target.value)}
                      type="text"
                      name="experience"
                      id="experience"
                    />
                
                </div>
              </div>

              <div className="form_input" >
              <div htmlFor="name" style={{display:"block",paddingTop:"5%",paddingRight:"2%",paddingBottom:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' >Mô tả công việc</Badge>
                </div>

                <div className="two">
                  <textarea  style={{width:"100%"}}
                    // value={confirmpassword}
                    onChange={(e) => setDetailJob(e.target.value)}
                    type="text"
                    name="detailJob"
                    id="detailJob"
                  />
                </div>
               
              </div>

              <div className="form_input" >
              <div htmlFor="name" style={{display:"block",paddingTop:"2%",paddingRight:"2%",paddingBottom:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' >Yêu cầu ứng   </Badge>
                </div>
                    <div className="two">
                  <textarea  style={{width:"100%"}}
                    // value={confirmpassword}
                    onChange={(e) => setRequirements(e.target.value)}
                    type="text"
                    name="requirements"
                    id="requirements"
                  />
                </div>
               
              </div>

              <div className="form_input" >
              <div htmlFor="name" style={{display:"block",paddingTop:"2%",paddingRight:"2%",paddingBottom:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px" x p="2"colorScheme='teal' > Quyền lợi</Badge>
                </div>
                <div className="two">
                  <textarea  style={{width:"100%"}}
                    // value={confirmpassword}
                    onChange={(e) => setInterest(e.target.value)}
                    type="text"
                    name="interest"
                    id="interest"
                  />
                </div>
               
              </div>

              <div className="form_input">
              <div htmlFor="name" style={{display:"block",paddingTop:"2%",paddingRight:"2%"}}> 
                <Badge borderRadius='full' fontSize="14px"  p="2"colorScheme='teal' > Hình ảnh</Badge>
                </div>
                <input
                  type="file"
                  // value={email}
                  onChange={(e) => setImage(e.target.files[0])}
                  name="image"
                  id="image"
                />
                
              </div>

             
              <button onClick={HandleSubmit} className="btn3">
                Đăng tin
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </session>
    </>
  );
};

export default JobPosting;
