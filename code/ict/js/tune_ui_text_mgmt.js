function handle_text_click(x,y){
	if(edit_mode == "false")
	{
		return;
	}

	x -= point_x_constant; //calculate the left value from center value
	y -= point_y_constant; //calculate the top value from center value

	if(places_mode == "play"){
		if(!is_anchor_exists())
		{
			alert("set anchor first.");
			return;
		}

		var result = add_tune_place_full(x,y,0,0,tune_snd.currentTime);

		load_place_listItem(result.data_place, result.index);
		
		load_place_point(result.data_place);
	}
	else if (places_mode == "anchor"){
		var result = add_tune_place_full(x,y,0,0,0);

		log("add anchor result: " + result);
		log("add anchor string result: " + JSON.stringify(result));

		load_place_listItem(result.data_place, result.index);

		x += "px";
		y += "px";
		
		load_place_point(result.data_place);
	}
}