console.log("Admin Individual Students Classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector(".student-image").src = response.student.image;
      }
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
      document.querySelector(".student-subheading").innerHTML = response.student.email;
      document.querySelector(
        ".add-classes-button"
      ).href = `https://web.miniextensions.com/obWVQWXI9bSHZEhLEug5/${studentID}`;

      document.querySelector("#student-tests").href = `#`;
      document.querySelector("#student-tests").classList.add(".w--current");
      document.querySelector(
        "#student-classes"
      ).href = `/admin/student-classes/?studentID=${response.student.studentID}&courseID=${response.student.courseID}`;
    });
});
