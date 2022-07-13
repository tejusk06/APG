console.log("Individual classes logic for teacher");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const classID = window.location.href.split("?classID=")[1];

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/class/${classID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting all the topics
      const topicItems = document.querySelectorAll(".class-topic-wrap");

      // Adding Class details
      document.querySelector(".class-name-heading").innerHTML = response.className.split("-")[0];
      document.querySelector(".class-date-subheading").innerHTML = response.momentDate;

      if (response.zoomLink) {
        document.querySelector(".button-zoom-link").href = response.zoomLink;
      } else {
        document.querySelector(".button-zoom-link").style.display = "none";
      }

      if (response.zoomRecording) {
        document.querySelector(".button-zoom-recording").href = response.zoomRecording;
      } else {
        document.querySelector(".button-zoom-recording").style.display = "none";
      }

      //   Looping through topics and checking which ones are complete
      topicItems.forEach((eachTopic) => {
        if (response.topicsCompleted) {
          if (response.topicsCompleted.includes(eachTopic.querySelector(".topic-id").innerHTML)) {
            eachTopic.style.display = "block";
          }
        }
      });
    });

  // Logic to refresh the page on updating the classs form
});
