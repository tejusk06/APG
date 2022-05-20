console.log("Admin Dashboard logic");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/student/dashboard/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      console.log("response", response);

      //   document.querySelector(".upcoming-classes").innerHTML = response.stats.upcomingClasses;
    });
});
