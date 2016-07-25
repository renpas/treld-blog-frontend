window.onload = function () {
    loadPosts();
   
};

function loadPosts() {
    var tableList = document.querySelector("#tableList > tbody");
    ajax(paths.managePostTemplate).then(function (template) {
        ajax(config.urlServer.concat('/api/post/page/1'), {
            withCredentials: true
        }).then(function (arrPosts) {
            tableList.innerHTML += buildRow(arrPosts, template);
             var table = $('#tableList').DataTable({
             	"info":     false,
             	"bLengthChange": false ,
             	"pageLength": 10
             });
        });
    });
}

function buildRow(arrPosts, template) {
    var strAllPosts = "";
    arrPosts.forEach(function (post) {
        var strPost = template;
        strPost = strPost.replace('@id', '<p>'.concat(post.id).concat('</p>'));
        strPost = strPost.replace('@title', post.title);
        strPost = strPost.replace('@author', post.author);
        strPost = strPost.replace('@createdDate', milisecondsToDate(post.creationDate));
        strPost = strPost.replace('@publishedDate', milisecondsToDate(post.publicationDate));
        strPost = strPost.replace('@url', post.url);
        strAllPosts += strPost;
    });
    return strAllPosts;
}