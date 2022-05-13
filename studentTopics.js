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
      const topicsItems = document.querySelectorAll(".topic-wrap-c");

      //   Logging the templates
      console.log("response", response);
      console.log("topicsItems", topicsItems);

      /*

      //     Rendering divs for each upcoming class
      response.formattedTopics.forEach((topicData) => {
        const topicDiv = topicTemplate.cloneNode(true);
        topicDiv.querySelector(".topic-image").src = `${topicData.imgURL}`;
        topicDiv.querySelector(".topic-name").innerHTML = `${topicData.topicName}`;

        if (topicData.topicCompleted == "true") {
          topicDiv.querySelector(".topic-missed_icon").style.display = "none";
        } else {
          topicDiv.querySelector(".topic-completed_icon").style.display = "none";
        }

        if (topicData.courseSection == "sat-math") {
          topicDiv.classList.add("math");
        } else if (topicData.courseSection == "sat-reading") {
          topicDiv.classList.add("reading");
        } else if (topicData.courseSection == "sat-writing-language") {
          topicDiv.classList.add("writing");
        }

        // Appending the upcoming class Div
        topicsHolder.appendChild(topicDiv);
      });

      */


      response.completedTopics.forEach((completedTopic) => {
          console.log(completedTopic);
      }

    });


    /*

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
    const allTopics = document.querySelectorAll(".topic-wrap");

    allTopics.forEach((eachTopic) => {
      eachTopic.style.display = "flex";
    });
  });

  //   Logic for filter Math Button
  filterMathButton.addEventListener("click", function () {
    allButtonsInactive();
    filterMathButton.classList.add("filter-button-active");
    const allTopics = document.querySelectorAll(".topic-wrap");
    const mathTopics = document.querySelectorAll(".topic-wrap.math");

    allTopics.forEach((eachTopic) => {
      eachTopic.style.display = "none";
    });
    mathTopics.forEach((eachTopic) => {
      eachTopic.style.display = "flex";
    });
  });

  //   Logic for filter Reading Button
  filterReadingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterReadingButton.classList.add("filter-button-active");
    const allTopics = document.querySelectorAll(".topic-wrap");
    const readingTopics = document.querySelectorAll(".topic-wrap.reading");

    allTopics.forEach((eachTopic) => {
      eachTopic.style.display = "none";
    });
    readingTopics.forEach((eachTopic) => {
      eachTopic.style.display = "flex";
    });
  });

  //   Logic for filter Writing Button
  filterWritingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterWritingButton.classList.add("filter-button-active");
    const allTopics = document.querySelectorAll(".topic-wrap");
    const writingTopics = document.querySelectorAll(".topic-wrap.writing");

    allTopics.forEach((eachTopic) => {
      eachTopic.style.display = "none";
    });
    writingTopics.forEach((eachTopic) => {
      eachTopic.style.display = "flex";
    });
  });


  */


});
