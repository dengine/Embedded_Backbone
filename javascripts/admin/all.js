// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs

//= require admin/spree_core
//= require admin/spree_promo

//= require_tree .
//= require admin/spree_boobtalk_videos
//= require admin/spree_press_room
//= require redactor-rails
//= require admin/spree_faq

$(function(){
	// hack to get the more tab in the admin nav
	if($(window).width() > 960){
		$('.main-menu-wrapper ul').AdaptiveMenu({
			text: "<a href='#'><i class='icon-chevron-down'></i> More</a>",
			klass: "dropdown",
			accuracy: 500
		});
	}
});

//= require admin/spree_taxon_images
//= require admin/spree_boobs_on_the_move
//= require admin/spree_staff
//= require admin/spree_customer_comments
//= require admin/spree_easy_contact
//= require admin/spree_websails
//= require admin/spree_mercury_gift_cards
