console.log("code from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // If member is logged in then continue this logic
  const studentAirtableID = member["airtableid"];

  fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      const classesHolder = document.querySelector(".classes-holder");
      const upcomingTemplate = document.querySelector(".class-wrap .upcoming");
      const completedTemplate = document.querySelector(".class-wrap .completed");
      const missedTemplate = document.querySelector(".class-wrap .missed");

      console.log("response", response);

      response.upcomingClasses.forEach((upcomingClassData) => {
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(".class-date").innerHTML = `${upcomingClassData.formattedTime}`;

        // Appending the result Item
        classesHolder.appendChild(upcomingClassDiv);
      });
    });

  // do things with the member object
});
