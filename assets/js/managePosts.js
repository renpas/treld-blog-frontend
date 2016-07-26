var tableLists = null;

window.onload = function () {
    loadPosts(1);
   
};

function loadPosts(page) {
    var tableList = document.querySelector("#tableList > tbody");
    ajax(paths.managePostTemplate).then(function (template) {
        ajax(config.urlServer.concat('/api/post/page/'.concat(page)), {
            withCredentials: true
        }).then(function (arrPosts) {
            tableList.innerHTML += buildRow(arrPosts, template);
             tableLists = $('#tableList').DataTable({
             	"info":     false,
             	"bLengthChange": false ,
             	"pageLength": 10,
                "retrieve": true /*,
                "processing": true,
                "serverSide": true,
                "ajax": "../".concat('/api/post/page/').concat(tableLists.page.info().page + 1)*/
             });
        });
    });
}

function buildRow(arrPosts, template) {
    var strAllPosts = "";
    arrPosts.forEach(function (post) {
        var strPost = template;
        strPost = strPost.replaceAll('@id', post.id)
                .replaceAll('@title', post.title)
                .replaceAll('@author', post.author)
                .replaceAll('@createdDate', milisecondsToDate(post.creationDate))
                .replaceAll('@publishedDate', milisecondsToDate(post.publicationDate))
                .replaceAll('@url', post.url);
        strAllPosts += strPost;
    });
    return strAllPosts;
}

$('#tableList').on( 'page.dt', function () {
    //pages are zero index based
    loadPosts(tableLists.page.info().page + 1);
} );