import _ from 'lodash';

console.log('Individual Students Homework logic for Coordinator/Admin role');
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split('?')[1];

  const studentID = classCourse.split('&')[0].split('=')[1];

  // Hiding the templates
  const homeworkTemplate = document.querySelector('.homework-template');
  homeworkTemplate.style.display = 'none';

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  //   Function to check if date in past
  const dateInPast = function (firstDate) {
    const today = new Date();
    if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  // Function to add days
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
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

      document.querySelector('#student-homework').classList.add('w--current');

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
  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/homework/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      const assignedHomework = _.sortBy(response.homeworkArray, function (homework) {
        return homework.courseSection;
      });
      // const homeworkItem = document.querySelector('.dashboard-homework-wrap');
      const homeworkSection = document.querySelector('.student-homework-wrap');
      const homeworkCompleted = document.querySelector('.homework-dashboard-wrap.completed');
      const homeworkPending = document.querySelector('.homework-dashboard-wrap.pending');
      const homeworkDue = document.querySelector('.homework-dashboard-wrap.due');
      let topicsAndSections = [];
      let allSections = [];

      assignedHomework.forEach((eachHomework) => {
        const hwItem = {
          section: eachHomework.courseSectionHomeworkName.split(' - ')[0],
          topic: eachHomework.courseSectionHomeworkName.split(' - ')[1],
          eachHomework: eachHomework,
        };

        topicsAndSections.push(hwItem);

        allSections.push(eachHomework.courseSectionHomeworkName.split(' - ')[0]);
      });

      const uniqueSections = Array.from(new Set(allSections));

      uniqueSections.forEach((section) => {
        const homeworkSectionDiv = homeworkSection.cloneNode(true);

        homeworkSectionDiv.querySelector('.topics-section').innerHTML = section.toUpperCase();

        topicsAndSections.forEach((topicAndSection) => {
          if (topicAndSection.section === section) {
            if (topicAndSection.eachHomework.completed) {
              const homeworkCompletedDiv = homeworkCompleted.cloneNode(true);

              homeworkCompletedDiv.querySelector('.homework-name').innerHTML =
                topicAndSection.topic;
              homeworkCompletedDiv.querySelector('.hw-completed-date').innerHTML =
                topicAndSection.eachHomework.completedDate;

              homeworkSectionDiv.appendChild(homeworkCompletedDiv);
            } else {
              const isPast = dateInPast(new Date(topicAndSection.eachHomework.date).addDays(1));

              if (isPast) {
                const homeworkDueDiv = homeworkDue.cloneNode(true);

                homeworkDueDiv.querySelector('.homework-name').innerHTML = topicAndSection.topic;
                homeworkDueDiv.querySelector('.hw-due-date').innerHTML =
                  topicAndSection.eachHomework.momentDate;
                homeworkDueDiv.querySelector(
                  '.dashboard-homework-complete'
                ).href = `https://web.miniextensions.com/p9ejiPufAv3sWKtq87oe/${topicAndSection.eachHomework.homeworkId}`;

                homeworkSectionDiv.appendChild(homeworkDueDiv);
              } else {
                const homeworkPendingDiv = homeworkPending.cloneNode(true);
                homeworkPendingDiv.querySelector('.homework-name').innerHTML =
                  topicAndSection.topic;
                homeworkPendingDiv.querySelector('.hw-pending-date').innerHTML =
                  topicAndSection.eachHomework.momentDate;
                homeworkPendingDiv.querySelector(
                  '.dashboard-homework-complete'
                ).href = `https://web.miniextensions.com/p9ejiPufAv3sWKtq87oe/${topicAndSection.eachHomework.homeworkId}`;

                homeworkSectionDiv.appendChild(homeworkPendingDiv);
              }
            }
          }
        });

        document.querySelector('.homework-holder').appendChild(homeworkSectionDiv);
      });
    });
});
