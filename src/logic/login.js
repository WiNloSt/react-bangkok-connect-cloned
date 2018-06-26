import { getUser, setUser, queryUser } from '../data'

export const setUserData = async authUser => {
  const { displayName, photoURL, uid } = authUser
  setUser(authUser.uid, { name: displayName, photoURL, uid })
}

export const createOtpForUserIfNotExist = async user => {
  const userFromDb = await getUser(user.uid)
  const hasOtp = userFromDb && userFromDb.otp > -1
  if (hasOtp) return

  await generateAndSaveOtpToDb(user.uid)
}

export async function generateAndSaveOtpToDb(uid) {
  let otp = generateOtp()
  while (await otpExists(otp)) {
    otp = generateOtp()
  }
  setUser(uid, {
    otp
  })
}

async function otpExists(otp) {
  const users = await queryUser(['otp', '==', otp])
  return users.length > 0
}

function generateOtp() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, 0)
}
