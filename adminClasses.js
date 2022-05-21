console.log("Admin classes logic ");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // If member is logged in then continue this logic

  // Hiding the templates
  const classTemplates = document.querySelector(".class-templates");
  classTemplates.style.display = "none";

  //   Making the api call to get classes data for the student
  fetch("https://apguru-server.herokuapp.com/api/v1/classes/admin")
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const classesHolder = document.querySelectorAll(".classes-holder")[0];
      const upcomingTemplate = document.querySelectorAll(".class-wrap.upcoming")[0];
      const completedTemplate = document.querySelectorAll(".class-wrap.completed")[0];

      //   Logging the templates
      console.log("response", response);

      //     Rendering divs for each upcoming class
      response.upcomingClasses.forEach((upcomingClassData) => {
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(".class-date-text").innerHTML = `${upcomingClassData.formattedTime}`;
        upcomingClassDiv.querySelector(".class-name").innerHTML = `${upcomingClassData.className}`;
        upcomingClassDiv.querySelector(".teacher-name").innerHTML = `${upcomingClassData.teacherName}`;
        upcomingClassDiv.querySelector(".topics-text").innerHTML = `${upcomingClassData.classTopics}`;
        upcomingClassDiv.querySelector(".homework-text").innerHTML = `${upcomingClassData.classTopics}`;
        upcomingClassDiv.querySelector(".homework-text").innerHTML = `${upcomingClassData.classTopics}`;
        upcomingClassDiv.querySelector(".course-section").innerHTML = `${upcomingClassData.courseSection}`;
        upcomingClassDiv.querySelector(".course-id").innerHTML = `${upcomingClassData.courseID}`;
        upcomingClassDiv.querySelector(
          ".view-class-button"
        ).href = `/admin/class/?classID=${upcomingClassData.classID}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(upcomingClassDiv);
      });

      //   Rendering divs for each missed class
      response.completedClasses.forEach((completedClassData) => {
        const completedClassDiv = completedTemplate.cloneNode(true);
        completedClassDiv.querySelector(".class-date-text").innerHTML = `${completedClassData.formattedTime}`;
        completedClassDiv.querySelector(".class-name").innerHTML = `${completedClassData.className}`;
        completedClassDiv.querySelector(".teacher-name").innerHTML = `${completedClassData.teacherName}`;
        completedClassDiv.querySelector(".topics-text").innerHTML = `${completedClassData.classTopics}`;
        completedClassDiv.querySelector(".homework-text").innerHTML = `${completedClassData.classTopics}`;
        completedClassDiv.querySelector(".course-section").innerHTML = `${completedClassData.courseSection}`;
        completedClassDiv.querySelector(".course-id").innerHTML = `${completedClassData.courseID}`;

        completedClassDiv.querySelector(
          ".view-class-button"
        ).href = `/admin/class/?classID=${completedClassData.classID}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(completedClassDiv);
      });
    });

  // Filters logic below

  //   Getting value of fitlers
  const classCourse = document.querySelector(".classes-course");
  const classSearch = document.querySelector(".classes-search");
  const classSubject = document.querySelector(".classes-subject");

  let courseFilter = "";
  let searchFilter = "";
  let subjectFilter = "";
  let statusFilter = "";

  // Adding show and hide logic for filter buttons
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterAllButton = document.querySelector("#filter-all");
  const filterUpcomingButton = document.querySelector("#filter-upcoming");
  const filterCompletedButton = document.querySelector("#filter-completed");

  const filterClasses = () => {
    //   TODO filter classes logic
    const allClasses = document.querySelectorAll(".class-wrap");

    allClasses.forEach((eachClass) => {
      if (eachClass.classList.contains("hide")) {
        eachClass.classList.remove("hide");
      }
    });

    if (statusFilter) {
      allClasses.forEach((eachClass) => {
        if (!eachClass.classList.contains(`${statusFilter}`)) {
          eachClass.classList.add("hide");
        }
      });
    }

    if (courseFilter) {
      allClasses.forEach((eachClass) => {
        if (eachClass.querySelector(".course-id").innerHTML != courseFilter) {
          if (!eachClass.classList.contains("hide")) {
            eachClass.classList.add("hide");
          }
        }
      });
    }

    if (subjectFilter) {
      allClasses.forEach((eachClass) => {
        if (eachClass.querySelector(".course-section").innerHTML != subjectFilter) {
          if (!eachClass.classList.contains("hide")) {
            eachClass.classList.add("hide");
          }
        }
      });
    }
  };

  classCourse.addEventListener("change", (event) => {
    console.log(`You selected course ${event.target.value}`);
    courseFilter = event.target.value;

    filterClasses();
  });

  classSubject.addEventListener("change", (event) => {
    console.log(`You selected subject ${event.target.value}`);
    subjectFilter = event.target.value;

    filterClasses();
  });

  classSearch.addEventListener("input", (event) => {
    console.log(`You selected search ${event.target.value}`);
    searchFilter = event.target.value.trim().toLowerCase();

    filterClasses();
  });

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
    // const allClasses = document.querySelectorAll(".class-wrap");

    statusFilter = "";
    filterClasses();

    // allClasses.forEach((eachClass) => {
    //   eachClass.style.display = "block";
    // });
  });

  //   Logic for filter Upcoming Button
  filterUpcomingButton.addEventListener("click", function () {
    allButtonsInactive();
    filterUpcomingButton.classList.add("filter-button-active");
    // const allClasses = document.querySelectorAll(".class-wrap");
    // const upcomingClasses = document.querySelectorAll(".class-wrap.upcoming");

    statusFilter = "upcoming";
    filterClasses();

    // allClasses.forEach((eachClass) => {
    //   eachClass.style.display = "none";
    // });
    // upcomingClasses.forEach((eachClass) => {
    //   eachClass.style.display = "block";
    // });
  });

  //   Logic for filter Completed Button
  filterCompletedButton.addEventListener("click", function () {
    allButtonsInactive();
    filterCompletedButton.classList.add("filter-button-active");
    // const allClasses = document.querySelectorAll(".class-wrap");
    // const completedClasses = document.querySelectorAll(".class-wrap.completed");

    statusFilter = "completed";
    filterClasses();

    // allClasses.forEach((eachClass) => {
    //   eachClass.style.display = "none";
    // });
    // completedClasses.forEach((eachClass) => {
    //   eachClass.style.display = "block";
    // });
  });

  // do things with the member object
});
