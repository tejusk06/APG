"use strict";(()=>{console.log("Admin classes logic ");MemberStack.onReady.then(function(l){l.loggedIn||window.location.replace(window.location.hostname);let d;l.membership.name==="AP Guru Coordinators"?d=l.airtableid:l.membership.name==="AP Guru Admin"&&(d="admin");let T=document.querySelector(".class-templates");T.style.display="none";let h=n=>n.replaceAll("SAT - "," ").replaceAll("ACT - "," ");fetch(`https://apguru-server.herokuapp.com/api/v1/coordinatorAdmin/classes/${d}`).then(n=>n.json()).then(n=>{let r=document.querySelectorAll(".classes-holder")[0],w=document.querySelectorAll(".class-wrap.upcoming")[0],E=document.querySelectorAll(".class-wrap.overdue")[0],N=document.querySelectorAll(".class-wrap.completed")[0];n.upcomingClasses.forEach(e=>{let t=w.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".student-names").innerHTML=e.studentNames?`${e.studentNames}`:" ",t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",e.students?t.querySelector(".students-text").innerHTML=`${e.students}`:t.querySelector(".students-list").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",t.querySelector(".course-section").innerHTML=`${e.courseSection}`,t.querySelector(".course-id").innerHTML=`${e.courseID}`,e.zoomLink?t.querySelector(".button-zoom-link").href=`${e.zoomLink}`:t.querySelector(".button-zoom-link").style.display="none",t.querySelector(".view-class-button").href=`/coordinator-admin/class/?classID=${e.classID}`,t.querySelector(".days-from-today").innerHTML=`${e.daysFromToday}`,r.appendChild(t)}),n.overdueClasses.forEach(e=>{let t=E.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".student-names").innerHTML=e.studentNames?`${e.studentNames}`:" ",t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",e.students?t.querySelector(".students-text").innerHTML=`${e.students}`:t.querySelector(".students-list").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",t.querySelector(".course-section").innerHTML=`${e.courseSection}`,t.querySelector(".course-id").innerHTML=`${e.courseID}`,e.zoomLink?t.querySelector(".button-zoom-link").href=`${e.zoomLink}`:t.querySelector(".button-zoom-link").style.display="none",t.querySelector(".view-class-button").href=`/coordinator-admin/class/?classID=${e.classID}`,r.appendChild(t)}),n.completedClasses.forEach(e=>{let t=N.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".student-names").innerHTML=e.studentNames?`${e.studentNames}`:" ",e.classTopics){let a=h(e.classTopics);t.querySelector(".topics-text").innerHTML=`${a}`,t.querySelector(".homework-text").innerHTML=`${a}`}else t.querySelector(".class-details-wrap").style.display="none";e.students?t.querySelector(".students-text").innerHTML=`${e.students}`:t.querySelector(".students-list").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",t.querySelector(".course-section").innerHTML=`${e.courseSection}`,t.querySelector(".course-id").innerHTML=`${e.courseID}`,e.zoomRecording?t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`:t.querySelector(".button-zoom-recording").style.display="none",t.querySelector(".view-class-button").href=`/coordinator-admin/class/?classID=${e.classID}`,r.appendChild(t)})});let H=document.querySelector(".classes-course"),M=document.querySelector(".classes-date"),$=document.querySelector(".classes-search"),p=document.querySelector(".classes-subject"),y="",c="",f="",i="",s="",b=document.querySelectorAll(".filter-button"),S=document.querySelector("#filter-all"),L=document.querySelector("#filter-upcoming"),m=document.querySelector("#filter-overdue"),q=document.querySelector("#filter-completed"),o=()=>{let n=document.querySelectorAll(".class-wrap");n.forEach(r=>{r.classList.contains("hide")&&r.classList.remove("hide")}),i&&n.forEach(r=>{r.classList.contains(`${i}`)||r.classList.add("hide")}),y&&n.forEach(r=>{r.querySelector(".course-id").innerHTML!==y&&(r.classList.contains("hide")||r.classList.add("hide"))}),s&&(console.log("date filter entered",s),n.forEach(r=>{r.classList.contains("upcoming")?(r.querySelector(".days-from-today").innerHTML>s||r.querySelector(".days-from-today").innerHTML<0)&&(console.log(s),r.classList.contains("hide")||r.classList.add("hide")):r.classList.add("hide")})),f&&n.forEach(r=>{r.querySelector(".course-section").innerHTML!==f&&(r.classList.contains("hide")||r.classList.add("hide"))}),c&&n.forEach(r=>{!r.querySelector(".class-name").innerHTML.toLowerCase().includes(c)&&!r.querySelector(".teacher-name").innerHTML.toLowerCase().includes(c)&&!r.querySelector(".class-date-text").innerHTML.toLowerCase().includes(c)&&!r.querySelector(".student-names").innerHTML.toLowerCase().includes(c)&&(r.classList.contains("hide")||r.classList.add("hide"))})};H.addEventListener("change",n=>{y=n.target.value,o()}),M.addEventListener("change",n=>{s=n.target.value,o()}),p.addEventListener("change",n=>{f=n.target.value,o()}),$.addEventListener("input",n=>{c=n.target.value.trim().toLowerCase(),o()});let u=()=>{b.forEach(n=>{n.classList.contains("filter-button-active")&&n.classList.remove("filter-button-active")})};S.addEventListener("click",function(){u(),S.classList.add("filter-button-active"),i="",o()}),L.addEventListener("click",function(){u(),L.classList.add("filter-button-active"),i="upcoming",o()}),m.addEventListener("click",function(){u(),m.classList.add("filter-button-active"),i="overdue",o()}),q.addEventListener("click",function(){u(),q.classList.add("filter-button-active"),i="completed",o()})});})();