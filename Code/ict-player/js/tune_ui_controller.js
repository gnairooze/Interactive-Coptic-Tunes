$(document).ready(function(){
    set_ui_mode();

    load_app_data();
    
    handle_shortcuts();
    
    $("#marker").hide();

    $("#load").click(function(){
        load_tune_ui();
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

function set_ui_mode(){
        $("#marker").show();
}