export const firebaseErrors = {
    'auth/email-already-in-use': {
        title: 'Account already exists!',
        description: 'Log in with this email or link it to account created with Google'
    },
    'auth/wrong-password': {
        title: 'Wrong password!',
        description: 'Try again! Maybe you forgot to link your Google account with this email'
    },
    'auth/user-not-found': {
        title: 'User not found!',
        description: 'Try different credentials'
    }
}

export type FirebaseErrors = typeof firebaseErrors
export type FirebaseErrorsCodes = keyof FirebaseErrors
