window.onload = function() {
	login().then(getPosts, function(){
		console.log("we have a problem");
	});
};

function getPosts() {
	ajax('http://localhost:8080/api/post/page/1', {
		withCredentials : true
	});	
}

function login() {
	return ajax('http://localhost:8080/login', {
		method : 'POST',
		async : false,
		contentType : 'application/x-www-form-urlencoded',
		body : 'username='.concat(config.username).concat('&password=').concat(
				config.password)
	});
}