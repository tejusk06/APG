console.log("Student Homework logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

  document.querySelectorAll(".homework-wrap").forEach((eachHomework) => {
    eachHomework.style.display = "none";
  });

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/homework/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const completedHomework = response.homeworkArray;

      const homeworkItems = document.querySelectorAll(".homework-wrap");

      //   Logging the templates
      console.log("response", response);

      //   Function to force download homework
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

      const today = new Date();

      const dateInPast = function (firstDate) {
        if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
          return true;
        }
        return false;
      };

      completedHomework.forEach((eachHomework) => {
        homeworkItems.forEach((hwItem) => {
          const hwItemName = hwItem.querySelector(".hw-name").innerHTML;
          const hwTopicId = hwItem.querySelector(".topic-id");

          //   First check if topic ID has been set in webflow CMS
          if (hwTopicId) {
            const hwTopicNumber = hwTopicId.innerHTML;
            if (eachHomework.topicId == hwTopicNumber) {
              hwItem.style.display = "flex";
              const homeworkName = hwItem.querySelector(".hw-name").innerHTML;

              if (eachHomework.attachment) {
                hwItem.querySelector(".hw-download-btn").onclick = function () {
                  forceDown(`${eachHomework.attachment}`, `${homeworkName} - Homework`);
                };
              } else {
                hwItem.querySelector(".hw-download-btn").style.display = "none";
              }

              if (eachHomework.completed) {
                hwItem.querySelector(".hw-completed").style.display = "flex";
                hwItem.querySelector(".homework-status").innerHTML = "completed";
              } else {
                const isPast = dateInPast(new Date(eachHomework.date));

                if (isPast) {
                  hwItem.querySelector(".hw-due").style.display = "flex";
                  hwItem.querySelector(".hw-due-date").innerHTML = eachHomework.momentDate;
                  hwItem.querySelector(".homework-status").innerHTML = "due";
                } else {
                  hwItem.querySelector(".hw-pending").style.display = "flex";
                  hwItem.querySelector(".hw-pending-date").innerHTML = eachHomework.momentDate;
                  hwItem.querySelector(".homework-status").innerHTML = "pending";
                }
              }
            }

            //   Check if topic ID matches
          }
        });
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
