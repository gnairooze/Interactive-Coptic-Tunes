var add_status_not_set = 0;
var add_status_succeeded = 1;
var add_status_failed_no_anchor = 2;
var add_status_failed_already_exists = 3;
var add_is_valid = 0;

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) {
		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}

	return null;
}

function get_place_by_time(time) {
	for (var i = 0; i < tune_data.places.length; i++) {
		if (tune_data.places[i].t == time) {
			return {tune_place: tune_data.places[i], index: i};
		}
	}

	return null;
}

function calculate_index(t){
	return functiontofindIndexByKeyValue(tune_data.places,"t",t);
}

function is_anchor_exists(){
	return (calculate_index("0") == 0);
}

function add_tune_place(x,y,d,m,t){
	var tune_place = {"x": x.toString(),"y": y.toString(),"d": d.toString(),"m": m.toString(),"t": t.toString()};

	tune_data.places.push(tune_place);

	return tune_place;
}

function sort_places(){
	tune_data.places.sort(compare_places);
}

function compare_places(a,b){
	//compare places in relation to its time
	return parseFloat(a.t) - parseFloat(b.t);
}

function get_prev(time){
	var time_f = parseFloat(time);

	for (var i = tune_data.places.length-1; i >= 0 ; i--) {
		var t_f = parseFloat(tune_data.places[i].t);

		if (t_f < time_f) {
			return i;
		}
	}

	return null;
}

function get_prev_place(time){
	var time_f = parseFloat(time);

	for (var i = tune_data.places.length-1; i >= 0 ; i--) {
		var t_f = parseFloat(tune_data.places[i].t);

		if (t_f < time_f) {
			return {tune_place: tune_data.places[i], index: i};
		}
	}

	return null;
}

function set_prev_duration(time){
	var prev_index = get_prev(time);
	var time_f = tune_round(parseFloat(time));
	var t_f = tune_round(parseFloat(tune_data.places[prev_index].t));

	tune_data.places[prev_index].d = parseInt((time_f - t_f)*1000).toString();
}

function calculate_duration_related_to_next(time){
	var log_f = "function: calculate_duration_related_to_next, ";

	log(log_f + "time: "+time);

	var time_f = parseFloat(time);

	log(log_f + "time_f: "+time_f);

	for (var i = 0; i < tune_data.places.length; i++) {
		var t_f = parseFloat(tune_data.places[i].t);

		if (t_f > time_f) {
			var cd = t_f - time_f;

			log(log_f+ "tune_place: " + JSON.stringify(tune_data.places[i]));
			log(log_f + "t_f: "+t_f);
			log(log_f + "cd: "+cd);
			
			return cd;
		}
	};

	return null;
}

function validate_add(x,y,d,m,t,is_anchor){
	var add_validation = add_is_valid;
	var i = calculate_index(t);

	var log_f = "validate_add, "
	log("function: "+log_f+"t: "+t);
	log("function: "+log_f+"i: " + i);
	log("function: "+log_f+"is_anchor: "+is_anchor);

	if(i != null && i >= 0)
	{
		add_validation = add_status_failed_already_exists;
	}
	else if(is_anchor && is_anchor_exists()){
		add_validation = add_status_failed_already_exists;
	}
	else if(!is_anchor && !is_anchor_exists()){
		add_validation = add_status_failed_no_anchor;
	}

	log("add_validation: "+add_validation);

	return add_validation;
}

function add_tune_place_full(x,y,d,m,t){
	var add_status = add_status_not_set;
	var is_anchor = (t == 0);
	var add_validation = validate_add(x,y,d,m,t,is_anchor);
	var tune_place;
	var added_index = 0;

	if(add_validation != add_is_valid)
	{
		add_status = add_validation;
	}
	else{
		var cd = parseInt(calculate_duration_related_to_next(t) * 1000);

		if(cd != null && cd >= 0){
			tune_place = add_tune_place(x,y,cd,m,t);	
		}
		else{
			tune_place = add_tune_place(x,y,0,m,t);
		}

		
		sort_places();

		if(!is_anchor)
		{
			set_prev_duration(t);
		}

		added_index = calculate_index(t);
		add_status = add_status_succeeded;
	}

	log("tune_place: "+ JSON.stringify(tune_place));

	return {status: add_status, data_place: tune_place, index: added_index};
}

function remove_tune_place(t){
	var di = calculate_index(t);
    tune_data.places.splice(di,1);
}

function validate_duplicate_time(){
	var current_place_time = 0;
	var previous_place_time = 0;

	sort_places();

	var dups = [];
	for (var i = tune_data.places.length-1; i >= 0 ; i--) {
		if(i != 0)
		{
			current_place_time = tune_data.places[i].t;
			previous_place_time = tune_data.places[i-1].t;

			if (current_place_time == previous_place_time) {
				dups.push(current_place_time);
			}
		}
	}

	return {is_valid: (dups.length == 0), duplicates: dups};
}

function tune_round(value){
	return toFixed(value,3);
}

function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

function get_nearest_place(time){
	var p = get_place_by_time(time);

	if(p == null){
		return get_prev_place(time);
	}

	return p;
}