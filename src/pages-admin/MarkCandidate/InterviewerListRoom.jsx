import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    HStack,
    Image,
    Link,
    SimpleGrid,
    Tag,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const data = [
    {
        id: 1,
        jobPostId: 1,
        roomName: "Phòng react",
        roomSkill: "react types",
        roomDescription: "không tham gia trực tiếp",
        startDate: "2023-11-23T13:43",
        endDate: "2023-11-23T16:04",
        status: "Created",
        link: "https://meet.google.com/xpm-gmqb-ash",
        listInterviewer: [
            {
                id: 4,
                email: "khanhnn2003223@gmail.com",
                avatar: null,
                fullName: "Nguyễn Lê Quốc Khánh",
                username: null,
            },
            {
                id: 6,
                email: "englishgrouphtk12a1@gmail.com",
                avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
                fullName: "Nguyen Anh Tai",
                username: null,
            },
        ],
        listCandidate: [
            {
                itemId: 1,
                candidateId: 2,
                name: "Nguyễn Lê Quốc Khánh",
                email: "20110233@student.hcmute.edu.vn",
                date: "11-12-2023",
                time: "08:00 to 09:00",
                status: "Đã chấm",
                avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/333208411_164578469708233_6502714041570586387_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sGYH23M-iCIAX_JrUXm&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDTs2Zh0n9WLX9IkceW_4xCrhABpIVxGoKJ0sVJ5eSRHw&oe=655D1C42",
                skill: null,
                experience: null,
            },
            {
                itemId: 3,
                candidateId: 5,
                name: "Phạm Hùng",
                email: "candidate2@gmail.com",
                date: "2023-11-23",
                time: "13h43 to 16h04",
                status: "Chưa phỏng vấn",
                avatar: "",
                skill: null,
                experience: null,
            },
            {
                itemId: 4,
                candidateId: 7,
                name: null,
                email: "candidate3@gmail.com",
                date: "2023-11-23",
                time: "13h43 to 16h04",
                status: "Chưa phỏng vấn",
                avatar: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-1/341056611_561940302586852_3051668306992785039_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=V6sB0rsKOe8AX-poMo4&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCAQLo2iz1n9QTMggikNtakCcEN6Iq9_q3_65qAWEVavw&oe=64CFDE44",
                skill: null,
                experience: null,
            },
        ],
    },
];

const listCandidate = [
    {
        itemId: 1,
        candidateId: 2,
        name: "Nguyễn Lê Quốc Khánh",
        email: "20110233@student.hcmute.edu.vn",
        date: "11-12-2023",
        time: "08:00 to 09:00",
        status: "Đã chấm",
        avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/333208411_164578469708233_6502714041570586387_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sGYH23M-iCIAX_JrUXm&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDTs2Zh0n9WLX9IkceW_4xCrhABpIVxGoKJ0sVJ5eSRHw&oe=655D1C42",
        skill: null,
        experience: null,
    },
    {
        itemId: 3,
        candidateId: 5,
        name: "Phạm Hùng",
        email: "candidate2@gmail.com",
        date: "2023-11-23",
        time: "13h43 to 16h04",
        status: "Chưa phỏng vấn",
        avatar: null,
        skill: null,
        experience: null,
    },
    {
        itemId: 4,
        candidateId: 7,
        name: null,
        email: "candidate3@gmail.com",
        date: "2023-11-23",
        time: "13h43 to 16h04",
        status: "Chưa phỏng vấn",
        avatar: null,
        skill: null,
        experience: null,
    },
];

export default function InterviewerListRoom() {
    const navigate = useNavigate();
    // const [listCandidate, setListCandidate] = useState([]);
    // useEffect(() => {
    //   setListCandidate(data.listCandidate)
    // },[])
    console.log(listCandidate);
    return (
        <>
            <Box backgroundColor={"#e9f3f5"} p={30} overflow="hidden">
                <VStack spacing={10}>
                    <HStack w={"100%"} spacing={10}>
                        <Box
                            p={5}
                            borderRadius="lg"
                            backgroundColor={"#FFFFFF"}
                            w={"33%"}
                            h={"190px"}
                        >
                            <Text fontFamily={""} fontWeight={"black"}>
                                10 Buổi phỏng vấn
                            </Text>
                        </Box>
                        <Box
                            p={5}
                            borderRadius="lg"
                            backgroundColor={"#FFFFFF"}
                            w={"33%"}
                            h={"190px"}
                        >
                            <Text fontWeight={"black"}>30 ứng viên</Text>
                        </Box>
                        <Box
                            p={5}
                            borderRadius="lg"
                            backgroundColor={"#FFFFFF"}
                            w={"33%"}
                            h={"190px"}
                        >
                            <Text fontWeight={"black"}>10 Đã phỏng vấn</Text>
                            <Text>Các ứng viên</Text>
                            <AvatarGroup m={1} size="md" max={4}>
                                {listCandidate.map((s) => (
                                    <Avatar
                                        key={s.itemId}
                                        name={s.name ? s.name : s.email}
                                        src={s.avatar}
                                    />
                                ))}
                            </AvatarGroup>
                            <Button
                                h={10}
                                color={"white"}
                                backgroundColor={"rgb(3, 201, 215)"}
                                m={1}
                            >
                                Xem tất cả
                            </Button>
                        </Box>
                    </HStack>

                    <Text pl={5} fontWeight={"black"} w={"100%"}>
                        Các buổi phỏng vấn
                    </Text>

                    <Box
                        borderRadius="lg"
                        backgroundColor={"#e9f3f5"}
                        w={"100%"}
                        h={"500px"}
                        overflow={"auto"}
                    >
                        <SimpleGrid columns={3} spacing={10}>
                            {/* box */}
                            {data.map((room) => (
                                <Box
                                    p={4}
                                    overflow={"hidden"}
                                    borderRadius={10}
                                    backgroundColor={"#ffffff"}
                                    height="250px"
                                >
                                    <HStack justifyContent={"space-between"}>
                                        <HStack>
                                            <Image
                                                boxSize="100px"
                                                borderRadius={10}
                                                src="https://bit.ly/dan-abramov"
                                                alt="Dan Abramov"
                                            />
                                            <VStack>
                                                <Text
                                                    w={"100%"}
                                                    fontWeight={"black"}
                                                    m={2}
                                                >
                                                    {room.roomName}
                                                </Text>
                                                <Text w={"100%"} m={2}>
                                                    {room.roomDescription}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <Button
                                            variant="outline"
                                            colorScheme="green"
                                            size="xs"
                                        >
                                            status
                                        </Button>
                                    </HStack>
                                    <HStack
                                        mt={5}
                                        justifyContent={"space-between"}
                                    >
                                        <Tag p={2} w={"50%"}>
                                            Date
                                            <br />
                                            {room.startDate}
                                        </Tag>
                                        <Tag p={2} w={"50%"}>
                                            Attendees
                                            <br />
                                            {room.listCandidate.length}
                                        </Tag>
                                    </HStack>
                                    <Button
                                        onClick={() => {
                                            navigate(
                                                `/mark-candidate/${room.id}`
                                            );
                                        }}
                                        w={"100%"}
                                        mt={2}
                                        colorScheme="blue"
                                    >
                                        Xem thông tin
                                    </Button>
                                </Box>
                            ))}
                            {/*end box */}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Box>
        </>
    );
}
