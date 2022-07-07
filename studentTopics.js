console.log("student Topics logic");

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

  //   Function to force download
  function forceDown(url, filename) {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    });
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
      const topicsList = document.querySelector(".topic-list");
      const topicsItems = document.querySelectorAll(".topic-wrap-cms");
      const completedTopics = response.completedTopics;

      //   Logging the templates
      console.log("response", response);

      topicsItems.forEach((topic) => {
        const topicId = topic.querySelector(".topic-id");
        const completedStatus = topic.querySelector(".topic-completed");
        const notCompletedStatus = topic.querySelector(".topic-not-completed");
        const topicfileButton = topic.querySelector(".topic-notes-button");
        const topicFileUrl = topicfileButton.href;
        topicfileButton.href = "#";
        const topicName = topic.querySelector(".topic-name").innerHTML;

        topicfileButton.onclick = function () {
          forceDown(`${topicFileUrl}`, `${topicName} - Topic Notes`);
        };

        if (topicId) {
          const topicIdNumber = topicId.innerHTML;
          if (completedTopics.includes(topicIdNumber)) {
            completedStatus.style.display = "flex";
            topicsList.prepend(topic);
          } else {
            notCompletedStatus.style.display = "flex";
          }
        }
      });
    });

  // Logic to show completed topics first after clicking the filter buttons
  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

  const rearrangeTopics = () => {
    const topicsList = document.querySelector(".topic-list");
    const topicsItems = document.querySelectorAll(".topic-wrap-cms");

    console.log("rearranging topics");

    topicsItems.forEach((topic) => {
      const completedStatus = topic.querySelector(".topic-completed");

      if (completedStatus.style.display == "flex") {
        topicsList.prepend(topic);
        console.log("prepending");
      }
    });
  };

  filterButtons.forEach((filterButton) => {
    filterButton.onclick = () => {
      // giving a timeout so the filtering happens first then the topics get rearranged
      console.log("setting timeout");
      setTimeout(rearrangeTopics, 5000);
    };
  });
});
