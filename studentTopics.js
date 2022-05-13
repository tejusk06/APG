console.log("student Topics logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }
  let courseID = null;
  // If member is logged in then continue this logic

  if (member.membership.name == "AP Guru SAT Students") {
    courseID = "recQ9LlXahxGsLY8I";
  } else if (member.membership.name == "AP Guru ACT Students") {
    courseID = "reccXht5MjmINAccQ";
  }

  // Hiding the templates
  const topicTemplates = document.querySelector(".topic-templates");
  topicTemplates.style.display = "none";

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/topics/student/${studentAirtableID}-${courseID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const topicsHolder = document.querySelectorAll(".topics-holder")[0];
      const topicTemplate = document.querySelectorAll(".topic-wrap")[0];
      const topicsItems = document.querySelectorAll(".topic-wrap-cms");
      const completedTopics = response.completedTopics;

      //   Logging the templates
      console.log("response", response);

      topicsItems.forEach((topic) => {
        const topicName = topic.querySelector(".topic-name").innerHTML;
        const completedStatus = topic.querySelector(".topic-completed");
        const notCompletedStatus = topic.querySelector(".topic-not-completed");

        if (completedTopics.includes(topicName)) {
          completedStatus.style.display = "flex";
        } else {
          notCompletedStatus.style.display = "flex";
        }
      });
    });

  const filterAllButton = document.querySelector("#filter-all");
  const filterAllActiveButton = document.querySelector("#filter-all-active");
  const filterTopicButtons = document.querySelectorAll(".filter-topic");

  filterAllButton.addEventListener("click", function () {
    filterAllButton.style.display = "none";
    filterAllActiveButton.style.display = "block";
  });

  filterTopicButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterAllButton.style.display = "block";
      filterAllActiveButton.style.display = "none";
    });
  });
});
