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

      const homeworkItems = document.querySelectorAll(".topic-wrap-hw");

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
              console.log("status item", item.querySelector(".hw-completed"));
              item.classList.add(".homework-completed");
            } else {
              const isPast = dateInPast(new Date(eachHomework.date));
              console.log("due?", isPast);

              if (isPast) {
                item.querySelector(".hw-due").style.display = "flex";
                item.querySelector(".hw-due-date").innerHTML = eachHomework.momentDate;
                item.classList.add(".homework-due");
              } else {
                item.querySelector(".hw-pending").style.display = "flex";
                item.querySelector(".hw-pending-date").innerHTML = eachHomework.momentDate;
                item.classList.add(".homework-pending");
              }
            }
          }
        });
      });
    });
});
