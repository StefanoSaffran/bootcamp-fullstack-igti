import mongoose from 'mongoose';
import AppErrors from '../errors/AppErrors.js';

const accountSchema = new mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0)
        throw new AppErrors('Negative values are not permitted', 401);
    },
  },
});

accountSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const AccountModel = mongoose.model('Account', accountSchema);

export default AccountModel;
