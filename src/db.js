import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyD6DuXWMEJjcp1ycVzP9s7QoHXV-5vJZlM',
  authDomain: 'onefootball-4a3da.firebaseapp.com',
  databaseURL: 'https://onefootball-4a3da.firebaseio.com',
  projectId: 'onefootball-4a3da',
  storageBucket: 'onefootball-4a3da.appspot.com',
  messagingSenderId: '68852080407'
})

const db = firebaseApp.database()

export default db
