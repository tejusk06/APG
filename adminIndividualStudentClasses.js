console.log("Admin Individual Students Classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split("?")[1];

  const studentID = classCourse.split("&")[0].split("=")[1];
  const courseID = classCourse.split("&")[1].split("=")[1];

  console.log("student ID", studentID);
  console.log("course ID", courseID);

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".student-image").src = response.student.image;
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
      document.querySelector(".student-subheading").innerHTML = response.student.email;
      document.querySelector(
        ".add-class-button"
      ).href = `https://web.miniextensions.com/obWVQWXI9bSHZEhLEug5/${studentID}`;
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
    });
});
