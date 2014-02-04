Videos = (function(){
	/**
	 * @author       Rob W <gwnRob@gmail.com>
	 * @website      http://stackoverflow.com/a/7513356/938089
	 * @version      20131010
	 * @description  Executes function on a framed YouTube video (see website link)
	 *               For a full list of possible functions, see:
	 *               https://developers.google.com/youtube/js_api_reference
	 * @param String frame_id The id of (the div containing) the frame
	 * @param String func     Desired function to call, eg. "playVideo"
	 *        (Function)      Function to call when the player is ready.
	 * @param Array  args     (optional) List of arguments to pass to function func*/
	function callPlayer(frame_id, func, args) {
	    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
	    var iframe = document.getElementById(frame_id);
	    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
	        iframe = iframe.getElementsByTagName('iframe')[0];
	    }

	    // When the player is not ready yet, add the event to a queue
	    // Each frame_id is associated with an own queue.
	    // Each queue has three possible states:
	    //  undefined = uninitialised / array = queue / 0 = ready
	    if (!callPlayer.queue) callPlayer.queue = {};
	    var queue = callPlayer.queue[frame_id],
	        domReady = document.readyState == 'complete';

	    if (domReady && !iframe) {
	        // DOM is ready and iframe does not exist. Log a message
	        // window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
	        if (queue) clearInterval(queue.poller);
	    } else if (func === 'listening') {
	        // Sending the "listener" message to the frame, to request status updates
	        if (iframe && iframe.contentWindow) {
	            func = '{"event":"listening","id":' + JSON.stringify(''+frame_id) + '}';
	            iframe.contentWindow.postMessage(func, '*');
	        }
	    } else if (!domReady ||
	               iframe && (!iframe.contentWindow || queue && !queue.ready) ||
	               (!queue || !queue.ready) && typeof func === 'function') {
	        if (!queue) queue = callPlayer.queue[frame_id] = [];
	        queue.push([func, args]);
	        if (!('poller' in queue)) {
	            // keep polling until the document and frame is ready
	            queue.poller = setInterval(function() {
	                callPlayer(frame_id, 'listening');
	            }, 250);
	            // Add a global "message" event listener, to catch status updates:
	            messageEvent(1, function runOnceReady(e) {
	                if (!iframe) {
	                    iframe = document.getElementById(frame_id);
	                    if (!iframe) return;
	                    if (iframe.tagName.toUpperCase() != 'IFRAME') {
	                        iframe = iframe.getElementsByTagName('iframe')[0];
	                        if (!iframe) return;
	                    }
	                }
	                if (e.source === iframe.contentWindow) {
	                    // Assume that the player is ready if we receive a
	                    // message from the iframe
	                    clearInterval(queue.poller);
	                    queue.ready = true;
	                    messageEvent(0, runOnceReady);
	                    // .. and release the queue:
	                    while (tmp = queue.shift()) {
	                        callPlayer(frame_id, tmp[0], tmp[1]);
	                    }
	                }
	            }, false);
	        }
	    } else if (iframe && iframe.contentWindow) {
	        // When a function is supplied, just call it (like "onYouTubePlayerReady")
	        if (func.call) return func();
	        // Frame exists, send message
	        iframe.contentWindow.postMessage(JSON.stringify({
	            "event": "command",
	            "func": func,
	            "args": args || [],
	            "id": frame_id
	        }), "*");
	    }
	    /* IE8 does not support addEventListener... */
	    function messageEvent(add, listener) {
	        var w3 = add ? window.addEventListener : window.removeEventListener;
	        w3 ?
	            w3('message', listener, !1)
	        :
	            (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
	    }
	}
	var initialize = function(){
		//Set up pages for scrolling
		var thumbnails = $(".more-videos .video");
		var videos = $('.player .video').detach();
		var video_count = 4;
		//insert active video
		$('.player').prepend(videos[0]);
		if(thumbnails.length > video_count){
			$(".more-videos .scroll").show();
			$(".more-videos .down").attr('data-count', video_count).addClass('active');
		}else{
			$(".more-videos .scroll").hide();
		}

		$('.more-videos .viewport').first().addClass('active');
		$('.more-videos .viewport').first().find('.video img').first().addClass('active');

		//events
		$('.more-videos .scroll').on('click', 'a', function(e){
			e.preventDefault();
			if(!$(this).hasClass('active') || $(this).hasClass('scrolling'))
				return false;
			$(this).addClass('scrolling');
			var thumbnail_height = thumbnails.first().outerHeight() + parseInt(thumbnails.first().css('margin-bottom'),10);
			var dir = $(this).hasClass('up') ? 'up' : 'down';
			var $posters = $('.more-videos .posters');
			var margin = parseInt($posters.css('margin-top'), 10);

			if(dir === 'up'){
				margin += thumbnail_height;
				$(".more-videos .down").attr('data-count', parseInt($(".more-videos .down").attr('data-count')) - 1);
			}else{
				margin -= thumbnail_height;
				$(".more-videos .down").attr('data-count', parseInt($(".more-videos .down").attr('data-count')) + 1);
			}

			$posters.animate({
				'margin-top': margin + 'px'
			},500,function(){
				if(margin === 0){
					$('.more-videos .up').removeClass('active');
				}else{
					$('.more-videos .up').addClass('active');
				}

				if(parseInt($(".more-videos .down").attr('data-count')) == thumbnails.length){
					$('.more-videos .down').removeClass('active');
				}else{
					$('.more-videos .down').addClass('active');
				}
				$('.more-videos .scroll a').removeClass('scrolling');
			});
		});
		$('.more-videos .video img').click(function(){
			//add active class to thumbnail
			$('.more-videos .video .active').removeClass('active');
			$(this).addClass('active');
			//remove current video
			$('.player .video').remove();
			//Show and play selected vieo
			new_video_id = parseInt($(this).parent().data('video-id'), 10);
			$('.player').prepend(videos[new_video_id]);
			callPlayer('video' + new_video_id, "playVideo");
		});

	};

	return {
		initialize: function(){
			if($('.video-carousel').length > 0){
				initialize();
			}
		}
	};

}());

