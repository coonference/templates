
// use 'de' for 'de-??', 'en' for all others:
// moment.lang( navigator.language.replace(/-.*$/,'') === 'de' ? 'de' : 'en' );
moment.lang( window.navigator.language );
// moment.lang( 'en-US' );

/* Very simple localisation support.
*
* Relies on moment.lang() from http://momentjs.com
* 
* - looks up txt in language dictionary (logs a warning if not found)
* - replaces all {{foo}} markers with value from val_dict with key foo
*/
function i18nText(txt, val_dict) {
	if( typeof txtI18n === "undefined" ) {
		console.error("I need a global language dictionary variable 'txtI18n'");
		return txt;
	}
	// var lang = window.navigator.language.replace(/-.*$/,'')
	var lang = moment.lang().replace(/-.*$/,''); // use base language only.
	// look up terms in txtI18n translations for language:
	var txt_dict = txtI18n[lang];
	var txt_ret = null;
	// look up term in dict:
	if( txt_dict )
		txt_ret = txt_dict[txt];
	// use if found
	if( txt_ret )
		txt = txt_ret;
	else
		console.warn("Language '" + lang + "' lacks term '" + txt + "'");
	// replace all placeholders with the corresponding val_dict entry
	var ret = '';
	var regex = /([^{]*){{([^}]+)}}/;
	for(;;) {
		var m = txt.match(regex);
		if( ! m )
			break;
		ret += m[1];                // add match prefix
		var val = val_dict[m[2]];   // look up value from dictionary
		if( val )
			ret += val;
		else
			ret += '{{' + m[2] + '}}'; // keep placeholder if not found in dict
		txt = txt.substring(m[1].length + 2 + m[2].length + 2);
	}
	return ret + txt;
}


/** date formatting helper. Similar to moment#calendar but with a base date.
*/
function myCalendar(mom, base) {
	// return mom.format("dddd, M. MMM");
	// return mom.calendar( );
	if( mom.year() !== base.year() )
		return mom.format("LLLL");
	// same year

	if( mom.month() !== base.month() ) 
		return mom.format("dddd, D. MMMM");
	// same month

	if( mom.week() !== base.week() ) 
		return mom.format("dddd, D. MMM");
	// same week

	if( mom.dayOfYear() !== base.dayOfYear() ) 
		return mom.format("dddd, D. MMM, LT");
	// same day

	return mom.format("LT");
}
