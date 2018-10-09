const victimDataSource = name => {
    let victimsByName = {
        'John': {
            name: 'John',
            surname: 'Doe',
            age: '99',
            jobTitle: 'Victim'
        },
        'Jennifer': {
            name: 'Jennifer',
            surname: 'Nicker',
            age: '21',
            jobTitle: 'Artist'
        }
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (victimsByName.hasOwnProperty(name)) {
                resolve(victimsByName[name]);
            } else {
                reject('unknown victim');
            }
        }, 1000);
    });
};


const crimeDataSource = surname => {
    return new Promise((resolve, reject) => {
        let crimeBySurname = {
            'Doe': {
                title: 'dank memes',
                place: '9 gag'
            },
            'Nicker': {
                title: 'robbery',
                place: 'NYC'
            }
        };

        setTimeout(() => {
            if (crimeBySurname.hasOwnProperty(surname)) {
                resolve(crimeBySurname[surname]);
            } else {
                reject('unknown surname');
            }
        }, 500);
    });
};

const loadVictimData = name => {

    return new Promise(resolve => {
        victimDataSource(name)
            .then(v =>
                crimeDataSource(v.surname)
                    .then(c => {
                            resolve(
                                `${name} ${v.surname}(${v.jobTitle}, ${v.age}) suffered from ${c.title} in ${c.place}.`
                            );
                        }
                    )
            )
            .catch(err => resolve(`Unhandled Promise rejection: ${err}`));
    });

};

/**
 * Output: John Doe(Victim, 99) suffered from dank memes in 9 gag.
 */
loadVictimData('John').then(msg => console.log(msg));
/**
 * Output: Jennifer Nicker(Artist, 21) suffered from robbery in NYC.
 */
loadVictimData('Jennifer').then(msg => console.log(msg));
/**
 * Output: Unhandled Promise rejection: unknown victim
 * or familiar error msg
 */
loadVictimData('Jss').then(msg => console.log(msg));

