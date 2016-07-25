window.onload = function () {
    showPosts();
};

function showPosts() {
    var main = document.getElementsByTagName("main")[0];
    ajax(paths.postTemplate).then(function (template) {
        ajax(config.urlServer.concat('/api/post/page/1'), {
            withCredentials: true
        }).then(function (arrPosts) {
            main.innerHTML += buildPost(arrPosts, template);
        });
    });
}

function buildPost(arrPosts, template) {
    var strAllPosts = "";
    arrPosts.forEach(function (objPost) {
        var strPost = template;
        strPost = strPost.replace('@body', '<p>'.concat(objPost.body).concat('</p>'));
        strPost = strPost.replace('@publicationDate', milisecondsToDate(objPost.publicationDate));
        strPost = strPost.replace('@title', objPost.title);
        strPost = strPost.replace('@category', objPost.category);
        strPost = strPost.replace('@author', objPost.author);
        strPost = strPost.replace('@tags', buildTags(objPost.tags));
        strAllPosts += strPost;
    });
    return strAllPosts;
}

function buildTags(arrTags){
    var strAllTags="";
    arrTags.forEach(function (tag) {
        strAllTags+='<a href="#">'.concat(tag).concat('</a>');
    });
    return strAllTags;
}
