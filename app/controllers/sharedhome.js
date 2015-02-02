var args = arguments[0] || {};

//controllers/cars.js
function transform(model) {
	//convert the model to a JSON object
	var carObject = model.toJSON();
	var output = {
		"title" : carObject.model + " by " + carObject.make,
		"id" : model.cid
	};

	console.log(output);
	return output;
}

//show only cars made by Honda
function filter(collection) {
	return collection.where({
		make : "Honda"
	});
}

//this is an event listener to ensure that the TalbleView bindings are cleaned up
//correctly and no memory leaks are left

//Free the model-view data binding resources when the view-controller closes
$.getView().addEventListener("close", function() {
	$.destroy();
});

$.table.addEventListener('click', function(_event) {

	//get the correct approach
	//
	// The properties synch adapter that is provided by appcelerator does not set the model.id so get
	// will never work. See the appcelerator documentation on Backbone Sync Adapters
	var model = Alloy.Collections.cars.getByCid(_event.rowData.modelId);
	//var model = Alloy.Collections.cars.get(_event.rowData.modelId);

	//create the controller and pass the model to it
	var detailWindowController = Alloy.createController("detailWindow", {
		data : model
	});

	//get view returns to root view when no view ID is provided
	Alloy.Globals.openWindow(detailWindowController.getView());

});
