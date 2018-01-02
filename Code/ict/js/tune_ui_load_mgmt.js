function load_tune_ui(){
    clean_last_load();

    var validation_result = validate_duplicate_time();

    if(!validation_result.is_valid){
        $("#validation_errors").val(validation_result.duplicates);
        return;
    }

    load_tune_title();

    load_tune_text();
 
    load_tune_sound();

    if(edit_mode == "true"){
        load_tune_json_text();
    }
    else{
        load_marker();
    }
}

function clean_last_load(){
    $(".point").remove();
    $("#places li").remove();
}

function prepare_counter()
{
    $("#counter").show();

    tune_snd.ontimeupdate = function(){
        $("#counter").html(tune_snd.currentTime);
    }
}

function hide_counter(){
    $("#counter").hide();
}

function load_tune_title(){
    $("#title").html(tune_data.tune_name);
}

function load_tune_text(){
    if(tune_text_is_loaded && tune_text_src == tune_data.tune_text){
        tune_text_loaded();
    }

    $("#tune-text").load(function(){
        tune_text_loaded();
    });

    $("#tune-text").attr({"src": tune_data.tune_text});
}

function tune_text_loaded(){
    var tune_text_p = $("#tune-text").offset();
    tune_text_x_constant = tune_text_p.left;
    tune_text_y_constant = tune_text_p.top;

    if(edit_mode == "false" && !tune_text_is_loaded){
        tune_text_y_constant -= counter_height_constant;
    }
    
    log("function: tune_text_loaded, tune_text_y_constant: " + tune_text_y_constant);

    //loop over tune places to create places points and places list
    for (var i = 0; i < tune_data.places.length; i++) {
        var tune_place = tune_data.places[i]

        load_place_point(tune_place);

        if(edit_mode == "true"){
            load_place_listItem(tune_place, i);
        }
    }
    
    if(edit_mode == "true"){
        prepare_counter();
    }
    else{
        hide_counter();
    }

    tune_text_is_loaded = true;
    tune_text_src = $("#tune-text").attr("src");
}

function load_tune_sound(){
    tune_snd.oncanplaythrough = function(){
        audio_is_ready = true;
    };

    tune_snd.onplay = function(){
        var log_f = "function: onplay, ";

        var t = tune_snd.currentTime;

        log(log_f + "t: "+t);

        if(!audio_is_ready){
            alert(audio_not_ready_msg);
            tune_snd.pause();
            return;
        }
        play_from_nearest_time(t);
    };

    tune_snd.onpause = function(){
        log("player paused");
        stop_tune();
    };

    $("#tune_mp3").attr("src", tune_data.tune_mp3);
    tune_snd.load();
}

function load_tune_json_text(){
    $("#tune-json-text").val("var tune_data = " + JSON.stringify(tune_data) + ";");
}

function load_marker(){
    log("edit_mode: "+edit_mode);

    if(edit_mode == "true"){
        $("#marker").hide();
    }
    else{
        $("#marker").show();
    }
}

function load_place_listItem(tune_place, index){
    log(tune_place);

    var place = document.createElement("li");
    place.setAttribute("id","plc_"+tune_place.t.replace(".","_"));
    place.setAttribute("class", "list-group-item");
    var place_content = document.createTextNode(tune_place.x + "," + tune_place.y + "," + tune_place.d + "," + tune_place.m + "," + tune_place.t);
    
    place.appendChild(place_content);
    var i = index - 1;

    if(index == 0){
        var l = $("#places li").length;
        if(l == 0){
            $("#places").append($(place));
        }
        else if(l > 0){
            $("#places li:eq(0)").before($(place));
        }
        
    }
    else{
        $("#places li:eq("+i+")").after($(place));
    }
}