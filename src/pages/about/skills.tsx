/**
 * src/pages/about/skills.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */

import * as React from "react";
import { Skill } from "../../types/Skill";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Head from "next/head";
import { NextSeo } from "next-seo";

export default function Skills() {
  const [skills, setSkills] = React.useState<Skill[]>([]);

  React.useEffect(() => {
    fetch("/api/skills", {
      method: "GET",
    }).then(async (res) => {
      setSkills((await res.json()).skills);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Skills - Ben Siebert</title>
      </Head>
      <NextSeo
        title={"Skills - Ben Siebert"}
        description={"All the skills Ben Siebert has obtained."}
        openGraph={{
          type: "website",
          url: "https://ben-siebert.com/",
          title: "Skills - Ben Siebert",
          siteName: "Ben Siebert",
          description: "All the skills Ben Siebert has obtained.",
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
      <Box p={8}>
        <Heading color="primary.600" size={"2xl"} textAlign={"center"}>
          Skills
        </Heading>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          mt={8}
        >
          {skills.map((skill) => {
            return (
              <>
                <GridItem>
                  <Stack gap={4} alignItems={"center"}>
                    <Heading size={"lg"} textAlign={"center"}>
                      {skill.name}
                    </Heading>
                    <CircularProgress
                      value={skill.level}
                      color="primary.600"
                      size={32}
                      max={5}
                    >
                      <CircularProgressLabel fontSize={"lg"}>
                        {
                          [
                            "Beginner",
                            "Advanced Beginner",
                            "Competent",
                            "Proficient",
                            "Expert",
                          ][skill.level - 1]
                        }
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Stack>
                </GridItem>
              </>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
