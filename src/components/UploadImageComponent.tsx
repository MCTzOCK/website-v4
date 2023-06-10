/**
 * src/components/UploadImageComponent.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";

export default function UploadImageComponent(props: {
  isOpen: boolean;
  onClose: () => void;
  callback: (url: string) => void;
}) {
  return (
    <>
      <AlertDialog isOpen={props.isOpen} onClose={props.onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Upload Image
            </AlertDialogHeader>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.currentTarget);

                const res = await fetch("/api/upload-image", {
                  method: "POST",
                  body: formData,
                });

                if (res.status === 200) {
                  const { url } = await res.json();
                  props.callback(url);
                  props.onClose();
                }
              }}
            >
              <AlertDialogBody>
                <FormControl isRequired>
                  <FormLabel>Image</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <FaImage />
                    </InputLeftElement>
                    <Input type={"file"} filter={"image/png"} name={"image"} />
                  </InputGroup>
                </FormControl>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  onClick={props.onClose}
                  colorScheme={"red"}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button colorScheme="primary" type={"submit"} ml={3}>
                  Upload
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
