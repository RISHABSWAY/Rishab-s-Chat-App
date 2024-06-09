const User = require('../models/userModel.js')
const Chat = require('../models/chatModel.js')
const Message = require('../models/messageModel.js')

const getAllUsers = async(req, res) => {
  try {
    const users = await User.find({}, {password: 0})
    
    if(!users || users.length === 0 ){
      return res.status(404).json({message: "No users found"})
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error)
  }
}

const getAllUsersChat = async(req, res) => {
  try {
    const chats = await Chat.find()
    
    if(!chats || chats.length === 0 ){
      return res.status(404).json({message: "No chats found"})
    }
    return res.status(200).json(chats);
  } catch (error) {
    next(error)
  }
}


const getAllUsersMessages = async(req, res) => {
  try {
    const messages = await Message.find()
    
    if(!messages || messages.length === 0 ){
      return res.status(404).json({message: "No messages found"})
    }
    return res.status(200).json(messages);
  } catch (error) {
    next(error)
  }
}
module.exports = {getAllUsers, getAllUsersChat, getAllUsersMessages}