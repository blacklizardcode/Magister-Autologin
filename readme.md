# Magister Autologin

A Firefox extension that automatically logs you into Magister.

## ⚠️ SECURITY WARNING

**This extension is NOT available on the Firefox Add-ons Store** because it stores credentials in plaintext, which violates Mozilla's Firefox Add-ons terms of service.

**USING THIS EXTENSION IS AT YOUR OWN RISK.** The username and password you store are saved in plaintext in browser local storage and are vulnerable to:
- Malware and unauthorized browser extensions
- Anyone with access to your computer
- Data extraction if your browser storage is compromised

Do not use this extension if:
- You cannot accept the security risks of plaintext credential storage
- You share your computer with other users
- You use public or shared computers

## Installation

Since this extension is not on the Firefox Add-ons Store, you can download signed releases from the [GitHub Releases](https://github.com/blacklizardcode/Magister-Autologin/releases) page.

### Quick Install (Recommended)

1. Download the `.xpi` file from the [latest release](https://github.com/blacklizardcode/Magister-Autologin/releases/latest)
2. Open Firefox and drag the `.xpi` file into your browser window
3. Confirm the installation when prompted

### Manual Installation

Alternatively, you can install from source:

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this repository
5. The extension will be loaded (note: temporary add-ons are removed when you restart Firefox)

## Usage

1. Click the extension icon in your browser toolbar
2. Enter your Magister username and password
3. Click "Save Setting"
4. Navigate to your Magister login page (https://magister.net/account/)
5. The extension will automatically fill in your credentials and log you in

## Project Structure

- `manifest.json` - Extension configuration
- `popup/popup.html` - Extension popup interface
- `popup/popup.js` - Popup functionality
- `popup/popup.css` - Popup styling
- `script/autologin.js` - Content script that automatically fills login credentials

## Disclaimer

This extension is provided as-is for personal use only. The developers are not responsible for any security breaches, data loss, or other issues that may arise from using this extension. Users assume full responsibility for the risks associated with storing credentials in plaintext.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENCE](LICENCE) file for details.

Magister-Autologin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Magister-Autologin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
