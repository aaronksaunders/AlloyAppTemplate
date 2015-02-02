// do anything you need before the first screen

var homeController = Alloy.createController('home');

Alloy.Globals.navWindow = homeController.getView();

Alloy.Globals.navWindow.open();
