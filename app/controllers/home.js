//controllers/home.js

/*
 Even though your Views are platform-specific, you can still keep your controllers cross-platform.
 This controller will be used for your home View regardless of the platform, so you'll have to
 manually check in case you need to perform platform-specific operations
 */

var args = arguments[0] || {};

//defining the collection in the controller rather than the view
Alloy.Collections.instance("cars");

//add the data to the collection after the  view-controller pair is created
Alloy.Collections.cars.reset([{
	"make" : "Honda",
	"model" : "Civic"
}, {
	"make" : "Honda",
	"model" : "Accord"
}, {
	"make" : "Ford",
	"model" : "Escape"
}, {
	"make" : "Ford",
	"model" : "Mustang"
}, {
	"make" : "Nissan",
	"model" : "Altima"
}]);


function doOpen(evt) {
	if (OS_ANDROID) {
		var abx = require('com.alcoapps.actionbarextras');
		abx.setBackgroundColor('#dddddd');
	}
}

function doAdd(evt) {
	console.debug(JSON.stringify(evt));

	var controller = Alloy.createController('createItem');
	var view = controller.getView();

	Alloy.Globals.openWindow(view, true);
}

