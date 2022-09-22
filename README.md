# React Native - Project 1

#### This is my first React Native project
The project is a React Native app containing 3 pages:
- Login
- Register
- Home 

The pages are found in **./src/modules** 

The app uses Firebase as a backend, providing functionality for authentication and React Navigation.

The app also uses a Firestore database and functions (although an emulator is used to simulate their functionality)

With this app a user can register an account with email and password and login to that account. Firebase functions are used to update the Firestore database with the created user along with their status (offline/online). An API is provided to send **GET** and **POST** requests for reading users from the database along with updating the database (to see how this works go to **./functions/index.js**)

## TypeScript version

There is a version of this app written in TypeScript, go to the branch TypeScript-version to see the files there

## Authentication

A mock app for testing React Native Firebase auth was made to prototype authentication.

# Getting started:

Environment setup: [Docs here](https://reactnative.dev/docs/environment-setup) 

Authentication done with: [React native firebase auth](https://rnfirebase.io/auth/usage) 

Firebase (functions, firestore, authentication): [Setup](https://firebase.google.com/docs/android/setup)

After cloning the repo, install package dependencies, first go to main project dir then in functions dir and run:
```bash
  npm install
```

After dependencies are installed, open Android Studio and select the ./android folder, open a device and wait for gradle to finish the build.

AFter the build is done, in the terminal open metro and let it run here:
```bash
  npx react-native start
```

Start the app:
```bash
  npm react-native run-android
```

Start firebase functions on localhost, go to main dir and run:
```bash
  firebase emulators:start
```
For this to work, [Firebase CLI](https://firebase.google.com/docs/functions/local-emulator) must be installed first

## Cloning

For cloning a single branch, use
```bash
  git clone -b <branch_name> --single-branch <url>
```
