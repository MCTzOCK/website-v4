/**
 * src/lib/models/ContactModel.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */

import mongoose from "mongoose";

const ContactModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  answered: {
    type: Boolean,
    required: true,
    default: false,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default mongoose.models?.Contact ||
  mongoose.model("Contact", ContactModel);
