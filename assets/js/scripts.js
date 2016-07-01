window.onload=function(){
	sendRequest("http://localhost:8080/api/post/page/1");
};

function sendRequest(url, method = "GET", body){
	var request = new XMLHttpRequest();
	request.open(method, url);
	request.onreadystatechange = function() {
		if (request.readyState == XMLHttpRequest.DONE) {
			alert(request.status);
		}
	}
	request.setRequestHeader("Authorization", "Basic dHJlbGQ6dHJlbGQ=");
	request.send();
}