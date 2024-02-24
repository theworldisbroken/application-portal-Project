const User = require("./TestUserModel")

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

async function findUserByEmail(email) {
  if (email) {
    const user = await User.findOne({ email: email }).exec();
    return user
  }
}

async function createUser(userData, linkEnding) {
  if (userData) {
    const foundUserID = await findUser(userData.userID)
    const foundUserEmail = await findUserByEmail(userData.email)
    if (!foundUserID) {
      if (!foundUserEmail) {
        const user = new User({
          userID: userData.userID,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password,
          isAdministrator: userData.isAdministrator,
          activationLinkEnding: linkEnding
        });
        return await user.save();
      } else {
        throw new Error("No Email")
      }
    }
    throw new Error("No UserID");
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
  findUserByEmail,
  updateUser,
  updateSelfUser,
  deleteUser,
  createAdmin
}