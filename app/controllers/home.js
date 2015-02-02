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

// we need to let the sharedhome controller know about the parent
// Navigation window so it can properly open windows on IOS
OS_IOS && $.sharedhome.setNavWindow($.nav);

function doopen(evt) {
	if (OS_ANDROID) {
		var abx = require('com.alcoapps.actionbarextras');
		abx.setBackgroundColor('#dddddd');
	}
}

function doadd(evt) {
	if (OS_IOS) {
		openAsModal(Alloy.createController('createItem').getView(), $.nav);
	} else if (OS_ANDROID) {
		Alloy.createController('createItem').getView().open();
	}
}

/**
 * helper function for opening a modal window in IOS with the
 * proper title bar
 *
 * @param {Object} _view
 */
function openAsModal(_view, _navView) {
	if (OS_IOS) {

		var navWindow = _navView;

		if (!_navView) {
			navWindow = Titanium.UI.iOS.createNavigationWindow({
				window : _view
			});
		}

		_view.navWindow = navWindow;
		navWindow.open({
			modal : true
		});
	} else {
		_view.open({
			modal : true
		});
	}
}
