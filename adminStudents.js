console.log("Students logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  document.querySelector(".student-templates").style.display = "none";

  const studentTemplate = document.querySelector(".students-wrap");
  const studentsHolder = document.querySelector(".students-holder");

  //   Making the api call to get classes data for the student
  fetch("https://apguru-server.herokuapp.com/api/v1/admin/students")
    .then((response) => response.json())
    .then((response) => {
      response.allStudents.forEach((eachStudent) => {
        const studentDiv = studentTemplate.cloneNode(true);
        studentDiv.querySelector(".student-name-text") = eachStudent.name;
        studentDiv.querySelector(".student-location").src = eachStudent.location;
        studentDiv.querySelector(".student-classes").src = eachStudent.classes;
        studentDiv.querySelector(".student-tests").src = eachStudent.tests;
        studentDiv.querySelector(".student-homework").src = eachStudent.homework;
        studentDiv.querySelector(".student-topics").src = eachStudent.topics;

        studentsHolder.append(studentDiv);

      });
    });
});
