/**
 * src/types/ContactMessage.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */

export interface ContactMessage {
  email: string;
  subject: string;
  message: string;
  created: Date;
  answered: boolean;
  _id: string;
  __v: number;
}
