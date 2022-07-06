console.log("teacher classes logic ");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // If member is logged in then continue this logic

  // Hiding the templates
  const classTemplates = document.querySelector(".class-templates");
  classTemplates.style.display = "none";

  const teacherAirtableID = member["airtableid"];

  // Function to remove course name from the topic
  const replaceCourseNames = (classTopics) => {
    return classTopics.replaceAll("SAT - ", " ").replaceAll("ACT - ", " ");
  };

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/classes/teacher/${teacherAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const classesHolder = document.querySelectorAll(".classes-holder")[0];
      const upcomingTemplate = document.querySelectorAll(".class-wrap.upcoming")[0];
      const completedTemplate = document.querySelectorAll(".class-wrap.completed")[0];
      const missedTemplate = document.querySelectorAll(".class-wrap.missed")[0];

      //   Logging the templates
      console.log("response", response);

      //     Rendering divs for each upcoming class
      response.upcomingClasses.forEach((upcomingClassData) => {
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(".class-date-text").innerHTML = `${upcomingClassData.formattedTime}`;
        upcomingClassDiv.querySelector(".class-name").innerHTML = `${upcomingClassData.className}`;
        upcomingClassDiv.querySelector(".teacher-name").innerHTML = `${upcomingClassData.teacherName}`;
        upcomingClassDiv.querySelector(".location-text").innerHTML = upcomingClassData.location
          ? upcomingClassData.location
          : "";

        upcomingClassDiv.querySelector(".time-text").innerHTML = upcomingClassData.formattedTime
          ? upcomingClassData.formattedTime
          : "";

        upcomingClassDiv.querySelector(".button-zoom-link").href = `${upcomingClassData.zoomLink}`;
        upcomingClassDiv.querySelector(".button-zoom-recording").href = `${upcomingClassData.zoomRecording}`;
        upcomingClassDiv.querySelector(
          ".view-class-button"
        ).href = `/teacher/class/?classID=${upcomingClassData.classID}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(upcomingClassDiv);
      });

      //   Rendering divs for each missed class
      response.completedClasses.forEach((completedClassData) => {
        const completedClassDiv = completedTemplate.cloneNode(true);
        completedClassDiv.querySelector(".class-date-text").innerHTML = `${completedClassData.formattedTime}`;
        completedClassDiv.querySelector(".class-name").innerHTML = `${completedClassData.className}`;
        completedClassDiv.querySelector(".teacher-name").innerHTML = `${completedClassData.teacherName}`;

        if (completedClassData.classTopics) {
          const classTopics = replaceCourseNames(completedClassData.classTopics);
          completedClassDiv.querySelector(".topics-text").innerHTML = `${classTopics}`;
          completedClassDiv.querySelector(".homework-text").innerHTML = `${classTopics}`;
        } else {
          completedClassDiv.querySelector(".class-details-wrap").style.display = "none";
        }

        completedClassDiv.querySelector(".button-zoom-link").href = `${completedClassData.zoomLink}`;
        completedClassDiv.querySelector(".button-zoom-recording").href = `${completedClassData.zoomRecording}`;

        completedClassDiv.querySelector(
          ".view-class-button"
        ).href = `/teacher/class/?classID=${completedClassData.classID}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(completedClassDiv);
      });
    });

  // Adding show and hide logic for filter buttons
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterAllButton = document.querySelector("#filter-all");
  const filterUpcomingButton = document.querySelector("#filter-upcoming");
  const filterCompletedButton = document.querySelector("#filter-completed");
  const filterMissedButton = document.querySelector("#filter-missed");

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

  // do things with the member object
});
