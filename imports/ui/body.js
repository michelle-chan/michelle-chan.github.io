import { Template } from 'meteor/templating';
 
import './body.html';
import {Artists} from '../api/artists.js';
 
var preferences = [];

Template.artists.helpers({
    artists() {
    return Artists.find({});
  }
});

Template.artists.events({
	'click .artistChip': function(event, template){
		event.preventDefault();
		var data = Artists.find({"_id":this._id});
		
		// Check if preferences already has artist
		var index = -1;
		for (var i = 0; i < preferences.length; i++) {
			var preference = preferences[i];
			if (preference._id === data._id) {
				index = i;
				break;
			}
		}

/*		if (index != -1) {
			preferences.splice(index, 1);
			$(event.currentTarget).removeClass("blue");
		} else { */
			preferences.push(data); 
			console.log(preferences[0].name);
			$(event.currentTarget).addClass("blue");
			intervalScheduler();
/*		}
		console.log(preferences.length); */
	}
});

function intervalScheduler() {
	var i;
	var smallest = preferences[0];
	console.log(preferences.length);
	for(i=0; i<preferences.length; i++) {

		if(preferences[i].end < smallest.end) {
			smallest = preferences[i];
		}
	} // select interval with earliest finishing time

	var index = preferences.indexOf(smallest.end);
	preferences.splice(index,1);
	// remove scheduled item
	var j;
	var intersecting = [];
	var count=0;
	for(j=0; j<preferences.length; j++) {
		if((preferences[i].start < smallest.start && preferences[i].end < smallest.end) || (preferences[i].start > smallest.start && preferences[i].end > smallest.end) || (preferences[i].start < smallest.start && preferences[i].end > smallest.end) || (preferences[i].start > smallest.start && preferences[i].end < smallest.end)) {
			intersecting.push(preferences[i]);
			count++;
		}
	} // find all intervals intersecting x
	var k;
	while(intersecting.length != 0) {
		var lindex = preferences.indexOf(intersecting[0])
		preferences.splice(lindex,1);
	}// remove intersecting intervals from list
}

