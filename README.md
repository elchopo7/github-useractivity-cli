# GitHub User Activity CLI

A simple Node.js command line app that fetches recent public activity for a GitHub user and prints it in the terminal.

## Features

- Accepts a GitHub username as a command-line argument
- Fetches recent public activity from the GitHub API
- Prints readable activity messages in the terminal
- Handles missing usernames and API errors gracefully

## Requirements

- Node.js 18 or newer

## Installation

Clone the repository and install dependencies if needed:

```bash
git clone https://github.com/elchopo7/github-useractivity-cli.git
cd github-useractivity-cli
```

This project does not use external packages, so there is nothing to install with `npm install`.

## Usage

Run the CLI with a GitHub username:

```bash
node index.js <username>
```

Example:

```bash
node index.js elchopo7
```

## Output

The CLI prints recent activity in a readable format, for example:

```bash
Fetching activity for elchopo7...
- Pushed commits to elchopo7/github-useractivity-cli
- Opened a new issue in elchopo7/task-tracker-cli
- Starred kamranahmedse/developer-roadmap
- Created branch in elchopo7/github-useractivity-cli
```

## Supported event types

The current version handles these GitHub event types:

- `PushEvent`
- `IssuesEvent`
- `WatchEvent`
- `CreateEvent`

Unknown event types are skipped.

## Error handling

The CLI shows helpful messages when:

- the username is missing
- the GitHub user does not exist
- the GitHub API request fails

## Project structure

```text
github-useractivity-cli/
├── index.js
├── package.json
└── README.md
```

## Notes

- This project uses the GitHub public events API: `https://api.github.com/users/<username>/events`
- The events feed shows recent public activity, not a full historical log

## License

ISC
