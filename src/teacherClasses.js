// console.log('teacher classes logic ');

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // If member is logged in then continue this logic

  // Hiding the templates
  const classTemplates = document.querySelector('.class-templates');
  classTemplates.style.display = 'none';

  const teacherAirtableID = member['airtableid'];

  // Function to remove course name from the topic
  const replaceCourseNames = (classTopics) => {
    return classTopics.replaceAll('SAT - ', ' ').replaceAll('ACT - ', ' ');
  };

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-apis.herokuapp.com/api/v1/classes/teacher/${teacherAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const classesHolder = document.querySelectorAll('.classes-holder')[0];
      const upcomingTemplate = document.querySelectorAll('.class-wrap.upcoming')[0];
      const completedTemplate = document.querySelectorAll('.class-wrap.completed')[0];
      const overdueTemplate = document.querySelectorAll('.class-wrap.overdue')[0];

      //     Rendering divs for each upcoming class
      response.upcomingClasses.forEach((upcomingClassData) => {
        document.querySelector('.empty-message').style.display = 'none';
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(
          '.class-date-text'
        ).innerHTML = `${upcomingClassData.formattedTime}`;
        upcomingClassDiv.querySelector('.class-name').innerHTML = `${
          upcomingClassData.className.split('-')[0]
        }`;
        upcomingClassDiv.querySelector(
          '.teacher-name'
        ).innerHTML = `${upcomingClassData.teacherName}`;

        upcomingClassDiv.querySelector('.location-text').innerHTML = upcomingClassData.location
          ? upcomingClassData.location
          : '';

        upcomingClassDiv.querySelector('.time-text').innerHTML = upcomingClassData.formattedTime
          ? upcomingClassData.formattedTime
          : '';

        if (upcomingClassData.students) {
          upcomingClassDiv.querySelector(
            '.students-text'
          ).innerHTML = `${upcomingClassData.students}`;
        } else {
          upcomingClassDiv.querySelector('.students-list').style.display = 'none';
        }

        if (upcomingClassData.zoomLink) {
          upcomingClassDiv.querySelector(
            '.button-zoom-link'
          ).href = `${upcomingClassData.zoomLink}`;
        } else {
          upcomingClassDiv.querySelector('.button-zoom-link').style.display = 'none';
        }

        upcomingClassDiv.querySelector(
          '.view-class-button'
        ).href = `/teacher/class/?classID=${upcomingClassData.classID}`;

        if (upcomingClassData.notes && upcomingClassData.notes.trim() !== '') {
          upcomingClassDiv.querySelector('.notes-text').innerHTML = `${upcomingClassData.notes}`;
        } else {
          upcomingClassDiv.querySelector('.notes-pointer').style.display = 'none';
        }

        upcomingClassDiv.querySelector(
          '.days-from-today'
        ).innerHTML = `${upcomingClassData.daysFromToday}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(upcomingClassDiv);
      });

      //     Rendering divs for each overdue class
      response.overdueClasses.forEach((overdueClassData) => {
        const overdueClassDiv = overdueTemplate.cloneNode(true);
        overdueClassDiv.querySelector(
          '.class-date-text'
        ).innerHTML = `${overdueClassData.formattedTime}`;
        overdueClassDiv.querySelector('.class-name').innerHTML = `${
          overdueClassData.className.split('-')[0]
        }`;
        overdueClassDiv.querySelector(
          '.teacher-name'
        ).innerHTML = `${overdueClassData.teacherName}`;
        overdueClassDiv.querySelector('.student-names').innerHTML = overdueClassData.studentNames
          ? `${overdueClassData.studentNames}`
          : ' ';

        overdueClassDiv.querySelector(
          '.teacher-name'
        ).innerHTML = `${overdueClassData.teacherName}`;

        overdueClassDiv.querySelector('.location-text').innerHTML = overdueClassData.location
          ? overdueClassData.location
          : '';

        overdueClassDiv.querySelector('.time-text').innerHTML = overdueClassData.formattedTime
          ? overdueClassData.formattedTime
          : '';

        if (overdueClassData.students) {
          overdueClassDiv.querySelector(
            '.students-text'
          ).innerHTML = `${overdueClassData.students}`;
        } else {
          overdueClassDiv.querySelector('.students-list').style.display = 'none';
        }

        if (overdueClassData.notes && overdueClassData.notes.trim() !== '') {
          overdueClassDiv.querySelector('.notes-text').innerHTML = `${overdueClassData.notes}`;
        } else {
          overdueClassDiv.querySelector('.notes-pointer').style.display = 'none';
        }

        overdueClassDiv.querySelector(
          '.course-section'
        ).innerHTML = `${overdueClassData.courseSection}`;
        overdueClassDiv.querySelector('.course-id').innerHTML = `${overdueClassData.courseID}`;

        if (overdueClassData.zoomLink) {
          overdueClassDiv.querySelector('.button-zoom-link').href = `${overdueClassData.zoomLink}`;
        } else {
          overdueClassDiv.querySelector('.button-zoom-link').style.display = 'none';
        }

        overdueClassDiv.querySelector(
          '.view-class-button'
        ).href = `/teacher/class/?classID=${overdueClassData.classID}`;

        // Appending the overdue class Div
        classesHolder.appendChild(overdueClassDiv);
      });

      //   Rendering divs for each completed class
      response.completedClasses.forEach((completedClassData) => {
        document.querySelector('.empty-message').style.display = 'none';
        const completedClassDiv = completedTemplate.cloneNode(true);
        completedClassDiv.querySelector(
          '.class-date-text'
        ).innerHTML = `${completedClassData.formattedTime}`;
        completedClassDiv.querySelector('.class-name').innerHTML = `${
          completedClassData.className.split('-')[0]
        }`;
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

        if (completedClassData.students) {
          completedClassDiv.querySelector(
            '.students-text'
          ).innerHTML = `${completedClassData.students}`;
        } else {
          completedClassDiv.querySelector('.students-list').style.display = 'none';
        }

        if (completedClassData.zoomRecording) {
          completedClassDiv.querySelector(
            '.button-zoom-recording'
          ).href = `${completedClassData.zoomRecording}`;
        } else {
          completedClassDiv.querySelector('.button-zoom-recording').style.display = 'none';
        }

        completedClassDiv.querySelector(
          '.view-class-button'
        ).href = `/teacher/class/?classID=${completedClassData.classID}`;

        if (completedClassData.notes && completedClassData.notes.trim() !== '') {
          completedClassDiv.querySelector('.notes-text').innerHTML = `${completedClassData.notes}`;
        } else {
          completedClassDiv.querySelector('.notes-pointer').style.display = 'none';
        }

        // Appending the upcoming class Div
        classesHolder.appendChild(completedClassDiv);
      });
    });

  // Filters logic below
  //   Getting value of filters
  const classDate = document.querySelector('.classes-date');

  let statusFilter = '';
  let dateFilter = '';

  // Adding show and hide logic for filter buttons
  const classesHolder = document.querySelector('.classes-holder');
  const filterButtons = document.querySelectorAll('.filter-button');
  const filterAllButton = document.querySelector('#filter-all');
  const filterUpcomingButton = document.querySelector('#filter-upcoming');
  const filterCompletedButton = document.querySelector('#filter-completed');
  const filterOverdueButton = document.querySelector('#filter-overdue');

  const filterClasses = () => {
    //   TODO filter classes logic
    const allClasses = classesHolder.querySelectorAll('.class-wrap');

    // Show all classes first
    allClasses.forEach((eachClass) => {
      if (eachClass.classList.contains('hide')) {
        eachClass.classList.remove('hide');
      }
    });

    // hide the ones that don't match status
    if (statusFilter) {
      allClasses.forEach((eachClass) => {
        if (!eachClass.classList.contains(`${statusFilter}`)) {
          eachClass.classList.add('hide');
        }
      });
    }

    // hide if date is not within range
    if (dateFilter) {
      allClasses.forEach((eachClass) => {
        if (eachClass.classList.contains(`upcoming`)) {
          if (
            parseInt(eachClass.querySelector('.days-from-today').innerHTML) > dateFilter ||
            parseInt(eachClass.querySelector('.days-from-today').innerHTML) < 0
          ) {
            if (!eachClass.classList.contains('hide')) {
              eachClass.classList.add('hide');
            }
          }
        } else {
          eachClass.classList.add('hide');
        }
      });
    }

    document.querySelector('.empty-message').style.display = 'flex';

    // Show empty message if no classes match the criteria
    allClasses.forEach((eachClass) => {
      if (!eachClass.classList.contains('hide')) {
        document.querySelector('.empty-message').style.display = 'none';
      }
    });
  };

  classDate.addEventListener('change', (event) => {
    dateFilter = event.target.value;

    filterClasses();
  });

  //   Common logic to make all button inactive
  const allButtonsInactive = () => {
    filterButtons.forEach((button) => {
      if (button.classList.contains('filter-button-active')) {
        button.classList.remove('filter-button-active');
      }
    });
  };

  //   Logic for Filter all button
  filterAllButton.addEventListener('click', function () {
    allButtonsInactive();
    filterAllButton.classList.add('filter-button-active');

    statusFilter = '';
    filterClasses();
  });

  //   Logic for filter Upcoming Button
  filterUpcomingButton.addEventListener('click', function () {
    allButtonsInactive();
    filterUpcomingButton.classList.add('filter-button-active');

    statusFilter = 'upcoming';
    filterClasses();
  });

  //   Logic for filter Overdue Button
  filterOverdueButton.addEventListener('click', function () {
    allButtonsInactive();
    filterOverdueButton.classList.add('filter-button-active');

    statusFilter = 'overdue';
    filterClasses();
  });

  //   Logic for filter Completed Button
  filterCompletedButton.addEventListener('click', function () {
    allButtonsInactive();
    filterCompletedButton.classList.add('filter-button-active');

    statusFilter = 'completed';
    filterClasses();
  });
});
