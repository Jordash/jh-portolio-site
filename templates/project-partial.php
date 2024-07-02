<?php 
    echo '<p>From project-partial.php Template</p>';
    echo '<section class="project-header"><h2>' . get_the_title() . '</h2></section><hr />'; 
    $content = apply_filters( 'the_content', get_post_field( 'post_content', $post_id ) );
    echo $content;

    $next_post = get_adjacent_post( false, '', false);
    $next_post_url = get_the_permalink($next_post);

    $previous_post = get_adjacent_post( false, '', true);
    $previous_post_url = get_the_permalink($previous_post);
    //TODO: AJAXify this call to load Next/Prev posts in modal
?>

<hr />
<section class="project-footer">
<a href="<?php echo $previous_post_url;?>">Previous Project</a>
<a href="<?php echo $next_post_url;?>">Next Project</a>
</section>