MeetStaff = (function(){
	
	var $employeesContainer,
		$employees,
		$prev,
		$next,
		$buttons,
		currentEmployee,
		oldEmployee,
		numStaff,
		totalWidth;

	var initialize = function(){
		$employeesContainer = $('.staff-employees');
		$employees = $('.staff-pic');
		$prev = $('.staff-carousel-button-left');
		$next = $('.staff-carousel-button-right');
		$buttons =  $('.staff-carousel-button');
		numStaff = $employees.length;
		totalWidth = numStaff*270;
		start();
		konami();
	}

	var start = function(){
		var offset;
		var i = 0;
		// for(i; i<numStaff;i++){

		// 	$employee = $($employees[i]);
		// 	$employee.on('load', (function($e, n){
		// 		return function(){
		// 			var width = $e.width();
		// 			$e.css({"left": width*n+(65*n)});
		// 		};
		// 		})($employee, i)
		// 	);

		// }
		$employees.each(function(i){
			$(this).css({"left":i*270});
		});
		if(window.innerWidth<960){
		 	offset = 25;
			currentEmployee = 0;
			$($employees[0]).click();
		} else {
			offset = 380;
			currentEmployee = 1;
			$($employees[1]).click();
		}
		$('.staff-pic').on('click', function(){
			var left = $employeesContainer.position().left;
			$('.staff-pic').not(this).removeClass('clicked');
			$(this).addClass('clicked');
			var staffId = $(this).attr('id');
			$('.staff-details').not('.staff-details-'+staffId).hide();
			$('.staff-details-'+staffId).show();
			oldEmployee = currentEmployee;
			currentEmployee = $.inArray(this, $employees);

			if(oldEmployee < currentEmployee){
				checkButtons()
				var multiplier = (currentEmployee-oldEmployee)*270;
				if(left > (-(numStaff-1))*270+offset){
					$next.off('click');
					$employeesContainer.transition({"left": left-multiplier, duration: 200}, function(){
						$next.on('click', nextClick);
					});
				}
			}

			if(oldEmployee > currentEmployee){
				checkButtons();
				var multiplier = (oldEmployee-currentEmployee)*270;
				if (left !== offset){
					$prev.off('click');
					$employeesContainer.transition({"left": left+multiplier, duration: 200}, function(){
						$prev.on('click', prevClick);
					});
				}
			}

		});
		if(window.innerWidth<768){
		 	offset = 35;
			currentEmployee = 0;
			$($employees[0]).click();
		} else {
			offset = 380;
			currentEmployee = 1;
			$($employees[1]).click();
		}
		$prev.on('click', prevClick);
		$next.on('click', nextClick);
	
	}
	var checkButtons = function(){
		if(currentEmployee==0){
			$prev.fadeOut();
		} else if (currentEmployee>0){
			$prev.fadeIn();
		}
		if(currentEmployee==numStaff-1){
			$next.fadeOut();
		} else if (currentEmployee<numStaff-1){
			$next.fadeIn();
		}
	}
	var nextClick = function(){
		$('.staff-pic.clicked').next('.staff-pic').click();
	}

	var prevClick = function(){
		$('.staff-pic.clicked').prev('.staff-pic').click();
	}

	var konami = function(){
		// konami code - up up down down left right left right b a
	    var code1 = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13);
	    var codeBuffer = "";
	    $(document).keyup(function (e) {
	        codeBuffer += String.fromCharCode(e.which);
	        if (code1.substring(0, codeBuffer.length) == codeBuffer) {
	            if (code1.length == codeBuffer.length) {
	                if($('.welcome-to-shop').length>0){
	                	var hats = document.createElement('img');
	                	hats.src = 'assets/placeholder.png';
	                	hats.id = "placeholder";
	                	$('.welcome-to-shop').append(hats);
	                	$('#placeholder').css({"position": "absolute", "top": 66, "left": 361});

	                }
	                codeBuffer = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66);
	            }
	        } else {
	            codeBuffer = "";
	        }
	    });
	}
	return {
		initialize: initialize
	}
}());