/**
 * src/lib/models/AwardModel.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import mongoose from "mongoose";

const AwardModel = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PromotedProject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models?.Award || mongoose.model("Award", AwardModel);
