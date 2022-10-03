console.log('Admin Individual Students Classes logic for admin');
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split('?')[1];

  const studentID = classCourse.split('&')[0].split('=')[1];
  const courseID = classCourse.split('&')[1].split('=')[1];

  // Hiding the templates
  const classTemplates = document.querySelector('.class-templates');
  classTemplates.style.display = 'none';

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // Function to remove course name from the topic
  const replaceCourseNames = (classTopics) => {
    return classTopics.replaceAll('SAT - ', ' ').replaceAll('ACT - ', ' ');
  };

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector('.student-image').src = response.student.image;
      }
      document.querySelector('.student-name-heading').innerHTML = response.student.name;
      document.querySelector('.student-subheading').innerHTML = response.student.email;

      document.querySelector('#student-classes').classList.add('w--current');

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

  //   Making the api call to get classes data for the student from Classes Table
  fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${studentID}-${courseID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const classesHolder = document.querySelectorAll('.classes-holder')[0];
      const upcomingTemplate = document.querySelectorAll('.class-wrap.upcoming')[0];
      const completedTemplate = document.querySelectorAll('.class-wrap.completed')[0];
      const missedTemplate = document.querySelectorAll('.class-wrap.missed')[0];

      //   Logging the templates
      // console.log('response', response);
      //   console.log("upcomingTemplate", upcomingTemplate);
      //   console.log("completedTemplate", completedTemplate);
      //   console.log("missedTemplate", missedTemplate);

      //     Rendering divs for each upcoming class
      response.upcomingClasses.forEach((upcomingClassData) => {
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(
          '.class-date-text'
        ).innerHTML = `${upcomingClassData.formattedTime}`;
        upcomingClassDiv.querySelector('.class-name').innerHTML = `${upcomingClassData.className}`;
        upcomingClassDiv.querySelector('.teacher-name').innerHTML = upcomingClassData.teacherName;

        upcomingClassDiv.querySelector('.location-text').innerHTML = upcomingClassData.location
          ? upcomingClassData.location
          : '';

        upcomingClassDiv.querySelector('.time-text').innerHTML = upcomingClassData.formattedTime
          ? upcomingClassData.formattedTime
          : '';
        upcomingClassDiv.querySelector('.button-zoom-link').href = `${upcomingClassData.zoomLink}`;
        upcomingClassDiv.querySelector(
          '.button-zoom-recording'
        ).href = `${upcomingClassData.zoomRecording}`;
        upcomingClassDiv.querySelector(
          '.view-class-button'
        ).href = `/coordinator-admin/class/?classID=${upcomingClassData.classID}`;

        if (upcomingClassData.notes && upcomingClassData.notes.trim() !== '') {
          upcomingClassDiv.querySelector('.notes-text').innerHTML = `${upcomingClassData.notes}`;
        } else {
          upcomingClassDiv.querySelector('.notes-pointer').style.display = 'none';
        }

        // Appending the upcoming class Div
        classesHolder.appendChild(upcomingClassDiv);
      });

      //   Rendering divs for each missed class
      response.completedClasses.forEach((completedClassData) => {
        const completedClassDiv = completedTemplate.cloneNode(true);
        completedClassDiv.querySelector(
          '.class-date-text'
        ).innerHTML = `${completedClassData.formattedTime}`;
        completedClassDiv.querySelector(
          '.class-name'
        ).innerHTML = `${completedClassData.className}`;
        completedClassDiv.querySelector(
          '.teacher-name'
        ).innerHTML = `${completedClassData.teacherName}`;
        if (completedClassData.classTopics) {
          const classTopics = replaceCourseNames(completedClassData.classTopics);
          completedClassDiv.querySelector('.topics-text').innerHTML = `${classTopics}`;
          completedClassDiv.querySelector('.homework-text').innerHTML = `${classTopics}`;
        } else {
          completedClassDiv.querySelector('.class-details-wrap').style.display = 'none';
        }
        completedClassDiv.querySelector(
          '.button-zoom-link'
        ).href = `${completedClassData.zoomLink}`;
        completedClassDiv.querySelector(
          '.button-zoom-recording'
        ).href = `${completedClassData.zoomRecording}`;

        completedClassDiv.querySelector(
          '.view-class-button'
        ).href = `/coordinator-admin/class/?classID=${completedClassData.classID}`;

        if (completedClassData.notes && completedClassData.notes.trim() !== '') {
          completedClassDiv.querySelector('.notes-text').innerHTML = `${completedClassData.notes}`;
        } else {
          completedClassDiv.querySelector('.notes-pointer').style.display = 'none';
        }

        // Appending the upcoming class Div
        classesHolder.appendChild(completedClassDiv);
      });

      //   Rendering divs for each completed class
      response.missedClasses.forEach((missedClassData) => {
        const missedClassDiv = missedTemplate.cloneNode(true);
        missedClassDiv.querySelector(
          '.class-date-text'
        ).innerHTML = `${missedClassData.formattedTime}`;
        missedClassDiv.querySelector('.class-name').innerHTML = `${missedClassData.className}`;
        missedClassDiv.querySelector('.teacher-name').innerHTML = `${missedClassData.teacherName}`;
        if (missedClassData.classTopics) {
          const classTopics = replaceCourseNames(missedClassData.classTopics);
          missedClassDiv.querySelector('.topics-text').innerHTML = `${classTopics}`;
          missedClassDiv.querySelector('.homework-text').innerHTML = `${classTopics}`;
        } else {
          missedClassDiv.querySelector('.class-details-wrap').style.display = 'none';
        }
        missedClassDiv.querySelector('.button-zoom-link').href = `${missedClassData.zoomLink}`;
        missedClassDiv.querySelector(
          '.button-zoom-recording'
        ).href = `${missedClassData.zoomRecording}`;
        missedClassDiv.querySelector(
          '.view-class-button'
        ).href = `/admin/class/?classID=${missedClassData.classID}`;

        if (missedClassData.notes && missedClassData.notes.trim() !== '') {
          missedClassDiv.querySelector('.notes-text').innerHTML = `${missedClassData.notes}`;
        } else {
          missedClassDiv.querySelector('.notes-pointer').style.display = 'none';
        }

        // Appending the upcoming class Div
        classesHolder.appendChild(missedClassDiv);
      });
    });
});
