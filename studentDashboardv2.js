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

  //   Function to force download
  function forceDown(url, filename) {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    });
  }

  //   Function to check if date in past
  const dateInPast = function (firstDate) {
    const today = new Date();
    if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  // Function to add days
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get student stats from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/student/dashboard-v2/${studentAirtableID}-${courseID}`)
    .then((response) => response.json())
    .then((response) => {
      console.log("response", response);
      const completedTopics = response.completedTopics;

      //   Logic to show Dashboard stats
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

      //   Logic to show Topics completed
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

      //   Logic to show all Classes
      const showAllClasses = () => {
        // Hide the class templates
        document.querySelector(".classes-templates").style.display = "none";

        const classesHolder = document.querySelectorAll(".class-wrapper")[0];
        const upcomingTemplate = document.querySelectorAll(".class-dashboard-wrap.upcoming")[0];
        const completedTemplate = document.querySelectorAll(".class-dashboard-wrap.completed")[0];
        const missedTemplate = document.querySelectorAll(".class-dashboard-wrap.missed")[0];

        //     Rendering divs for each upcoming classes
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
            upcomingClassDiv.querySelector(".dashboard-class-zoom-link").href = `${upcomingClassData.zoomLink}`;
          } else {
            upcomingClassDiv.querySelector(".dashboard-class-zoom-link").style.display = "none";
          }

          // Appending the upcoming class Div
          classesHolder.appendChild(upcomingClassDiv);
        });

        //     Rendering divs for each completed classes
        response.classes.completedClasses.forEach((completedClassData) => {
          const completedClassDiv = completedTemplate.cloneNode(true);
          completedClassDiv.querySelector(".dashboard-class-name").innerHTML = `${
            completedClassData.className.split("-")[0]
          }`;

          completedClassDiv.querySelector(".dashboard-class-location").innerHTML = completedClassData.location
            ? completedClassData.location
            : "";

          completedClassDiv.querySelector(".dashboard-class-date-time").innerHTML = completedClassData.formattedTime
            ? completedClassData.formattedTime
            : "";

          if (completedClassData.zoomRecording) {
            completedClassDiv.querySelector(
              ".dashboard-class-zoom-recording"
            ).href = `${completedClassData.zoomRecording}`;
          } else {
            completedClassDiv.querySelector(".dashboard-class-zoom-recording").style.display = "none";
          }

          // Appending the upcoming class Div
          classesHolder.appendChild(completedClassDiv);
        });

        //     Rendering divs for each completed classes
        response.classes.missedClasses.forEach((missedClassData) => {
          const missedClassDiv = missedTemplate.cloneNode(true);
          missedClassDiv.querySelector(".dashboard-class-name").innerHTML = `${
            missedClassData.className.split("-")[0]
          }`;

          missedClassDiv.querySelector(".dashboard-class-location").innerHTML = missedClassData.location
            ? missedClassData.location
            : "";

          missedClassDiv.querySelector(".dashboard-class-date-time").innerHTML = missedClassData.formattedTime
            ? missedClassData.formattedTime
            : "";

          if (missedClassData.zoomRecording) {
            missedClassDiv.querySelector(".dashboard-class-zoom-recording").href = `${missedClassData.zoomRecording}`;
          } else {
            missedClassDiv.querySelector(".dashboard-class-zoom-recording").style.display = "none";
          }

          // Appending the upcoming class Div
          classesHolder.appendChild(missedClassDiv);
        });
      };

      //   Logic to show All Tests
      const showAllTests = () => {
        document.querySelector(".dashboard-tests-templates").style.display = "none";

        const allTests = response.testsArray;

        const testsHolder = document.querySelectorAll(".tests-wrapper")[0];
        const upcomingTest = document.querySelectorAll(".test-dashboard-wrap.upcoming")[0];
        const completedTest = document.querySelectorAll(".test-dashboard-wrap.completed")[0];
        const missedTest = document.querySelectorAll(".test-dashboard-wrap.missed")[0];

        response.testsArray.forEach((eachTest) => {
          // Checking if test has report or status is checked
          const isPast = dateInPast(new Date(eachTest.dueDate).addDays(1));

          if (eachTest.report || eachTest.status) {
            // This logc runs if test is completed - either report is present or status is completed
            const completedTestDiv = completedTest.cloneNode(true);
            completedTestDiv.querySelector(".dashboard-test-name").innerHTML = `${eachTest.name}`;
            completedTestDiv.querySelector(".dashboard-test-date").innerHTML = `${eachTest.momentDate}`;

            if (eachTest.report) {
              completedTestDiv.querySelector(".dashboard-download-report-wrap").onclick = function () {
                forceDown(`${eachTest.report}`, `${eachTest.name} - Report`);
              };
            } else {
              completedTestDiv.querySelector(".dashboard-download-report-wrap").style.display = "none";
            }

            // Appending the completed test Div
            testsHolder.appendChild(completedTestDiv);
          } else if (!isPast || eachTest.dueDate == null) {
            // This logic runs if test is upcoming and date is not selected
            const upcomingTestDiv = upcomingTest.cloneNode(true);
            upcomingTestDiv.querySelector(".dashboard-test-name").innerHTML = `${eachTest.name}`;
            upcomingTestDiv.querySelector(".dashboard-test-date").innerHTML = `${eachTest.momentDate}`;

            upcomingTestDiv.querySelector(".dashboard-download-test-wrap").onclick = function () {
              forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
            };

            if (eachTest.dueDate != null) {
              upcomingTestDiv.querySelector(".dashboard-test-date").innerHTML = `${eachTest.momentDate}`;
            } else {
              upcomingTestDiv.querySelector(".dashboard-test-date").style.display = "none";
            }

            // Appending the completed test Div
            testsHolder.appendChild(upcomingTestDiv);
          } else if (isPast) {
            // this logic runs is test is past due date
            const missedTestDiv = missedTest.cloneNode(true);
            missedTestDiv.querySelector(".dashboard-test-name").innerHTML = `${eachTest.name}`;
            missedTestDiv.querySelector(".dashboard-test-date").innerHTML = `${eachTest.momentDate}`;

            missedTestDiv.querySelector(".dashboard-download-test-wrap").onclick = function () {
              forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
            };

            // Appending the completed test Div
            testsHolder.appendChild(missedTestDiv);
          }
        });
      };

      //   TODO logic to show all homework

      setDashboardStats();
      markTopicsCompleted();
      showAllClasses();
      showAllTests();
    });
});
