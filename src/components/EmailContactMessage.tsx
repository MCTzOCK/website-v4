/**
 * src/components/EmailContactMessage.tsx
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

export default function EmailContactMessage(props: { message: string }) {
  return (
    <Html>
      <Head />
      <Preview>Answer to your contact request.</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://avatars.githubusercontent.com/u/53553315?v=4`}
                alt="Ben Siebert"
                width={60}
                height={57}
                className="my-0 mx-auto max-w-full max-h-full"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Answer to your <strong>Contact Request</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              {props.message}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Best regards, Ben Siebert
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
