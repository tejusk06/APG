// console.log('Student Tests logic');

MemberStack.onReady.then(function (member) {
  //   If member is not logged in redirect to main page
  if (!member.loggedIn) {
    window.location.replace(window.location.hostname);
  }

  // Logic to redirect parents to dashboard page
  if (member['is-parent'] === 'yes') {
    // Hide homework complete button
    if (member.membership.name === 'AP Guru SAT Students') {
      window.location.replace('/sat-new-program/dashboard');
    } else if (member.membership.name === 'AP Guru ACT Students') {
      window.location.replace('/act-new-program/dashboard');
    }
  }

  const studentAirtableID = member['airtableid'];

  //   Function to force download
  function forceDown(url, filename) {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', filename);
        a.click();
      });
    });
  }

  //   Function to check if date in past
  const dateInPast = function (firstDate) {
    const today = new Date();
    if (firstDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  // Function to add days
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //   Hide the test templates on webflow
  document.querySelectorAll('.tests-templates')[0].style.display = 'none';

  //   Making the api call to get tests data for the student
  fetch(`https://apguru-apis.herokuapp.com/api/v1/tests/student/${studentAirtableID}`)
    .then((response) => response.json())
    .then((response) => {
      // Getting the Classes holder and all the templates
      const allTests = response.testsArray;

      const testsHolder = document.querySelectorAll('.tests-holder')[0];
      const upcomingTest = document.querySelectorAll('.test-wrap.test-upcoming')[0];
      const completedTest = document.querySelectorAll('.test-wrap.test-completed')[0];
      const missedTest = document.querySelectorAll('.test-wrap.test-missed')[0];

      allTests.forEach((eachTest) => {
        document.querySelector('.empty-message').style.display = 'none';

        // Checking if test has report or status is checked
        const isPast = dateInPast(new Date(eachTest.dueDate).addDays(1));

        if (eachTest.report || eachTest.status) {
          // This logc runs if test is completed - either report is present or status is completed
          const completedTestDiv = completedTest.cloneNode(true);
          completedTestDiv.querySelector('.test-name').innerHTML = `${eachTest.name}`;

          if (eachTest.momentDate) {
            completedTestDiv.querySelector('.test-date').innerHTML = `${eachTest.momentDate}`;
          } else {
            completedTestDiv.querySelector('.test-date').style.display = 'none';
          }

          if (eachTest.report) {
            completedTestDiv.querySelector('.download-report-wrap').onclick = function () {
              forceDown(`${eachTest.report}`, `${eachTest.name} - Report`);
            };
          } else {
            completedTestDiv.querySelector('.download-report-wrap').style.display = 'none';
          }

          // check if question paper exists
          if (eachTest.questionPaper) {
            completedTestDiv.querySelector('.download-test-wrap').onclick = function () {
              forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
            };
          } else {
            completedTestDiv.querySelector('.download-test-wrap').style.display = 'none';
          }

          // check if written explanation exists
          if (eachTest.writtenExplanation) {
            completedTestDiv.querySelector(
              '.link-written-explanation'
            ).href = `${eachTest.writtenExplanation}`;
          } else {
            completedTestDiv.querySelector('.written-explanation').style.display = 'none';
          }

          // check if video explanation exists
          if (eachTest.videoExplanation) {
            completedTestDiv.querySelector(
              '.link-video-explanation'
            ).href = `${eachTest.videoExplanation}`;
          } else {
            completedTestDiv.querySelector('.video-explanation').style.display = 'none';
          }

          // check if report exists
          if (eachTest.report) {
            completedTestDiv.querySelector('.download-report-wrap').onclick = function () {
              forceDown(`${eachTest.report}`, `${eachTest.name} - Report`);
            };
            completedTestDiv.querySelector('.download-report-wrap').style.display = 'flex';
          }

          // Appending the completed test Div
          testsHolder.appendChild(completedTestDiv);
        } else if (!isPast || eachTest.dueDate === null) {
          // This logic runs if test is upcoming and date is not selected
          const upcomingTestDiv = upcomingTest.cloneNode(true);
          upcomingTestDiv.querySelector('.test-name').innerHTML = `${eachTest.name}`;

          // check if question paper exists
          if (eachTest.questionPaper) {
            upcomingTestDiv.querySelector('.download-test-wrap').onclick = function () {
              forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
            };
          } else {
            upcomingTestDiv.querySelector('.download-test-wrap').style.display = 'none';
          }

          if (eachTest.dueDate === null) {
            upcomingTestDiv.querySelector('.date-upcoming').style.display = 'none';
            upcomingTestDiv.querySelector('.date-select').style.display = 'block';

            upcomingTestDiv.querySelector('.date-select').addEventListener('click', () => {
              localStorage.setItem('formName', 'Update Test Date');
              localStorage.setItem(
                'formLink',
                `https://web.miniextensions.com/JaBjH4um3uXj9mqa7y5S/${eachTest.testId}`
              );
              localStorage.setItem('pageName', 'All Tests');
              localStorage.setItem('pageLink', `${window.location.href}`);

              window.location.replace('/update-page');
            });
          } else {
            upcomingTestDiv.querySelector('.date-upcoming').innerHTML = `${eachTest.momentDate}`;
          }

          // Appending the completed test Div
          testsHolder.appendChild(upcomingTestDiv);
        } else if (isPast) {
          // this logic runs is test is past due date
          const missedTestDiv = missedTest.cloneNode(true);
          missedTestDiv.querySelector('.test-name').innerHTML = `${eachTest.name}`;
          missedTestDiv.querySelector('.test-date').innerHTML = `${eachTest.momentDate}`;

          // check if question paper exists
          if (eachTest.questionPaper) {
            missedTestDiv.querySelector('.download-test-wrap').onclick = function () {
              forceDown(`${eachTest.questionPaper}`, `${eachTest.name} - Question Paper`);
            };
          } else {
            missedTestDiv.querySelector('.download-test-wrap').style.display = 'none';
          }

          // Appending the completed test Div
          testsHolder.appendChild(missedTestDiv);
        }
      });
    });

  // Adding show and hide logic for filter buttons
  const emptyMessages = document.querySelectorAll('.empty-text');
  const testsHolder = document.querySelector('.tests-holder');
  const filterButtons = document.querySelectorAll('.filter-button');
  const filterAllButton = document.querySelector('#filter-all');
  const filterUpcomingButton = document.querySelector('#filter-upcoming');
  const filterCompletedButton = document.querySelector('#filter-completed');
  const filterMissedButton = document.querySelector('#filter-missed');

  //   Common logic to make all button inactive
  const allButtonsInactive = () => {
    filterButtons.forEach((button) => {
      if (button.classList.contains('filter-button-active')) {
        button.classList.remove('filter-button-active');
      }
    });
  };

  //   Common logic to make empty messages hidden
  const allEmptyMessagesHide = () => {
    emptyMessages.forEach((message) => {
      message.style.display = 'none';
    });
  };

  //   Logic for Filter all button
  filterAllButton.addEventListener('click', function () {
    allButtonsInactive();
    filterAllButton.classList.add('filter-button-active');
    const allTests = testsHolder.querySelectorAll('.test-wrap');

    allTests.forEach((eachTest) => {
      document.querySelector('.empty-message').style.display = 'none';
      eachTest.style.display = 'flex';
    });

    if (allTests.length === 0) {
      document.querySelector('.empty-message').style.display = 'flex';
      allEmptyMessagesHide();
      document.querySelector('.empty-text.all').style.display = 'block';
    }
  });

  //   Logic for filter Pending Button
  filterUpcomingButton.addEventListener('click', function () {
    allButtonsInactive();
    filterUpcomingButton.classList.add('filter-button-active');
    const allTests = testsHolder.querySelectorAll('.test-wrap');
    const upcomingTests = testsHolder.querySelectorAll('.test-wrap.test-upcoming');

    allTests.forEach((eachTest) => {
      eachTest.style.display = 'none';
    });

    upcomingTests.forEach((eachTest) => {
      document.querySelector('.empty-message').style.display = 'none';
      eachTest.style.display = 'block';
    });

    if (upcomingTests.length === 0) {
      document.querySelector('.empty-message').style.display = 'flex';
      allEmptyMessagesHide();
      document.querySelector('.empty-text.upcoming').style.display = 'block';
    }
  });

  //   Logic for filter Completed Button
  filterCompletedButton.addEventListener('click', function () {
    allButtonsInactive();
    filterCompletedButton.classList.add('filter-button-active');
    const allTests = testsHolder.querySelectorAll('.test-wrap');
    const completedTests = testsHolder.querySelectorAll('.test-wrap.test-completed');

    allTests.forEach((eachTest) => {
      eachTest.style.display = 'none';
    });

    completedTests.forEach((eachTest) => {
      document.querySelector('.empty-message').style.display = 'none';
      eachTest.style.display = 'block';
    });

    if (completedTests.length === 0) {
      document.querySelector('.empty-message').style.display = 'flex';
      allEmptyMessagesHide();
      document.querySelector('.empty-text.completed').style.display = 'block';
    }
  });

  //   Logic for filter due Button
  filterMissedButton.addEventListener('click', function () {
    allButtonsInactive();
    filterMissedButton.classList.add('filter-button-active');
    const allTests = testsHolder.querySelectorAll('.test-wrap');
    const missedTests = testsHolder.querySelectorAll('.test-wrap.test-missed');

    allTests.forEach((eachTest) => {
      eachTest.style.display = 'none';
    });

    missedTests.forEach((eachTest) => {
      document.querySelector('.empty-message').style.display = 'none';
      eachTest.style.display = 'block';
    });

    if (missedTests.length === 0) {
      document.querySelector('.empty-message').style.display = 'flex';
      allEmptyMessagesHide();
      document.querySelector('.empty-text.missed').style.display = 'block';
    }
  });
});
