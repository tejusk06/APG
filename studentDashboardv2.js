console.log("Student Dashboard logic v2");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // Get the course Id to send in API
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
      const completedTopics = response.completedTopics;

      const setDashboardStats = () => {
        //   Setting the stat values
        document.querySelectorAll(".upcoming-classes-stat")[0].innerHTML = response.stats.upcomingClassesCount;
        document.querySelectorAll(".upcoming-classes-stat")[1].innerHTML = response.stats.upcomingClassesCount;

        document.querySelectorAll(".completed-classes-stat")[0].innerHTML = response.stats.completedClassesCount;
        document.querySelectorAll(".completed-classes-stat")[1].innerHTML = response.stats.completedClassesCount;

        document.querySelectorAll(".missed-classes-stat")[0].innerHTML = response.stats.missedClassesCount;
        document.querySelectorAll(".missed-classes-stat")[1].innerHTML = response.stats.missedClassesCount;

        //   Setting the stat values for topics based on course of student
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
      };

      const markTopicsCompleted = () => {
        const topicsItem = document.querySelectorAll(".topics-item");

        topicsItem.forEach((topicItem) => {
          const topicID = topicItem.querySelector(".topic-id").innerHTML;
          completedTopics.forEach((completedTopic) => {
            if (topicID == completedTopic) {
              topicItem.querySelector(".topic-completed").style.display = "flex";
              topicItem.querySelector(".topic-not-completed-wrap").style.display = "none";
            }
          });
        });
      };

      const showAllClasses = () => {
        // Hide the class templates
        document.querySelector(".classes-templates").style.display = "none";

        const classesHolder = document.querySelectorAll(".class-wrapper")[0];
        const upcomingTemplate = document.querySelectorAll(".class-dashboard-wrap.upcoming")[0];
        const completedTemplate = document.querySelectorAll(".class-dashboard-wrap.completed")[0];
        const missedTemplate = document.querySelectorAll(".class-dashboard-wrap.missed")[0];

        //     Rendering divs for each upcoming class
        response.classes.upcomingClasses.forEach((upcomingClassData) => {
          const upcomingClassDiv = upcomingTemplate.cloneNode(true);
          upcomingClassDiv.querySelector(".dashboard-class-name").innerHTML = `${
            upcomingClassData.className.split("-")[0]
          }`;

          upcomingClassDiv.querySelector(".dashboard-class-location").innerHTML = upcomingClassData.location
            ? upcomingClassData.location
            : "";

          upcomingClassDiv.querySelector(".dashboard-class-date-time").innerHTML = upcomingClassData.formattedTime
            ? upcomingClassData.formattedTime
            : "";

          if (upcomingClassData.zoomLink) {
            upcomingClassDiv.querySelector(".zoom-link").href = `${upcomingClassData.zoomLink}`;
          } else {
            upcomingClassDiv.querySelector(".zoom-link").style.display = "none";
          }

          // Appending the upcoming class Div
          classesHolder.appendChild(upcomingClassDiv);
        });
      };

      //   TODO logic to show all tests

      //   TODO logic to show all homework

      setDashboardStats();
      markTopicsCompleted();
      showAllClasses();
    });
});
