app.controller('DataController', function ($scope, wallPostsService) {

    init();

    function init() {
        $scope.posts = wallPostsService.getWallPosts();
        $scope.currentUser = wallPostsService.getWallPost($scope.posts.length - 1);
    }

    $scope.insertPost = function () {
        let author = $scope.currentUser.author;
        let title = $scope.addPost.title;
        let message = $scope.addPost.message;
        let src = $scope.currentUser.src;
        wallPostsService.insertPost(author, title, message, src);
        $scope.addPost.author = $scope.currentUser.author;
        $scope.addPost.title = '';
        $scope.addPost.message = '';
        $scope.addPost.src = $scope.currentUser.src;
    };

    $scope.edit = function (id) {
        $scope.post = wallPostsService.getWallPost(id);

        let _id = id;
        let author = $scope.post.author;
        let title = $scope.post.title;
        let message = $scope.post.message;
        let src = $scope.post.src;
        let liked = $scope.post.liked;
        let likeCount = $scope.post.likeCount;
        wallPostsService.replacePost(_id, author, title, message, src, liked, likeCount);
    };

    $scope.activity = function (id) {
        $scope.post = wallPostsService.getWallPost(id);

        if ($scope.post.liked === true) {
            $scope.post.likeCount -= 1;
        } else {
            $scope.post.likeCount += 1;
        }
        $scope.post.liked = !$scope.post.liked;

    };

});

