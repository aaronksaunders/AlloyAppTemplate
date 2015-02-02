var args = arguments[0] || {};

function closeWindow(evt) {
	$.detailWindow.close();
}

function doOpen(evt) {
	if (OS_ANDROID) {
		var abx = require('com.alcoapps.actionbarextras');
		abx.setBackgroundColor('#dddddd');
	}
}

//instance variable use in data binding to the model
//we do this here to trigger the events
//that will cause the data to be rendered
$.car.set(args.data);

//free the model-view data binding resources when this
//view-controller closes
$.detailWindow.addEventListener("close", function() {
	$.destroy();
});
