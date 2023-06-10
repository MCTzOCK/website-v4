/**
 * src/components/EmailAdminNewContact.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailAdminNewContact(props: {
  subject: string;
  message: string;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        New Contact Request from {props.email} with subject {props.subject}
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://avatars.githubusercontent.com/u/53553315?v=4`}
                alt="CodeUp"
                width={60}
                height={57}
                className="my-0 mx-auto max-w-full max-h-full"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              New <strong>Contact Request</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              E-Mail: {props.email}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Subject: {props.subject}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Message: {props.message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
