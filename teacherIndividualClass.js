console.log("teacher classes logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const classID = window.location.href.split("?classID=")[1];
  console.log("class id is ", classID);
});
