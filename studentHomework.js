console.log("Student Homework logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/homework/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const completedHomework = response.homeworkArray;

      const homeworkItems = document.querySelectorAll(".homework-wrap");

      //   Logging the templates
      console.log("response", response);

      const today = new Date();

      const dateInPast = function (firstDate) {
        if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
          return true;
        }
        return false;
      };

      completedHomework.forEach((eachHomework) => {
        homeworkItems.forEach((item) => {
          const itemName = item.querySelector(".hw-name").innerHTML;

          if (eachHomework.name == itemName) {
            item.style.display = "flex";

            if (eachHomework.completed) {
              item.querySelector(".hw-completed").style.display = "flex";
              item.querySelector(".homework-status").innerHTML = "completed";
            } else {
              const isPast = dateInPast(new Date(eachHomework.date));

              if (isPast) {
                item.querySelector(".hw-due").style.display = "flex";
                item.querySelector(".hw-due-date").innerHTML = eachHomework.momentDate;
                item.querySelector(".homework-status").innerHTML = "due";
              } else {
                item.querySelector(".hw-pending").style.display = "flex";
                item.querySelector(".hw-pending-date").innerHTML = eachHomework.momentDate;
                item.querySelector(".homework-status").innerHTML = "pending";
              }
            }
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

    console.log("all", allHomework);
  });

  //   Logic for filter Pending Button
  filterPendingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterPendingButton.classList.add("filter-button-active");
    const allHomework = document.querySelectorAll(".homework-wrap");

    console.log("all", allHomework);

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
    const allHomework = document.querySelectorAll(".homework-wrap.homework-show");
    const completedHomework = document.querySelectorAll(".homework-wrap.homework-show.homework-completed");

    console.log("all", allHomework);
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
    const allHomework = document.querySelectorAll(".homework-wrap.homework-show");
    const dueHomework = document.querySelectorAll(".homework-wrap.homework-show.homework-due");

    console.log("all", allHomework);
    allHomework.forEach((eachHomework) => {
      if (eachHomework.querySelector(".homework-status").innerHTML == "due") {
        eachHomework.style.display = "flex";
      } else {
        eachHomework.style.display = "none";
      }
    });
  });
});
