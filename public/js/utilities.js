'use srtict'
function httpReq(method, url) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: method,
			url: url,
			success: function(data) {
				resolve(data);
			},
			error: function(jqXHR) {
				var statusCode = jqXHR.status;
				//var statusText = jqXHR.statusText;
				reject(jqXHR);
			}
		});
	});
}

function loadImages() {
	var limit, i, imgs, $img;
	imgs = Array.from($('img:visible'));
	limit = imgs.length;

	for (i = 0; i < limit; i++) {
		$img = $(imgs[i]);
		$img.attr("src", $img.attr("data-src"));
	}
}

function getClassName(name) {
				var className = name.substr(name.indexOf("/") + 1); 
				return className;
}
function getDbName(name) {
				var dbName = name.substr(name.indexOf("/") + 1);
				dbName = dbName.charAt(0).toUpperCase() + dbName.slice(1);
				if (dbName.indexOf('-') !== -1) {
					dbName = dbName.replace('-', ' ');
				}   
    return dbName;
}