// JavaScript Document
// Make sure all game divs are hidden 
$('.window-modal').hide();
$('.window-trivia').hide();
$('.game_prizes').hide();
$('.game_rules').hide();
$('.exit_video_btn_modal').hide();
$('.feedback_bonus').hide();
$('.view_share_bonus_modal').hide();
$('.window-full-bg-transparent').hide();
$('.window-full-bg-transparent-wrapper').hide();
$('.game_check').hide();
$('.window-full-bg-transparent').hide();	
$('.coin_check_confirm').hide();	
$('.exit_video_btn').hide();
$('.youtube_timer').hide();
var vid_type = 	$('.vid_type').val();

if ($('.is_prize_game').val() == 0){
	$('.view_prizes').hide();
}

if ($('.game_check_val').val() == 1) {
	$('.game_check').fadeIn();
	$('.window-modal').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	$('.close-icon').hide();
	$('.coin_check_confirm').hide();
}

if ($('.hide_game_entry').val() == 1 && parseInt($('.user_info_total_coins').val()) < parseInt($('.coin_value').val())){
	$('.close-icon').hide();
	$('.coin_check_short').fadeIn();	
	$('.window-full-bg-transparent').fadeIn();
	$('.window-modal').fadeIn();
}

if (($('.game_style_id').val() != 1) && ($('.hide_game_entry').val() != 1) && ($('.ad_image_id').val() == 0)){
	$('.close-icon').hide();
	$('.coin_check_confirm').fadeIn();	
	$('.window-full-bg-transparent').fadeIn();
	$('.window-modal').fadeIn();
}

// Modal Windows //
$(".view_prizes").click(function(event){
	$('.window-modal').fadeIn();
	$('.close-icon').fadeIn();
	$('.game_prizes').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	$('.game_rules').hide();
	$('.exit_video_btn_modal').hide();
	return false;
});

$(".view_rules").click(function(event){
	$('.window-modal').fadeIn();
	$('.close-icon').fadeIn();
	$('.game_rules').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	$('.exit_video_btn_modal').hide();
	$('.game_prizes').hide();
	return false;
});

$(".exit_video_btn").click(function(event){
	$('.window-modal').fadeIn();
	$('.close-icon').hide();
	$('.exit_video_btn_modal').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	$('.game_rules').hide();
	$('.game_rules').hide();
	if (vid_type == 'html5')
	{
		pauseHTML5Video();
	} else {
		stopVideo();
	}
	
	return false;
});


$(".view_feedback_bonus").click(function(event){
	$('.window-modal').fadeIn();
	$('.close-icon').fadeIn();
	$('.feedback_bonus').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	
	$('.view_share_bonus_modal').hide();
	$('.game_rules').hide();
	$('.game_prizes').hide();
	$('.exit_video_btn_modal').hide();
	return false;
});

$(".view_share_bonus").click(function(event){
	$('.window-modal').fadeIn();
	$('.close-icon').fadeIn();
	$('.view_share_bonus_modal').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	
	$('.feedback_bonus').hide();
	$('.game_rules').hide();
	$('.game_prizes').hide();
	$('.exit_video_btn_modal').hide();
	return false;
});

$("#accept").click(function(event){
	$('.coin_check_confirm').hide();
	$('.window-modal').hide();
	$('.window-full-bg-transparent').hide();
	$('.close-icon').fadeIn();
	return false;
});

$(".close_window").click(function(event){
	$('.window-modal').fadeOut();
	$('.close-icon').fadeOut();
	$('.window-full-bg-transparent').fadeOut();
	return false;
});

$(".close_exit_window").click(function(event){
	$('.window-modal').fadeOut();
	$('.window-full-bg-transparent').fadeOut();	
	if (vid_type == 'html5')
	{
		playHTML5Video();
	} else {
		playVideo();
	}
	return false;
});


$(".submit_fb_bonus").click(function(event){
	var title = $('.title').val();
	var site_name = $('.site_name').val();
	var description = $('.description').val();
	var image = $('.image').val();
	var share_url_link = $('.share_url_link').val();
	var fb_textarea = $('.fb_textarea').val();
	//alert(title, site_name, description, image, share_url_link, fb_textarea);
	submit_facebook_bonus(title, site_name, description, image, share_url_link, fb_textarea);
	return false;
});


var start_time = false;
var vid_view_time = 0;
var gameplay_time = null;
var timer_start_time = 45;



