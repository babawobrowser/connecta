<template>
    <div class="social-sharing-buttons">
      <a href="#" class="social-sharing-button facebook">
        <i class="fa fa-facebook"></i>
      </a>
      <a href="#" class="social-sharing-button twitter">
        <i class="fa fa-twitter"></i>
      </a>
      <a href="#" class="social-sharing-button linkedin">
        <i class="fa fa-linkedin"></i>
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SocialSharingButtons',
    props: {
      // A list of social media platforms to include buttons for
      platforms: {
        type: Array,
        default: () => ['facebook', 'twitter', 'linkedin'],
      },
    },
  };
  </script>
  
  <style lang="scss">
  .social-sharing-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }
  
  .social-sharing-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    text-decoration: none;
    margin: 0.5rem;
  
    i {
      font-size: 1.5rem;
    }
  }
  
  .social-sharing-button.facebook {
    background-color: #3b5998;
    color: #fff;
  }
  
  .social-sharing-button.twitter {
    background-color: #00aced;
    color: #fff;
  }
  
  .social-sharing-button.linkedin {
    background-color: #0077b5;
    color: #fff;
  }
  </style>
  