<?php 
    //echo '<p>From project-partial.php Template</p>';
    echo '<section class="project-header"><h2>' . get_the_title() . '</h2></section>'; 
    $content = apply_filters( 'the_content', get_post_field( 'post_content', $post_id ) );
    echo $content;
?>

<hr />
<section class="project-footer">
<a id="<?php echo get_the_ID();?>" class="prev-project" href="#">Previous Project</a>
<a id="<?php echo get_the_ID();?>" class="next-project" href="#">Next Project</a>
</section>