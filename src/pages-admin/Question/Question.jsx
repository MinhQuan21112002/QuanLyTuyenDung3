import React, { useEffect, useState } from "react";
import { Header } from "../../Components-admin";
import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { questionService } from "../../Service/question.service";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Exposure } from "@mui/icons-material";
import { skillPositionService } from "../../Service/skillPosition.service";
import { Pagination } from "react-bootstrap";
import { PaginationItem } from "@mui/material";

export const dropdownField = [
    {
        id: 0,
        field: "--Choose--",
    },
    {
        id: 1,
        field: "SoftSkill",
    },
    {
        id: 2,
        field: "TechSkill",
    },
    {
        id: 3,
        field: "Language",
    },
];

export const dropdownSkill = (skills) => {
    const dropdownItems =
        skills?.map((item) => ({ id: item.id, field: item.skillName })) || [];
    dropdownItems.unshift({ id: 0, field: "--Choose--" });
    return dropdownItems;
};

export const dropdownPosition = (positions) => {
    const dropdownItems =
        positions?.map((item) => ({ id: item.id, field: item.positionName })) ||
        [];
    dropdownItems.unshift({ id: 0, field: "--Choose--" });
    return dropdownItems;
};

export const Question = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const [skills, setSkill] = useState([]);
    const [positions, setPositions] = useState([]);
    const [filter, setFilter] = useState({
        fieldId: 0,
        skillId: 0,
        positionId: 0,
    });
    // const [pageNumber, setPageNumber] = useState(1);

    const getAllquestion = (data) => {
        let allQuestions = [];
        data.forEach((field) => {
            if (field.questions && field.questions.length > 0) {
                allQuestions = allQuestions.concat(field.questions);
            }
        });
        return allQuestions;
    };

    useEffect(() => {
        questionService
            .getAllquestion(accessToken)
            .then((res) => setAllQuestions(getAllquestion(res)));
        skillPositionService
            .getSkill(accessToken)
            .then((res) => setSkill(res))
            .catch((er) => console.log(er));
        skillPositionService
            .getPosition(accessToken)
            .then((res) => setPositions(res))
            .catch((er) => console.log(er));
    }, []);

    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        const filteredData = allQuestions.filter((question) => {
            const fieldMatch =
                filter.fieldId === 0 ||
                question.fieldEnum ===
                    dropdownField.find((item) => item.id === filter.fieldId)
                        ?.field;
            const skillMatch =
                filter.skillId === 0 ||
                question.skillIds.includes(filter.skillId);
            const positionMatch =
                filter.positionId === 0 ||
                question.positionIds.includes(filter.positionId);
            return fieldMatch && skillMatch && positionMatch;
        });
        setFilteredQuestions(filteredData);
    }, [filter, allQuestions]);

    const DropDown = ({ list, onChange, name, value }) => {
        const handleSelectChange = (event) => {
            const selectedValue = event.target.value;
            onChange(selectedValue);
        };
        return (
            <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
                <DropDownListComponent
                    id="field"
                    name={`${name}`}
                    fields={{ text: "field", value: "id" }}
                    style={{ border: "none" }}
                    value={value}
                    dataSource={list}
                    popupHeight="220px"
                    popupWidth="120px"
                    onChange={handleSelectChange}
                />
            </div>
        );
    };
    return (
        <>
            <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
                <Header category="App" title="Question" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">Filter</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Field:</p>
                        <DropDown
                            value={filter.fieldId}
                            name="field"
                            list={dropdownField}
                            onChange={(selectedValue) =>
                                setFilter((filter) => ({
                                    ...filter,
                                    fieldId: selectedValue,
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Skill:</p>
                        <DropDown
                            value={filter.skillId}
                            name="skill"
                            list={dropdownSkill(skills)}
                            onChange={(selectedValue) =>
                                setFilter((filter) => ({
                                    ...filter,
                                    skillId: selectedValue,
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Position:</p>
                        <DropDown
                            value={filter.positionId}
                            name="position"
                            list={dropdownPosition(positions)}
                            onChange={(selectedValue) =>
                                setFilter((filter) => ({
                                    ...filter,
                                    positionId: selectedValue,
                                }))
                            }
                        />
                    </div>
                </div>

                <List spacing={3}>
                    {filteredQuestions.map((item) => (
                        <ListItem key={item.id}>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            <Box>
                                <Text fontSize="lg" fontWeight="bold">
                                    {item.question}
                                </Text>
                                <Text>Creator: {item.creatorName}</Text>
                                <Text>Field: {item.fieldEnum}</Text>
                                <Text>Answer: {item.answer}</Text>
                                <Text>
                                    Skill: {item.skillIds.map((p) => p)}
                                </Text>
                                <Text>
                                    Position: {item.positionIds.map((p) => p)}
                                </Text>
                            </Box>
                        </ListItem>
                    ))}
                </List>

                <Pagination
                    count={10}
                    renderItem={(allQuestions) => (
                        <PaginationItem
                            // slots={{
                            //     previous: ArrowBackIcon,
                            //     next: ArrowForwardIcon,
                            // }}
                            {...allQuestions}
                        />
                    )}
                />
            </div>
        </>
    );
};
