function handle_shortcuts(){
	document.onkeydown = function(e){
		switch(e.keyCode){
			case 80://p
				toggle_pause_play();
			break;
		}
	};
}

function toggle_pause_play(){
	switch(player_status){
		case player_status_stopped:
			tune_snd.play();
			break;
		case player_status_playing:
			tune_snd.pause();
			break;
	}
}