// Start Game //
gameStart = function() {

	game_started = true;

	// Slide First Question Into View //
	$('.window-trivia').show();
	$('.qa-1').animate({
		"left" : "-=720px"
	}, {
		duration : 500,
		easing : 'easeOutQuart',
		complete : function() {

			start_time = new Date();
			game_timer();
		}
	});
};


// User Selects an Answer //
var hasClicked = false;
var totalQuestions = 3;
var questionCount = 0;
var coins_earned = 0;

$('.answerbutton').click(function() {

	// Make sure user doesn't double click and fly by the awesome! //
	if (!hasClicked) {

		hasClicked = true;
		userChoice = $(this);
		questionCount++;

		// Slide Next Question Into View //
		$($(this).parents('.qa-container')).animate({
			"left" : "-=720px"
		}, {
			duration : 500,
			complete : function() {
				
				hasClicked = false;

			} // End On Slide Complete <--##
		});
		
		// Check if there are any more questions //
		if (questionCount != totalQuestions) {
			$($(this).parents('.qa-container').next()).animate({
				"left" : "-=720px"
			}, {
				duration : 500,
				//easing : 'easeOutQuart',
				complete : function() {
	
				} // End On Slide Complete <--##
			});
		} else {	
			completeGame(); // End If All Questions have been Displayed //
		}
	}
}); // END User Selecting Answer //


// Complete Game: Show / Return the Result of the Users Answer //
//award coins
//award points

completeGame = function () {

	// Stop Timer //
	if (timerID != timer_start_time) {
		clearInterval(timerID);
	}
	
	gameplay_time = timer_start_time - $("#game_timer").html();
	
	if ($("#game_timer").html() < 0) {
		gameplay_time = timer_start_time; //this cancels out a negative number when quitcheck() alert pops up.
	}
	
	// Slide Results Window Into View //
	$('.window-results').animate({
		"left" : "-=720px"
	}, {
		duration : 500,
		//easing : 'easeOutQuart',
		complete : function() {
			
			var answer_points = parseInt(points[0]) + parseInt(points[1]) + parseInt(points[2]);
			var correct_answers = parseInt(correct_clicked[0]) + parseInt(correct_clicked[1]) + parseInt(correct_clicked[2]);
			
			//Calculate time_bonus
			if (correct_answers == 3) {
				time_bonus = Math.round(($("#game_timer").html()) * .75);
			}
			else if (correct_answers == 2) {
				time_bonus = Math.round(($("#game_timer").html()) * .4);
			}
			else if (correct_answers == 1) {
				time_bonus = Math.round(($("#game_timer").html()) * .15);
			}
			else {
				time_bonus = 0;
			}
			if (time_bonus < 0) {
				time_bonus = 0;
			}
			
			//Calculate Final Score (total_points)
			var total_points = answer_points + time_bonus;
			//Set up end of game message arrays
			var msgPerfect = Array("Perfect Game!", "PERFECTO!", "You're on fiah!");
			var gameMsgPerfect = msgPerfect[Math.floor(Math.random() * msgPerfect.length)];
		
			var msgAwesome = Array("Awesome Game!", "FANTASTICO!", "Super Duper!", "Holy Moly, Guacamole!", "You are Feeling It!");
			var gameMsgAwesome = msgAwesome[Math.floor(Math.random() * msgAwesome.length)];
		
			var msgGreat = Array("Wow Great Game!", "Niiiiiice!", "Tooo Sweeeeet!", "Oooo, Nice one!", "Very good game.");
			var gameMsgGreat = msgGreat[Math.floor(Math.random() * msgGreat.length)];
		
			var msgGood = Array("Good Game!", "Nice Game!");
			var gameMsgGood = msgGood[Math.floor(Math.random() * msgGood.length)];
		
			var msgSoSo = Array("Not too shabby!", "So so, mi amigo!", "So so, my friend", "Cmon baby!!", "You can dooo it!");
			var gameMsgSoSo = msgSoSo[Math.floor(Math.random() * msgSoSo.length)];
		
			var msgBad = Array("Ouch, keep trying!", "Ohhhh Maaan!", "Try better next time", "WHAT!", "Noooooooo!", "Hope you had fun.", "EEEEEK!", "#&^@!, #&^@!, #&^@!", "Schnitzle Fritzen Frifer!", "Really? Darn!", "You can dooo it!");
			var gameMsgBad = msgBad[Math.floor(Math.random() * msgBad.length)];
		
			//Post Game messages
			if (total_points.toPrecision(4) >= 50) {
				post_game_message = gameMsgPerfect;
		
			} else if (total_points.toPrecision(4) >= 40) {
				post_game_message = gameMsgGreat;
		
			} else if (total_points.toPrecision(4) >= 30 && total_points.toPrecision(4) < 40) {
				post_game_message = gameMsgGreat;
		
			} else if (total_points.toPrecision(4) >= 20 && total_points.toPrecision(4) < 30) {
				post_game_message = gameMsgGood;
		
			} else if (total_points.toPrecision(4) >= 10 && total_points.toPrecision(4) < 20) {
				post_game_message = gameMsgSoSo;
		
			} else if (total_points.toPrecision(4) < 10) {
				post_game_message = gameMsgBad;
			} else {
				post_game_message = gameMsgBad;
			}
			

			// Display the data
			$(".postgame-message").html(post_game_message);
			$(".answer_points").html(answer_points+" POINTS");
			$(".correct_answers").html(correct_answers+" CORRECT: ");
			$(".time_bonus").html(time_bonus+" POINTS");	
			$(".total_points").html(total_points);

			
			// if game style is 1 then award reward coins
			if ($('.game_style_id').val() == 1 && $('.is_sponsored').val() == 1)
			{
				coins_earned = award_coins(total_points);
				add_user_coins(coins_earned);
			}
			
			//  insert user_played tables
			insert_users_played_games($('.game_id_value').val(), total_points, gameplay_time, vid_view_time, coins_earned);
			
			window.onbeforeunload = null;
			window.onunload = null;

		} // End On Slide Complete <--##
	});
}; // END Complete Game //


