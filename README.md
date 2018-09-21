Debug tools
https://github.com/jhen0409/react-native-debugger
https://www.youtube.com/watch?v=JY279kbJ0KM
brew update && brew cask install react-native-debugger
npm i -s redux-devtools-extension

https://github.com/facebook/react-devtools/tree/master/packages/react-devtools

Lifecycle method explanation and when to use it cases:
https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1

react native router flux
https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md

// to build an apk or ios file
npm i -g exp
exp build:android    or    exp ba   or      exp build:ios
exp build:status


Create a local branch // https://dont-be-afraid-to-commit.readthedocs.io/en/latest/git/commandlinegit.html
git checkout -b <branch-name-no-spaces>    // this creates a new branch as well as switches branch

// merge your branch to master
git checkout branch-name
git checkout master
git merge branch-name
git push

Load custom fonts in expo
https://medium.com/@piyushgupta_81472/using-custom-fonts-in-expo-the-best-way-81f0e785580c

// Java Questions
https://career.guru99.com/top-22-java-design-patterns-interview-questions/

// Admob app id: ca-app-pub-8338409911685300~2976715345

Next, place the ad unit inside your app
Follow these instructions:
Complete the instructions in the Google Mobile Ads SDK guide using this app ID:
Java Design Patterns Interview Questions And Answers    ca-app-pub-8338409911685300~2976715345
Follow the banner implementation guide to integrate the SDK. You'll specify ad type, size, and placement when you integrate the code using this ad unit ID:
jdpiqa banner      ca-app-pub-8338409911685300/7755658488
Review the AdMob policies to ensure your implementation complies.

// dont remove test device id from admod
https://stackoverflow.com/questions/45069642/why-remove-admobs-addtestdevice-in-production


// Firebase locked mode
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

// Firebase test mode
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}

// setup clinet side connection in cloud firestore app
https://blog.expo.io/instagram-clone-using-firebase-react-native-expo-cc32f61c7bba

// debug google cloud functions
https://www.youtube.com/watch?v=TH0O1yNMz3A
https://github.com/GoogleCloudPlatform/cloud-functions-emulator
sudo killall -9 node

functions help
functions start
cd functions
functions deploy getJdpiqaData --trigger-http