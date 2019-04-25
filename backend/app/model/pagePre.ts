module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PagePreSchema = new Schema({
    createTime: { type: Date  },
    updateTime: { type: Date },
    pageList: { type: Array  },
  });

  return mongoose.model('PagePre', PagePreSchema, 'preview');
}