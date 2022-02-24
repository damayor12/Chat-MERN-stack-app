const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: { type: String, ref: 'User' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  { timestamps: true },
);

// putting custom function in the schema
// to compare both functions  
// No need to import this function in our controller
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Before saving
userSchema.pre('save', async function(next){
  if (!this.isModified) { //if it hasnt been modified, do nothing
    next()
  } else {
      const salt = await bcrypt.genSalt(10) //our encoded password 
      this.password = await bcrypt.hash(this.password, salt); //rewriting our password before save
  }
} )

const User = mongoose.model('User', userSchema);
module.exports = User;
