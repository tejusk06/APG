console.log("Student Dashboard logic");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get student stats from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/student/dashboard/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      console.log("response", response);

      document.querySelector(".upcoming-classes-stat").innerHTML = response.stats.upcomingClasses;
      document.querySelector(".all-classes-stat").innerHTML = response.stats.allClasses;
      if (member.membership.name == "AP Guru SAT Students") {
        document.querySelector(".math-topics-stat").innerHTML = response.stats.mathTopicsCompleted;
        document.querySelector(".reading-topics-stat").innerHTML = response.stats.readingTopicsCompleted;
        document.querySelector(".writing-topics-stat").innerHTML = response.stats.writingTopicsCompleted;
      } else {
        document.querySelector(".completed-topics-stat").innerHTML = response.stats.totalTopicsCompleted;
      }

      document.querySelector(".pending-homework-stat").innerHTML = response.stats.homeworkPending;
      document.querySelector(".due-homework-stat").innerHTML = response.stats.homeworkDue;
      document.querySelector(".completed-homework-stat").innerHTML = response.stats.homeworkCompleted;
      document.querySelector(".upcoming-test-stat").innerHTML = response.stats.testsUpcoming;
      document.querySelector(".completed-test-stat").innerHTML = response.stats.testsCompleted;
      document.querySelector(".missed-test-stat").innerHTML = response.stats.testsMissed;
    });
});
