<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'giunifor_wp_ccbpp' );

/** Database username */
define( 'DB_USER', 'giunifor_wp_mwrpb' );

/** Database password */
define( 'DB_PASSWORD', '2rI&F919zu8Kmhy!' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'V60s72a!8!AYV-i5/mlA4AS5h6hJBV*1iT_EW[J8@h*Vu637lA_G1267g5PJj7~i');
define('SECURE_AUTH_KEY', '40Euh-7PfF*W#7U:Uk9G*99V8-+M0~uSSzoa5G/Y(s4M!xr32RF3@PfqBU(G;)%k');
define('LOGGED_IN_KEY', '7Kb8IyB9~%mD7-4[oTe6j432B2Ue~jfoX:48)i~1#-ov+;c]gF~vy&a*04h3_s1k');
define('NONCE_KEY', 'Hk2(9xG9|JJQ2D]7a5aMGGIXZK*1rjgDuTuZ(7@c:9Ud(_[7L5tl|AN)+e1Hr-4k');
define('AUTH_SALT', 's65839%CI)y#81jvR7H5#:58B%zq+2Ok(7:gR%o+6aL|Ra4]/~36E46]H6~*Dpi:');
define('SECURE_AUTH_SALT', 'eW1j)8E)j6KN%L:IZ:~LFw~Y-uzO82ls7@*WV4eLRuFAB-ujrxi&43j#7+0[MAxT');
define('LOGGED_IN_SALT', 'D6r9d1N7#tt082%(YeQd1!20Jg/p4/h~)%774n#gv2(0QO7QNT+IlQ&a0/Bbz+aY');
define('NONCE_SALT', '8ww-7MvxR(80aX@I4YpZIk@C]V46N01/#4PzcFH_d;Q38tPdKaH!gcd3wwyUJWin');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'Ruefb_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
