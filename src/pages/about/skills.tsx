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
