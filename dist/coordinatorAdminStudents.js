"use strict";(()=>{MemberStack.onReady.then(function(n){n.loggedIn||window.location.replace(window.location.hostname);let l=null;n.membership.name==="AP Guru Coordinators"?l=n.airtableid:n.membership.name==="AP Guru Admin"&&(l="admin"),document.querySelector(".student-templates").style.display="none";let d=document.querySelector(".students-wrap"),u=document.querySelector(".students-holder"),c=document.querySelector(".students-course"),a=document.querySelector(".students-search"),r=null,o=null;c.addEventListener("change",s=>{r=s.target.value,i()}),a.addEventListener("input",s=>{o=s.target.value.trim().toLowerCase(),i()});let i=()=>{let s=document.querySelectorAll(".students-wrap");r&&o&&s.forEach(e=>{e.querySelector(".student-course-id").innerHTML!==r?e.style.display="none":e.querySelector(".student-name-text").innerHTML.toLowerCase().includes(o)?e.style.display="flex":e.style.display="none"}),r&&!o&&s.forEach(e=>{e.querySelector(".student-course-id").innerHTML===r?e.style.display="flex":e.style.display="none"}),o&&!r&&s.forEach(e=>{e.querySelector(".student-name-text").innerHTML.toLowerCase().includes(o)?e.style.display="flex":e.style.display="none"}),!r&&!o&&s.forEach(e=>{e.style.display="flex"})};fetch(`https://apguru-server.herokuapp.com/api/v1/coordinatorAdmin/students/${l}`).then(s=>s.json()).then(s=>{s.allStudents.forEach(e=>{let t=d.cloneNode(!0);e.image&&(t.querySelector(".student-image").src=e.image),t.querySelector(".student-name-text").innerHTML=e.name,t.querySelector(".student-location").innerHTML=e.location?e.location:".",t.querySelector(".student-classes").innerHTML=`${e.classesAttended} Completed, <br>
        ${e.classes} Assigned`,t.querySelector(".student-tests").innerHTML=`${e.testsCompleted}  Completed, <br>
        ${e.testsUpcoming} Pending, <br>
        ${e.tests} Assigned `,t.querySelector(".student-homework").innerHTML=`${e.homeworkCompleted} Completed, <br>
        ${e.homeworkPending} Pending, <br>
        ${e.homework} Assigned `,t.querySelector(".student-topics").innerHTML=e.topics+" completed",t.querySelector(".student-course-id").innerHTML=e.courseID,t.href=`/coordinator-admin/student-classes/?studentID=${e.studentID}&courseID=${e.courseID}`,u.append(t)})})});})();
