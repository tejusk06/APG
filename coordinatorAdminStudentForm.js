console.log("Admin Individual Students Classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentID = window.location.href.split("?studentID=")[1];

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector(".student-image").src = response.student.image;
      }
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
      document.querySelector(".student-subheading").innerHTML = response.student.email ? response.student.email : "";
      document.querySelector("#student-form").classList.add("w--current");

      //   Adding Button Links
      document.querySelector(
        "#student-classes"
      ).href = `/coordinator-admin/student-classes/?studentID=${response.student.id}&courseID=${response.student.courseID}`;
      document.querySelector(
        "#student-form"
      ).href = `/coordinator-admin/student-form/?studentID=${response.student.id}`;
      document.querySelector("#student-tests").href = `/coordinator-admin/student-tests?studentID=${studentID}`;
    });
});
