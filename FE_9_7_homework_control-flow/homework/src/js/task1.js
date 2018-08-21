let login = prompt(`Enter your login`, `User`);

if (login === null || login === '') {
    alert(`Canceled.`);
} else {
    if (login.length < 4) {
        alert(`I don't know any users having name length less than 4 symbols`);
    } else if (login !== 'User') {
        alert(`I don’t know you`);
    } else {
        let password = prompt(`Enter your password`, `SuperUser`);

        switch (password) {
            case '':
            case null:
                alert(`Canceled.`);
                break;
            case 'SuperUser': {
                let currentHours = getCurrentHours();
                let passCheckResult = currentHours < 20 ? `Good day!` : `Good evening!`;
                alert(passCheckResult);
                break;
            }
            default:
                alert(`Wrong password!`);
        }
    }
}

function getCurrentHours() {
    const MILLISECONDS = 1000;
    const SECONDS = 60;
    const SECONDS_MILLISECONDS = SECONDS * MILLISECONDS;
    const HOURS = 60;
    const OFFSET = 2;

    let date = new Date();
    let utc = date.getTime() + date.getTimezoneOffset() * SECONDS_MILLISECONDS;
    let utcDate = new Date(utc + HOURS * SECONDS_MILLISECONDS * OFFSET);

    return utcDate.getHours();
}



