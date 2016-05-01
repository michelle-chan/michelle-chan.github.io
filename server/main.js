import { Meteor } from 'meteor/meteor';
import {Artists} from '../imports/api/artists.js';
import '../imports/api/artists.js';

Meteor.startup(() => {
});

Meteor.methods({
	getArtist: function (artist_id) {
		return Artists.find({"_id" : artist_id});
	}
});