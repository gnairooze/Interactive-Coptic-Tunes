var log_enabled = true;
var log_counter = 1;

function log(text){
	if(log_enabled){
		console.log(log_counter++ + "-" + text);
	}
}