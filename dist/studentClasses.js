"use strict";(()=>{console.log("student classes logic");MemberStack.onReady.then(function(r){r.loggedIn||window.location.replace(window.location.hostname);let u=null;r["is-parent"]==="yes"&&(r.membership.name==="AP Guru SAT Students"?window.location.replace("/sat-program/dashboard"):r.membership.name==="AP Guru ACT Students"&&window.location.replace("/act-program/dashboard")),r.membership.name==="AP Guru SAT Students"?u="recQ9LlXahxGsLY8I":r.membership.name==="AP Guru ACT Students"&&(u="reccXht5MjmINAccQ");let f=document.querySelector(".class-templates");f.style.display="none";let q=r.airtableid,a=l=>l.replaceAll("SAT - "," ").replaceAll("ACT - "," ");fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${q}-${u}`).then(l=>l.json()).then(l=>{let o=document.querySelectorAll(".classes-holder")[0],s=document.querySelectorAll(".class-wrap.upcoming")[0],L=document.querySelectorAll(".class-wrap.completed")[0],g=document.querySelectorAll(".class-wrap.missed")[0];console.log("response",l),l.upcomingClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=s.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",e.zoomLink?t.querySelector(".button-zoom-link").href=`${e.zoomLink}`:t.querySelector(".button-zoom-link").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",o.appendChild(t)}),l.completedClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=L.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let n=a(e.classTopics);t.querySelector(".topics-text").innerHTML=`${n}`,t.querySelector(".homework-text").innerHTML=`${n}`}else t.querySelector(".class-details-wrap").style.display="none";e.zoomRecording?t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`:t.querySelector(".button-zoom-recording").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",o.appendChild(t)}),l.missedClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=g.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let n=a(e.classTopics);t.querySelector(".topics-text").innerHTML=`${n}`,t.querySelector(".homework-text").innerHTML=`${n}`}else t.querySelector(".class-details-wrap").style.display="none";e.zoomRecording?t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`:t.querySelector(".button-zoom-recording").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",o.appendChild(t)})});let h=document.querySelectorAll(".empty-text"),c=document.querySelector(".classes-holder"),T=document.querySelectorAll(".filter-button"),d=document.querySelector("#filter-all"),m=document.querySelector("#filter-upcoming"),p=document.querySelector("#filter-completed"),S=document.querySelector("#filter-missed"),i=()=>{T.forEach(l=>{l.classList.contains("filter-button-active")&&l.classList.remove("filter-button-active")})},y=()=>{h.forEach(l=>{l.style.display="none"})};d.addEventListener("click",function(){i(),d.classList.add("filter-button-active");let l=c.querySelectorAll(".class-wrap");l.forEach(o=>{document.querySelector(".empty-message").style.display="none",o.style.display="block"}),l.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.all").style.display="block")}),m.addEventListener("click",function(){i(),m.classList.add("filter-button-active");let l=c.querySelectorAll(".class-wrap"),o=c.querySelectorAll(".class-wrap.upcoming");l.forEach(s=>{s.style.display="none"}),o.forEach(s=>{document.querySelector(".empty-message").style.display="none",s.style.display="block"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.upcoming").style.display="block")}),p.addEventListener("click",function(){i(),p.classList.add("filter-button-active");let l=c.querySelectorAll(".class-wrap"),o=c.querySelectorAll(".class-wrap.completed");l.forEach(s=>{s.style.display="none"}),o.forEach(s=>{document.querySelector(".empty-message").style.display="none",s.style.display="block"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.completed").style.display="block")}),S.addEventListener("click",function(){i(),S.classList.add("filter-button-active");let l=c.querySelectorAll(".class-wrap"),o=c.querySelectorAll(".class-wrap.missed");l.forEach(s=>{s.style.display="none"}),o.forEach(s=>{document.querySelector(".empty-message").style.display="none",s.style.display="block"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.missed").style.display="block")})});})();