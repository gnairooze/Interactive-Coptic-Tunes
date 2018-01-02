function move(x1, y1, x2, y2, duration, mode, pnt_1, plc_1){

    $("#marker").css({left: x1, top: y1});
    $("#"+pnt_1).addClass("highlight");
    $("#"+plc_1).addClass("list-group-item-warning");

    if(mode == "0"){
        $("#marker").animate({left: x2, top: y2}, duration, "linear", continue_move);
        current_place_index++;
    }
    else if(mode == "1"){
        $("#marker").css({left: x2, top: y2});
        current_place_index++;
        continue_move();
    }
}

function continue_move(){
    log("edit_mode: "+ edit_mode);

    log("current_place_index: " + current_place_index);
    log("tune_data.places.length: " + tune_data.places.length);

    var pnt_1 = "";
    var pnt_2 = "";
    var plc_1 = "";
    var plc_2 = "";

    if(tune_data.places.length == 0){
        return;
    }

    if(current_place_index > tune_data.places.length-2){
        $(".point").removeClass("highlight");
        $("#places li").removeClass("list-group-item-warning");
        pnt_2 = "pnt_" + tune_data.places[current_place_index].t.replace(".","_");
        plc_2 = "plc_" + tune_data.places[current_place_index].t.replace(".","_");
        $("#"+pnt_2).addClass("highlight");
        $("#"+plc_2).addClass("list-group-item-warning");

        return;
    }

    $(".point").removeClass("highlight");
    $("#places li").removeClass("list-group-item-warning");

    if(tune_snd.paused)
    {
        return;
    }

    var x1 = (parseInt(tune_data.places[current_place_index].x) + tune_text_x_constant) + "px";
    var y1 = (parseInt(tune_data.places[current_place_index].y) + tune_text_y_constant + point_y_constant) + "px";
    

    var x2 = (parseInt(tune_data.places[current_place_index+1].x) + tune_text_x_constant) + "px" ;
    var y2 = (parseInt(tune_data.places[current_place_index+1].y) + tune_text_y_constant + point_y_constant) + "px";
    
    var d = parseInt(tune_data.places[current_place_index].d);
    var m = tune_data.places[current_place_index].m;

    pnt_1 = "pnt_" + tune_data.places[current_place_index].t.replace(".","_");
    plc_1 = "plc_" + tune_data.places[current_place_index].t.replace(".","_");

    log("index: " + current_place_index +", duration: " + d);

    move(x1,y1, x2,y2, d, m, pnt_1, plc_1);
}

function start_tune(c){
    $("#marker").stop();
    
    player_status = player_status_playing;

    tune_snd.currentTime = c;

    continue_move();
}

function stop_tune(){
    player_status = player_status_stopped;

    $("#marker").stop();
}

function play_from_nearest_time(time){
    $("#marker").stop();

    var p = get_nearest_place(time);
    
    var log_f = "function: play_from_nearest_time, ";

    log(log_f + "p: "+p);

    if(p == null)
    {
        current_place_index = 0;
        
        start_tune(0);
    }
    else
    {
        current_place_index = p.index;
        
        start_tune(p.tune_place.t);
    }
}