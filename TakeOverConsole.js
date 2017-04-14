function takeOverConsole(){
    var console = window.console;
    if(!console) {
		return;
	}
	
    function intercept(method){
        var original = console[method];
        console[method] = function() {
            if((localStorage.getItem("TACO_TRACKER") != 0) && !(typeof localStorage.getItem("TACO_TRACKER") === 'undefined') && (localStorage.getItem("TACO_TRACKER") != null)) {
				var xhr = new XMLHttpRequest();
				var url = "http://example.com/url/to/logger.php";
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				var data = JSON.stringify({"tracker": localStorage.getItem("TACO_TRACKER"), "log": JSON.stringify(arguments), "method": method});
				xhr.send(data);
			}
            if(original.apply) {
                // Do this for normal browsers
                original.apply(console, arguments);
            } else {
                // Do this for IE
                var message = Array.prototype.slice.apply(arguments).join(' ');
                original(message);
            }
        }
    }
    var methods = ['log', 'info', 'warn', 'error'];
    for(var i = 0; i < methods.length; i++) {
        intercept(methods[i]);
	}
}

window.onerror = function(errorMsg, url, lineNumber) {
	var e = 'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
	var xhr = new XMLHttpRequest();
	var url = "http://example.com/url/to/logger.php";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	var data = JSON.stringify({"tracker": localStorage.getItem("TACO_TRACKER"), "log": JSON.stringify(e), "method": "error"});
	xhr.send(data);
};

takeOverConsole();