console.log("Student Test logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

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

  //   Hide the test templates on webflow
  document.querySelectorAll(".tests-templates")[0].style.display = "none";

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/tests/student/${studentAirtableID}`)
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
          //   Function to force download Files

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

  // Adding show and hide logic for filter buttons
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterAllButton = document.querySelector("#filter-all");
  const filterUpcomingButton = document.querySelector("#filter-upcoming");
  const filterCompletedButton = document.querySelector("#filter-completed");
  const filterMissedButton = document.querySelector("#filter-missed");

  //   Common logic to make all button inactive
  const allButtonsInactive = () => {
    filterButtons.forEach((button) => {
      if (button.classList.contains("filter-button-active")) {
        button.classList.remove("filter-button-active");
      }
    });
  };

  //   Logic for Filter all button
  filterAllButton.addEventListener("click", function () {
    allButtonsInactive();
    filterAllButton.classList.add("filter-button-active");
    const allTests = document.querySelectorAll(".test-wrap");

    allTests.forEach((eachTest) => {
      eachTest.style.display = "flex";
    });
  });

  //   Logic for filter Pending Button
  filterUpcomingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterUpcomingButton.classList.add("filter-button-active");
    const allTests = document.querySelectorAll(".test-wrap");

    allTests.forEach((eachTest) => {
      if (eachTest.querySelector(".test-status").innerHTML == "Upcoming") {
        eachTest.style.display = "flex";
      } else {
        eachTest.style.display = "none";
      }
    });
  });

  //   Logic for filter Completed Button
  filterCompletedButton.addEventListener("click", function () {
    allButtonsInactive();
    filterCompletedButton.classList.add("filter-button-active");
    const allTests = document.querySelectorAll(".test-wrap");

    allTests.forEach((eachTest) => {
      if (eachTest.querySelector(".test-status").innerHTML == "Completed") {
        eachTest.style.display = "flex";
      } else {
        eachTest.style.display = "none";
      }
    });
  });

  //   Logic for filter due Button
  filterMissedButton.addEventListener("click", function () {
    allButtonsInactive();
    filterDueButton.classList.add("filter-button-active");
    const allTests = document.querySelectorAll(".test-wrap");

    allTests.forEach((eachTest) => {
      if (eachTest.querySelector(".test-status").innerHTML == "Missed") {
        eachTest.style.display = "flex";
      } else {
        eachTest.style.display = "none";
      }
    });
  });
});
