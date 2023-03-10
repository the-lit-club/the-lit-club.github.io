# GUSTO Literature Club Landing Page

**Authors**: [Pyae Sone Myo](https://github.com/Rickaym), [Hsu Pyae Han](https://github.com/itsmejewel)

## Table of Contents

1. [Setup](#setup)
2. [Project Structure](#project-structure)

## Setup

Follow the guide below to run the website.

### 1. Clone the repository

Follow [this](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) guide to clone the website using Github Desktop.

### 2. Installation

Requires at least node v16.

Use the following command in the root directory:

```
npm install
```

### 3. Running

#### Debug Mode

To run the webserver in debug mode use the command in root directory:
```
npm run debug
```
When the webserver is ran under debug mode, any changes to the `generate.js` script
or the `.hbs` templates will trigger an automatic regeneration of the static pages.
Once the debug watcher is running, you can run `build/index.html` with live server.

#### Production

In production mode, the webserver should be run statically, meaning that we will
run on `build/index.html`.
