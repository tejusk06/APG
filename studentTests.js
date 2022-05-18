console.log("Student Test logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

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

      const today = new Date();

      const dateInPast = function (firstDate) {
        if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
          return true;
        }
        return false;
      };

      allTests.forEach((eachTest) => {
        // Checking if test has report or status is checked
        if (eachTest.report || eachTest.status) {
          //   Function to force download Files

          const completedTestDiv = completedTest.cloneNode(true);
          completedTestDiv.querySelector(".test-name").innerHTML = `${eachTest.name}`;
          completedTestDiv.querySelector(".test-date").innerHTML = `${eachTest.momentDate}`;

          completedTestDiv.querySelector(".download-test-wrap").onclick = function () {
            forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
          };

          if (eachTest.report) {
            completedTestDiv.querySelector(".download-report-wrap").href = `${eachTest.report}`;
            completedTestDiv.querySelector(".download-report-wrap").onclick = function () {
              forceDown(`${eachTest.report}`, `${eachTest.name} - Report`);
            };
            completedTestDiv.querySelector(".download-report-wrap").style.display = "flex";
          }

          // Appending the completed test Div
          testsHolder.appendChild(completedTestDiv);
        }
      });
    });

  // Adding show and hide logic for filter buttons
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterAllButton = document.querySelector("#filter-all");
  const filterPendingButton = document.querySelector("#filter-pending");
  const filterCompletedButton = document.querySelector("#filter-completed");
  const filterDueButton = document.querySelector("#filter-due");

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
    const allHomework = document.querySelectorAll(".homework-wrap");

    allHomework.forEach((eachHomework) => {
      if (eachHomework.querySelector(".homework-status").innerHTML != "null") {
        eachHomework.style.display = "flex";
      } else {
        eachHomework.style.display = "none";
      }
    });
  });

  //   Logic for filter Pending Button
  filterPendingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterPendingButton.classList.add("filter-button-active");
    const allHomework = document.querySelectorAll(".homework-wrap");

    allHomework.forEach((eachHomework) => {
      if (eachHomework.querySelector(".homework-status").innerHTML == "pending") {
        eachHomework.style.display = "flex";
      } else {
        eachHomework.style.display = "none";
      }
    });
  });

  //   Logic for filter Completed Button
  filterCompletedButton.addEventListener("click", function () {
    allButtonsInactive();
    filterCompletedButton.classList.add("filter-button-active");
    const allHomework = document.querySelectorAll(".homework-wrap");

    allHomework.forEach((eachHomework) => {
      if (eachHomework.querySelector(".homework-status").innerHTML == "completed") {
        eachHomework.style.display = "flex";
      } else {
        eachHomework.style.display = "none";
      }
    });
  });

  //   Logic for filter due Button
  filterDueButton.addEventListener("click", function () {
    allButtonsInactive();
    filterDueButton.classList.add("filter-button-active");
    const allHomework = document.querySelectorAll(".homework-wrap");

    allHomework.forEach((eachHomework) => {
      if (eachHomework.querySelector(".homework-status").innerHTML == "due") {
        eachHomework.style.display = "flex";
      } else {
        eachHomework.style.display = "none";
      }
    });
  });
});
