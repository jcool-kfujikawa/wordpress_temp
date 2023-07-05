<?php
  add_filter('template_directory_uri', function($uri) {
    if (is_local_environment()) {
      $uri .= '/dist';
    }
    return $uri;
  });

  function is_local_environment() {
    return (defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'local');
  }
?>