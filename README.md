
# Bearish - HackDuke 2023

A mobile app that makes it fun to read news on business and tech! Built in one day by Justin Aronwald, Will Zakielarz, Ana Stanisavljevic, and Logan Dracos (Duke University).




## Installation

First, make sure you have [React Native](https://reactnative.dev/) and [Xcode](https://developer.apple.com/xcode/) installed. Then, install `watchman` and `cocoapods`.

You'll need [Homebrew](https://brew.sh/) to install watchman.

```bash
brew install watchman
sudo gem install cocoapods
```

In the main project directory, run `npm install` to install dependencies. Then, nagivate to the `/ios` directory and install dependencies like so:

```bash
cd ios
pod install
```

Navigate back to the home directory. Run `npm start` to start Metro.

In a new terminal, run `npx react-native run-ios` to start the app. An Xcode simulator should boot up with your app on the home screen.


## API Keys

You'll need three API keys: [OpenAI](https://openai.com/), [NewsAPI](https://newsapi.org/), and [Extractor API](https://extractorapi.com/). Put them in the desired locations (hard-coded or `.env` file).
## Acknowledgements

 - [HackDuke](https://hackduke.org/)
