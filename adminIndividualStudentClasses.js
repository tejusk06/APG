console.log("Admin Individual Students Classes logic for admin");
// Logic for Class form embed is in the webflow page below attendance

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page

  const classCourse = window.location.href.split("?")[1];

  const studentID = classCourse.split("&")[0].split("=")[1];
  const courseID = classCourse.split("&")[1].split("=")[1];

  // Hiding the templates
  const classTemplates = document.querySelector(".class-templates");
  classTemplates.style.display = "none";

  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  //   Making the api call to get student data from students table
  fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${studentID}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.student.image) {
        document.querySelector(".student-image").src = response.student.image;
      }
      document.querySelector(".student-name-heading").innerHTML = response.student.name;
      document.querySelector(".student-subheading").innerHTML = response.student.email;

      document.querySelector("#student-tests").href = `/admin/student-tests?studentID=${studentID}`;
      document.querySelector("#student-classes").href = `#`;
      document.querySelector("#student-classes").classList.add("w--current");
    });

  //   Making the api call to get classes data for the student from Classes Table
  fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${studentID}-${courseID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const classesHolder = document.querySelectorAll(".classes-holder")[0];
      const upcomingTemplate = document.querySelectorAll(".class-wrap.upcoming")[0];
      const completedTemplate = document.querySelectorAll(".class-wrap.completed")[0];
      const missedTemplate = document.querySelectorAll(".class-wrap.missed")[0];

      //   Logging the templates
      console.log("response", response);
      //   console.log("upcomingTemplate", upcomingTemplate);
      //   console.log("completedTemplate", completedTemplate);
      //   console.log("missedTemplate", missedTemplate);

      //     Rendering divs for each upcoming class
      response.upcomingClasses.forEach((upcomingClassData) => {
        const upcomingClassDiv = upcomingTemplate.cloneNode(true);
        upcomingClassDiv.querySelector(".class-date-text").innerHTML = `${upcomingClassData.formattedTime}`;
        upcomingClassDiv.querySelector(".class-name").innerHTML = `${upcomingClassData.className}`;
        upcomingClassDiv.querySelector(".teacher-name").innerHTML = `${upcomingClassData.teacherName}`;
        if (upcomingClassData.classTopics) {
          upcomingClassDiv.querySelector(".topics-text").innerHTML = `${upcomingClassData.classTopics}`;
          upcomingClassDiv.querySelector(".homework-text").innerHTML = `${upcomingClassData.classTopics}`;
        } else {
          upcomingClassDiv.querySelector(".class-details-wrap").style.display = "none";
        }
        upcomingClassDiv.querySelector(".button-zoom-link").href = `${upcomingClassData.zoomLink}`;
        upcomingClassDiv.querySelector(".button-zoom-recording").href = `${upcomingClassData.zoomRecording}`;
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
        if (completedClassData.classTopics) {
          completedClassDiv.querySelector(".topics-text").innerHTML = `${completedClassData.classTopics}`;
          completedClassDiv.querySelector(".homework-text").innerHTML = `${completedClassData.classTopics}`;
        } else {
          completedClassDiv.querySelector(".class-details-wrap").style.display = "none";
        }
        completedClassDiv.querySelector(".button-zoom-link").href = `${completedClassData.zoomLink}`;
        completedClassDiv.querySelector(".button-zoom-recording").href = `${completedClassData.zoomRecording}`;

        completedClassDiv.querySelector(
          ".view-class-button"
        ).href = `/admin/class/?classID=${completedClassData.classID}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(completedClassDiv);
      });

      //   Rendering divs for each completed class
      response.missedClasses.forEach((missedClassData) => {
        const missedClassDiv = missedTemplate.cloneNode(true);
        missedClassDiv.querySelector(".class-date-text").innerHTML = `${missedClassData.formattedTime}`;
        missedClassDiv.querySelector(".class-name").innerHTML = `${missedClassData.className}`;
        missedClassDiv.querySelector(".teacher-name").innerHTML = `${missedClassData.teacherName}`;
        if (missedClassData.classTopics) {
          missedClassDiv.querySelector(".topics-text").innerHTML = `${missedClassData.classTopics}`;
          missedClassDiv.querySelector(".homework-text").innerHTML = `${missedClassData.classTopics}`;
        } else {
          missedClassDiv.querySelector(".class-details-wrap").style.display = "none";
        }
        missedClassDiv.querySelector(".button-zoom-link").href = `${missedClassData.zoomLink}`;
        missedClassDiv.querySelector(".button-zoom-recording").href = `${missedClassData.zoomRecording}`;
        missedClassDiv.querySelector(".view-class-button").href = `/admin/class/?classID=${missedClassData.classID}`;

        // Appending the upcoming class Div
        classesHolder.appendChild(missedClassDiv);
      });
    });
});
