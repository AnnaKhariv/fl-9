window.addEventListener('load', init);

function init() {
    let coordinates = document.getElementsByName('coordinates');
    let btn = document.getElementById('btn');


    btn.addEventListener('click', () => {
        let accessKey = '?access_token=DebGPeDGL5GMzPRXYxYF';
        let url = `https://api.onwater.io/api/v1/results/${coordinates[0].value},${coordinates[1].value}${accessKey}`;

        let animation = document.getElementsByClassName('animation-data');
        animation[0].style.display = 'none';
        animation[1].style.display = 'none';

        let loader = document.getElementById('error');
        loader.style.display = 'none';

        http.get(url)
            .then(response => {
                if (response['water']) {
                    animation[0].style.display = 'block';
                } else {
                    animation[1].style.display = 'block';
                }
            })
            .catch(error => {
                let loader = document.getElementById('error');
                let text = document.createTextNode(`Error! ${error}`);
                loader.appendChild(text);
                loader.style.display = 'block';
            });
    });
}

const http = {
    get(url) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            let loader = document.getElementById('loader');
            loader.style.display = 'block';

            xhr.onload = () => {
                loader.style.display = 'none';
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let json = JSON.parse(xhr.response);
                    resolve(json);
                } else {
                    reject(xhr.statusText);
                }
            };

            xhr.onerror = () => reject('INTERNET DISCONNECTED!');
            xhr.send();
        });
    }
};
