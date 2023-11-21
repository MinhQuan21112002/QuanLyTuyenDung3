import React, { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    Input,
    Text,
    Box,
    Select,
} from "@chakra-ui/react";
import { questionService } from "../../Service/question.service";
import { skillPositionService } from "../../Service/skillPosition.service";

export const AddQuestionInterview = ({ field, onAddClick}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const [questions, setQuestion] = useState([]);
    const [skills, setSkill] = useState([]);
    const [selectedSkill, setSelectSkill] = useState(0);
    const [isFilter, setISFilter] = useState(false);
    const [filterQuestions, setFilterQuestion] = useState([]);
    const [keyword, setKeword] = useState("");
    const handleType = (e) => {
        setKeword(e.target.value);
        setISFilter(false);
    };

    useEffect(() => {
        if (keyword === "") {
            questionService
            .getQuestionByField(accessToken, field)
            .then((res) => setQuestion(res))
            .catch((er) => console.log(er.message));
        } else {
            setQuestion(searchQuestionsByKeyword(keyword))
        }
    }, [keyword]);

    useEffect(() => {
        questionService
            .getQuestionByField(accessToken, field)
            .then((res) => setQuestion(res))
            .catch((er) => console.log(er.message));
        skillPositionService.getSkill(accessToken).then((res) => setSkill(res));
    }, []);

    useEffect(() => {
        questionService
            .getQuestionBySkill(accessToken, selectedSkill)
            .then((res) => {
                if (field === "SoftSkill") {
                    setFilterQuestion(res[0].questions);
                }
                if (field === "TechSkill") {
                    setFilterQuestion(res[1].questions);
                }
                if (field === "Language") {
                    setFilterQuestion(res[2].questions);
                }
                if (selectedSkill != 0) {
                    setISFilter(true);
                } else {
                    setISFilter(false);
                }
            });
    }, [selectedSkill]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectSkill(value);
    };

    const searchQuestionsByKeyword = (keyword) => {
        const lowerCaseKeyword = keyword.toLowerCase();
        const filteredQuestions = questions.filter((question) => {
            return (
                question.question.toLowerCase().includes(lowerCaseKeyword)
            );
        });
        return filteredQuestions;
    };



    return (
        <>
            <Button w={"16%"} colorScheme="teal" onClick={onOpen}>
                + {field}
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Find your question
                        </AlertDialogHeader>

                        <AlertDialogBody style={{ maxHeight: "500px", overflowY: "auto" }}>
                            <Input
                                onChange={handleType}
                                value={keyword}
                                placeholder="Search"
                                size="md"
                            />
                            <Select
                                defaultValue={0}
                                onChange={handleSelectChange}
                                m={3}
                                w={"90%"}
                            >
                                <option value={0}>---</option>
                                {skills.map((skill) => (
                                    <option value={skill.id}>
                                        {skill.skillName}
                                    </option>
                                ))}
                            </Select>
                            {isFilter
                                ? filterQuestions.map((question) => (
                                      <Box
                                          p={2}
                                          borderRadius={4}
                                          m={2}
                                          borderWidth={1}
    
                                      >
                                          <Text>{question.question}</Text>
                                          <Text color={"green"}>
                                              by: {question.creatorName}
                                          </Text>
                                      </Box>
                                  ))
                                : questions.map((question) => (
                                      <Box
                                          p={2}
                                          borderRadius={4}
                                          m={2}
                                          borderWidth={1}

                                      >
                                          <Text>{question.question}</Text>
                                          <Text color={"green"}>
                                              by: {question.creatorName}
                                          </Text>
                                          <Button  onClick={() =>onAddClick(question.id, question.question,0, field==="SoftSkill"? "softSkill" : field==="TechSkill" ? "technical" : "english")}>+</Button>
                                      </Box>
                                  ))}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
