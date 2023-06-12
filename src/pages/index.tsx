/**
 * src/pages/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import * as React from "react";
import {
  Box,
  chakra,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import LandingPageText from "@/components/LandingPageText";
import { Blog } from "@/types/Blog";
import BlogCard from "@/components/BlogCard";
import { NextSeo } from "next-seo";
import Head from "next/head";

export default function Index() {
  const isMobile = useMediaQuery("(max-width: 1080px)")[0];

  const [blogError, setBlogError] = React.useState<boolean>(false);
  const [blogLoading, setBlogLoading] = React.useState<boolean>(true);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  React.useEffect(() => {
    fetch("/api/blog", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      if (res.status !== 200) {
        setBlogError(true);
      }

      setBlogs(data.blogs);
      setBlogLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home - Ben Siebert</title>
      </Head>
      <NextSeo
        title={"Home - Ben Siebert"}
        description={
          "Ben Siebert is a professional software developer and student from Germany."
        }
        openGraph={{
          type: "website",
          url: "https://ben-siebert.com/",
          title: "Home - Ben Siebert",
          siteName: "Ben Siebert",
          description:
            "Ben Siebert is a professional software developer and student from Germany.",
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

      {!isMobile ? (
        <Flex
          direction={["column", "row"]}
          pt={8}
          h={"fit-content"}
          w={"100%"}
          alignItems={"flex-end"}
        >
          <Image
            src={"/static/images/ben.png"}
            transform={"translate(0, 15%)"}
            zIndex={-1}
            alt={"Ben"}
            height={"50vh"}
          />
          <LandingPageText />
          <Flex flex={"80%"} justifyContent={"flex-end"}>
            <Image
              src={"/static/images/ben2.png"}
              alt={"Ben 2"}
              height={"50vh"}
              transform={"translate(25%, 2.5%)"}
              justifySelf={"flex-end"}
              zIndex={-1}
            />
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex
            direction={["column", "row"]}
            pt={8}
            pb={8}
            minH={"100vh"}
            w={"100%"}
            alignItems={"center"}
          >
            <Image
              src={"/static/images/ben2.png"}
              alt={"Ben 2"}
              width={"100%"}
              pb={8}
            />
            <LandingPageText />
          </Flex>
        </>
      )}
      <Box mt={8}>
        <Heading textAlign={"center"} size={"2xl"}>
          Latest News
        </Heading>
        {blogLoading ? (
          <Flex alignItems={"center"} justifyContent={"center"} pt={8} pb={8}>
            <CircularProgress
              isIndeterminate={true}
              colorScheme={"primary"}
              size={24}
            />
          </Flex>
        ) : (
          <>
            {blogError ? (
              <>
                <Heading
                  textAlign={"center"}
                  size={"lg"}
                  color={"red.500"}
                  pt={8}
                  pb={8}
                >
                  Error while loading news
                </Heading>
              </>
            ) : (
              <>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(3, 1fr)",
                  ]}
                  gap={8}
                  p={8}
                >
                  {blogs.map((blog) => {
                    return (
                      <>
                        <GridItem w={"100%"}>
                          <BlogCard blog={blog} key={blog._id} />
                        </GridItem>
                      </>
                    );
                  })}
                </Grid>
              </>
            )}
          </>
        )}
      </Box>
      <Box w={"100%"} mb={8}>
        <Heading textAlign={"center"} size={"2xl"}>
          Open Source
        </Heading>
        <Flex
          justifyContent={"center"}
          w={"100%"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={16}
        >
          <Stack gap={4} pb={8} pt={8}>
            <Text fontSize={"xl"}>Many of my code is</Text>
            <Heading size={"2xl"} color={"primary.600"}>
              open-source
            </Heading>
            <Text fontSize={"xl"}>
              <chakra.span>because I&nbsp;</chakra.span>
              <chakra.span fontSize={"2xl"} color={"primary.400"}>
                highly believe
              </chakra.span>
              <chakra.span>&nbsp;in&nbsp;</chakra.span>
              <chakra.span fontSize={"2xl"} color={"primary.400"}>
                open-source
              </chakra.span>
              .
            </Text>
            <Text fontSize={"xl"}>
              <chakra.span>If you want to&nbsp;</chakra.span>
              <chakra.span fontSize={"2xl"} color={"primary.400"}>
                take a look at my work
              </chakra.span>
              <chakra.span>&nbsp;you can visit my&nbsp;</chakra.span>
              <chakra.span fontSize={"2xl"} color={"primary.400"}>
                GitHub Profile
              </chakra.span>
              <chakra.span>&nbsp;at&nbsp;</chakra.span>
              <chakra.span fontSize={"2xl"} color={"primary.400"}>
                <Link
                  href={"https://github.com/MCTzOCK"}
                  isExternal={true}
                  color={"primary.400"}
                >
                  https://github.com/MCTzOCK
                </Link>
              </chakra.span>
            </Text>
          </Stack>
          <Image src={"/static/images/opensource.svg"} width={"600"} />
        </Flex>
      </Box>
    </>
  );
}
