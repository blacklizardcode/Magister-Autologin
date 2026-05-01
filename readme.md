# Magister Autologin

A Firefox extension that automatically logs you into Magister.

> [!CAUTION]
> **Security Notice:** This extension stores your Magister credentials in encrypted form. However, since the encryption key is stored locally on your device, malicious extensions or software could potentially access both your encrypted credentials and the encryption key. Please only install trusted extensions from reputable sources. This extension is provided under the GNU General Public License v3.0 (GPL-V3). The maintainers and developers disclaim all liability for any damages arising from the use of this extension.

## Installation

### Addon Store Install (Recommended)

You can install the addon via the [mozilla addon store](https://addons.mozilla.org/en-US/firefox/addon/magister-autologin/) this is the easiest way to install it officially

### File Install 

This method is for if you don't want to use the mozilla addon store or can't for some reason

1. Download the `.xpi` file from the [latest release](https://github.com/blacklizardcode/Magister-Autologin/releases/latest)
2. go to [about:addons](about:addons)
3. click on the settings cog -> install addon from file
4. locate and select the `magister-autologin-x.x.x.xpi` file

### Manual Installation

Alternatively, you can install from source:

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this repository
5. The extension will be loaded (note: temporary add-ons are removed when you restart Firefox)

## Usage

1. Click the extension icon in your browser toolbar
2. Enter your Magister username, password and select "enabled"
3. Click "Save Setting"
4. Navigate to your Magister login page
5. The extension will automatically fill in your credentials and log you in

## Project Structure

- `manifest.json` - Extension configuration
- `popup/popup.html` - Extension popup interface
- `popup/popup.js` - Popup functionality
- `popup/popup.css` - Popup styling
- `script/autologin.js` - Content script that automatically fills login credentials

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENCE](LICENCE) file for details.

Magister-Autologin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Magister-Autologin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
