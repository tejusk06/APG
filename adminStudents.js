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
      //   console.log("response", response);

      //   looping through each student and rendering the div
      response.allStudents.forEach((eachStudent) => {
        const studentDiv = studentTemplate.cloneNode(true);
        if (eachStudent.image) {
          studentDiv.querySelector(".student-image").src = eachStudent.image;
        }
        studentDiv.querySelector(".student-name-text").innerHTML = eachStudent.name;
        studentDiv.querySelector(".student-location").innerHTML = eachStudent.location;
        studentDiv.querySelector(".student-classes").innerHTML = eachStudent.classes + " assigned";
        studentDiv.querySelector(".student-tests").innerHTML = eachStudent.tests + " assigned";
        studentDiv.querySelector(".student-homework").innerHTML = eachStudent.homework + " assigned";
        studentDiv.querySelector(".student-topics").innerHTML = eachStudent.topics + " assigned";
        studentDiv.href = `/admin/student-classes/?studentID=${eachStudent.studentID}&courseID=${eachStudent.courseID}`;
        studentsHolder.append(studentDiv);
      });
    });
});
