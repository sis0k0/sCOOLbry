'use strict';

jQuery(document).on('click','.navbar-collapse.in',function(e) {
    if( jQuery(e.target).is('a') && jQuery(e.target.attr('data-toggle')!=='tab')) {
        jQuery(this).collapse('hide');
    }
});