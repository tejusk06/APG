// console.log('Admin Dashboard logic');
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

  //   Making the api call to get student data from students table
  fetch(`https://apguru-apis.herokuapp.com/api/v1/coordinatorAdmin/dashboard/${airtableIdOrRole}`)
    .then((response) => response.json())
    .then((response) => {
      document.querySelector('.upcoming-classes').innerHTML = response.stats.upcomingClasses;
      document.querySelector('.completed-classes').innerHTML = response.stats.completedClasses;
      document.querySelector('.missed-classes').innerHTML = response.stats.missedClasses;
      document.querySelector('.total-students').innerHTML = response.stats.totalStudents;
    });
});
