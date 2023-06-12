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
import { useEffect, useState } from "react";
import { Award } from "../../types/Award";
import Head from "next/head";
import { NextSeo } from "next-seo";

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    fetch("/api/awards", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();
      setAwards(data.awards);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Awards - Ben Siebert</title>
      </Head>
      <NextSeo
        title={"Awards - Ben Siebert"}
        description={"All the awards Ben Siebert has won."}
        openGraph={{
          type: "website",
          url: "https://ben-siebert.com/",
          title: "Awards - Ben Siebert",
          siteName: "Ben Siebert",
          description: "All the awards Ben Siebert has won.",
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
              milestones={awards.map((award) => {
                return {
                  date: new Date(award.date).toDateString(),
                  title: award.title,
                  description: award.description,
                  project: award.project,
                };
              })}
            />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
