console.log("Admin Individual Students Classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split("?")[1];

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }
});
