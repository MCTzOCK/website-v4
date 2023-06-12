/**
 * src/lib/models/SkillModel.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import mongoose from "mongoose";

const SkillModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

export default mongoose.models?.Skill || mongoose.model("Skill", SkillModel);
