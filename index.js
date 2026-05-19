

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