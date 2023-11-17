import { Alert, AlertDialogCloseButton, AlertIcon, Box, Button, Image,Stack, Text, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import { useEffect } from "react"
import {useParams} from "react-router-dom"
import { BsBag ,BsFillStarFill} from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { loadJobDetail } from '../../redux/JobDetail/Action';
import {
    
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
function JobDetailRecruiter() {
    const params = useParams()
    const cancelRef = React.useRef()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadJobDetail(params.id));
      },[params.id]);
    const data = useSelector((store) => store.jobDetail.data);


    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const [name, setName] = useState(data.name);
    const [position, setPosition] = useState(data.position);
    const [requirements, setRequirements] = useState(data.requirements);
    const [location, setLocation] = useState(data.location);
    const [salary, setSalary] = useState(data.salary);
    const [number, setNumber] = useState(data.number);
    const [workingForm, setWorkingForm] = useState(data.workingForm);
    const [sex, setSex] = useState(data.sex);
    const [experience, setExperience] = useState(data.experience);
    const [detailLocation, setDetailLocation] = useState(data.detailLocation);
    const [detailJob, setDetailJob] = useState(data.detailJob);
    const [interest, setInterest] = useState(data.interest);
    const [image, setImage] = useState(data.image);
    const [status, setStatus] = useState(data.status);
    const [language, setLanguage] = useState(data.language);

    const onOpen = async (e) => {

      let data = JSON.stringify({
        "name": name,
    "position": position,
    "language": language,
    "location": location,
    "salary": salary,
    "number": number,
    "workingForm":workingForm,
    "sex": sex,
    "experience": experience,
    "detailLocation": detailLocation,
    "detailJob": detailJob,
    "requirements": requirements,
    "interest": interest,
    "image": image,
    "status": status,
      });
  
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/job-posting/${params.id}`,
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
        toast.error("Update Job Failed", {
          position: "top-center",
        });
      });
  
      toast.success("Update Job Successfuly", {
        position: "top-center",
      });
      setTimeout(()=> {
      navigate("/allJob_Recruiter");
    },2000);
    }
    return (
        <Box >
            <Text mb='100px'>hello</Text>
            <Box display='flex' justifyContent='space-evenly'>
                <Box w='850px' >
                    <Box ml='50px'  p='20px' boxShadow= 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' color='RGBA(0, 0, 0, 0.76)' >
            

                    <div className="form_input" >
                <div className="two">
                  <input  style={{width:"30%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="detailJob"
                    id="detailJob"
                  />
                </div>
               
              </div>

            <Image style={{width:"200px"}} src={`${data.image}`} />
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={image}
                    onChange={(e) =>setImage(e.target.value)}
                    type="text"
                    name="image"
                    id="image"
                  />
                </div>
            <Text fontSize='15px' >{data.language} ({data.position})</Text>
           <Box display='flex' justifyContent='space-between' mb='20px'>
            <Box>
            <Text display='flex' alignContent='center'><Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'> <BsBag/> </Box> {data.experience}</Text>
            <Text display='flex' alignContent='center'><Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'> <CiLocationOn/> </Box> {data.location} </Text>
            
            </Box>
            <Box>
          
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
       
      
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
        
          <Alert
                bg=''
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
                >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Application submitted!
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    Thanks for submitting your application. Our team will get back to you soon.
                </AlertDescription>
            </Alert>
         
        </AlertDialogContent>
      </AlertDialog>
               
            </Box>
            </Box>
            <hr/>
            <Text mt='10px'display='flex' fontSize='12px' >Posted : 14/10/2023<Text ml='10px'  mr='10px' fontWeight='bold'>{data.timetopost}  </Text>jobAplicable : <Text ml='10px'  mr='10px' fontWeight='bold'>less than {data.blanksheet}  </Text></Text>
                    </Box>

                    <Box mt='30px' ml='50px'  p='20px' boxShadow= 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' color='RGBA(0, 0, 0, 0.76)'>
            <Text fontSize="20px" fontWeight='bold'>Job description</Text>
            <Text width='60%' lineHeight='30px'>{data.dis}</Text>

            <Box >

            <Text mt='30px' color='RGBA(0, 0, 0, 0.50)'>Địa điểm</Text>
            <div className="two">
                  <input  style={{width:"30%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    name="location"
                    id="location"
                  />
                </div>

            <Text mt='30px' color='RGBA(0, 0, 0, 0.50)'>Vị trí</Text>
            <div className="two">
                  <input  style={{width:"30%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    type="text"
                    name="position"
                    id="position"
                  />
                </div>

                <Text mt='30px' color='RGBA(0, 0, 0, 0.50)'>Số lượng</Text>
            <div className="two">
                  <input  style={{width:"30%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="text"
                    name="number"
                    id="number"
                  />
                </div>
                <Text mt='30px' color='RGBA(0, 0, 0, 0.50)'>Giới tính</Text>
            <div className="two">
                  <input  style={{width:"30%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    type="text"
                    name="sex"
                    id="sex"
                  />
                </div>
            <Text  color='RGBA(0, 0, 0, 0.50)'>Skill</Text>
            <div className="two">
                  <input  style={{width:"30%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={requirements}
                    onChange={(e) =>setRequirements(e.target.value)}
                    type="text"
                    name="requirements"
                    id="requirements"
                  />
                </div>
            <Text  color='RGBA(0, 0, 0, 0.50)'>Doanh nghiệp</Text>
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={detailLocation}
                    onChange={(e) =>setDetailLocation(e.target.value)}
                    type="text"
                    name="detailLocation"
                    id="detailLocation"
                  />
                </div>
            <Text  color='RGBA(0, 0, 0, 0.50)'>Công việc</Text>
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={workingForm}
                    onChange={(e) =>setWorkingForm(e.target.value)}
                    type="text"
                    name="workingForm"
                    id="workingForm"
                  />
                </div>
                <Text  color='RGBA(0, 0, 0, 0.50)'>Chi tiết công việc</Text>
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={detailJob}
                    onChange={(e) =>setDetailJob(e.target.value)}
                    type="text"
                    name="detailJob"
                    id="detailJob"
                  />
                </div>
            <Text color='RGBA(0, 0, 0, 0.50)'> Kinh nghiệm </Text>
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={experience}
                    onChange={(e) =>setExperience(e.target.value)}
                    type="text"
                    name="experience"
                    id="experience"
                  />
                </div>

                <Text color='RGBA(0, 0, 0, 0.50)'> Mức lương </Text>
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={salary}
                    onChange={(e) =>setSalary(e.target.value)}
                    type="text"
                    name="salary"
                    id="salary"
                  />
                </div>

                <Text color='RGBA(0, 0, 0, 0.50)'> Lợi ích </Text>
            <div className="two">
                  <input  style={{width:"100%" ,fontSize:"20px",fontWeight:"bold"}}
                    value={interest}
                    onChange={(e) =>setInterest(e.target.value)}
                    type="text"
                    name="interest"
                    id="interest"
                  />
                </div>
            <Text  color='RGBA(0, 0, 0, 0.50)'>UG :</Text>
            <Text>Graduation Not Required</Text>

            {
    /* 
    const [image, setImage] = useState(data.image);
    */
    }
      <Button width='100px' bg='blue.400' onClick={onOpen}>Cập nhật</Button>
            </Box>
                    </Box>
                    <Box ml='50px' mt='30px'  p='20px' boxShadow= 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' color='RGBA(0, 0, 0, 0.76)' >
                        <Text fontSize="20px" fontWeight='bold'>About Compony </Text>
                        <Text>Our dream is to become an top  in {data.industry}, multi-dimensional service provider in the {data.industry} world. Through industry oriented solutions and next gen technologies,</Text>
                            <Text mt='30px'><Text color='RGBA(0, 0, 0, 0.40)'>Location :</Text> {data.location}</Text>
                        </Box>

                        <Box ml='50px' mt='30px'  p='20px' mb='60px' >
                        <Text fontSize="20px" fontWeight='bold'>Beware of imposters!</Text>
                        <Text color='RGBA(0, 0, 0, 0.35)'>JobPanda.com does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, Refundable Fee...</Text>
                        </Box>
              

              </Box>
              <Box width='400px' height='400px'>
                <Box p='20px' boxShadow= 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'>
                    <Text fontSize='18px' mb='20px' fontWeight='bold'> Jobs you might be interested in</Text>
                    <Text fontSize='15px' fontWeight='bold'> DTP Operator</Text>
                    
                     <Text display='flex' textAlign='center'> <Text fontSize='13px' mt='1px' mr='10px' > Brilliant Prakashan </Text> 4.1 <Text mt='2.5px' color='orange' ml='2px' mr='10px'> <BsFillStarFill/>  </Text> (41 reviews)</Text>
                     <Text display='flex' alignContent='center'><Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'> <CiLocationOn/> </Box> {data.location} </Text>
                    <Text ml='70%' mb='20px'>19 days ago</Text>
                    <hr/>

                    <Text fontSize='15px' fontWeight='bold'> DTP Operator</Text>
                    
                     <Text display='flex' textAlign='center'> <Text fontSize='13px' mt='1px' mr='10px' > Physicswallah </Text> 4.1 <Text mt='2.5px' color='orange' ml='2px' mr='10px'> <BsFillStarFill/>  </Text> (41 reviews)</Text>
                     <Text display='flex' alignContent='center'><Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'> <CiLocationOn/> </Box> Siliguri </Text>
                    <Text ml='70%' mb='20px'>5 days ago</Text>
                    <hr/>

                    <Text fontSize='15px' fontWeight='bold'> DTP Designer</Text>
                    <Text display='flex' textAlign='center'> <Text fontSize='13px' mt='1px' mr='10px' > Edwiser Innovation Hub Pvt. </Text> 4.1 <Text mt='2.5px' color='orange' ml='2px' mr='10px'> <BsFillStarFill/>  </Text> (41 reviews)</Text>
                    <Text display='flex' alignContent='center'><Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'> <CiLocationOn/> </Box> Hydrabad </Text>
                   <Text ml='70%' mb='20px'>1 day ago</Text>
                   <hr/>

                   <Text mt='5px' fontWeight='bold' color='blue.500'>View All</Text>
                </Box>
                <Box p='20px' mt='20px' boxShadow= 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'>
                    <Text fontSize='18px' mb='20px' fontWeight='bold'> Reviews</Text>
                    <Text fontSize='15px' fontWeight='bold'> H.O.D Mathematics in Rachi</Text>
                    
                     <Text display='flex' textAlign='center'> <Text fontSize='13px' mt='1px' mr='10px' > Anonymous </Text> <Text mt='2.5px' color='orange' ml='2px' mr='10px'>   </Text></Text>
                     <Box display='flex' mt='2' alignItems='center'>
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                            <BsFillStarFill
                                key={i}
                                color={i < 3 ? 'orange' : 'yellow'}
                            />
                            ))}
                            </Box>
                  
                    <Text ml='70%' mb='20px'>19 days ago</Text>
                    <Text fontSize='16px' fontWeight='bold'>Likes</Text>
                    <Text fontSize='16px' >Only Clear envirment</Text>
                    <hr/>

                    

                  

                   <Text mt='5px' fontWeight='bold' color='blue.500'>View All</Text>
                </Box>

                </Box>
            </Box>
            <ToastContainer />
        </Box>
        
    )
}

export default JobDetailRecruiter;