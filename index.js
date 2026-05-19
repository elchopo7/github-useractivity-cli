

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

async function main() {
    const username = getUsername();
    console.log(`Fetching activity for ${username}...`)

    const activity = await fecthActivity(username);
    console.log(activity)
}

main();