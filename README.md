# Instagram Auto Comment Delete
**English | [Türkçe](README_TR.md)**
<p align="center">

[![License](https://img.shields.io/github/license/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/stargazers)
[![Forks](https://img.shields.io/github/forks/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/network/members)
[![Issues](https://img.shields.io/github/issues/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/issues)

</p>

<p align="center">
  An automated Instagram comment deletion tool with smart rate-limit protection and human-like behavior simulation.
</p>

---

Auto Comment Delete is a JavaScript tool developed to manage and delete Instagram comments in bulk through the browser console.

The script runs on the Instagram comments screen and provides a modern control panel where users can start, pause, resume, and stop the deletion process.

> Developed by **DOKES**  
> GitHub: https://github.com/dokess

---

## Features

- Bulk select and delete Instagram comments
- Modern in-browser control panel
- Multi-language support
- Automatic Instagram interface language detection
- Whitelist support
- Blacklist support
- Regex-based comment filtering
- Pause, resume, and stop controls
- Recently deleted comment tracking
- Session statistics
- Safety score tracking
- Smart rate-limit protection
- Human-like behavior simulation
- Adaptive waiting system
- Sound alert support
- Browser notification support
- Log export support
- JSON, CSV, and TXT report formats
- Theme switching
- Compact view
- Resizable panel
- Panel opacity control
- Keyboard shortcuts

---

## Usage

1. Open the Instagram post or comment section where you want to delete comments.
2. Open your browser developer tools.
3. Go to the Console tab.
4. Paste the script code into the console.
5. Press Enter.
6. Start the process from the control panel.

### Opening Developer Tools

Windows / Linux:

    F12

macOS:

    Option + Command + I

---

## Installation

No package installation is required.

This project works as a single-file JavaScript script: [`script.js`](./script.js)

*No installation required.* & *Runs directly in the browser console.*

---

## Whitelist

Comments from users added to the whitelist will not be deleted. These comments are skipped during the process.

Example:

    friend_account
    trusted_user
    brand_account

---

## Blacklist

If users are added to the blacklist, only comments from those users will be targeted.

Example:

    spam_account
    bot_account
    ad_account

If the blacklist is empty, all comments matching the filters may be processed.

---

## Regex Filtering

Regex filtering can be used to target comments containing specific words, phrases, or patterns.

Example:

    spam|ad|bot

In this example, comments containing `spam`, `ad`, or `bot` will be filtered.

If the regex field is left empty, all eligible comments may be processed.

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Space | Pause / resume |
| Esc | Stop / close |
| T | Change theme |
| L | Change language |
| U | Undo last action |
| C | Compact view |
| ? | Open help window |
| Shift + S | Change panel size |
| Shift + R | Reset statistics |
| Shift + O | Change panel opacity |

---

## Logs and Reports

The script keeps logs during the process.

Logs can be exported in the following formats:

- JSON
- CSV
- TXT

At the end of a session, the following information can be viewed:

- Total deleted comments
- Total rounds
- Skipped comments
- Process duration
- Hourly processing rate
- Safety score

---

## Language Support

The script supports multiple languages to detect buttons in the Instagram interface.

Supported Instagram interface languages:

- Turkish
- English
- German
- French
- Spanish
- Italian
- Portuguese
- Dutch
- Russian
- Arabic
- Korean
- Japanese
- Chinese

Supported panel interface languages:

- Turkish
- English
- German
- Spanish
- French

---

## Themes and Appearance

The panel can be used with different theme options:

- Dark
- Light
- OLED
- Pink

The panel can also be:

- Switched to compact mode
- Resized
- Made transparent
- Moved around the screen

---

## Safety Notes

Auto Comment Delete uses waiting intervals, adaptive timing, and rate-limit protection to keep the process under control.

For safer usage:

- Do not delete a very large number of comments at once.
- Keep the number of comments per round low.
- Do not set waiting intervals too short.
- Avoid unusual activity on your account during the process.
- Some features may stop working if Instagram changes its interface.

---

## Panel Settings

The following settings can be managed from the panel:

| Setting | Description |
|---|---|
| Instagram Language | Selects or automatically detects the Instagram interface language |
| Panel Language | Changes the panel interface language |
| Comments per Round | Sets how many comments will be selected in each round |
| Target | Sets the total number of comments to delete |
| Waiting Time | Adjusts the waiting time between process rounds |
| Selection Delay | Sets the delay between comment selection actions |
| Adaptive Timing | Automatically adjusts waiting intervals based on process status |
| Regex Filter | Filters comments by specific words or patterns |
| Sound Notification | Enables or disables sound alerts during the process |
| Browser Notification | Enables or disables browser notifications |

---

## Warning

This project is not officially supported or approved by Instagram.

If Instagram changes its interface, DOM structure, or button labels, the script may not work as expected.

Users are responsible for complying with Instagram’s terms of service, platform rules, and applicable laws when using this tool.

---

## Disclaimer

This project is shared for personal and educational use.

The developer is not responsible for account restrictions, data loss, platform penalties, or any other consequences that may result from incorrect or improper use of the script.

Use at your own risk.

---

## Developer

**DOKES**

GitHub: https://github.com/dokess

---

## License

This project is licensed under the **MIT License**.

See the [`LICENSE`](./LICENSE) file for details.

---

## Support

If you find this project useful, you can support it by giving the repository a star on GitHub.

Auto Comment Delete v6.0  
Controlled Instagram Comment Cleanup Tool.
