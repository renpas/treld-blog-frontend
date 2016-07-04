function ajax(url, options) {
	settings = {
		method : 'GET',
		withCredentials : true,
		async : true,
		contentType : 'application/json',
		body : ''
	}

	settings = extend(options, settings);

	var promise = new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();		
		resolveAsync(settings.async, request);
		request.withCredentials = settings.withCredentials;
		request.setRequestHeader('Content-Type', settings.contentType);
		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
				if (request.status >= 200 && request.status < 300) {
					console.log(request.status + '-' + url);
					resolve();					
				}else{
					reject('erro');
				}
			}
		}

		request.send(settings.body);
	});
	
	return promise;
}

function resolveAsync(isAsync, request){
	if (isAsync) {
		request.open(settings.method, url, true);
	} else {
		request.open(settings.method, url);
	}
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