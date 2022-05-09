console.log("code from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // If member is logged in then continue this logic
  const studentAirtableID = member["airtableid"];

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const classesHolder = document.querySelectorAll(".classes-holder")[0];
      const upcomingTemplate = document.querySelectorAll(".class-wrap.upcoming")[0];
      const completedTemplate = document.querySelectorAll(".class-wrap.completed")[0];
      const missedTemplate = document.querySelectorAll(".class-wrap.missed")[0];

      //   Logging the templates
      console.log("response", response);
      console.log("upcomingTemplate", upcomingTemplate);
      console.log("completedTemplate", completedTemplate);
      console.log("missedTemplate", missedTemplate);

      //   Rendering divs for each upcoming class
      response.upcomingClasses.forEach((upcomingClassData) => {
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(".class-date").innerHTML = `${upcomingClassData.formattedTime}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(upcomingClassDiv);
      });
    });

  // do things with the member object
});
