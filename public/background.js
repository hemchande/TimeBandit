chrome.identity.getProfileUserInfo(function(info) {
    let email = info.email;
    console.log(info);
  });
  