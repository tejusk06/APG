console.log("Individual Students Homework logic for Coordinator/Admin role");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split("?")[1];

  const studentID = classCourse.split("&")[0].split("=")[1];
  const courseID = classCourse.split("&")[1].split("=")[1];

  // Hiding the templates
  const classTemplates = document.querySelector(".class-templates");
  classTemplates.style.display = "none";

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // Function to remove course name from the topic
  const replaceCourseNames = (classTopics) => {
    return classTopics.replaceAll("SAT - ", " ").replaceAll("ACT - ", " ");
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

      document.querySelector("#student-classes").classList.add("w--current");

      //   Adding Button Links
      document.querySelector(
        "#student-classes"
      ).href = `/coordinator-admin/student-classes/?studentID=${studentID}&courseID=${courseID}`;
      document.querySelector("#student-form").href = `/coordinator-admin/student-form/?studentID=${studentID}`;
      document.querySelector("#student-tests").href = `/coordinator-admin/student-tests?studentID=${studentID}`;
      document.querySelector("#student-homework").href = `/coordinator-admin/student-tests?studentID=${studentID}`;
    });

  //   Making the api call to get classes data for the student from Classes Table
  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/homework/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      const assignedHomework = response.homeworkArray;
      const homeworkItem = document.querySelector(".dashboard-homework-wrap");
      const today = new Date();

      assignedHomework.forEach((eachHomework) => {
        if (eachHomework.completed) {
          const homeworkItemDiv = homeworkItem.cloneNode(true);
          homeworkItemDiv.querySelector(".homework-dashboard-wrap.pending").style.display = "none";
          homeworkItemDiv.querySelector(".homework-dashboard-wrap.due").style.display = "none";
          homeworkItemDiv.querySelector(".homework-dashboard-wrap.completed .homework-name").innerHTML =
            eachHomework.courseSectionHomeworkName;
        } else {
          const isPast = dateInPast(new Date(eachHomework.date).addDays(1));

          if (isPast) {
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.pending").style.display = "none";
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.completed").style.display = "none";
            homeworkItemDiv.querySelector(
              ".homework-dashboard-wrap.due .dashboard-homework-complete"
            ).href = `https://web.miniextensions.com/p9ejiPufAv3sWKtq87oe/${eachHomework.homeworkId}`;
            homeworkItemDiv.querySelector(".hw-due-date").innerHTML = eachHomework.momentDate;
          } else {
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.due").style.display = "none";
            homeworkItemDiv.querySelector(".homework-dashboard-wrap.completed").style.display = "none";
            homeworkItemDiv.querySelector(
              ".homework-dashboard-wrap.pending .dashboard-homework-complete"
            ).href = `https://web.miniextensions.com/p9ejiPufAv3sWKtq87oe/${eachHomework.homeworkId}`;
            homeworkItemDiv.querySelector(".hw-pending-date").innerHTML = eachHomework.momentDate;
          }
        }
      });
    });
});
