$(document).ready(function(){
    set_ui_mode();

    load_app_data();
    
    handle_shortcuts();
    
    $("#marker").hide();

    $("input:radio[name=edit_mode]").change(function(){
        edit_mode = $(this).val();
        set_ui_mode();
    });

    $("input:radio[name=places_mode]").change(function(){
        places_mode = $(this).val();
    });

    $("#tune-text").click(function(e){
        var parentOffset = $(this).offset(); 

        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        handle_text_click(relX, relY);
    });

    $("#load").click(function(){
        load_tune_ui();
        return false;
    });

    $("#read-tune-json").click(function(){
        load_tune_json_text();
        return false;
    });

    tune_snd.onended = function(){
        tune_snd.pause();
        stop_tune();
    };
});

function load_app_data(){
    $("#app").html(app_data);
}

function place_point_removed(time){
    remove_tune_place(time);

    log("#plc_"+time+" to be removed");

    $("#plc_"+time.toString().replace(".","_")).remove();
}

function set_ui_mode(){
    if(edit_mode == "true"){
       $("#place_mode_group").show();
       $("#tune-json-text").show();
       $("#marker").hide();
    }
    else{
        $("#place_mode_group").hide();
        $("#tune-json-text").hide();
        $("#marker").show();
    }
}