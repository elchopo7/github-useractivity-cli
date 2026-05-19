

function getUsername() {
    const username = process.argv[2];

    if(!username) {
        console.error('Usage: github-activity <username>');
        process.exit(1);
    }

    return username;
}

async function fetchActivity(username) {
    const url = `https://api.github.com/users/${username}/events`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'github-activity-cli',
                'Accept': 'application/vnd.github+json',
            },
        });

        if (!response.ok) {
            if(response.status === 404) {
                console.error(`User "${username}" not found`);
            } else {
                console.error(`GitHub API request failed with status ${response.status}.`);
            }
            process.exit(1);
        }

    return await response.json();
    } catch(error) {
        console.error('Failed to fetch GitHub activity:', error.message);
        process.exit(1);
    }
}

function formatEvent(event) {
    switch (event.type) {
        case 'PushEvent': {
            const commits = event.payload?.commits ?? [];
            if (commits.length === 0) return null;
            const repoName = event.repo.name;
            return `Pushed ${commits.length} commit${commits.length !== 1 ? 's' : ''} to ${repoName}`;
        }

        case 'CreateEvent': {
            const repoName = event.repo.name;
            return `Created something in ${repoName}`;
        }

        case 'IssuesEvent': {
            const repoName = event.repo.name;
            return `Opened a new issue in ${repoName}`;
        }

        case 'WatchEvent': {
            const repoName = event.repo.name;
            return `Starred ${repoName}`;
        }

        default:
            return `Performed ${event.type} on ${event.repo.name}`;
    }
}

async function main() {
    const username = getUsername();
    console.log(`Fetching activity for ${username}...`);
    const activity = await fetchActivity(username);

    if (activity.length === 0) {
        console.log('No recent activity found.');
        return;
    }

    activity.forEach((event) => {
        const message = formatEvent(event);
        if (message) {
            console.log(`- ${message}`);
        }
    });
}

main();