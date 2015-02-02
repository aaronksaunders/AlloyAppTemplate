// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// if using navWindow, set this global variable
Alloy.Globals.navWindow = null;

/**
 * for IOS we need to check if there is a Alloy.Globals.navWindow that should
 * be used for opening windows.
 * 
 * if this is a modal and on IOS, we need to wrap the modal in a navWindow to
 * provide the title for the window.
 * 
 * if none of the above OR android, then just open the window
 * 
 * @param {Object} _window
 * @param {Object} _modal
 */
Alloy.Globals.openWindow = function(_window, _modal) {

	console.debug(Ti.Android, _modal);

	if (Ti.Android) {
		_window.open({
			modal : _modal
		});

	} else {
		if (!_modal && Alloy.Globals.navWindow) {
			Alloy.Globals.navWindow.openWindow(_window);
		} else if (_modal) {

			Alloy.Globals.modalNavWindow = Titanium.UI.iOS.createNavigationWindow({
				window : _window
			});

			// wrap the window with a navWindow specifically for this
			// modal which we will need to remove later
			Alloy.Globals.modalNavWindow.open({
				modal : _modal
			});

		} else {
			_window.open({
				modal : _modal
			});
		}
	}

};

/**
 * closed the window. checks if it is a modal, and closed the 
 * Alloy.Globals.modalNavWindow created for the modal  on IOS, if app already 
 * had Alloy.Globals.navWindow then close window using it
 * 
 * @param {Object} _window
 */
Alloy.Globals.closeWindow = function(_window) {
	if (Alloy.Globals.modalNavWindow) {
		Alloy.Globals.modalNavWindow.close();
		_window = null;
		Alloy.Globals.modalNavWindow = null;
	} else if (Alloy.Globals.navWindow) {
		Alloy.Globals.navWindow.closeWindow(_window);
		_window = null;
	} else {
		_window.close();
		_window = null;
	}
};
