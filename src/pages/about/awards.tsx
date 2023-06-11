/**
 * src/pages/about/awards.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */

import * as React from "react";
import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import Milestones from "@/components/Milestones";

export default function Awards() {
  return (
    <>
      <Box w={"100%"} h={"fit-content"} minH={"100vh"} mt={8} p={8}>
        <Flex
          direction={["column", "row"]}
          gap={8}
          h={"fit-content"}
          minH={"100vh"}
        >
          <Flex
            alignItems={"center"}
            minH={["100vh"]}
            display={["none", "inherit"]}
          >
            <Image
              src={"/static/images/ben7.png"}
              height={"50vh"}
              objectFit={"contain"}
              transform={"translate(-50%, 0)"}
            />
          </Flex>
          <Stack flex={["100%", "70%"]}>
            <Heading color={"primary.400"} size={"2xl"} textAlign={"center"}>
              Awards
            </Heading>
            <Milestones
              milestones={[
                {
                  date: "2023-05-21",
                  title: "Participation (CodeUp)",
                  description: "Bundeswettbewerb Jugend forscht",
                },
                {
                  date: "2023-03-29",
                  title: "Special Price (CodeUp)",
                  description:
                    "Teilnahme an der JugendUnternimmt summer school - Innovative Geschäftsideen mit Unternehmercourage",
                },
                {
                  date: "2023-03-29",
                  title: "1. Place (CodeUp)",
                  description: "Landeswettbewerb Jugend forscht",
                },
                {
                  date: "2023-02-24",
                  title: "Special Price (CodeUp)",
                  description: "Hengst-Filtration-Sonderpreis",
                },
                {
                  date: "2023-02-24",
                  title: "1. Place (CodeUp)",
                  description: "Regionalwettbewerb Jugend forscht",
                },
                {
                  date: "2022-05-07",
                  title: "Special Price (InCode)",
                  description:
                    "Sonderpreis für die schöpferisch wertvollste Arbeit",
                },
                {
                  date: "2022-05-07",
                  title: "1. Place (InCode)",
                  description: "Landeswettbewerb Schüler experimentieren",
                },
                {
                  date: "2022-02-16",
                  title: "Special Prize (InCode)",
                  description:
                    "Sonderpreis ct - Magazin für Computertechnik Jahresabonnement ",
                },
                {
                  date: "2022-02-16",
                  title: "1. Place (InCode)",
                  description: "Regionalwettbewerb Schüler experimentieren",
                },
                {
                  date: "2021-05-07",
                  title: "Special Prize (SenOS)",
                  description: "Sonderpreis Buchgutschein",
                },
                {
                  date: "2021-05-07",
                  title: "Participation (SenOS)",
                  description: "Landeswettbewerb Schüler experimentieren",
                },
                {
                  date: "2021-02-22",
                  title: "1. Place (SenOS)",
                  description: "Regionalwettbewerb Schüler experimentieren",
                },
                {
                  date: "2020-02-19",
                  title: "3. Place (Decryptor)",
                  description: "Regionalwettbewerb Schüler experimentieren",
                },
              ]}
            />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
