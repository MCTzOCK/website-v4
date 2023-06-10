/**
 * src/types/Blog.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

export interface Blog {
  _id: string;
  title: string;
  created: string;
  image: string;
  author: string;
  content: string;
  tags: string[];
  __v: number;
}
