import {
    Button,
    Center,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    SlideFade,
    Spinner,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CompaniesCard from "./CompaniesCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { companyService } from "../../Service/company.service";

const CompaniesContainer = () => {
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        companyService.getAllCompany().then((res) => setCompanies(res));
    }, []);

    return (
        <VStack width={"90vw"} align={"flex-start"} m={2} p={2}>
            <SlideFade in={true} offsetY={20}>
                <Heading size={"sm"} opacity={0.9} fontWeight={"medium"} mb={4}>
                    <InputGroup size="md" w={"60vw"}>
                        <Input
                            pr="4.5rem"
                            type="text"
                            placeholder="Search"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm">
                                Search
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Heading>
            </SlideFade>
            {!companies ? (
                <Center direction="row" spacing={4} w={"80vw"} h={"20vw"}>
                    <Spinner color="blue.500" size="xl" />
                </Center>
            ) : (
                <SimpleGrid columns={3} spacing={5}>
                    {companies.map((company) => (
                        <CompaniesCard key={company._id} {...company} />
                    ))}
                </SimpleGrid>
            )}
        </VStack>
    );
};

export default CompaniesContainer;
