"use strict";(()=>{console.log("Admin Individual Students Classes logic for admin");MemberStack.onReady.then(function(n){n.loggedIn||window.location.replace(window.location.hostname);let e=window.location.href.split("?studentID=")[1];fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${e}`).then(t=>t.json()).then(t=>{t.student.image&&(document.querySelector(".student-image").src=t.student.image),document.querySelector(".student-name-heading").innerHTML=t.student.name,document.querySelector(".student-subheading").innerHTML=t.student.email?t.student.email:"",document.querySelector("#student-form").classList.add("w--current"),document.querySelector("#student-dashboard").href=`/coordinator-admin/student-dashboard/?studentID=${e}&courseID=${t.student.courseID}`,document.querySelector("#student-classes").href=`/coordinator-admin/student-classes/?studentID=${e}&courseID=${t.student.courseID}`,document.querySelector("#student-form").href=`/coordinator-admin/student-form/?studentID=${e}`,document.querySelector("#student-tests").href=`/coordinator-admin/student-tests?studentID=${e}`,document.querySelector("#student-homework").href=`/coordinator-admin/student-homework?studentID=${e}`,document.querySelector("#student-topics").href=`/coordinator-admin/student-topics?studentID=${e}`})});})();
