console.log("Individual Students Homework logic for Coordinator/Admin role");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split("?")[1];

  const studentID = classCourse.split("&")[0].split("=")[1];

  // Hiding the templates
  const homeworkTemplate = document.querySelector(".homework-template");
  homeworkTemplate.style.display = "none";

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

  // Function to add days
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector(".student-image").src = response.student.image;
      }
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
      document.querySelector(".student-subheading").innerHTML = response.student.email;

      document.querySelector("#student-homework").classList.add("w--current");

      //   Adding Button Links
      document.querySelector(
        "#student-classes"
      ).href = `/coordinator-admin/student-classes/?studentID=${studentID}&courseID=${response.student.courseID}`;
      document.querySelector("#student-form").href = `/coordinator-admin/student-form/?studentID=${studentID}`;
      document.querySelector("#student-tests").href = `/coordinator-admin/student-tests?studentID=${studentID}`;
      document.querySelector("#student-homework").href = `/coordinator-admin/student-homework?studentID=${studentID}`;
    });

  //   Making the api call to get classes data for the student from Classes Table
  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/homework/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      const assignedHomework = response.homeworkArray;
      const homeworkItem = document.querySelector(".dashboard-homework-wrap");
      const today = new Date();

      assignedHomework.forEach((eachHomework) => {
        const homeworkItemDiv = homeworkItem.cloneNode(true);
        if (eachHomework.completed) {
          homeworkItemDiv.querySelector(".homework-dashboard-wrap.pending").style.display = "none";
          homeworkItemDiv.querySelector(".homework-dashboard-wrap.due").style.display = "none";
          homeworkItemDiv.querySelector(".homework-dashboard-wrap.completed .homework-name").innerHTML =
            eachHomework.courseSectionHomeworkName;
        } else {
          const isPast = dateInPast(new Date(eachHomework.date).addDays(1));

          if (isPast) {
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.pending").style.display = "none";
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.completed").style.display = "none";
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.due .homework-name").innerHTML =
              eachHomework.courseSectionHomeworkName;
            homeworkItemDiv.querySelector(
              ".homework-dashboard-wrap.due .dashboard-homework-complete"
            ).href = `https://web.miniextensions.com/p9ejiPufAv3sWKtq87oe/${eachHomework.homeworkId}`;
            homeworkItemDiv.querySelector(".hw-due-date").innerHTML = eachHomework.momentDate;
          } else {
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.due").style.display = "none";
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.completed").style.display = "none";
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.pending .homework-name").innerHTML =
              eachHomework.courseSectionHomeworkName;
            homeworkItemDiv.querySelector(
              ".homework-dashboard-wrap.pending .dashboard-homework-complete"
            ).href = `https://web.miniextensions.com/p9ejiPufAv3sWKtq87oe/${eachHomework.homeworkId}`;
            homeworkItemDiv.querySelector(".hw-pending-date").innerHTML = eachHomework.momentDate;
          }
        }

        document.querySelector(".homework-holder").appendChild(homeworkItemDiv);
      });
    });
});
