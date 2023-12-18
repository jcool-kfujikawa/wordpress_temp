<!DOCTYPE html>
<html lang="jp">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WordPressのテンプレート</title>
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css">
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/assets/js/aboutbundle.js"></script>
  <?php wp_head(); ?>
</head>
<body>
  <p class="test">WordPressのテンプレートです。</p>
  <?php wp_footer(); ?>
</body>
</html>