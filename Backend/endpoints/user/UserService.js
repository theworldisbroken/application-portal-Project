const User = require("./UserModel")

async function getUsers() {
  const allUsers = await User.find();
  return allUsers;
}

async function findUser(userID) {
  if (userID) {
    const user = await User.findOne({ userID: userID }).exec();
    return user
  }
}

async function createUser(userData) {
  if (userData) {
    const foundUser = await findUser(userData.userID)
    if (!foundUser) {
      const user = new User(userData);
      return await user.save();
    }
  }
}

async function updateUser(userID, userData) {
  if (userID) {
    const bodyData = Object.keys(userData);
    const user = await findUser(userID)
    if (user) {
      for (let i of bodyData) {
        user[i] = userData[i]
      }
      return await user.save()
    }
  }
}

async function updateSelfUser(userID, userData) {
  if (userID) {
    const bodyData = Object.keys(userData);
    const user = await findUser(userID)
    if (!bodyData.includes("isAdministrator") && !bodyData.includes("userID")) {
      if (user) {
        for (let i of bodyData) {
          user[i] = userData[i]
        }
        return await user.save()
      }
    }
    throw new Error();
  }
}

async function updateAvatar(userID, avatarID) {
  if (userID) {
    const user = await findUser(userID)
    if (user) {
      user.avatar = avatarID
      return await user.save()
    }
  }
}

async function deleteUser(userID) {
  if (userID) {
    return await User.findOneAndDelete({ userID: userID });
  }
}

async function createAdmin() {
  const admin = await findUser("admin");
  if (!admin) {
    const adminUser = new User({
      "userID": "admin",
      "password": "123",
      "isAdministrator": true
    });
    await adminUser.save();
  }
}

module.exports = {
  getUsers,
  createUser,
  findUser,
  updateUser,
  updateSelfUser,
  updateAvatar,
  deleteUser,
  createAdmin
}