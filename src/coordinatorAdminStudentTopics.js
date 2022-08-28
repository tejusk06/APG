import _ from 'lodash';

console.log('Individual Students Homework logic for Coordinator/Admin role');
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

      let topicsWithSection = [];

      response.student.completedTopics.forEach((topicName, n) => {
        const topicWithSection = `${response.student.completedTopicsSections[n]} - ${
          topicName.split('-')[1]
        }`;

        topicsWithSection.push(topicWithSection);
      });

      const sortedTopics = _.sortBy(topicsWithSection, function (topic) {
        return topic;
      });

      sortedTopics.forEach((topic) => {
        const topicDiv = topicItem.cloneNode(true);
        topicDiv.querySelector('.student-topic-name').innerHTML = topic;
        document.querySelector('.student-topics-holder').appendChild(topicDiv);
      });
    });
});
