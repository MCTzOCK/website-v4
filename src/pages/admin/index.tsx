/**
 * src/pages/admin/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import { Blog } from "@/types/Blog";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAuthState from "@/lib/useAuthState";
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  FaImage,
  FaPen,
  FaPlus,
  FaTags,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import UploadImageComponent from "@/components/UploadImageComponent";
import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function Index() {
  const [blogError, setBlogError] = React.useState<boolean>(false);
  const [blogLoading, setBlogLoading] = React.useState<boolean>(true);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  const authState = useAuthState();
  const router = useRouter();

  React.useEffect(() => {
    if (authState && authState.loaded) {
      if (!authState.loggedIn) {
        router.push("/admin/login");
      }
    }
  }, [authState]);

  React.useEffect(() => {
    reloadBlogs();
  }, []);

  const reloadBlogs = async () => {
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
  };

  const [currentBlog, setCurrentBlog] = React.useState<Blog>(null);
  const {
    isOpen: isBlogOpen,
    onOpen: onBlogOpen,
    onClose: onBlogClose,
  } = useDisclosure();
  const {
    isOpen: isIMGUploadOpen,
    onOpen: onIMGUploadOpen,
    onClose: onIMGUploadClose,
  } = useDisclosure();

  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <>
      <Box p={8}>
        <Heading size={"2xl"}>Admin</Heading>
        <Flex
          direction={["column"]}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          gap={8}
          mt={4}
        >
          <Box mt={4} flex={"100%"} w={"100%"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={["column", "row"]}
            >
              <Heading size={"xl"}>Blog</Heading>
              <Button
                leftIcon={<FaPlus />}
                colorScheme={"primary"}
                onClick={async () => {
                  const res = await fetch("/api/blog/create", {
                    method: "POST",
                  });

                  if (res.status === 200) {
                    const data = await res.json();
                    setCurrentBlog(data.blog);
                    onBlogOpen();
                  } else {
                    alert("Error while creating blog!");
                  }
                }}
              >
                Create
              </Button>
            </Flex>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Title</Th>
                    <Th>Author</Th>
                    <Th>Tags</Th>
                    <Th>Created</Th>
                    <Th>Content</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {blogs.map((blog) => {
                    return (
                      <>
                        <Tr>
                          <Td>
                            <Image src={blog.image} alt={blog.title} w={16} />
                          </Td>
                          <Td>{blog.title}</Td>
                          <Td>{blog.author}</Td>
                          <Td>{blog.tags.join(", ")}</Td>
                          <Td>{new Date(blog.created).toLocaleString()}</Td>
                          <Td>{blog.content.substr(0, 100)}...</Td>
                          <Td>
                            <ButtonGroup>
                              <IconButton
                                aria-label={"Delete"}
                                icon={<FaTrash />}
                                colorScheme={"red"}
                                onClick={async () => {
                                  const res = await fetch(
                                    "/api/blog/" + blog._id + "/delete",
                                    {
                                      method: "DELETE",
                                    }
                                  );

                                  if (res.status === 200) {
                                    reloadBlogs();
                                  }
                                }}
                              />
                              <IconButton
                                aria-label={"Edit"}
                                icon={<FaPen />}
                                colorScheme={"primary"}
                                onClick={async () => {
                                  onBlogOpen();
                                  setCurrentBlog(blog);
                                }}
                              />
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
                <TableCaption>{blogs.length} Blogs published.</TableCaption>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={4} flex={"100%"} w={"100%"}>
            <Heading size={"xl"}>Messages</Heading>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isBlogOpen} onClose={onBlogClose} size={["full", "2xl"]}>
        <ModalOverlay />
        <ModalContent>
          {currentBlog && (
            <>
              <ModalHeader>Edit Blog: {currentBlog.title}</ModalHeader>
              <ModalCloseButton />

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const title = (
                    e.currentTarget.elements.namedItem(
                      "title"
                    ) as HTMLInputElement
                  ).value;
                  const author = (
                    e.currentTarget.elements.namedItem(
                      "author"
                    ) as HTMLInputElement
                  ).value;
                  const tags = (
                    (
                      e.currentTarget.elements.namedItem(
                        "tags"
                      ) as HTMLInputElement
                    ).value as string
                  ).split(",");

                  const image = currentBlog.image;

                  const content = editorRef.current.getValue();

                  const update = {
                    title,
                    author,
                    tags,
                    image,
                    content,
                  };

                  const res = await fetch(
                    "/api/blog/" + currentBlog._id + "/update",
                    {
                      method: "POST",
                      body: JSON.stringify({ update }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (res.status === 200) {
                    reloadBlogs();
                    onBlogClose();
                    return;
                  }

                  alert("Error updating blog: " + (await res.json()).error);
                }}
              >
                <ModalBody>
                  <Stack gap={4}>
                    <FormControl isRequired>
                      <FormLabel>Title</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaPen />
                        </InputLeftElement>
                        <Input
                          name={"title"}
                          defaultValue={currentBlog.title}
                          placeholder={"Title"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Author</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaUser />
                        </InputLeftElement>
                        <Input
                          name={"author"}
                          defaultValue={currentBlog.author}
                          placeholder={"Author"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Tags</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaTags />
                        </InputLeftElement>
                        <Input
                          name={"tags"}
                          defaultValue={currentBlog.tags.join(", ")}
                          placeholder={"Tags"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Content</FormLabel>
                      <Editor
                        height={"40vh"}
                        defaultLanguage={"markdown"}
                        theme={"vs-dark"}
                        defaultValue={currentBlog.content}
                        onMount={handleEditorDidMount}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Image</FormLabel>
                      <Image
                        src={currentBlog.image}
                        alt={currentBlog.title + " Image"}
                        rounded={"xl"}
                        cursor={"pointer"}
                        onClick={async () => {
                          isNaN["__bensiebert_upload_image"] = (
                            url: string
                          ) => {
                            setCurrentBlog((blog) => {
                              if (typeof url === "string") {
                                blog.image = url;
                              }
                              return blog;
                            });
                          };
                          onIMGUploadOpen();
                        }}
                      />
                    </FormControl>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    variant={"outline"}
                    mr={3}
                    onClick={onBlogClose}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme={"primary"} type={"submit"}>
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      {isNaN && (
        <UploadImageComponent
          isOpen={isIMGUploadOpen}
          onClose={onIMGUploadClose}
          // @ts-ignore
          callback={
            isNaN ? isNaN["__bensiebert_upload_image"] : (url: string) => {}
          }
        />
      )}
    </>
  );
}
