module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PageSchema = new Schema({
    uid: { type: String  },
    pageList: { type: Array  },
  });

  return mongoose.model('Page', PageSchema);
}