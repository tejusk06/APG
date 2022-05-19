console.log("Admin Individual Students Classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  //   Function to check if date in past
  const dateInPast = function (firstDate) {
    const today = new Date();
    if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  //   Hide the test templates on webflow
  document.querySelectorAll(".tests-templates")[0].style.display = "none";

  const studentID = window.location.href.split("?studentID=")[1];

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector(".student-image").src = response.student.image;
      }
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
      document.querySelector(".student-subheading").innerHTML = response.student.email;
      document.querySelector("#student-tests").href = `#`;
      document.querySelector("#student-tests").classList.add(".w--current");
      document.querySelector(
        "#student-classes"
      ).href = `/admin/student-classes/?studentID=${response.student.studentID}&courseID=${response.student.courseID}`;
    });

  //   Making the api call to get tests data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/tests/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const allTests = response.testsArray;

      const testsHolder = document.querySelectorAll(".tests-holder")[0];
      const upcomingTest = document.querySelectorAll(".test-wrap.test-upcoming")[0];
      const completedTest = document.querySelectorAll(".test-wrap.test-completed")[0];
      const missedTest = document.querySelectorAll(".test-wrap.test-missed")[0];

      //   Logging the templates
      console.log("response", response);

      allTests.forEach((eachTest) => {
        // Checking if test has report or status is checked
        const isPast = dateInPast(new Date(eachTest.dueDate));

        if (eachTest.report || eachTest.status) {
          const completedTestDiv = completedTest.cloneNode(true);
          completedTestDiv.querySelector(".test-name").innerHTML = `${eachTest.name}`;
          completedTestDiv.querySelector(".test-date").innerHTML = `${eachTest.momentDate}`;

          completedTestDiv.querySelector(".download-test-wrap").onclick = function () {
            forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
          };

          if (eachTest.report) {
            completedTestDiv.querySelector(".download-report-wrap").onclick = function () {
              forceDown(`${eachTest.report}`, `${eachTest.name} - Report`);
            };
            completedTestDiv.querySelector(".download-report-wrap").style.display = "flex";
          }

          // Appending the completed test Div
          testsHolder.appendChild(completedTestDiv);
        } else if (!isPast || eachTest.dueDate == null) {
          // This logic runs if test is upcoming and date is not selected
          const upcomingTestDiv = upcomingTest.cloneNode(true);
          upcomingTestDiv.querySelector(".test-name").innerHTML = `${eachTest.name}`;

          upcomingTestDiv.querySelector(".download-test-wrap").onclick = function () {
            forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
          };

          if (eachTest.dueDate == null) {
            upcomingTestDiv.querySelector(".date-upcoming").style.display = "none";
            upcomingTestDiv.querySelector(".date-select").style.display = "block";
            upcomingTestDiv.querySelector(".date-select").href = eachTest.editDateUrl;
          } else {
            upcomingTestDiv.querySelector(".date-upcoming").innerHTML = `${eachTest.momentDate}`;
          }

          // Appending the completed test Div
          testsHolder.appendChild(upcomingTestDiv);
        } else if (isPast) {
          // this logic runs is test is past due date
          const missedTestDiv = missedTest.cloneNode(true);
          missedTestDiv.querySelector(".test-name").innerHTML = `${eachTest.name}`;
          missedTestDiv.querySelector(".test-date").innerHTML = `${eachTest.momentDate}`;

          missedTestDiv.querySelector(".download-test-wrap").onclick = function () {
            forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
          };

          // Appending the completed test Div
          testsHolder.appendChild(missedTestDiv);
        }
      });
    });
});
