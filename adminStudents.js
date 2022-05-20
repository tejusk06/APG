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

  //   Getting value or fitlers
  const studentCourse = document.querySelector(".students-course");
  const studentSearch = document.querySelector(".students-search");

  let courseFilter = null;
  let searchFilter = null;

  studentCourse.addEventListener("change", (event) => {
    console.log(`You selected course ${event.target.value}`);
    courseFilter = event.target.value;

    filterStudents();
  });

  studentSearch.addEventListener("input", (event) => {
    console.log(`You selected search ${event.target.value}`);
    searchFilter = event.target.value.trim().toLowerCase();

    filterStudents();
  });

  const filterStudents = () => {
    const allStudents = document.querySelectorAll(".students-wrap");
    console.log("got all students");
    console.log("course filter is -", courseFilter);
    console.log("search filter is -", searchFilter);

    // If only course filter has a value
    if (courseFilter && !searchFilter) {
      //   console.log("course filter has value");
      allStudents.forEach((eachStudent) => {
        // console.log("enter student loop");

        if (eachStudent.querySelector(".student-course-id").innerHTML == courseFilter) {
          eachStudent.style.display = "flex";
          //   console.log("student belongs to course");
        } else {
          eachStudent.style.display = "none";
          //   console.log("student doesn't belong to course");
        }
      });
    }

    // If only search filter has value
    if (searchFilter && !courseFilter) {
      console.log("course filter has value");
      // TODO
      allStudents.forEach((eachStudent) => {
        if (eachStudent.querySelector(".student-name-text").innerHTML.toLowerCase().includes(searchFilter)) {
          eachStudent.style.display = "flex";
        } else {
          eachStudent.style.display = "none";
        }
      });
    }

    // If neither search or course filter have value
    if (!courseFilter && !searchFilter) {
      allStudents.forEach((eachStudent) => {
        eachStudent.style.display = "flex";
      });
    }
  };

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
        studentDiv.querySelector(".student-course-id").innerHTML = eachStudent.courseID;
        studentDiv.href = `/admin/student-classes/?studentID=${eachStudent.studentID}&courseID=${eachStudent.courseID}`;
        studentsHolder.append(studentDiv);
      });
    });
});
