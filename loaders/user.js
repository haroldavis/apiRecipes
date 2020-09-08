const User = require('../database/models/user')

module.exports.batchUsers = async (userIds) => {
    console.log('keys======, userIds')
    const users = await User.find({ _id: { $in: userIds } })
    return userIds.map(userId => users.find(user => user._id === userId))
    //[1, 2, 3] => [user2, user1, user3]
}