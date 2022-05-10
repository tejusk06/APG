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

      //   Logging the templates
      console.log("response", response);
      console.log("topicTemplate", topicTemplate);

      //     Rendering divs for each upcoming class
      response.formattedTopics.forEach((topicData) => {
        const topicDiv = topicTemplate.cloneNode(true);
        topicDiv.querySelector(".topic-image").src = `${topicData.imgURL}`;
        topicDiv.querySelector(".topic-name").innerHTML = `${topicData.topicName}`;

        if (topicData.topicCompleted) {
          topicDiv.querySelector(".topic-missed-icon").style.display = "none";
        } else {
          topicDiv.querySelector(".topic-completed-icon").style.display = "none";
        }

        if (topicData.courseSection == "sat-math") {
          topicDiv.classList.add("math");
        } else if (topicData.courseSection == "sat-reading") {
          topicDiv.classList.add("reading");
        } else if (topicData.courseSection == "sat-writinglanguage") {
          topicDiv.classList.add("writing");
        }

        // Appending the upcoming class Div
        topicsHolder.appendChild(topicDiv);
      });
    });

  // Adding show and hide logic for filter buttons
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterAllButton = document.querySelector("#filter-all");
  const filterMathButton = document.querySelector("#filter-math");
  const filterReadingButton = document.querySelector("#filter-reading");
  const filterWritingButton = document.querySelector("#filter-writing");

  //   Common logic to make all button inactive
  const allButtonsInactive = () => {
    filterButtons.forEach((button) => {
      if (button.classList.contains("filter-button-active")) {
        button.classList.remove("filter-button-active");
      }
    });
  };

  //   Logic for Filter all button
  filterAllButton.addEventListener("click", function () {
    allButtonsInactive();
    filterAllButton.classList.add("filter-button-active");
    const allClasses = document.querySelectorAll(".class-wrap");

    allClasses.forEach((eachClass) => {
      eachClass.style.display = "block";
    });
  });

  //   Logic for filter Upcoming Button
  filterUpcomingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterUpcomingButton.classList.add("filter-button-active");
    const allClasses = document.querySelectorAll(".class-wrap");
    const upcomingClasses = document.querySelectorAll(".class-wrap.upcoming");

    allClasses.forEach((eachClass) => {
      eachClass.style.display = "none";
    });
    upcomingClasses.forEach((eachClass) => {
      eachClass.style.display = "block";
    });
  });

  //   Logic for filter Completed Button
  filterCompletedButton.addEventListener("click", function () {
    allButtonsInactive();
    filterCompletedButton.classList.add("filter-button-active");
    const allClasses = document.querySelectorAll(".class-wrap");
    const completedClasses = document.querySelectorAll(".class-wrap.completed");

    allClasses.forEach((eachClass) => {
      eachClass.style.display = "none";
    });
    completedClasses.forEach((eachClass) => {
      eachClass.style.display = "block";
    });
  });

  //   Logic for filter Missed Button
  filterMissedButton.addEventListener("click", function () {
    allButtonsInactive();
    filterMissedButton.classList.add("filter-button-active");
    const allClasses = document.querySelectorAll(".class-wrap");
    const missedClasses = document.querySelectorAll(".class-wrap.missed");

    allClasses.forEach((eachClass) => {
      eachClass.style.display = "none";
    });
    missedClasses.forEach((eachClass) => {
      eachClass.style.display = "block";
    });
  });

  // do things with the member object
});
