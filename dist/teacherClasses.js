"use strict";(()=>{MemberStack.onReady.then(function(i){i.loggedIn||window.location.replace(window.location.hostname);let S=document.querySelector(".class-templates");S.style.display="none";let q=i.airtableid,a=r=>r.replaceAll("SAT - "," ").replaceAll("ACT - "," ");fetch(`https://apguru-server.herokuapp.com/api/v1/classes/teacher/${q}`).then(r=>r.json()).then(r=>{let n=document.querySelectorAll(".classes-holder")[0],h=document.querySelectorAll(".class-wrap.upcoming")[0],H=document.querySelectorAll(".class-wrap.completed")[0],$=document.querySelectorAll(".class-wrap.overdue")[0];r.upcomingClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=h.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",e.students?t.querySelector(".students-text").innerHTML=`${e.students}`:t.querySelector(".students-list").style.display="none",e.zoomLink?t.querySelector(".button-zoom-link").href=`${e.zoomLink}`:t.querySelector(".button-zoom-link").style.display="none",t.querySelector(".view-class-button").href=`/teacher/class/?classID=${e.classID}`,e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",t.querySelector(".days-from-today").innerHTML=`${e.daysFromToday}`,n.appendChild(t)}),r.overdueClasses.forEach(e=>{let t=$.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".student-names").innerHTML=e.studentNames?`${e.studentNames}`:" ",t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",e.students?t.querySelector(".students-text").innerHTML=`${e.students}`:t.querySelector(".students-list").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",t.querySelector(".course-section").innerHTML=`${e.courseSection}`,t.querySelector(".course-id").innerHTML=`${e.courseID}`,e.zoomLink?t.querySelector(".button-zoom-link").href=`${e.zoomLink}`:t.querySelector(".button-zoom-link").style.display="none",t.querySelector(".view-class-button").href=`/teacher/class/?classID=${e.classID}`,n.appendChild(t)}),r.completedClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=H.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let f=a(e.classTopics);t.querySelector(".topics-text").innerHTML=`${f}`,t.querySelector(".homework-text").innerHTML=`${f}`}else t.querySelector(".class-details-wrap").style.display="none";e.students?t.querySelector(".students-text").innerHTML=`${e.students}`:t.querySelector(".students-list").style.display="none",e.zoomRecording?t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`:t.querySelector(".button-zoom-recording").style.display="none",t.querySelector(".view-class-button").href=`/teacher/class/?classID=${e.classID}`,e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",n.appendChild(t)})});let L=document.querySelector(".classes-date"),o="",l="",T=document.querySelector(".classes-holder"),p=document.querySelectorAll(".filter-button"),u=document.querySelector("#filter-all"),d=document.querySelector("#filter-upcoming"),y=document.querySelector("#filter-completed"),m=document.querySelector("#filter-overdue"),c=()=>{let r=T.querySelectorAll(".class-wrap");r.forEach(n=>{n.classList.contains("hide")&&n.classList.remove("hide")}),o&&r.forEach(n=>{n.classList.contains(`${o}`)||n.classList.add("hide")}),l&&r.forEach(n=>{n.classList.contains("upcoming")?(parseInt(n.querySelector(".days-from-today").innerHTML)>l||parseInt(n.querySelector(".days-from-today").innerHTML)<0)&&(n.classList.contains("hide")||n.classList.add("hide")):n.classList.add("hide")}),document.querySelector(".empty-message").style.display="flex",r.forEach(n=>{n.classList.contains("hide")||(document.querySelector(".empty-message").style.display="none")})};L.addEventListener("change",r=>{l=r.target.value,c()});let s=()=>{p.forEach(r=>{r.classList.contains("filter-button-active")&&r.classList.remove("filter-button-active")})};u.addEventListener("click",function(){s(),u.classList.add("filter-button-active"),o="",c()}),d.addEventListener("click",function(){s(),d.classList.add("filter-button-active"),o="upcoming",c()}),m.addEventListener("click",function(){s(),m.classList.add("filter-button-active"),o="overdue",c()}),y.addEventListener("click",function(){s(),y.classList.add("filter-button-active"),o="completed",c()})});})();
