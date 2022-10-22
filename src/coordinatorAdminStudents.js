// console.log('Students logic for coordinator and admin');
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }
  let airtableIdOrRole = null;

  // Get the course Id to send in API
  if (member.membership.name === 'AP Guru Coordinators') {
    airtableIdOrRole = member['airtableid'];
  } else if (member.membership.name === 'AP Guru Admin') {
    airtableIdOrRole = 'admin';
  }

  document.querySelector('.student-templates').style.display = 'none';

  const studentTemplate = document.querySelector('.students-wrap');
  const studentsHolder = document.querySelector('.students-holder');

  //   Getting value of fitlers
  const studentCourse = document.querySelector('.students-course');
  const studentSearch = document.querySelector('.students-search');

  let courseFilter = null;
  let searchFilter = null;

  studentCourse.addEventListener('change', (event) => {
    courseFilter = event.target.value;
    filterStudents();
  });

  studentSearch.addEventListener('input', (event) => {
    searchFilter = event.target.value.trim().toLowerCase();

    filterStudents();
  });

  const filterStudents = () => {
    const allStudents = document.querySelectorAll('.students-wrap');

    // If both course and search filter have value
    if (courseFilter && searchFilter) {
      allStudents.forEach((eachStudent) => {
        if (eachStudent.querySelector('.student-course-id').innerHTML !== courseFilter) {
          eachStudent.style.display = 'none';
        } else if (
          !eachStudent
            .querySelector('.student-name-text')
            .innerHTML.toLowerCase()
            .includes(searchFilter)
        ) {
          eachStudent.style.display = 'none';
        } else {
          eachStudent.style.display = 'flex';
        }
      });
    }

    // If only course filter has a value
    if (courseFilter && !searchFilter) {
      allStudents.forEach((eachStudent) => {
        if (eachStudent.querySelector('.student-course-id').innerHTML === courseFilter) {
          eachStudent.style.display = 'flex';
        } else {
          eachStudent.style.display = 'none';
        }
      });
    }

    // If only search filter has value
    if (searchFilter && !courseFilter) {
      // TODO
      allStudents.forEach((eachStudent) => {
        if (
          eachStudent
            .querySelector('.student-name-text')
            .innerHTML.toLowerCase()
            .includes(searchFilter)
        ) {
          eachStudent.style.display = 'flex';
        } else {
          eachStudent.style.display = 'none';
        }
      });
    }

    // If neither search or course filter have value
    if (!courseFilter && !searchFilter) {
      allStudents.forEach((eachStudent) => {
        eachStudent.style.display = 'flex';
      });
    }
  };

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/coordinatorAdmin/students/${airtableIdOrRole}`)
    .then((response) => response.json())
    .then((response) => {
      //   looping through each student and rendering the div
      response.allStudents.forEach((eachStudent) => {
        const studentDiv = studentTemplate.cloneNode(true);
        if (eachStudent.image) {
          studentDiv.querySelector('.student-image').src = eachStudent.image;
        }
        studentDiv.querySelector('.student-name-text').innerHTML = eachStudent.name;
        studentDiv.querySelector('.student-location').innerHTML = eachStudent.location
          ? eachStudent.location
          : '.';

        studentDiv.querySelector(
          '.student-classes'
        ).innerHTML = `${eachStudent.classesAttended} Completed, <br>
        ${eachStudent.classes} Assigned`;

        studentDiv.querySelector(
          '.student-tests'
        ).innerHTML = `${eachStudent.testsCompleted}  Completed, <br>
        ${eachStudent.testsUpcoming} Pending, <br>
        ${eachStudent.tests} Assigned `;

        studentDiv.querySelector(
          '.student-homework'
        ).innerHTML = `${eachStudent.homeworkCompleted} Completed, <br>
        ${eachStudent.homeworkPending} Pending, <br>
        ${eachStudent.homework} Assigned `;

        studentDiv.querySelector('.student-topics').innerHTML = eachStudent.topics + ' completed';
        studentDiv.querySelector('.student-course-id').innerHTML = eachStudent.courseID;
        studentDiv.href = `/coordinator-admin/student-classes/?studentID=${eachStudent.studentID}&courseID=${eachStudent.courseID}`;
        studentsHolder.append(studentDiv);
      });
    });
});
