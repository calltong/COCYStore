import {config} from '../config';

let isLoaded = false;

class FacebookAPI {

  setupInit(callback) {
    if (isLoaded === false) {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId  : config.facebook.appId,
          status : true,
          cookie : true,
          xfbml  : true,
          version: 'v2.8',
        });

        window.FB.AppEvents.logPageView();
        isLoaded = true;
        if (callback) {
          callback({result:true});
        }
      };

      (function(d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    } else if (callback) {
      callback({ result: true });
    }
  }

  login(callback) {
    if (isLoaded) {
      window.FB.login(function(response) {
        if (callback) {
          callback(response);
        }
      });
    } else {
      callback('SDK not found');
    }
  }

  logout(callback) {
    if (isLoaded) {
      window.FB.logout(function(response) {
        if (callback) {
          callback(response);
        }
      });
    } else {
      callback('SDK not found');
    }
  }

  getCurrentLogin(callback) {
    if (isLoaded) {
      window.FB.getLoginStatus(function(response) {
        if (callback) {
          callback(response);
        }
      });
    } else {
      callback('SDK not found');
    }
  }

  getUserProfile(id, callback) {
    if (isLoaded) {
      window.FB.api(id, function(profile) {
        if (callback) {
          callback(profile);
        }
      });
    } else {
      callback('SDK not found');
    }
  }

  waitReady(callback) {
    if (isLoaded) {
      callback(window.FB, isLoaded);
    } else {
      setTimeout(function() {
        callback(window.FB, isLoaded);
      }, 5000); // check again in a second
    }
  }

}

export const facebook = new FacebookAPI();
