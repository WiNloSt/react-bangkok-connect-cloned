import { queryUser, setFriend, getFriend } from '../data'
import { generateAndSaveOtpToDb } from './login'

let failedAttempts = 0
let remainingTime = 0
let lock = false

export const handleAddFriendWithOtp = async (
  otp,
  myUser,
  { setErrorMessage, setSuccessMessage }
) => {
  if (lock) {
    setErrorMessage(
      `Too many invalid attempts please try again in ${remainingTime}s`
    )
    return
  }

  const friends = await queryUser(['otp', '==', otp])
  if (friends.length > 0) {
    const friend = friends[0]
    const hasThisFriend = await getFriend(myUser.uid, friend.uid)

    if (!hasThisFriend) {
      failedAttempts = 0
      setFriend(myUser.uid, friend)
      generateAndSaveOtpToDb(friend.uid)
      console.log('friend added')
      setSuccessMessage('Friend added!!!')
    } else {
      setErrorMessage('You already added this friend')
    }
  } else {
    failedAttempts += 1
    if (failedAttempts >= 3) {
      lock = true
      remainingTime = 10
      const interval = setInterval(() => remainingTime--, 1000)
      setTimeout(() => {
        failedAttempts = 0
        lock = false
        clearInterval(interval)
      }, remainingTime * 1000)
    }

    if (lock) {
      setErrorMessage('Too many invalid attempts please try again in a minute')
      return
    }

    console.log('no user with this otp')
    setErrorMessage('User not found')
  }
}
