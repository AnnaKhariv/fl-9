app.service('wallPostsService', function () {

    this.getWallPosts = function () {
        return wallPosts;
    };

    this.insertPost = function (author, title, message, src) {
        const id = wallPosts.length;
        wallPosts.push({
            id: id,
            author: author,
            title: title,
            message: message,
            likeCount: 0,
            liked: false,
            src: src
        });
    };

    this.replacePost = function (id, author, title, message, src, liked, likeCount) {
        for (let i = 0; i < wallPosts.length; i++) {
            if (wallPosts[i].id === id) {
                wallPosts[i].author = author;
                wallPosts[i].title = title;
                wallPosts[i].message = message;
                wallPosts[i].likeCount = likeCount;
                wallPosts[i].liked = liked;
                wallPosts[i].src = src;
            }
        }
    };


    this.getWallPost = function (id) {
        for (let i = 0; i < wallPosts.length; i++) {
            if (wallPosts[i].id === id) {
                return wallPosts[i];
            }
        }
        return null;
    };

    const wallPosts = [
        {
            id: 0,
            author: 'Oleg Hugo',
            title: 'New car',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Cras vehicula auctor lacus, sit amet faucibus mauris tempor eget. ' +
            'Vestibulum eu est volutpat, convallis risus id, lobortis nulla. ' +
            'Nulla laoreet leo id felis luctus rutrum. Nulla ut velit odio. ' +
            'Mauris molestie nibh urna, in luctus lacus blandit sit amet. ' +
            'Praesent euismod sed nunc at dignissim. Donec nec feugiat elit.',
            likeCount: 2,
            liked: true,
            src: 'assets/img/1.jpg'
        },
        {
            id: 1,
            author: 'George Throg',
            title: 'Trips to USA',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Cras vehicula auctor lacus, sit amet faucibus mauris tempor eget. ' +
            'Vestibulum eu est volutpat, convallis risus id, lobortis nulla. ' +
            'Nulla laoreet leo id felis luctus rutrum. Nulla ut velit odio. ' +
            'Mauris molestie nibh urna, in luctus lacus blandit sit amet. ' +
            'Praesent euismod sed nunc at dignissim. Donec nec feugiat elit.',
            likeCount: 2,
            liked: false,
            src: 'assets/img/2.jpg'
        },
        {
            id: 2,
            author: 'Anna Milton',
            title: 'Story of my life',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Cras vehicula auctor lacus, sit amet faucibus mauris tempor eget. ' +
            'Vestibulum eu est volutpat, convallis risus id, lobortis nulla. ' +
            'Nulla laoreet leo id felis luctus rutrum. Nulla ut velit odio. ' +
            'Mauris molestie nibh urna, in luctus lacus blandit sit amet. ' +
            'Praesent euismod sed nunc at dignissim. Donec nec feugiat elit.',
            likeCount: 2,
            liked: false,
            src: 'assets/img/3.jpg'
        }
    ];

});