## VDH (Video download helper)

An educational purpose, clean-room reproduce of VDH's source-code.

## Get the source

Clone the repository with:

```
git clone https://github.com/top-master/ext-VDH.git
```

## Required tools

This version of the app depends on the VDH-CoApp tool to be installed:

https://github.com/top-master/tool-VDH-CoApp/releases/tag/v2.0.19

## Build

The content bundle (`content/content-libs.js` and its CSS) is a build artifact
and is **not** committed, so you must build before loading or exporting.

### Pre-requisites

1. **[Git](https://git-scm.com/downloads)**

   > **WARNING:** on Microsoft Windows, enable the `Git Bash` feature during
   > installation.

2. **[Node.js](https://nodejs.org/)** v18 (or maybe newer).

3. **[Yarn](https://yarnpkg.com/)** — this repo pins its own Yarn under `.yarn/`,
   so `yarn <cmd>` uses the right version once installed.

### Steps

1\. Clone this project (see [Get the source](#get-the-source)) and open a console
in this file's directory.

2\. Install the dependencies:

```sh
yarn install
```

3\. Build the generated content bundle:

```sh
yarn build
```

4\. Load the extension: open `chrome://extensions`, turn on **Developer mode**,
click **Load unpacked**, and pick this directory.

> **WARNING:** loading only works after `yarn build` — the pages reference the
> generated bundle, which is not committed.

### Export a package

To produce a signed, distributable package, run:

```sh
yarn export
```

This runs the build, then zips only the files the extension needs at runtime
into `dist/<name>-<version>.crx`, signed with `dist/extension-key.pem`.

> **WARNING:** the key is generated on first run and reused so the extension id
> stays stable, and it is git-ignored — never commit a private key. For an
> official release, place your real signing key at that path first.
