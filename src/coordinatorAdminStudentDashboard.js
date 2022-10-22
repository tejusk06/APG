// console.log('Individual Students Dashboard logic for Coordinator/Admin role');
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split('?')[1];

  const studentID = classCourse.split('&')[0].split('=')[1];
  const courseID = classCourse.split('&')[1].split('=')[1];

  let studentCourse = null;

  if (courseID === 'recQ9LlXahxGsLY8I') {
    studentCourse = 'SAT';
  } else if (courseID === reccXht5MjmINAccQ) {
    studentCourse = 'ACT';
  }

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector('.student-image').src = response.student.image;
      }
      document.querySelector('.student-name-heading').innerHTML = response.student.name;
      document.querySelector('.student-subheading').innerHTML = response.student.email;

      document.querySelector('#student-dashboard').classList.add('w--current');

      document.querySelector('.english-classes-attended').innerHTML =
        response.student.englishClassesAttended;
      document.querySelector('.math-classes-attended').innerHTML =
        response.student.mathClassesAttended;
      document.querySelector('.completed-tests').innerHTML = response.student.completedTests;
      document.querySelector('.overdue-tests').innerHTML = response.student.pendingTests;
      document.querySelector('.math-topics-completed').innerHTML =
        response.student.satMathTopicsCompleted;

      document.querySelector('.completed-tests').innerHTML = response.student.completedTests;
      document.querySelector('.overdue-tests').innerHTML = response.student.pendingTests;
      document.querySelector('.math-homework-completed').innerHTML =
        response.student.mathHomeworkCompleted;
      document.querySelector('.math-homework-pending').innerHTML =
        response.student.mathHomeworkPending;
      document.querySelector('.reading-homework-completed').innerHTML =
        response.student.readingHomeworkCompleted;
      document.querySelector('.reading-homework-pending').innerHTML =
        response.student.readingHomeworkPending;
      document.querySelector('.writing-homework-completed').innerHTML =
        response.student.writingHomeworkCompleted;
      document.querySelector('.writing-homework-pending').innerHTML =
        response.student.writingHomeworkPending;

      // Conditions if the student belongs to either SAT or ACT
      if (studentCourse === 'SAT') {
        document.querySelector('.reading-topics-completed').innerHTML =
          response.student.satReadingTopicsCompleted;

        document.querySelector('.writing-topics-completed').innerHTML =
          response.student.satWritingTopicsCompleted;

        document.querySelector('#science-classes').style.display = 'none';
        document.querySelector('#science-topics').style.display = 'none';
        document.querySelector('#science-homework').style.display = 'none';
        document.querySelector('#english-topics').style.display = 'none';
      } else if (studentCourse === 'ACT') {
        document.querySelector('#writing-topics').style.display = 'none';
        document.querySelector('.total-reading-topics').innerHTML = '12';

        document.querySelector('.reading-topics-completed').innerHTML =
          response.student.actReadingTopicsCompleted;

        document.querySelector('.english-topics-completed').innerHTML =
          response.student.actEnglishTopicsCompleted;

        document.querySelector('.science-classes-attended').innerHTML =
          response.student.scienceClassesAttended;
        document.querySelector('.science-topics-completed').innerHTML =
          response.student.actScienceTopicsCompleted;

        document.querySelector('.science-homework-completed').innerHTML =
          response.student.scienceHomeworkCompleted;
        document.querySelector('.science-homework-pending').innerHTML =
          response.student.scienceHomeworkPending;
      }

      //   Adding Button Links
      document.querySelector(
        '#student-dashboard'
      ).href = `/coordinator-admin/student-dashboard/?studentID=${studentID}&courseID=${response.student.courseID}`;
      document.querySelector(
        '#student-classes'
      ).href = `/coordinator-admin/student-classes/?studentID=${studentID}&courseID=${response.student.courseID}`;
      document.querySelector(
        '#student-form'
      ).href = `/coordinator-admin/student-form/?studentID=${studentID}`;
      document.querySelector(
        '#student-tests'
      ).href = `/coordinator-admin/student-tests?studentID=${studentID}`;
      document.querySelector(
        '#student-homework'
      ).href = `/coordinator-admin/student-homework?studentID=${studentID}`;
      document.querySelector(
        '#student-topics'
      ).href = `/coordinator-admin/student-topics?studentID=${studentID}`;
    });
});
