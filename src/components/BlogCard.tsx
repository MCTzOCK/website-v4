/**
 * src/components/BlogCard.tsx
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
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaClock, FaTag, FaTags, FaUser } from "react-icons/fa";
import NextLink from "next/link";

export default function BlogCard(props: { blog: Blog }) {
  return (
    <>
      <Box
        w={"100%"}
        backgroundColor={"black"}
        rounded={"xl"}
        border={"1px solid white"}
        p={4}
      >
        <Stack gap={4}>
          <Image
            w={"100%"}
            src={props.blog.image}
            alt={props.blog.title}
            rounded={"xl"}
          />
          <Heading size={"lg"} color={"white"}>
            {props.blog.title}
          </Heading>
          <Flex
            gap={4}
            direction={["column", "row"]}
            justifyContent={"space-between"}
          >
            <Flex alignItems={"center"}>
              <FaUser />
              <Text fontSize={"lg"} ml={2} color={"primary.400"}>
                {props.blog.author}
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <FaClock />
              <Text fontSize={"lg"} ml={2} color={"primary.400"}>
                {new Date(props.blog.created).toLocaleString()}
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <FaTags />
              <Text fontSize={"lg"} ml={2} color={"primary.400"}>
                {props.blog.tags.join(", ")}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize={"xl"} color={"white"}>
            {props.blog.content.substring(0, 100) + "..."}
          </Text>
          <ButtonGroup>
            <Link as={NextLink as any} href={"/blog/" + props.blog._id}>
              <Button colorScheme={"primary"} size={"lg"}>
                Read more
              </Button>
            </Link>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
