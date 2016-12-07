'use strict';

import mongoose from 'mongoose';

var TodoSchema = new mongoose.Schema({
  todo: {type: String},
  userId: {type: mongoose.Schema.ObjectId},
});

export default mongoose.model('Todo', TodoSchema);
