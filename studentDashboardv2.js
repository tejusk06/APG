console.log("Student Dashboard logic v2");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  if (member.membership.name == "AP Guru SAT Students") {
    courseID = "recQ9LlXahxGsLY8I";
  } else if (member.membership.name == "AP Guru ACT Students") {
    courseID = "reccXht5MjmINAccQ";
  }

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get student stats from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/student/dashboard-v2/${studentAirtableID}-${courseID}`)
    .then((response) => response.json())
    .then((response) => {
      console.log("response", response);

      document.querySelectorAll(".upcoming-classes-stat")[0].innerHTML = response.stats.upcomingClassesCount;
      document.querySelectorAll(".upcoming-classes-stat")[1].innerHTML = response.stats.upcomingClassesCount;

      document.querySelectorAll(".completed-classes-stat")[0].innerHTML = response.stats.completedClassesCount;
      document.querySelectorAll(".completed-classes-stat")[1].innerHTML = response.stats.completedClassesCount;

      document.querySelectorAll(".missed-classes-stat")[0].innerHTML = response.stats.missedClassesCount;
      document.querySelectorAll(".missed-classes-stat")[1].innerHTML = response.stats.missedClassesCount;

      //   document.querySelector(".all-classes-stat").innerHTML = response.stats.allClasses;
      if (member.membership.name == "AP Guru SAT Students") {
        document.querySelector(".math-topics-stat").innerHTML = response.stats.satMathTopicsCompleted;
        document.querySelectorAll(".math-topics-stat")[1].innerHTML = response.stats.satMathTopicsCompleted;

        document.querySelector(".reading-topics-stat").innerHTML = response.stats.satReadingTopicsCompleted;
        document.querySelectorAll(".reading-topics-stat")[1].innerHTML = response.stats.satReadingTopicsCompleted;

        document.querySelector(".writing-topics-stat").innerHTML = response.stats.satWritingTopicsCompleted;
        document.querySelectorAll(".writing-topics-stat")[1].innerHTML = response.stats.satWritingTopicsCompleted;
      } else if (member.membership.name == "AP Guru ACT Students") {
        // TODO test by creating ACT student login

        document.querySelector(".reading-topics-stat").innerHTML = response.stats.actReadingTopicsCompleted;
        document.querySelectorAll(".reading-topics-stat")[1].innerHTML = response.stats.actReadingTopicsCompleted;

        document.querySelector(".english-topics-stat").innerHTML = response.stats.actEnglishTopicsCompleted;
        document.querySelectorAll(".english-topics-stat")[1].innerHTML = response.stats.actEnglishTopicsCompleted;

        document.querySelector(".science-topics-stat").innerHTML = response.stats.actScienceTopicsCompleted;
        document.querySelectorAll(".science-topics-stat")[1].innerHTML = response.stats.actScienceTopicsCompleted;
      }

      document.querySelector(".pending-homework-stat").innerHTML = response.stats.homeworkPending;
      document.querySelector(".due-homework-stat").innerHTML = response.stats.homeworkDue;
      document.querySelector(".completed-homework-stat").innerHTML = response.stats.homeworkCompleted;
      document.querySelectorAll(".pending-homework-stat")[1].innerHTML = response.stats.homeworkPending;
      document.querySelectorAll(".due-homework-stat")[1].innerHTML = response.stats.homeworkDue;
      document.querySelectorAll(".completed-homework-stat")[1].innerHTML = response.stats.homeworkCompleted;
      document.querySelector(".upcoming-test-stat").innerHTML = response.stats.testsUpcoming;
      document.querySelector(".completed-test-stat").innerHTML = response.stats.testsCompleted;
      document.querySelector(".missed-test-stat").innerHTML = response.stats.testsMissed;
      document.querySelectorAll(".upcoming-test-stat")[1].innerHTML = response.stats.testsUpcoming;
      document.querySelectorAll(".completed-test-stat")[1].innerHTML = response.stats.testsCompleted;
      document.querySelectorAll(".missed-test-stat")[1].innerHTML = response.stats.testsMissed;
    });
});
