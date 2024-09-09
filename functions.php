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
	 wp_enqueue_script( 
	 	'jQuery', 
	 	'/wp-includes/js/jquery/jquery.min.js',
		array(),
			'3.7.1',  
	 	array( 
	 		'strategy'  => 'defer',
	 	)
	);

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

  // Load Local GSAP ScrollTrigger
	wp_enqueue_script( 
	  'gsapScrollTrigger', 
	  get_template_directory_uri() . '/assets/js/ScrollTrigger.min.js', 
	  array('gsap'), 
	  '3.12.5', 
	  array( 
	    'strategy'  => 'defer',
	  )
	);

    // Load Local GSAP Flip (Currently Unused)
	// wp_enqueue_script( 
	// 	'gsapFlip', 
	// 	get_template_directory_uri() . '/assets/js/Flip.min.js', 
	// 	array('gsap'), 
	// 	'3.12.5', 
	// 	array( 
	// 	  'strategy'  => 'defer',
	// 	)
	//   );

	// Load Local GSAP SplitText
	wp_enqueue_script( 
		'gsapSplitText', 
		get_template_directory_uri() . '/assets/js/SplitText.min.js', 
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
    // wp_enqueue_script(
	//   'polyfill',
	//   'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js',
	//   array(),
	//   '1.0',
	//   array(
	//     'stragety' => 'defer',
	//   )
	// );
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

// AJAX Request to Load Pod CPT (Projects)
//Reference: https://weichie.com/blog/load-more-posts-ajax-wordpress/
function load_projects() {
	$page_id = url_to_postid($_POST['ajax_data']);
	$ajaxposts = new WP_Query([
		'post_type' => 'project',
		'post_status' => 'publish',
		'posts_per_page' => 1,
		'p' => $page_id
	]);
	
	$response = '';

	if ($ajaxposts->have_posts()){
		while($ajaxposts->have_posts()):$ajaxposts->the_post();
			$response = get_template_part('templates/project-partial');
		endwhile;
		wp_reset_postdata(); 
	}
	else {
		$response = '';
	}

	echo $response;
	exit;
}
add_action('wp_ajax_get_projects', 'load_projects');
add_action('wp_ajax_nopriv_get_projects', 'load_projects');



// AJAX Request to Load Next/Prev CPT (Project)
function load_adjacent_project() {

	// Retrieve POST data from AJAX Request
	$data_array = $_POST['ajax_data'];
	$page_id = intval($data_array[0]);
	$link_class = $data_array[1];
	$link_class = sanitize_text_field($link_class);
	
	$response = ''; //Initialize response variable

	global $post; //set global for next and prev functions to reference
	$post = get_post( $page_id ); //set $post to passed in page ID
	
	// 23 Hands For Heroes
	// 365 The Karma Group Website
	// 371 Granite Valley Website
	// 374 Medix Ambulance Website
	// 375 CrossFit Icebowl 2016 T-shirt
	// 377 Bellin CHCL Campaign Website
	// 378 Donut Mile T-shirt
	// 379 Solihten Institute Website
	// 380 SplitStar Logo
	// 381 Mon Amie Boutique Website
	// 382 Cedar Lake Sales Boat Show Campaign
	// 383 CrossFit Icebowl 2017 T-shirt
	// 384 Astrea Internet Website
	// 385 Easter Puzzle Website
	// 452 Heider Tractor Gear
	// 453 Solace Urns Shopify Website
	// 492 The Karma Group Blog
	// 545 Mon Amie Boutique Email
	

	if (!$post) {
		$response = 'Invalid post ID.';
		echo $response;
		exit;
	}
	
	if ($link_class === 'next-project') {
		//Use ob_start() and ob_get_clean() to capture the output of get_template_part() and assign it to $response.
		$post = get_next_post(); //fetch the next post
		if ( strlen($post->ID) < 1 ) {
			echo 'There are no more projects.';
			exit;
		}
		setup_postdata($post);
		ob_start();
		get_template_part('templates/project-partial');
		$response = ob_get_clean();
		wp_reset_postdata();
	} elseif ($link_class === 'prev-project') {
		$post = get_previous_post(); //fetch the previous post
		if ( strlen($post->ID) < 1 ) {
			echo 'There are no previous projects.';
			exit;
		}
		setup_postdata($post);
		ob_start();
		get_template_part('templates/project-partial');
		$response = ob_get_clean();
		wp_reset_postdata();
	}

	echo $response;
	exit;
}
add_action('wp_ajax_load_adjacent_project', 'load_adjacent_project');
add_action('wp_ajax_nopriv_load_adjacent_project', 'load_adjacent_project');
