'use strict';

/* Constants */

test3hipsterApp.constant('USER_ROLES', {
        all: '*',
        admin: 'ROLE_ADMIN',
        user: 'ROLE_USER'
    });

// Define for each locale the associated flag
// It will be used by the library "http://www.famfamfam.com/lab/icons/flags/"
// to display the flag
test3hipsterApp.constant('FLAGS', {
        en: 'gb',
        ro: 'ro',
    });