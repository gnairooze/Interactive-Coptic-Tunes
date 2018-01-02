var begin_left = '20px';
var end_left = '250px';
var anim_duration = 5000;

$(document).ready(function(){
    $("#start").click(function(){
    	$("#marker").animate({left: end_left},anim_duration);
    });

	$("#pause").click(function(){
    	$("#marker").stop();
    });

    $("#stop").click(function(){
    	$("#marker").stop();
    	$("#marker").css({left: begin_left});
    });
});