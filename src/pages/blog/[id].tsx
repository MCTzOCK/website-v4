/**
 * src/pages/blog/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import { Blog } from "@/types/Blog";
import {
  Box,
  CircularProgress,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Table,
  Tbody,
  Text,
  Thead,
  UnorderedList,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaClock, FaTags, FaUser } from "react-icons/fa";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import { NextSeo } from "next-seo";

export default function BlogViewer() {
  const [blog, setBlog] = React.useState<Blog>();
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/blog/" + router.query.id).then(async (res) => {
      if (res.status !== 200) {
        router.push("/");
      } else {
        setBlog((await res.json()).blog);
      }
    });
  }, []);

  if (!blog) {
    return (
      <>
        <Head>
          <title>Blog - Ben Siebert</title>
        </Head>
        <NextSeo
          title={"Blog - Ben Siebert"}
          description={"Read on the blog of Ben Siebert."}
          openGraph={{
            type: "website",
            url: "https://ben-siebert.com/",
            title: "Blog - Ben Siebert",
            siteName: "Ben Siebert",
            description: "Read on the blog of Ben Siebert.",
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
        <Flex
          w={"100%"}
          h={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress
            isIndeterminate
            alignSelf={"center"}
            mx={"auto"}
            size={60}
          />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex
        justifyContent={"center"}
        w={"100%"}
        h={"fit-content"}
        minH={"100vh"}
        p={16}
      >
        <Box w={["100%", "40%"]}>
          <Stack gap={4}>
            <Image rounded={"xl"} src={blog.image} />
            <Heading size={"2xl"} textAlign={"center"}>
              {blog.title}
            </Heading>
            <Flex
              gap={4}
              direction={["column", "row"]}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FaUser />
                <Text fontSize={"lg"} ml={2} color={"primary.400"}>
                  {blog.author}
                </Text>
              </Flex>
              <Flex alignItems={"center"}>
                <FaClock />
                <Text fontSize={"lg"} ml={2} color={"primary.400"}>
                  {new Date(blog.created).toLocaleString()}
                </Text>
              </Flex>
              <Flex alignItems={"center"}>
                <FaTags />
                <Text fontSize={"lg"} ml={2} color={"primary.400"}>
                  {blog.tags.join(", ")}
                </Text>
              </Flex>
            </Flex>
            <Markdown
              options={{
                overrides: {
                  h1: {
                    component: Heading,
                    props: {
                      fontSize: "6xl",
                      mb: 4,
                      mt: 4,
                    },
                  },
                  h2: {
                    component: Heading,
                    props: {
                      fontSize: "4xl",
                      mb: 4,
                      mt: 4,
                    },
                  },
                  h3: {
                    component: Heading,
                    props: {
                      fontSize: "2xl",
                      mb: 4,
                      mt: 4,
                    },
                  },
                  h4: {
                    component: Heading,
                    props: {
                      fontSize: "xl",
                      mb: 4,
                      mt: 4,
                    },
                  },
                  h5: {
                    component: Heading,
                    props: {
                      fontSize: "lg",
                      mb: 4,
                      mt: 4,
                    },
                  },
                  h6: {
                    component: Heading,
                    props: {
                      fontSize: "md",
                      mb: 4,
                      mt: 4,
                    },
                  },
                  a: {
                    component: Link,
                    props: {
                      fontSize: "xl",
                      color: "blue.300",
                    },
                  },
                  ul: {
                    component: UnorderedList,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  ol: {
                    component: OrderedList,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  li: {
                    component: ListItem,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  table: {
                    component: Table,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  thead: {
                    component: Thead,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  tbody: {
                    component: Tbody,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  tr: {
                    component: Tr,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  th: {
                    component: Th,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  td: {
                    component: Td,
                    props: {
                      fontSize: "xl",
                    },
                  },
                  p: {
                    component: Text,
                    props: {
                      fontSize: "xl",
                    },
                  },
                },
              }}
            >
              {blog?.content as string}
            </Markdown>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
