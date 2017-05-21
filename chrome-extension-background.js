    chrome.webRequest.onBeforeRequest.addListener((details) => {

      if (details.url.endsWith('.js') && details.url.indexOf('classroom.udacity.com/js/manifest.') >= 0) {
        return { redirectUrl: 'https://cdn.rawgit.com/kulshekhar/udacity-content-fix/master/manifest-replacement.js' };
      }

      return details.url
    },
      {
        urls: ["*://classroom.udacity.com/js/*"]
      },
      ["blocking"]);
