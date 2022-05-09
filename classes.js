console.log("code from github pages");

MemberStack.onReady.then(function (member) {
  // check if member is logged in
  // returns true or false

  if (!member.loggedIn) {
    //   If member is not logged in redirect to main page
    window.location.replace(window.location.hostname);
  } else {
    // If member is logged in then do this logic
    const studentAirtableID = member["airtableid"];

    fetch(`https://apguru-server.herokuapp.com/api/v1/student/classes/${studentAirtableID}`)
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
      });
  }

  // do things with the member object
});
