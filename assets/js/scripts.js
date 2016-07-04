window.onload = function() {	
	login();	
};

function getPosts() {
	sendRequest('http://localhost:8080/api/post/page/1', {
		withCredentials : true
	});
}

function login() {
	sendRequest('http://localhost:8080/login', {
		method : 'POST',
		async : false,
		contentType : 'application/x-www-form-urlencoded',
		body : 'username='.concat(config.username).concat('&password=').concat(
				config.password)
	});
}

function sendRequest(url, options) {
	settings = {
		method : 'GET',
		withCredentials : true,
		async : true,
		contentType : 'application/json',
		body : ''
	}
	
	var promise = new Promisse();

	settings = extend(options, settings);

	var request = new XMLHttpRequest();
	if (settings.async) {
		request.open(settings.method, url, true);
	} else {
		request.open(settings.method, url);
	}
	request.withCredentials = settings.withCredentials;
	request.setRequestHeader('Content-Type', settings.contentType);
	request.onreadystatechange = function() {
		if (request.readyState == XMLHttpRequest.DONE) {
			alert(request.status + ' ' + url);
			if(url !== 'http://localhost:8080/api/post/page/1'){
				getPosts();
			}
		}
	}

	request.send(settings.body);

}

function extend(obj1, obj2) {
	if (obj1 == undefined) {
		return obj2;
	}

	for ( var attrName in obj1) {
		obj2[attrName] = obj1[attrName];
	}
	return obj2;
}