var current_place_index = 0;
var tune_snd = document.getElementById("tune_snd"); 
var marker_x_constant = 10; //to locate the center width of the marker
var point_img = "img/point24.png";
var point_x_constant = 12; //to calculate the center width if the place recorded in left
var point_y_constant = 12; //to calculate the center hight if the place recorded in top
var tune_text_x_constant = 0; //to adjust the left of the tune text
var tune_text_y_constant = 0; //to adjust the top of the tune text

var tune_text_is_loaded = false;
var tune_text_src = "";

var counter_height_constant = 69;

var edit_mode = "false";
var places_mode = "play";

var audio_is_ready = false;
var audio_not_ready_msg = "audio not loaded completely. please try again later";

var player_status_stopped = 0;
var player_status_playing = 1;

var player_status = player_status_stopped;

var app_data = "version 0.1";