// HTML5 VIDEO -----------------------------------------

// Start Game Button Click Event //

var videoplayer = document.getElementById('videoplayer');
$('#startVideo').click(function(event) {
    	videoplayer.play();
    	$(this).remove();
    	$('#vid-controls').hide();
    	$('.window-full-bg-transparent-wrapper').show();
    	$('.exit_video_btn').show();
		$('.game-topbar').fadeOut(300);
		$('.info-icon').fadeOut(300);
		
		// toDo: Adjust to only count views after 5 sec of video time
		setInterval(client_and_video_view_count_plus(), 5000);
		
		quitcheck();
		
		//Check that the game style is not 1 so coins can be deducted.
		if ($('.game_style_id').val() != 1)
		{
			if ($('.game_style_id').val() == 2)
			{
				add_player_count($('.game_id_value').val());
			}
			
			var hide_message = 0;
			if (document.getElementById('hide_message').checked)
			{
				var hide_message = 1;
			}
			coin_deduction($('.coin_value').val(), hide_message);
		}
		add_game_player_count($('.game_id_value').val());
		done = true;
		
    }
);

// Video Has Ended //
$('#videoplayer').bind("ended", function(){ 
	$('.window-full-bg-transparent-wrapper').hide();
	$('.exit_video_btn').hide();
	$('#videoplayer').hide();
	vid_view_time = videoplayer.currentTime;
	
	//videoplayer.stopVideo();
	gameStart();
	quitcheck();
});


function pauseHTML5Video() {
	videoplayer.pause();
}
function playHTML5Video() {
	videoplayer.play();
}


// YOUTUBE VIDEO -----------------------------------------

