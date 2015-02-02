// do anything you need before the first screen

var homeController = Alloy.createController('home');

if (OS_IOS) {
	Alloy.Globals.navWindow = homeController.getView();

	Alloy.Globals.navWindow.open();
} else {
	homeController.getView().open();
}
