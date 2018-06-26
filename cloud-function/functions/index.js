// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const firestore = admin.firestore()
const FieldValue = admin.firestore.FieldValue

exports.createFriendAcheivement = functions.firestore
  .document('users/{userID}/friends/{friendID}')
  .onCreate((snap, context) => {
    firestore.collection('achievements').add({
      type: 'networking',
      uid: context.params.userID,
      fid: context.params.friendID,
      createdAt: FieldValue.serverTimestamp()
    })
  })

exports.createBountyAchievement = functions.firestore
  .document('posts/{postID}/participants/{participantID}')
  .onUpdate((snap, context) => {
    const newValue = snap.after.data()
    const oldValue = snap.before.data()

    if (oldValue.isRewarded !== newValue.isRewarded) {
      if (newValue.isRewarded) {
        firestore.collection('achievements').add({
          type: 'bounty',
          uid: context.params.participantID,
          pid: context.params.postID,
          createdAt: FieldValue.serverTimestamp()
        })
      } else {
        firestore
          .collection('achievements')
          .where('type', '==', 'bounty')
          .where('uid', '==', context.params.participantID)
          .where('pid', '==', context.params.postID)
          .get()
          .then(snapshot => snapshot.forEach(doc => doc.ref.delete()))
          .catch(error => {
            console.error(error)
          })
      }
    }
  })
