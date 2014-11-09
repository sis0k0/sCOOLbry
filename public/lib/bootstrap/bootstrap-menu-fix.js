'use strict';

jQuery(document).on('click','#admin-menu.in,#library-menu.in',function(e) {
    if( jQuery(e.target).is('a') && jQuery(e.target.attr('data-toggle')!=='tab')) {
        jQuery(this).collapse('hide');
    }
});

jQuery(document).on('click','#site-navigation.in',function(e) {
    if( jQuery(e.target).is('a')) {
        jQuery(this).collapse('hide');
    }
});