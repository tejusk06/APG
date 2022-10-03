"use strict";(()=>{console.log("Admin Individual Students Classes logic for admin");MemberStack.onReady.then(function(u){let s=window.location.href.split("?")[1],r=s.split("&")[0].split("=")[1],i=s.split("&")[1].split("=")[1],d=document.querySelector(".class-templates");d.style.display="none",u.loggedIn||window.location.replace(window.location.hostname);let l=o=>o.replaceAll("SAT - "," ").replaceAll("ACT - "," ");fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${r}`).then(o=>o.json()).then(o=>{o.student.image&&(document.querySelector(".student-image").src=o.student.image),document.querySelector(".student-name-heading").innerHTML=o.student.name,document.querySelector(".student-subheading").innerHTML=o.student.email,document.querySelector("#student-classes").classList.add("w--current"),document.querySelector("#student-dashboard").href=`/coordinator-admin/student-dashboard/?studentID=${r}&courseID=${o.student.courseID}`,document.querySelector("#student-classes").href=`/coordinator-admin/student-classes/?studentID=${r}&courseID=${o.student.courseID}`,document.querySelector("#student-form").href=`/coordinator-admin/student-form/?studentID=${r}`,document.querySelector("#student-tests").href=`/coordinator-admin/student-tests?studentID=${r}`,document.querySelector("#student-homework").href=`/coordinator-admin/student-homework?studentID=${r}`,document.querySelector("#student-topics").href=`/coordinator-admin/student-topics?studentID=${r}`}),fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${r}-${i}`).then(o=>o.json()).then(o=>{let c=document.querySelectorAll(".classes-holder")[0],m=document.querySelectorAll(".class-wrap.upcoming")[0],y=document.querySelectorAll(".class-wrap.completed")[0],a=document.querySelectorAll(".class-wrap.missed")[0];o.upcomingClasses.forEach(e=>{let t=m.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className}`,t.querySelector(".teacher-name").innerHTML=e.teacherName,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",t.querySelector(".button-zoom-link").href=`${e.zoomLink}`,t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`,t.querySelector(".view-class-button").href=`/coordinator-admin/class/?classID=${e.classID}`,e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",c.appendChild(t)}),o.completedClasses.forEach(e=>{let t=y.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let n=l(e.classTopics);t.querySelector(".topics-text").innerHTML=`${n}`,t.querySelector(".homework-text").innerHTML=`${n}`}else t.querySelector(".class-details-wrap").style.display="none";t.querySelector(".button-zoom-link").href=`${e.zoomLink}`,t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`,t.querySelector(".view-class-button").href=`/coordinator-admin/class/?classID=${e.classID}`,e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",c.appendChild(t)}),o.missedClasses.forEach(e=>{let t=a.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let n=l(e.classTopics);t.querySelector(".topics-text").innerHTML=`${n}`,t.querySelector(".homework-text").innerHTML=`${n}`}else t.querySelector(".class-details-wrap").style.display="none";t.querySelector(".button-zoom-link").href=`${e.zoomLink}`,t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`,t.querySelector(".view-class-button").href=`/admin/class/?classID=${e.classID}`,e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",c.appendChild(t)})})});})();
