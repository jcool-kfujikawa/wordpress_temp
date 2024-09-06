<?php
  // Localの環境変数に応じてtemplate_directory_uriを変更
  add_filter('template_directory_uri', function($uri) {
    if (is_local_environment()) {
      $uri .= '/dist';
    }
    return $uri;
  });

  function is_local_environment() {
    return (defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'local');
  }

  // 投稿者アーカイブを無効化する
  add_filter( 'author_rewrite_rules', '__return_empty_array' );

  function disable_author_archive() {
    if( isset($_GET['author']) || preg_match('#/author/.+#', $_SERVER['REQUEST_URI']) ){
      wp_redirect( home_url() );
      exit;
    }
  }

  add_action('init', 'disable_author_archive');
