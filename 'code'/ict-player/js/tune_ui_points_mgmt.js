function load_place_point(tune_place){
    var pnt_id = "pnt_"+tune_place.t.replace(".","_");

    var pnt = document.createElement("IMG");
    var left = (parseInt(tune_place.x) + tune_text_x_constant)+"px"; 
    var top = (parseInt(tune_place.y) + tune_text_y_constant)+"px"; 

    log("load_place_point: " + top);

    pnt.setAttribute("id", pnt_id);
    pnt.setAttribute("src",point_img);
    pnt.setAttribute("class", "point");
    pnt.setAttribute("data-time", tune_place.t);
    pnt.setAttribute("style","left: " + left + "; top: " + top + ";");

    document.body.appendChild(pnt);

    $("#"+pnt_id).click(function(){
        log("point " + pnt_id + " clicked");
        
        var time = tune_place.t;

        if(!audio_is_ready){
            alert(audio_not_ready_msg);
            return;
        }
        
        tune_snd.play();
        play_from_nearest_time(time);
    });
}