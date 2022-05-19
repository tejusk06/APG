console.log("Individual classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const classID = window.location.href.split("?classID=")[1];

  //   Making the api call to get class data
  fetch(`https://apguru-server.herokuapp.com/api/v1/class/${classID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting all the topics
      const topicItems = document.querySelectorAll(".class-topic-wrap");

      // Adding Class details
      document.querySelector(".add-topics").href = response.topicsForm;
      document.querySelector(".class-name-heading").innerHTML = response.className;
      document.querySelector(".class-date-subheading").innerHTML = response.momentDate;
      document.querySelector(".class-teacher-subheading").innerHTML = response.teacherName;

      //   Looping through topics and checking which ones are complete
      topicItems.forEach((eachTopic) => {
        if (response.topicsCompleted.includes(eachTopic.querySelector(".topic-id").innerHTML)) {
          eachTopic.style.display = "block";
        }
      });
    });
});
