import React , {useState, useEffect} from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "../../Components-admin";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, HStack, SlideFade, VStack, Image, Text, Button,Wrap, WrapItem, Avatar, FormLabel,Input } from "@chakra-ui/react";
import { AssignInterviewer } from "../Assign/AssignInterviewer";
import { AssignCandidate } from "../Assign/AssignCandidate";
import { interviewService } from "../../Service/interview.service";
import {toast, ToastContainer} from "react-toastify";
import { IconButton } from '@chakra-ui/react'
import meet from '../../Components/assets/meet.png'
import { MdVideocam } from 'react-icons/md'; 
const initialRoomData = {
    "id": 0,
    "jobPostId": 0,
    "roomName": "",
    "roomSkill": "",
    "roomDescription": "",
    "startDate": "",
    "endDate": "",
    "status": "",
    "link": null,
    "listInterviewer": [],
    "listCandidate": []
};

export const RoomEditInfomation = () => {
    const [room, setRoom] = useState(initialRoomData);
    const params = useParams();
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const navigate = useNavigate();

    useEffect(() => {
        interviewService.getInterviewByID(accessToken, params.idRoom)
        .then(res => {
            setRoom(res)})
        .catch(er => toast.error(er.message))
    }, [])

    const handle= (e) => {
        console.log(e.target.value)
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
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
                <Box p={30} borderRadius="lg" overflow="hidden" >
                    <VStack spacing={10}>
                        <Box p={4} borderRadius="lg" backgroundColor={"#FFFFFF"} w={"100%"} h={"230px"}>
                            <HStack h={"100%"}>
                                <Image borderRadius="lg" m={2} h={"100%"} w={"18%"} src='https://www.peninsulapersonnel.com.au/wp-content/uploads/2020/09/Best-HR-Interview-1.png' alt='Dan Abramov' />
                                <VStack h={"100%"} w={"82%"} p={2}>
                                    <HStack backgroundColor={"#FFFFFF"} w={"100%"} p={2} justifyContent={"space-between"} mb={0}>
                                        <Text fontSize={27} fontWeight={"bold"} >{room.roomName}</Text>
                                        <Button size='xs' colorScheme='green' variant='outline'>{room.status}</Button>
                                        <HStack>
                                            <AssignInterviewer roomId={params.idRoom}/>
                                            <AssignCandidate jobId={params.id}/>
                                        </HStack>
                                    </HStack>
                                    <Text p={2} w={"100%"}>{room.roomDescription}</Text>
                                    <HStack spacing={5} w={"100%"} p={2} justifyContent={"flex-start"} mt={0}>
                                        <Button size='sm' colorScheme='blue' variant='outline'>{room.startDate}</Button>
                                        <Button size='sm' colorScheme='blue' variant='outline'>{room.listCandidate && Array.isArray(room.listCandidate) ? room.listCandidate.length : 0} Addtendee</Button>
                                        <Wrap ml={20}>
                                            {room.listCandidate.map((candidate) => (
                                                <WrapItem position="relative"> 
                                                    <Avatar name={candidate.name} src={candidate.avatar} />
                                                </WrapItem >
                                            ))}
                                        </Wrap>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box p={4} borderRadius="lg" w={"100%"} backgroundColor={"#FFFFFF"}>
                            <HStack >
                                <Text w={"55%"} pl={5} fontSize={27} fontWeight={"bold"} >Room setting</Text>
                                <Button w={"30%"} leftIcon={<MdVideocam />} colorScheme='teal' variant='solid'>
                                    Cuộc họp online
                                </Button>
                            </HStack> 
                            <br />
                            <hr />   
                        <VStack m={10} justifyContent={"flex-start"} spacing={10} >
                            <HStack w={"100%"} >
                                <FormLabel w={"30%"}>Room name</FormLabel>
                                <Input backgroundColor={"#FFFFFF"}  w={"60%"} placeholder='Room name' value={room.roomName}/>
                            </HStack>
                            <HStack w={"100%"} >
                                <FormLabel w={"30%"}>Skill</FormLabel>
                                <Input backgroundColor={"#FFFFFF"}  w={"60%"} placeholder='Room skill' value={room.roomSkill}/>
                            </HStack>
                            <HStack w={"100%"} >
                                <FormLabel w={"30%"}>Description</FormLabel>
                                <Input backgroundColor={"#FFFFFF"}  w={"60%"} placeholder='Room description' value={room.roomDescription} />
                            </HStack>
                            <HStack w={"100%"} >
                                <FormLabel w={"30%"}>Date time</FormLabel>
                                <HStack w="60%">
                                    <Input backgroundColor={"#FFFFFF"}  w={"50%"} placeholder='Room description' type="datetime-local" defaultValue={room.startDate} />
                                    <Text>To</Text>
                                    <Input onChange={handle} backgroundColor={"#FFFFFF"}  w={"50%"} placeholder='Room description' type="datetime-local" defaultValue={room.endDate} />   
                                </HStack>
                            </HStack>
                            <HStack w={"100%"} >
                                <FormLabel w={"30%"}>Link</FormLabel>
                                <Input backgroundColor={"#FFFFFF"}  w={"60%"} placeholder='link' type="link"value={room.link} />
                            </HStack>
                        </VStack>

                        </Box>
                        <Box>
                            <HStack spacing={10}>
                                <Button onClick={() =>navigate("/roomList")} w={40} colorScheme='gray' size='lg'>Back</Button>
                                <Button w={40} colorScheme='teal' size='lg'>Save</Button>
                            </HStack>
                        </Box>
                    </VStack>
                </Box>
        </>
    );
};
