//
//
// $("#add-submit").on('click', function (e) {
//     e.preventDefault();
//     var item = {
//         text: $input.val(),
//         done: false
//     };
//     todos.push(item);
//     $input.val('');
//     var $span = $("<span class='item-text'></span>").text(item.text);
//     var button = "<button class='item-remove'>Remove</button>";
//     var $li = $("<li class='item'></li>").append($span, button);
//     $(".list").append($li);
// });

var data, counter = 0;

$(document).ready(function () {
    $.getJSON('data/media.json', {}, function (json) {
        console.log(json);
        data = json;
        addContent();
    });
});


$(".btn-view-more").on("click", function () {
    addContent();
});

function addContent() {

    let _first = 0, _last = 12;

    if (counter !== 0) {
        _last += 6 * counter;
        _first = _last - 6;

        if (_last >= data.media.length) {
            _last = data.media.length;

            $('.btn').hide();
            $('.message').show();
        }
    }
    counter++;

    for (let i = _first; i < _last; i++) {
        let $img = $('<img class="item">');
        $img.attr('src', data.media[i].display_url);
        let $galleryItem = $("<div class='gallery-item count'></div>").append($img);
        $galleryItem.attr('data-likes', data.media[i].edge_liked_by.count);
        $galleryItem.attr('data-comments', data.media[i].edge_media_to_comment.count);
        $('.gallery-grid').append($galleryItem);
    }

}
