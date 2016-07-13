window.onload = function () {
    showPosts();
};

function showPosts() {

    var main = document.getElementsByTagName("main")[0];

    var template = ajax(paths.postTemplate).then(function (template) {
        login().then(function () {
            ajax('http://localhost:8080/api/post/page/1', {
                withCredentials: true
            }).then(function (posts) {
                posts.forEach(function(post){
                    var strPost = template;
                    strPost = strPost.replace('@body', '<p>'.concat(post.body).concat('</p>'));
                    strPost = strPost.replace('@publicationDate', milisecondsToDate(post.publicationDate));
                    strPost = strPost.replace('@title', post.title);
                    main.innerHTML += strPost;
                });
            });
        });
    });
}

function login() {
    return ajax('http://localhost:8080/login', {
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        body: 'username='.concat(config.username).concat('&password=').concat(
            config.password)
    });
}

function milisecondsToDate(miliseconds){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    return formatDate(dd,mm,yyyy);
}

function formatDate(dd,mm,yyyy){
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    return dd+'/'+mm+'/'+yyyy;
}
