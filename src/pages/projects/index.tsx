/**
 * src/pages/projects/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */

import * as React from "react";
import {
  Box,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PromotedProject } from "@/types/PromotedProject";
import AppImageWrapper from "@/components/AppImageWrapper";
import { FaCodeBranch, FaGithub, FaGlobe, FaStar } from "react-icons/fa";
import Head from "next/head";
import { NextSeo } from "next-seo";

export default function Index() {
  const [projects, setProjects] = React.useState<
    {
      name: string;
      full_name: string;
      html_url: string;
      description: string;
      stargazers_count: number;
      forks_count: number;
    }[]
  >([]);

  const [promotedProjects, setPromotedProjects] = React.useState<
    PromotedProject[]
  >([]);

  React.useEffect(() => {
    fetch("https://api.github.com/users/MCTzOCK/repos?per_page=150").then(
      async (res) => {
        setProjects(await res.json());
      }
    );

    fetch("/api/projects").then(async (res) => {
      setPromotedProjects((await res.json()).projects);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Projects - Ben Siebert</title>
      </Head>
      <NextSeo
        title={"Projects - Ben Siebert"}
        description={"All open-source projects made by Ben Siebert."}
        openGraph={{
          type: "website",
          url: "https://ben-siebert.com/",
          title: "Projects - Ben Siebert",
          siteName: "Ben Siebert",
          description: "All open-source projects made by Ben Siebert.",
          images: [
            {
              url: "https://ben-siebert.com/static/images/ben4.png",
              width: 482,
              height: 581,
              alt: "Ben Siebert",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@OfficialMCTzOCK",
          site: "@OfficialMCTzOCK",
          cardType: "summary_large_image",
        }}
      />
      <Flex p={8} justifyContent={"center"}>
        <Box w={["100%", "60%"]}>
          <Heading size={"2xl"}>Projects</Heading>
          <Flex w={"100%"} justifyContent={"center"} mt={4}>
            <Stack gap={4} w={["100%", "50"]}>
              <StackDivider />
              {promotedProjects.map((project) => (
                <>
                  <Box w={"100%"} bg={"black"} rounded={"lg"} p={4}>
                    <Flex
                      w={"100%"}
                      direction={"row"}
                      gap={[4, 16]}
                      alignItems={"center"}
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        h={"100%"}
                        maxH={"100px"}
                        aspectRatio={"1/1"}
                      />
                      <Stack>
                        <Heading size={"xl"}>{project.name}</Heading>
                        <Text fontSize={"xl"}>{project.description}</Text>
                        <ButtonGroup>
                          <Link isExternal href={project.website}>
                            <IconButton
                              aria-label={"Website"}
                              icon={<FaGlobe />}
                              variant={"ghost"}
                            />
                          </Link>
                          <Link isExternal href={project.sourceCode}>
                            <IconButton
                              aria-label={"GitHub"}
                              icon={<FaGithub />}
                              variant={"ghost"}
                            />
                          </Link>
                        </ButtonGroup>
                      </Stack>
                    </Flex>
                  </Box>
                </>
              ))}
              <StackDivider />
              <Divider />
              <StackDivider />
              {projects.map((project) => (
                <>
                  <Box w={"100%"} bg={"black"} rounded={"lg"} p={4}>
                    <Flex
                      w={"100%"}
                      direction={"row"}
                      gap={[4, 16]}
                      alignItems={"center"}
                    >
                      <Stack>
                        <Heading size={"xl"}>{project.name}</Heading>
                        <Text fontSize={"xl"}>{project.description}</Text>
                        <Flex
                          fontSize={"xl"}
                          direction={"row"}
                          alignItems={"center"}
                          gap={[4]}
                        >
                          <Flex alignItems={"center"} gap={4}>
                            <FaStar />
                            {project.stargazers_count}
                          </Flex>
                          <Flex alignItems={"center"} gap={4}>
                            <FaCodeBranch />
                            {project.forks_count}
                          </Flex>
                        </Flex>
                        <ButtonGroup>
                          <Link isExternal href={project.html_url}>
                            <IconButton
                              aria-label={"GitHub"}
                              icon={<FaGithub />}
                              variant={"ghost"}
                            />
                          </Link>
                        </ButtonGroup>
                      </Stack>
                    </Flex>
                  </Box>
                </>
              ))}
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
