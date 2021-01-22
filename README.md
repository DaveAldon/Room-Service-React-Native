# Room Service React Native

Demonstration of the Room Service library in React Native.

### About

Room Service is a "multiplayer" React State management library that helps build real-time collaboration services. [Check out its website here](https://www.roomservice.dev/).

### Why this repo?

Real-time collaboration using state is an awesome thing. But what about for React Native? Room Service is at the moment primarily targeting web frontends. However, a React Native solution is possible, though not out of the box. This repo is to demonstrate how it _can_ work, with some tweaks. I'm hoping that future updates alleviate many of the dependancy issues.

### Requirements

![](https://img.shields.io/badge/Android-Working!-brightgreen) ![](https://img.shields.io/badge/iOS-Working!-brightgreen) ![](https://img.shields.io/badge/Expo-No-blue)

This solution does _not_ work with Expo, because of native libary usage and the need to link certain dependancies.

### Steps to install

1. Make a fresh React Native project

```
react-native init <project name>
```

2. (Android) Drag the android folder into Android Studio to let the gradle process finish
3. Verify that the app installs to a simulator for now, and if there's issues at this point, they have nothing to do with Room Service. You'll have to sort them out.

```
react-native run-android
```

4. Install the main Room Service dependancy

```
npm install --save @roomservice/react
```

5. At this point, if you follow the [instructions from Room Service](https://docs.roomservice.dev/docs/guides/react), you add the import at the root App.js, and then wrap everything in the RoomServiceProvider component. However, at this point the app won't run because the Room Service library is looking for the Crypto library. This is a **node\*** library, not React Native, so we need a way to make our alternative globally accessible. I found a wonderful library that solves the node dependancy issue for React Native: [node-libs-react-native](https://github.com/parshap/node-libs-react-native).

<p></p>

6. node-libs-react-native links the core node alternative modules properly, and makes them globally accessible. It makes use of the interesting extraNodeModules functionality. Install it like so:

```
npm install --save node-libs-react-native

# add the following to metro.config.js (make one if you don't have it):

module.exports = {
  resolver: {
    extraNodeModules: require('node-libs-react-native'),
  },
};
```

7. Currently (as of @roomservice/core v0.3.3-0), Room Service will detect that you're using React Native, and use custom base64 decoding functions so that the phone can get updates from other users in a room. In order to use this, add the following resolution to `package.json`:

```
"resolutions": {
    "@roomservice/core": "0.3.3-0"
}
# and then run:
yarn upgrade && yarn install && yarn info @roomservice/core
```

This works out-of-the-box with yarn. If you're using npm, you need to **also** add this to your scripts block in `package.json`:

```
"preinstall": "npx npm-force-resolutions"
# and then run:
npm update && npm install && npm ls @roomservice/core
```

Make sure the output shows at least `@roomservice/core@0.3.3-0`

8. At this point, it should run! To continue setting up Room Service to actually do something, you can take a look at my example in this app, or you can continue to the next step.

<p></p>

9. If you test locally, I recommend Room Service's [next.js server example](https://github.com/getroomservice/examples/tree/master/next.js-javascript). If you get network errors, you probably need to configure Android and iOS to work with http, because that's normally blocked by default. First, make sure to use the actual local IP address in your fetch call, because a simulator or device's localhost is itself, not your development machine. Then:
   **Android**: Add `android:usesCleartextTraffic="true"` under the Application tag in `android/app/src/main/AndroidManifest.xml`
   **iOS**: Add this to `ios/roomservicereactnative/Info.plist`:

   ```
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key><true/>
    </dict>
   ```

10. If you have issues getting it to work after all of this, and looking at this repo's code, let me know and I can try to help you out.
