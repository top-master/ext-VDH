# Welcome to Video Downloader

Thanks for installing **Video Downloader**. To download and save many kinds of
video, this browser extension needs a small helper program on your computer,
called the **Companion App**.

## Why the Companion App is needed

A browser extension runs inside the browser's sandbox, so on its own it cannot:

- **Run the video tools.** Many sites now send a video as lots of small pieces,
  with the picture and the sound in separate tracks. Joining those pieces back
  into one file you can play needs a native tool (`ffmpeg`) that the browser is
  not allowed to run by itself.
- **Save files freely.** Writing a finished video to the folder you choose, and
  handling large downloads on disk, is outside what the browser lets an
  extension do.
- **Reach the rest of your computer.** Talking to native programs on your
  operating system is blocked for extensions.

The Companion App does exactly these jobs. The extension talks to it quietly in
the background, hands it the work, and the Companion App writes the finished
file to your download folder. Without the Companion App, plain single-file
downloads still work, but joining streamed video and converting formats do not.

## Install the Companion App

Open the releases page below, download the installer for your operating system,
run it, and then reload this extension:

**➡ [Get the Companion App (releases page)](https://github.com/top-master/tool-VDH-CoApp/releases)**

The installer already includes everything the extension needs, `ffmpeg`
included. Once it finishes, the extension finds the Companion App on its own.
