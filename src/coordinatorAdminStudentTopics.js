import _ from 'lodash';

// console.log('Individual Students Homework logic for Coordinator/Admin role');
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split('?')[1];
  const studentID = classCourse.split('&')[0].split('=')[1];

  // Hiding the templates
  document.querySelector('.student-topics-template').style.display = 'none';

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

      document.querySelector('#student-topics').classList.add('w--current');

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

      //   Adding the topics
      const topicItem = document.querySelector('.topics-admin-wrap');

      let topicsAndSections = [];

      // Getting unique sections
      const uniqueSections = new Set(response.student.completedTopicsSections);
      const arrayUniqueSections = Array.from(uniqueSections);

      response.student.completedTopics.forEach((topicName, n) => {
        let topicAndSection = {
          topicName: topicName.split('-')[1],
          sectionName: response.student.completedTopicsSections[n],
        };

        topicsAndSections.push(topicAndSection);
      });

      // Sorting topics and sections
      const sortedTopicsAndSections = _.sortBy(topicsAndSections, function (topicAndSection) {
        return topicAndSection.sectionName;
      });

      const sortedUniqueSections = _.sortBy(arrayUniqueSections, function (uniqueSection) {
        return uniqueSection;
      });

      // rendering the topics sorted within their sections
      sortedUniqueSections.forEach((sectionName) => {
        const sectionDiv = topicItem.cloneNode(true);

        sectionDiv.querySelector('.topics-section').innerHTML =
          sectionName.split('-')[0].toUpperCase() +
          ' ' +
          sectionName.split('-')[1][0].toUpperCase() +
          sectionName.split('-')[1].slice(1) +
          ' Topics Completed';

        const topicsWrapper = sectionDiv.querySelector('.topics-text-wrapper').cloneNode(true);
        sectionDiv.querySelector('.topics-text-wrapper').remove();

        sortedTopicsAndSections.forEach((topic) => {
          if (topic.sectionName === sectionName) {
            const topicWrap = topicsWrapper.cloneNode(true);
            topicWrap.querySelector('.student-topic-name').innerHTML = topic.topicName;
            sectionDiv.appendChild(topicWrap);
          }
        });

        document.querySelector('.student-topics-holder').appendChild(sectionDiv);
      });
    });
});
