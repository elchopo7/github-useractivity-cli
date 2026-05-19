

function getUsername() {
    const username = process.argv[2];

    if(!username) {
        console.error('Usage github-activity <username>');
        process.exit(1);
    }

    return username;
}

const username = getUsername();
console.log(`Fetching activity for ${username}...`);

async function fecthActivity(username) {
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

        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Failed to fetch GitHub activity:', error.message);
        process.exit(1);
    }
}

function formatEvent(event) {
    switch (event.type) {
        case 'PushEvent': {
            const commitCount = event.payload.commits.lenght;
            const repoName = event.repo.name;
            return `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${repoName}`;
        }

        case 'IssuesEvent': {
            const repoName = event.repo.name;
            return `Opened a new issue in ${repoName}`
        }

        case 'WatchEvent': {
            const repoName = event.repo.name;
            return `Starred ${repoName}`
        }

        default:
            return `Performed ${event.type} on ${event.repo.name}`;
    }
}

async function main() {
    const username = getUsername();
    const activity = await fetchActivity(username);

    if (activity.length === 0) {
        console.log('No recent activity found.');
        return;
    }

    activity.forEach((event) => {
        console.log(`- ${formatEvent(event)}`);
    });
}

main();