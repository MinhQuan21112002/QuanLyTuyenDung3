import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import {
    Avatar,
    Box,
    Center,
    Flex,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Image,
    Link,
    ListItem,
    OrderedList,
    SimpleGrid,
    Slide,
    SlideFade,
    Spinner,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import {
    EmailIcon,
    InfoOutlineIcon,
    LinkIcon,
    SearchIcon,
    StarIcon,
} from "@chakra-ui/icons";
import { companyService } from "../../Service/company.service";
import { blue } from "@mui/material/colors";
import { ItemJobInCompany } from "./ItemJobInCompany";

const CompanyProfile = () => {
    const params = useParams();
    const [company, setCompany] = useState();
    const [listJob, setListJob] = useState([]);
    useEffect(() => {
        companyService.getCompanyById(params.id).then((res) => setCompany(res));
        companyService.getJobByCompany(params.id).then((res) => setListJob(res));
    }, []);
    if (!company) {
        return (
            <Center h={"100vh"} direction="row" spacing={4}>
                <Spinner color="blue.500" size="xl" />
            </Center>
        );
    } else {
        return (
            <>
                <VStack backgroundColor={"#e9f3f5"} fontFamily={"sans-serif"}>
                    <SlideFade in={true} offsetY={20}>
                        <Heading size={"lg"} m={"6"} mt={24}></Heading>
                    </SlideFade>
                    <HStack m={5} align={"flex-start"} w={"70vw"} p={3}>
                        <Box
                            maxW="100%"
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                            align={"flex-start"}
                            w={"100vw"}
                            m={2}
                            backgroundColor={"#FFFFFF"}
                        >
                            <Image
                                src={company.avatar}
                                alt={company.name}
                                width="100%"
                                height="200px"
                                objectFit="cover"
                            />

                            <Box p={4}>
                                <Text fontWeight="bold" fontSize="lg" mt="2">
                                    {company.name}
                                </Text>

                                <Flex w={"60%"} p={2}>
                                    <Text flex="1">
                                        <Link
                                            href={company.website}
                                            isExternal
                                            color="blue.500"
                                        >
                                            <IconButton
                                                m={2}
                                                aria-label="Search database"
                                                icon={<SearchIcon />}
                                            />
                                            {company.website}
                                        </Link>
                                    </Text>
                                    <Text>
                                        <IconButton
                                            aria-label="Send email"
                                            m={2}
                                            icon={<EmailIcon />}
                                        />
                                        {company.phone}
                                    </Text>
                                </Flex>
                            </Box>
                        </Box>
                    </HStack>

                    <HStack m={5} align={"flex-start"} w={"70vw"} p={5}>
                        <VStack w={"70%"} pr={3} spacing={12}>
                            <Box
                                w={"100%"}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="md"
                                align={"flex-start"}
                            >
                                <FormLabel
                                    fontWeight={"bold"}
                                    fontSize={18}
                                    color={"white"}
                                    w={"100%"}
                                    p={4}
                                    style={{ backgroundColor: "#99d3e9" }}
                                >
                                    Company Information
                                </FormLabel>
                                <Text p={4}>{company.info}</Text>
                            </Box>
                            <Box
                                w={"100%"}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="md"
                                align={"flex-start"}
                            >
                                <FormLabel
                                    fontWeight={"bold"}
                                    fontSize={18}
                                    color={"white"}
                                    w={"100%"}
                                    p={4}
                                    style={{ backgroundColor: "#99d3e9" }}
                                >
                                    JobPosting
                                </FormLabel>
                                {listJob.map((job) => (
                                       < ItemJobInCompany {...job} />
                                ))}
                            </Box>
                        </VStack>

                        <Box
                            w={"30%"}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                            align={"flex-start"}
                            m={2}
                        >
                            <FormLabel
                                fontWeight={"bold"}
                                fontSize={18}
                                color={"white"}
                                w={"100%"}
                                p={4}
                                style={{ backgroundColor: "#99d3e9" }}
                            >
                                Company Contact{" "}
                            </FormLabel>

                            <VStack p={3} w={"100%"} m={2}>
                                <HStack w={"100%"}>
                                    <IconButton
                                        aria-label="Send email"
                                        icon={<InfoOutlineIcon />}
                                        mr={2}
                                    />
                                    <Text>
                                        Company Address <br />
                                    </Text>
                                </HStack>
                                <VStack>
                                    <Text>{company.address}</Text>
                                </VStack>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>
            </>
        );
    }
};

export default CompanyProfile;
