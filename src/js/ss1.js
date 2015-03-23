/**
 * Copyright (C) Trip Denton
 * User: tdenton
 * Date: 11/14/14
 * Time: 12:45 PM
 */


var harvey = [
	'img/harvey/h001.jpg',
	'img/harvey/h002.jpg',
	'img/harvey/h003.jpg',
	'img/harvey/h004.jpg',
	'img/harvey/h005.jpg'
];

var tdenton=[
	'img/tdenton/DSC_0007.JPG',
	'img/tdenton/DSC_0011.JPG',
	'img/tdenton/DSC_0013.JPG',
	'img/tdenton/DSC_0021.JPG',
	'img/tdenton/DSC_0023.JPG',
	'img/tdenton/DSC_0025.JPG',
	'img/tdenton/DSC_0027.JPG',
	'img/tdenton/DSC_0029.JPG',
	'img/tdenton/DSC_0031.JPG'
];

var art = {
	harvey: {name: 'Harvey Weinreich', work: harvey},
	tdenton: {name: 'Trip Denton', work: tdenton}
};

function show_art(artist) {
	// empty art div
	$('#art_div').empty();
	if (art[artist]) {
		var rec = art[artist];

		for (var i in rec.work) {
			// pick the object
			var sel = '#bank .art1';
			var template = $(sel).clone();
			template.html($(sel).html());
			template.find('img').attr('src', rec.work[i]);
			template.find('.artist').text(rec.name);
			$('#art_div').append(template);

		}
	} else {
		var sel = '#bank .noart1';
		var template = $(sel).clone();
		$('#art_div').append(template);

	}


}

function hide_art() {
	$('#art_div').empty();

}

//-------------------------------------------
// Document Ready function
//
$(document).ready(function () {
	//show_art('harvey');


});