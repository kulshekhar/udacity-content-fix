    chrome.webRequest.onBeforeRequest.addListener((details) => {

      if (details.url.endsWith('.js') && details.url.indexOf('classroom.udacity.com/js/manifest.') >= 0) {
        return { redirectUrl: 'https://cdn.rawgit.com/kulshekhar/udacity-content-fix/fcaeb037c5cf97e980c3b34b4ff8b5c00648e831/manifest-replacement.js' };
      }

      return details.url
    },
      {
        urls: ["*://classroom.udacity.com/js/*"]
      },
      ["blocking"]);
