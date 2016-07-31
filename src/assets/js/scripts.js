window.onload = function () {
    init();
};

function init() {
    var title = getPostParameter();
    var page = getPageParameter();

    if (title) {
        findByUrl(title).then(function(post){writePost([post])});
    } else {
        findAllPaginated(page).then(writePost);
    }


}

function writePost(posts) {
    getTemplate().then(function (template) {
        var main = document.getElementsByTagName("main")[0];
        var strAllPosts = "";
        posts.forEach(function (post) {
            var strPost = template;
            strPost = strPost.replace('@body', '<p>'.concat(post.body).concat('</p>'));
            strPost = strPost.replace('@publicationDate', milisecondsToDate(post.publicationDate));
            strPost = strPost.replace('@title', '<a href=\"#/' + post.url + '\">' + post.title + "</a>");
            strPost = strPost.replace('@category', post.category);
            strPost = strPost.replace('@author', post.author);
            strPost = strPost.replace('@tags', buildTags(post.tags));
            strAllPosts += strPost;
        });
        main.innerHTML += strAllPosts;
    });
}

function buildTags(arrTags) {
    if(arrTags == null)
      return "SEM TAGS";
    var strAllTags = "";
    arrTags.forEach(function (tag) {
        strAllTags += '<a href="#">'.concat(tag).concat('</a>');
    });
    return strAllTags;
}

function milisecondsToDate(miliseconds) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return formatDate(dd, mm, yyyy);
}

function formatDate(dd, mm, yyyy) {
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function getPostParameter() {
    var url = location.href;
    var pattern = '(#\/post\/[a-z0-9-]+$)';
    var index = url.search(pattern);
    //index = index.replace('\/post\/', '');
    if (index !== -1) {
        return url.substring(index + 7);
    }
}

function getPageParameter() {
    var url = location.href;
    var pattern = '#\/page\/[0-9]+$';
    var index = url.search(pattern);
    if (index !== -1){
        return url.substring(index + 7);
    }
    return 1;
}
