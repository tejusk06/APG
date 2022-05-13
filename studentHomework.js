console.log("Student Homework logic from github pages");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  const studentAirtableID = member["airtableid"];

  //   Making the api call to get classes data for the student
  fetch(`https://apguru-server.herokuapp.com/api/v1/homework/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const completedHomework = response.homeworkArray;

      const homeworkItems = document.querySelectorAll(".topic-wrap-hw");
      console.log("homework", homeworkItems);

      //   Logging the templates
      console.log("response", response);

      completedHomework.forEach((eachHomework) => {
        homeworkItems.forEach((item) => {
          const itemName = item.querySelector(".hw-name");

          if (eachHomework.name == itemName) {
            item.style.display = "flex";
            if (eachHomework.completed) {
              document.querySelector(".hw-completed").style.display = "flex";
            }
          }
        });
      });
    });
});
