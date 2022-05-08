console.log("loggin from github pages");

MemberStack.onReady.then(function (member) {
  // check if member is logged in
  // returns true or false

  if (!member.loggedIn) {
    //   If member is not logged in redirect to main page
    window.location.replace(window.location.hostname);
  } else {
    // If member is logged in then do this logic
    const airtableID = member["AirtableID"];
    console.log("airtable id is ", airtableID);
  }

  // do things with the member object
});
