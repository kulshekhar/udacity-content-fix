    chrome.webRequest.onBeforeRequest.addListener((details) => {
      // // manipulate the query results
      //       if (details.url.endsWith('.js') && details.url.indexOf('classroom.udacity.com/js/manifest.') >= 0) {
      //         return { redirectUrl: 'https://cdn.rawgit.com/kulshekhar/udacity-content-fix/fcaeb037c5cf97e980c3b34b4ff8b5c00648e831/manifest-replacement.js' };
      //       }

      // use patched app.js to make the right query
      if (details.url.endsWith('.js') && details.url.indexOf('classroom.udacity.com/js/app.') >= 0) {
        return { redirectUrl: 'https://cdn.rawgit.com/kulshekhar/udacity-content-fix/134f5e/patched-app.js' };
      }

      return details.url
    },
      {
        urls: ["*://classroom.udacity.com/js/*"]
      },
      ["blocking"]);
