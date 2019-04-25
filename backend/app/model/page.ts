module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PageSchema = new Schema({
    createTime: { type: Date  },
    updateTime: { type: Date },
    pageList: { type: Array  },
  });

  return mongoose.model('Page', PageSchema, 'publish');
}