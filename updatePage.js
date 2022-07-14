console.log("student Topics logic");

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }
  let courseID = null;
  // If member is logged in then continue this logic

  // Logic to redirect parents to dashboard page
  if (member["is-parent"] == "yes") {
    // Hide homework complete button
    if (member.membership.name == "AP Guru SAT Students") {
      window.location.replace("/sat-program/dashboard");
    } else if (member.membership.name == "AP Guru ACT Students") {
      window.location.replace("/act-program/dashboard");
    }
  }

  //   Logic to set the form details
  const updateIframe = document.querySelector(".update-iframe");
  const formNameElement = document.querySelector(".form-name");
  const backButtonElement = document.querySelector(".back-to-page");
  //  console.log("Iframe is", classIframe);

  const formSrc = localStorage.getItem("formLink");
  const formName = localStorage.getItem("formName");
  const pageName = localStorage.getItem("pageName");
  const pageLink = localStorage.getItem("pageLink");

  updateIframe.src = `${formSrc}`;
  formNameElement.innerHTML = formName;
  backButtonElement.innerHTML = "Back to " + pageName;
  backButtonElement.href = `${pageLink}`;
});
