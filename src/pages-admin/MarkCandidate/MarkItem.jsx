import React, { useEffect, useState } from "react";
import {
    Heading,
    HStack,
    SlideFade,
    VStack,
    Image,
    Text,
    Button,
    Wrap,
    WrapItem,
    Avatar,
    FormLabel,
    Input,
    Select,
    Box,
    SimpleGrid,
    Link,
    Spacer,
    Textarea,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { QuestionMarkItem } from "./QuestionMarkItem";
import { interviewDetailService } from "../../Service/interviewDetail.service";
import { el } from "date-fns/locale";
import { questionService } from "../../Service/question.service";

const question = {
    englishQuestion: [],
    technicalQuestion: [],
    softSkillQuestion: [],
};

export const MarkItem = ({ roomId, loadDetail }) => {
    const [form, setForm] = useState({
        interviewDetailId: 0,
        comment: "",
        averageMark: 0,
        englishQuestion: [],
        technicalQuestion: [],
        softSkillQuestion: [],
    });
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;

    useEffect(() => {
        if (loadDetail && loadDetail.candidate.status === "Đã chấm") {
            setForm((prevDisplayQuestion) => ({
                ...prevDisplayQuestion,
                englishQuestion: JSON.parse(loadDetail.englishQuestion),
                technicalQuestion: JSON.parse(loadDetail.technicalQuestion),
                softSkillQuestion: JSON.parse(loadDetail.softSkillQuestion),
                interviewDetailId: loadDetail.id,
                comment:loadDetail.comment,
                averageMark:loadDetail.averageScores,
            }));
        } else {
            setForm({
                interviewDetailId: 0,
                comment: "",
                averageMark: 0,
                englishQuestion: [],
                technicalQuestion: [],
                softSkillQuestion: [],
            });
        }
    }, [loadDetail]);

    const handleAddQuestion = (id, newQuestion, mark, type) => {
        setForm((prevQuestion) => ({
            ...prevQuestion,
            [`${type}Question`]: [
                ...prevQuestion[`${type}Question`],
                { id: id, question: newQuestion, mark: mark },
            ],
        }));
    };

    const handleDeleteQuestion = (id, type) => {
        setForm((prevQuestion) => ({
            ...prevQuestion,
            [`${type}Question`]: prevQuestion[`${type}Question`].filter(
                (q) => q.id !== id
            ),
        }));
    };

    if (roomId === 0 || loadDetail === null) return <></>;
    else
        return (
            <Box p={9} borderRadius="lg" w={"100%"} backgroundColor={"#FFFFFF"}>
                <VStack>
                    <Box p={10} borderRadius={4} w={"100%"} borderWidth={1}>
                        <Text fontWeight={"black"}>
                            CV Candidate {loadDetail.candidate.name}
                            {" , "}
                            {loadDetail.candidate.email}
                        </Text>
                        <Link href={loadDetail.cv.url} isExternal>
                            View cv here <ExternalLinkIcon mx="2px" />
                        </Link>
                        <Text>Date create: {loadDetail.cv.dateApply}</Text>
                    </Box>
                    <Box
                        p={10}
                        h={"100%"}
                        borderWidth={1}
                        borderRadius={4}
                        w={"100%"}
                    >
                        <Text pb={30} fontWeight={"black"}>
                            Canditate Detail with id:{" "} {loadDetail.id}
                        </Text>
                        <VStack justifyContent={"flex-start"} spacing={5}>
                            <HStack w={"100%"}>
                                <FormLabel w={"80px"}>Name</FormLabel>
                                <Input
                                    value={loadDetail.candidate.name}
                                    disabled={true}
                                    w={"400px"}
                                    placeholder="name"
                                />
                            </HStack>
                            <HStack w={"100%"}>
                                <FormLabel w={"80px"}>Email</FormLabel>
                                <Input
                                    value={loadDetail.candidate.email}
                                    disabled={true}
                                    w={"400px"}
                                    placeholder="email"
                                />
                                <FormLabel w={"60px"}>Status</FormLabel>
                                <Input
                                    value={loadDetail.candidate.status}
                                    disabled={true}
                                    w={"165px"}
                                    placeholder="status"
                                />
                            </HStack>
                        </VStack>
                        <br />
                        <hr />
                        <Text pt={30} pb={30} fontWeight={"black"}>
                            Mark{" "}
                        </Text>
                        <VStack justifyContent={"flex-start"} spacing={5}>
                            <HStack w={"100%"}>
                                <FormLabel w={"20%"}>Average Mark</FormLabel>
                                <Input
                                    value={form.averageMark}
                                    disabled={true}
                                    type="number"
                                    w={"80%"}
                                    placeholder="mark"
                                />
                            </HStack>

                            <QuestionMarkItem
                                field="Language"
                                question={form.englishQuestion}
                                onAddClick={handleAddQuestion}
                                onDeleteClick={handleDeleteQuestion}
                            />
                            <QuestionMarkItem
                                field="TechSkill"
                                question={form.technicalQuestion}
                                onAddClick={handleAddQuestion}
                                onDeleteClick={handleDeleteQuestion}
                            />
                            <QuestionMarkItem
                                field="SoftSkill"
                                question={form.softSkillQuestion}
                                onAddClick={handleAddQuestion}
                                onDeleteClick={handleDeleteQuestion}
                            />

                            <HStack w={"100%"}>
                                <FormLabel w={"20%"}>Comment</FormLabel>
                                <Textarea
                                    value={form.comment}
                                    w={"80%"}
                                    placeholder="comment"
                                />
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        );
};

// useEffect(() => {

// },[])

// const handleAddenglishQuestion = (newQuestion, mark) => {
//     setDisplayQuestion(prevQuestion => ({
//         ...prevQuestion,
//         englishQuestion: [...prevQuestion.englishQuestion,  { question: newQuestion, mark: mark }],
//     }));
// }
// const handleAddsoftSkillQuestion = (newQuestion, mark) => {
//     setDisplayQuestion(prevQuestion => ({
//         ...prevQuestion,
//         softSkillQuestion: [...prevQuestion.softSkillQuestion,  { question: newQuestion, mark: mark }],
//     }));
// }
// const handleAddtechnicalQuestion= (newQuestion, mark) => {
//     setDisplayQuestion(prevQuestion => ({
//         ...prevQuestion,
//         technicalQuestion: [...prevQuestion.technicalQuestion,{ question: newQuestion, mark: mark }],
//     }));
// }

// const handleDeleteSoft = (questionId) => {
//     setDisplayQuestion(prevQuestion => ({
//         ...prevQuestion,
//         softSkillQuestion: prevQuestion.softSkillQuestion.filter(q => q.id !== questionId),
//     }));
// };
// const handleDeleteEnglish = (questionId) => {
//     setDisplayQuestion(prevQuestion => ({
//         ...prevQuestion,
//         englishQuestion: prevQuestion.englishQuestion.filter(q => q.id !== questionId),
//     }));
// };
// const handleDeleteTechnical = (questionId) => {
//     setDisplayQuestion(prevQuestion => ({
//         ...prevQuestion,
//         technicalQuestion: prevQuestion.technicalQuestion.filter(q => q.id !== questionId),
//     }));
// };
