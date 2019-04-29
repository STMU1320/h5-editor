module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PageSchema = new Schema({
    createTime: { type: Date  },
    updateTime: { type: Date },
    pageList: { type: Array  },
    cover: { type: String  },
    name: { type: String  },
    immutable: { type: Boolean  },
  });

  return mongoose.model('Page', PageSchema, 'publish');
}