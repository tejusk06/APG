// console.log('Individual classes logic for admin');
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const classID = window.location.href.split('?classID=')[1];

  //   Making the api call to get class data
  fetch(`https://apguru-apis.herokuapp.com/api/v1/class/${classID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting all the topics

      const topicItems = document.querySelectorAll('.class-topic-wrap');

      // Adding Class details
      // eslint-disable-next-line prefer-destructuring
      document.querySelector('.class-name-heading').innerHTML = response.className.split('-')[0];
      document.querySelector('.class-date-subheading').innerHTML = response.momentDate;
      document.querySelector('.class-location-subheading').innerHTML = response.classLocation;
      document.querySelector('.class-teacher-subheading').innerHTML = response.teacherName;
      if (response.zoomLink) {
        document.querySelector('.button-zoom-link').href = response.zoomLink;
      } else {
        document.querySelector('.button-zoom-link').style.display = 'none';
      }

      if (response.zoomRecording) {
        document.querySelector('.button-zoom-recording').href = response.zoomRecording;
      } else {
        document.querySelector('.button-zoom-recording').style.display = 'none';
      }
      //   Looping through topics and checking which ones are complete
      topicItems.forEach((eachTopic) => {
        if (response.topicsCompleted) {
          if (response.topicsCompleted.includes(eachTopic.querySelector('.topic-id').innerHTML)) {
            eachTopic.style.display = 'block';
          }
        }
      });
    });
});
