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
  Textarea,
  Select,
} from "@chakra-ui/react";
import {
  FaCalendar,
  FaCheck,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaImage,
  FaPen,
  FaPlus,
  FaTags,
  FaTimes,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import UploadImageComponent from "@/components/UploadImageComponent";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { ContactMessage } from "@/types/ContactMessage";
import { PromotedProject } from "@/types/PromotedProject";
import { Award } from "@/types/Award";
import { Skill } from "@/types/Skill";

export default function Index() {
  const [contactMessages, setContactMessages] = React.useState<
    ContactMessage[]
  >([]);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [projects, setProjects] = React.useState<PromotedProject[]>([]);
  const [awards, setAwards] = React.useState<Award[]>([]);
  const [skills, setSkills] = React.useState<Skill[]>([]);

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
    reloadCMs();
    reloadProjects();
    reloadAwards();
    reloadSkills();
  }, []);

  const reloadBlogs = async () => {
    fetch("/api/blog", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      setBlogs(data.blogs);
    });
  };

  const reloadCMs = async () => {
    fetch("/api/contact/get", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      setContactMessages(data.contacts);
    });
  };

  const reloadProjects = async () => {
    fetch("/api/projects", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      setProjects(data.projects);
    });
  };

  const reloadAwards = async () => {
    fetch("/api/awards", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      setAwards(data.awards);
    });
  };

  const reloadSkills = async () => {
    fetch("/api/skills", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      setSkills(data.skills);
    });
  };

  const [currentProject, setCurrentProject] =
    React.useState<PromotedProject>(null);
  const [currentBlog, setCurrentBlog] = React.useState<Blog>(null);
  const [currentAward, setCurrentAward] = React.useState<Award>(null);
  const [currentSkill, setCurrentSkill] = React.useState<Skill>(null);

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
  const {
    isOpen: isProjectOpen,
    onOpen: onProjectOpen,
    onClose: onProjectClose,
  } = useDisclosure();
  const {
    isOpen: isAwardOpen,
    onOpen: onAwardOpen,
    onClose: onAwardClose,
  } = useDisclosure();
  const {
    isOpen: isSkillOpen,
    onOpen: onSkillOpen,
    onClose: onSkillClose,
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
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>E-Mail</Th>
                    <Th>Subject</Th>
                    <Th>Message</Th>
                    <Th>Answered</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contactMessages
                    .sort((a, b) => {
                      if (a.answered && !b.answered) {
                        return 1;
                      } else if (!a.answered && b.answered) {
                        return -1;
                      } else {
                        return 0;
                      }
                    })
                    .map((cm) => {
                      return (
                        <>
                          <Tr>
                            <Td>{new Date(cm.created).toLocaleString()}</Td>
                            <Td>{cm.email}</Td>
                            <Td>{cm.subject}</Td>
                            <Td>{cm.message}</Td>
                            <Td>{cm.answered ? <FaCheck /> : <FaTimes />}</Td>
                            <Td>
                              <IconButton
                                aria-label={"Answer"}
                                icon={<FaEnvelope />}
                                colorScheme={"primary"}
                                isDisabled={cm.answered}
                                onClick={async () => {
                                  const text = prompt(
                                    "Enter the answer to the message"
                                  );

                                  if (!text) return;

                                  const res = await fetch(
                                    "/api/contact/" + cm._id + "/answer",
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        message: text,
                                      }),
                                    }
                                  );

                                  if (res.status === 200) {
                                    reloadCMs();
                                  }
                                }}
                              />
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                </Tbody>
                <TableCaption>
                  {contactMessages.length} Messages total.
                </TableCaption>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={4} flex={"100%"} w={"100%"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={["column", "row"]}
            >
              <Heading size={"xl"}>Projects</Heading>
              <Button
                leftIcon={<FaPlus />}
                colorScheme={"primary"}
                onClick={async () => {
                  const res = await fetch("/api/projects/create", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: "New Project",
                      description: "New Project",
                      website: "https://example.com",
                      sourceCode: "https://github.com",
                      image: "/static/images/decryptor.jpg",
                    }),
                  });

                  reloadProjects();

                  if (res.status === 200) {
                    const data = await res.json();
                    setCurrentProject(data.project);
                    onProjectOpen();
                  } else {
                    alert("Error while creating project!");
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
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Website</Th>
                    <Th>Source-Code</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects.map((project) => {
                    return (
                      <>
                        <Tr>
                          <Td>
                            <Image
                              src={project.image}
                              alt={project.name}
                              w={16}
                            />
                          </Td>
                          <Td>{project.name}</Td>
                          <Td>{project.description}</Td>
                          <Td>{project.website}</Td>
                          <Td>
                            {project.sourceCode ? (
                              project.sourceCode
                            ) : (
                              <FaTimes />
                            )}
                          </Td>
                          <Td>
                            <ButtonGroup>
                              <IconButton
                                aria-label={"Delete"}
                                colorScheme={"red"}
                                onClick={async () => {
                                  fetch(
                                    "/api/projects/" + project._id + "/delete",
                                    {
                                      method: "DELETE",
                                    }
                                  ).then(() => {
                                    reloadProjects();
                                  });
                                }}
                                icon={<FaTrash />}
                              />
                              <IconButton
                                aria-label={"edit"}
                                colorScheme={"primary"}
                                onClick={async () => {
                                  setCurrentProject(project);
                                  onProjectOpen();
                                }}
                                icon={<FaPen />}
                              />
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
                <TableCaption>{projects.length} Projects total.</TableCaption>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={4} flex={"100%"} w={"100%"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={["column", "row"]}
            >
              <Heading size={"xl"}>Awards</Heading>
              <Button
                leftIcon={<FaPlus />}
                colorScheme={"primary"}
                onClick={async () => {
                  const res = await fetch("/api/projects/awards", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  reloadAwards();

                  if (res.status === 200) {
                    const data = await res.json();
                    setCurrentAward(data.award);
                    onAwardOpen();
                  } else {
                    alert("Error while creating award!");
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
                    <Th>Title</Th>
                    <Th>Date</Th>
                    <Th>Project</Th>
                    <Th>Description</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {awards.map((award) => {
                    return (
                      <>
                        <Tr>
                          <Td>{award.title}</Td>
                          <Td>{new Date(award.date).toLocaleString()}</Td>
                          <Td>{award.project.name}</Td>
                          <Td>{award.description}</Td>
                          <Td>
                            <ButtonGroup>
                              <IconButton
                                aria-label={"Delete"}
                                colorScheme={"red"}
                                onClick={async () => {
                                  fetch(
                                    "/api/awards/" + award._id + "/delete",
                                    {
                                      method: "DELETE",
                                    }
                                  ).then(() => {
                                    reloadAwards();
                                  });
                                }}
                                icon={<FaTrash />}
                              />
                              <IconButton
                                aria-label={"edit"}
                                colorScheme={"primary"}
                                onClick={async () => {
                                  setCurrentAward(award);
                                  onAwardOpen();
                                }}
                                icon={<FaPen />}
                              />
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
                <TableCaption>{awards.length} Awards total.</TableCaption>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={4} flex={"100%"} w={"100%"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={["column", "row"]}
            >
              <Heading size={"xl"}>Skills</Heading>
              <Button
                leftIcon={<FaPlus />}
                colorScheme={"primary"}
                onClick={async () => {
                  const name = prompt("Skill Name");
                  if (!name) return;
                  const level = prompt("Skill Level (1-5)");
                  if (!level) return;

                  const res = await fetch("/api/skills/create", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name,
                      level,
                    }),
                  });

                  reloadSkills();

                  if (res.status === 200) {
                    const data = await res.json();
                    setCurrentSkill(data.skill);
                    onSkillOpen();
                  } else {
                    alert("Error while creating skill!");
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
                    <Th>Name</Th>
                    <Th>Level</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {skills.map((skill) => {
                    return (
                      <>
                        <Tr>
                          <Td>{skill.name}</Td>
                          <Td>{skill.level}</Td>
                          <Td>
                            <ButtonGroup>
                              <IconButton
                                aria-label={"Delete"}
                                colorScheme={"red"}
                                onClick={async () => {
                                  fetch(
                                    "/api/skills/" + skill._id + "/delete",
                                    {
                                      method: "DELETE",
                                    }
                                  ).then(() => {
                                    reloadSkills();
                                  });
                                }}
                                icon={<FaTrash />}
                              />
                              <IconButton
                                aria-label={"edit"}
                                colorScheme={"primary"}
                                onClick={async () => {
                                  const name = prompt("Skill Name");
                                  const level = prompt("Skill Level (1-5)");
                                  if (!name || !level) return;

                                  const res = await fetch(
                                    "/api/skills/" + skill._id + "/update",
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        update: {
                                          name,
                                          level: parseInt(level),
                                        },
                                      }),
                                    }
                                  );

                                  reloadSkills();
                                }}
                                icon={<FaPen />}
                              />
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
                <TableCaption>{skills.length} Skills total.</TableCaption>
              </Table>
            </TableContainer>
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
      <Modal
        isOpen={isProjectOpen}
        onClose={onProjectClose}
        size={["full", "2xl"]}
      >
        <ModalOverlay />
        <ModalContent>
          {currentProject && (
            <>
              <ModalHeader>Edit Project: {currentProject.name}</ModalHeader>
              <ModalCloseButton />

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const name = (
                    e.currentTarget.elements.namedItem(
                      "name"
                    ) as HTMLInputElement
                  ).value;
                  const website = (
                    e.currentTarget.elements.namedItem(
                      "website"
                    ) as HTMLInputElement
                  ).value;
                  const sourceCode = (
                    e.currentTarget.elements.namedItem(
                      "sourcecode"
                    ) as HTMLInputElement
                  ).value;
                  const description = (
                    e.currentTarget.elements.namedItem(
                      "description"
                    ) as HTMLInputElement
                  ).value;

                  const image = currentProject.image;

                  const update = {
                    name,
                    image,
                    website,
                    sourceCode,
                    description,
                  };

                  const res = await fetch(
                    "/api/projects/" + currentProject._id + "/update",
                    {
                      method: "POST",
                      body: JSON.stringify({ update }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (res.status === 200) {
                    reloadProjects();
                    onProjectClose();
                    return;
                  }

                  alert("Error updating project: " + (await res.json()).error);
                }}
              >
                <ModalBody>
                  <Stack gap={4}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaPen />
                        </InputLeftElement>
                        <Input
                          name={"name"}
                          defaultValue={currentProject.name}
                          placeholder={"Name"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Website</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaGlobe />
                        </InputLeftElement>
                        <Input
                          name={"website"}
                          defaultValue={currentProject.website}
                          placeholder={"https://codeup.space"}
                          type={"url"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Source-Code</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaGithub />
                        </InputLeftElement>
                        <Input
                          name={"sourcecode"}
                          defaultValue={currentProject.sourceCode}
                          placeholder={"https://github.com/MCTzOCK/codeup"}
                          type={"url"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name={"description"}
                        placeholder={"My Super Cool Description"}
                        defaultValue={currentProject.description}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Image</FormLabel>
                      <Image
                        src={currentProject.image}
                        alt={currentProject.name + " Image"}
                        rounded={"xl"}
                        cursor={"pointer"}
                        onClick={async () => {
                          isNaN["__bensiebert_upload_image"] = (
                            url: string
                          ) => {
                            setCurrentProject((project) => {
                              if (typeof url === "string") {
                                project.image = url;
                              }
                              return project;
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
                    onClick={onProjectClose}
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
      <Modal isOpen={isAwardOpen} onClose={onAwardOpen} size={["full", "2xl"]}>
        <ModalOverlay />
        <ModalContent>
          {currentAward && (
            <>
              <ModalHeader>Edit Award: {currentAward.title}</ModalHeader>
              <ModalCloseButton />

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const title = (
                    e.currentTarget.elements.namedItem(
                      "title"
                    ) as HTMLInputElement
                  ).value;
                  const date = (
                    e.currentTarget.elements.namedItem(
                      "date"
                    ) as HTMLInputElement
                  ).value;
                  const project = (
                    e.currentTarget.elements.namedItem(
                      "project"
                    ) as HTMLInputElement
                  ).value;
                  const description = (
                    e.currentTarget.elements.namedItem(
                      "description"
                    ) as HTMLInputElement
                  ).value;

                  const update = {
                    title,
                    date,
                    project,
                    description,
                  };

                  const res = await fetch(
                    "/api/awards/" + currentAward._id + "/update",
                    {
                      method: "POST",
                      body: JSON.stringify({ update }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (res.status === 200) {
                    reloadAwards();
                    onAwardClose();
                    return;
                  }

                  alert("Error updating award: " + (await res.json()).error);
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
                          defaultValue={currentAward.title}
                          placeholder={"Title"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Date</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaCalendar />
                        </InputLeftElement>
                        <Input
                          name={"date"}
                          defaultValue={`${new Date(
                            currentAward.date
                          ).getFullYear()}-${
                            new Date(currentAward.date).getMonth().toString()
                              .length === 1
                              ? "0" +
                                (new Date(currentAward.date).getMonth() + 1)
                              : new Date(currentAward.date).getMonth() + 1
                          }-${
                            new Date(currentAward.date).getDate().toString()
                              .length === 1
                              ? "0" + new Date(currentAward.date).getDate()
                              : new Date(currentAward.date).getDate()
                          }`}
                          type={"date"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Project</FormLabel>
                      <InputGroup>
                        <Select
                          name={"project"}
                          defaultValue={currentAward.project._id}
                        >
                          {projects.map((project) => (
                            <option value={project._id}>{project.name}</option>
                          ))}
                        </Select>
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name={"description"}
                        placeholder={"My Super Cool Description"}
                        defaultValue={currentAward.description}
                      />
                    </FormControl>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    variant={"outline"}
                    mr={3}
                    onClick={onAwardClose}
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