//https://developers.google.com/youtube/iframe_api_reference?csw=1#Getting_Started
//https://developers.google.com/youtube/iframe_api_reference?csw=1#Examples
//http://gdata.youtube.com/feeds/api/videos/ugo7Y2lRsxc?v=2&alt=jsonc&callback=youtubeFeedCallback&prettyprint=true

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() 
{
	player = new YT.Player('player', {
		height: '100%',
		width: '100%',
		allowfullscreen: 'false',
		//videoId:'2-FL7w88uqo',
		videoId: $('.video_source_id').val(),
		playerVars: {
			'modestbranding': 1,
			'rel': 0,
			'autohide': 1,
			'showinfo': 0,
			'controls': 0,
			'cc_load_policy': 1,
			'disablekb': 0,
			'fs': 0,
			'version': 3,
			'playsinline':1
		},
		events: {
			'onReady': onReady,
			'onStateChange': onPlayerStateChange,
			'onError': onError,
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

function stopVideo() {
	player.stopVideo();
  }
  
function pauseVideo() {
	player.pauseVideo();
  }
  
function playVideo() {
	player.playVideo();
  }
  
function getCurrentTime() {
	return player.getCurrentTime();
  }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

//Timer
var youtube_start_time = false;
var youtube_timer_start_time = parseInt($('.video_time_value').val());

function onPlayerStateChange(event) {

	if (event.data == YT.PlayerState.PLAYING && !done){
		$('.exit_video_btn').show();
		$('.window-full-bg-transparent-wrapper').show();
		$('.game-topbar').fadeOut(300);
		$('.info-icon').fadeOut(300);
		
		// Youtube Timer starts now
		$('.youtube_timer').show();
		youtube_start_time = new Date();
		youtube_game_timer();

		// toDo: Adjust to only count views after 5 sec of video time
		setInterval(client_and_video_view_count_plus(), 5000);
		
		quitcheck();
		
		//Check that the game style is not 1 so coins can be deducted.
		if ($('.game_style_id').val() != 1)
		{
			if ($('.game_style_id').val() == 2)
			{
				add_player_count($('.game_id_value').val());
			}
			
			var hide_message = 0;
			if (document.getElementById('hide_message').checked)
			{
				var hide_message = 1;
			}
			coin_deduction($('.coin_value').val(), hide_message);
		}
		add_game_player_count($('.game_id_value').val());
		done = true;
  	}
  	
	if (event.data == YT.PlayerState.ENDED) {
		vid_view_time = player.getCurrentTime();
		$('.window-full-bg-transparent-wrapper').hide();
		player.stopVideo();
		gameStart();
		quitcheck();
	}

	if (event.data == YT.PlayerState.BUFFERING) {
		// when video is still buffering
	}

	if (event.data == YT.PlayerState.PAUSED) {
		player.playVideo();
	}
	
	/*
	if (event.data == YT.PlayerState.PLAYING && !done) {
	setTimeout(stopVideo, 6000);
	done = true;
	}
	*/
}

function onReady(event){
	window.onbeforeunload = null;
	window.onunload = null;
	//gameStart();
	//$('.window-modal').fadeIn();
	//$('.window-full-bg-transparent').fadeIn();
	//$('.window-full').fadeIn();
	/*
	$('.window-modal').fadeIn();
	$('.game_prizes').fadeIn();
	$('.window-full-bg-transparent').fadeIn();
	*/
}

function onError(event){
	alert('error');
}

function stopVideo() {
	player.stopVideo();
}

// --------END YOUTUBE FUNCTION


function client_and_video_view_count_plus()
{
	// VIEWS COUNT
	add_client_order_view_count($('.game_id_value').val());
	add_video_total_view_count($('.video_id').val());
	
	if ($('.is_targeted').val() != 0)
	{
		// TARGETED
		add_client_order_targeted_view_count($('.game_id_value').val());
	}
	else
	{
		add_client_order_non_targeted_view_count($('.game_id_value').val());
	}
}

function coin_deduction(coin_value, hide_message)
{
	$.ajax({
	url : './game_play/coin_deduction/' + coin_value + '/' + hide_message, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function insert_users_played_games(game_id, points, gameplay_time, vid_view_time, coins_earned)
{
	$.ajax({
	url : './game_play/insert_users_played_games/' + game_id + '/' + points + '/' + gameplay_time + '/' + vid_view_time + '/' + coins_earned, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			document.getElementById("users_played_game_id").value = data.users_played_game_id;
			get_leaders($('.game_id_value').val());
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function get_leaders(game_id)
{
	$.ajax({
	url : './game_play/get_leaders/' + game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			$('.please_wait').hide();
			$('.leader_holder').html(data.show_result).show();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function insert_windfall_achievement_perfect_answer()
{
	$.ajax({
	url : './game_play/insert_windfall_achievement_perfect_answer/', 
	type: 'GET',
	dataType:"json", 
		success: function(data){
		
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}


function add_user_coins()
{
	$.ajax({
	url : './game_play/add_user_coins/' + coins_earned, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function add_game_player_count(game_id)
{
	$.ajax({
	url : './game_play/add_game_player_count/'+game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('Add Player Count - tbl_games ' + game_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function add_player_count(game_id)
{
	$.ajax({
	url : './game_play/add_player_count/'+game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('Add Player Count - tbl_games ' + game_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function add_client_order_view_count(game_id)
{
	$.ajax({
	url : './game_play/add_client_order_view_count/'+game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('add CLIENT ORDER VIEW - tbl_client_orders ' + game_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function add_client_order_targeted_view_count(game_id)
{
	$.ajax({
	url : './game_play/add_client_order_targeted_view_count/'+game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('add TARGETED VIEWS COUNT - tbl_client ' + game_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function add_client_order_non_targeted_view_count(game_id)
{
	$.ajax({
	url : './game_play/add_client_order_non_targeted_view_count/'+game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('add NON TARGETED VIEWS COUNT - tbl_client ' + game_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function add_video_total_view_count(video_id)
{
	$.ajax({
	url : './game_play/add_video_total_view_count/'+video_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('VIDEO COUNT ADDED ' + video_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

$("#rating").on("rating.change", function(event, value, caption) {
	insert_video_ratings(value, $('.video_id').val(), $('.game_id_value').val(), $('#users_played_game_id').val());
	$('.rating-message').html('Thanks for Rating!');
});

function insert_video_ratings(rate, video_id, game_id, users_played_game_id)
{
	$.ajax({
	url : './game_play/insert_video_ratings/'+rate+'/'+video_id+'/'+game_id+'/'+users_played_game_id, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('add CLIENT ORDER VIEW - tbl_client_orders ' + game_id);
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function onYtEvent(payload) 
{
	var logElement = document.getElementById('ytsubscribe-events-log');
	if (payload.eventType == 'subscribe') 
	{
		insert_bonus_points($('.client_order_id').val(), $('.game_id_value').val(), $('#users_played_game_id').val(), 1);
	} 
	else if (payload.eventType == 'unsubscribe') 
	{
		logElement.innerHTML = 'We are sorry you are unsubscribing. :('
	}
	
	if (window.console) 
	{
		window.console.log('ytsubscribe event: ', payload);
	}
}

$(".like-us-btn").click(function(event){
	insert_bonus_points($('.client_order_id').val(), $('.game_id_value').val(), $('#users_played_game_id').val(), 2);
});

$(".follow-us-btn").click(function(event){
	insert_bonus_points($('.client_order_id').val(), $('.game_id_value').val(), $('#users_played_game_id').val(), 3);
});

$(".weblink-btn").click(function(event){
	insert_bonus_points($('.client_order_id').val(), $('.game_id_value').val(), $('#users_played_game_id').val(), 4);
});

function insert_bonus_points(client_order_id, game_id, users_played_game_id, activity_id)
{

	if (activity_id == 1)
	{
		$('.subscribe .bonus-points').html('<img src="./assets/images/game-player/correct.png" />');
	}
	else if (activity_id == 2)
	{
		$('.like-us .bonus-points').html('<img src="./assets/images/game-player/correct.png" />');
		$('.like-us .activity').html('<a>Like Us - Thanks!</a>');
	}
	else if (activity_id == 3)
	{
		$('.follow-us .bonus-points').html('<img src="./assets/images/game-player/correct.png" />');
		$('.follow-us .activity').html('<a>Follow - Thanks!</a>');
	}
	else if (activity_id == 4)
	{
		$('.weblink .bonus-points').html('<img src="./assets/images/game-player/correct.png" />');
		$('.weblink .activity').html('<a class="thanks">Visit Us - Thanks!</a>');
	}
	
	$.ajax({
	url : './game_play/insert_bonus_points/'+client_order_id+'/'+game_id+'/'+users_played_game_id+'/'+activity_id,
	type: 'GET',
	dataType:"json", 
		success: function(data){
			//alert('add CLIENT ORDER VIEW - tbl_client_orders ' + game_id);
			alert('success');
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		}
	});
	return false;
}


function define(question_num, question_id, is_correct)
{
	if (is_correct == 1)
	{
		$('.question_'+question_num).html("<img src='"+$('.right').val()+"' />");
	}
	else
	{
		$('.question_'+question_num).html("<img src='"+$('.wrong').val()+"' />");
	}
	
	insert_qa(question_id, is_correct);
}

function insert_qa(question_id, is_correct)
{
	
	$.ajax({
	url : './game_play/insert_video_qa_stats/'+question_id+'/'+is_correct, 
	type: 'GET',
	dataType:"json", 
		success: function(data){
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}

function submit_facebook_bonus(title, site_name, description, image, share_url_link, fb_textarea)
{
	$.ajax({
	url : './game_play/submit_facebook_bonus', 
	type: 'GET',
	dataType:"json", 
	data: { share_url_link : share_url_link, title : title, site_name : site_name, description : description, image : image, fb_textarea : fb_textarea},
		success: function(data){
			if (data.status == true)
			{
				// Success
				$('.facebook_share_content').html('<h4>Thank you for Sharing!</h4>').show();
			}
			else
			{
				// Not Success
				$('.facebook_share_content').html('<h5>Something went wrong. Try to connect your Facebook here: <br /><a href="'+data.facebook_connect_url+'" target="_blank" style="color: yellow">Click here to connect</a><br /> <br /> You can also try copy pasting this link to your wall: <br /><br /> <span style="color: yellow;">'+share_url_link+'</span></h5>').show();
			}
		} ,
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		  }
	});
	return false;
}


// Time Functions //
function get_time_diff(incTime) {
	var now = new Date();
	var elapsedTime = (incTime - now);

	x = elapsedTime / 1000;
	elapsedTime = (x % 60) + timer_start_time;

	return elapsedTime.toFixed(2);
};


function youtube_get_time_diff(incTime) {
	var now = new Date();
	var elapsedTime = (incTime - now);

	x = elapsedTime / 1000;
	elapsedTime = (x % 60) + youtube_timer_start_time;

	return elapsedTime.toFixed(2);
};



// In Game Timer //
function youtube_game_timer() {
	
	userStartTime = youtube_start_time;
	
	currTime = youtube_timer_start_time;
	
	timerID = setInterval(function() {
		currTime = youtube_get_time_diff(userStartTime);
		
		$('#youtube_game_timer').html(currTime);
		
		if (parseFloat(currTime) <= 00) {
		
			
			if (timerID != youtube_timer_start_time) {
				clearInterval(timerID);
			}
			
			gameplay_time = youtube_timer_start_time - $("#youtube_game_timer").html();
			
			if ($("#youtube_game_timer").html() < 0) {
				gameplay_time = youtube_timer_start_time; //this cancels out a negative number caused by a glitch when the quitcheck() alert pops up.
			}

		}

	}, 10);

}

function game_timer() {
	
	userStartTime = start_time;
	
	currTime = timer_start_time;
	
	timerID = setInterval(function() {
		currTime = get_time_diff(userStartTime);
		
		$('#game_timer').html(currTime);
		
		if (parseFloat(currTime) <= 00) {
		
			completeGame();
		}

	}, 10);

}

function award_coins(total_score) {

	//10 points = 1 coin (temporarily)
	num_coins = total_score/10;

	for (var i=0; i<num_coins; i++){	
		coin_display = $("#coin_awards").html();
		$("#coin_awards").html(coin_display + "<span id='coin"+i+"' class='coin_row'><img src='"+$('.coin').val()+"' /></span>");
	}
	if (num_coins >= 1) {
		$("#coin1").fadeIn(600);
	}
	if (num_coins >= 2) {
		$("#coin2").fadeIn(600);
	}
	if (num_coins >= 3) {
		$("#coin3").fadeIn(600);
	}
	if (num_coins >= 4) {
		$("#coin4").fadeIn(600);
	}
	if (num_coins >= 5) {
		$("#coin5").fadeIn(600);
	}
	if (num_coins >= 6) {
		$("#coin6").fadeIn(600);
	}

	coin__stack_display = $("#coin_award_value").html();
	$("#coin_award_value").html(coin__stack_display + "+ " + num_coins);
	
	return num_coins;
}


function testQuit() {
	alert(questionCount + '…'+"…"+totalQuestions+"…"+vid_view_time);
}


// This is to see if the user quits before the game is over
function quitcheck() {
	window.onbeforeunload = function (e) {
		e = e || window.event;
		// For IE and Firefox prior to version 4
		if (e) {
			e.returnValue = 'Are you sure you want to Quit This Game?';
		}
		// For Safari
		return 'Are you sure you want to Quit This Game?';
	};
	window.onunload  = function () {
		//User gets 0 points and played the game 0 seconds
		var quit_vid_view_time = getCurrentTime();
		insert_users_played_games($('.game_id_value').val(), 0, 0, quit_vid_view_time, 0);
		for (var i=0; i<=2; i++){	
			insert_wrong_qa($('.question_id_' + i).val());
		}
	};
}

// For Xcode used to stop game when interuptions occur (phone call, etc)
pauseit = function()
{
	if(typeof start_time == 'undefined')
	{
		player.pause();
	}
}
resume = function()
{	
	if(typeof start_time == 'undefined')
	{
		if(player.paused == true)
		{
			player.play();
		}
	}

}
