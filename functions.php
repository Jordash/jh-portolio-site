<?php
/**
 * JH functions and definitions
 *
 * @package JH
 * @since JH 1.0
 */

/**
 * Enqueue the CSS files.
 *
 * @since 1.0.0
 *
 * @return void
 */
function jh_styles() {
	wp_enqueue_style( 'jh-style', get_template_directory_uri() . '/styles.css', [], wp_get_theme()->get( 'Version' )	);

  //Load Local jQuery
	// wp_enqueue_script( 
	// 	'jQuery', 
	// 	'https://code.jquery.com/jquery-3.7.1.min.js', 
	// 	array(), 
	// 	'3.7.1', 
	// 	array( 
	// 		'strategy'  => 'defer',
	// 	)
	// );

  //Load Local GSAP
	wp_enqueue_script( 
   	  'gsap', 
	  get_template_directory_uri() . '/assets/js/gsap.min.js', 
	  array(), 
	  '3.12.5', 
	  array( 
	    'strategy'  => 'defer',
	  )
	);

  // Load Local ScrollTrigger
	wp_enqueue_script( 
	  'gsapScrollTrigger', 
	  get_template_directory_uri() . '/assets/js/ScrollTrigger.min.js', 
	  array('gsap'), 
	  '3.12.5', 
	  array( 
	    'strategy'  => 'defer',
	  )
	);

  // Load Local Site JS
	wp_enqueue_script( 
	  'jh-site', 
	  get_template_directory_uri() . '/assets/js/site.js', 
	  array(), 
	  '1.0', 
	  array( 
	    'strategy'  => 'defer',
	  )
	);

  // Load Polyfill for Scroll-driven animations
  // https://github.com/flackr/scroll-timeline
    wp_enqueue_script(
	  'polyfill',
	  'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js',
	  array(),
	  '1.0',
	  array(
	    'stragety' => 'defer',
	  )
	);
}
add_action( 'wp_enqueue_scripts', 'jh_styles' );

// Enables basic grid variation option for the Group block 
add_action( 'enqueue_block_editor_assets', 'themeslug_editor_assets' );

function themeslug_editor_assets() {
	wp_enqueue_script(
		'themeslug-block-variations',
		get_parent_theme_file_uri( 'assets/js/block-variations-grid.js' ),
		array( 
			'wp-blocks', 
			'wp-dom-ready',
			'wp-i18n'
		),
		wp_get_theme()->get( 'Version' ),
		true
	);
} 