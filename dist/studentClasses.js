"use strict";(()=>{MemberStack.onReady.then(function(s){s.loggedIn||window.location.replace(window.location.hostname);let u=null;s["is-parent"]==="yes"&&(s.membership.name==="AP Guru SAT Students"?window.location.replace("/sat-new-program/dashboard"):s.membership.name==="AP Guru ACT Students"&&window.location.replace("/act-new-program/dashboard")),s.membership.name==="AP Guru SAT Students"?u="recQ9LlXahxGsLY8I":s.membership.name==="AP Guru ACT Students"&&(u="reccXht5MjmINAccQ");let f=document.querySelector(".class-templates");f.style.display="none";let q=s.airtableid,a=l=>l.replaceAll("SAT - "," ").replaceAll("ACT - "," ");fetch(`https://apguru-server.herokuapp.com/api/v1/classes/student/${q}-${u}`).then(l=>l.json()).then(l=>{let o=document.querySelectorAll(".classes-holder")[0],r=document.querySelectorAll(".class-wrap.upcoming")[0],L=document.querySelectorAll(".class-wrap.completed")[0],g=document.querySelectorAll(".class-wrap.missed")[0];l.upcomingClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=r.cloneNode(!0);t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,t.querySelector(".location-text").innerHTML=e.location?e.location:"",t.querySelector(".time-text").innerHTML=e.formattedTime?e.formattedTime:"",e.zoomLink?t.querySelector(".button-zoom-link").href=`${e.zoomLink}`:t.querySelector(".button-zoom-link").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",o.appendChild(t)}),l.completedClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=L.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let c=a(e.classTopics);t.querySelector(".topics-text").innerHTML=`${c}`,t.querySelector(".homework-text").innerHTML=`${c}`}else t.querySelector(".class-details-wrap").style.display="none";e.zoomRecording?t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`:t.querySelector(".button-zoom-recording").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",o.appendChild(t)}),l.missedClasses.forEach(e=>{document.querySelector(".empty-message").style.display="none";let t=g.cloneNode(!0);if(t.querySelector(".class-date-text").innerHTML=`${e.formattedTime}`,t.querySelector(".class-name").innerHTML=`${e.className.split("-")[0]}`,t.querySelector(".teacher-name").innerHTML=`${e.teacherName}`,e.classTopics){let c=a(e.classTopics);t.querySelector(".topics-text").innerHTML=`${c}`,t.querySelector(".homework-text").innerHTML=`${c}`}else t.querySelector(".class-details-wrap").style.display="none";e.zoomRecording?t.querySelector(".button-zoom-recording").href=`${e.zoomRecording}`:t.querySelector(".button-zoom-recording").style.display="none",e.notes&&e.notes.trim()!==""?t.querySelector(".notes-text").innerHTML=`${e.notes}`:t.querySelector(".notes-pointer").style.display="none",o.appendChild(t)})});let h=document.querySelectorAll(".empty-text"),n=document.querySelector(".classes-holder"),T=document.querySelectorAll(".filter-button"),d=document.querySelector("#filter-all"),m=document.querySelector("#filter-upcoming"),p=document.querySelector("#filter-completed"),S=document.querySelector("#filter-missed"),i=()=>{T.forEach(l=>{l.classList.contains("filter-button-active")&&l.classList.remove("filter-button-active")})},y=()=>{h.forEach(l=>{l.style.display="none"})};d.addEventListener("click",function(){i(),d.classList.add("filter-button-active");let l=n.querySelectorAll(".class-wrap");l.forEach(o=>{document.querySelector(".empty-message").style.display="none",o.style.display="block"}),l.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.all").style.display="block")}),m.addEventListener("click",function(){i(),m.classList.add("filter-button-active");let l=n.querySelectorAll(".class-wrap"),o=n.querySelectorAll(".class-wrap.upcoming");l.forEach(r=>{r.style.display="none"}),o.forEach(r=>{document.querySelector(".empty-message").style.display="none",r.style.display="block"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.upcoming").style.display="block")}),p.addEventListener("click",function(){i(),p.classList.add("filter-button-active");let l=n.querySelectorAll(".class-wrap"),o=n.querySelectorAll(".class-wrap.completed");l.forEach(r=>{r.style.display="none"}),o.forEach(r=>{document.querySelector(".empty-message").style.display="none",r.style.display="block"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.completed").style.display="block")}),S.addEventListener("click",function(){i(),S.classList.add("filter-button-active");let l=n.querySelectorAll(".class-wrap"),o=n.querySelectorAll(".class-wrap.missed");l.forEach(r=>{r.style.display="none"}),o.forEach(r=>{document.querySelector(".empty-message").style.display="none",r.style.display="block"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",y(),document.querySelector(".empty-text.missed").style.display="block")})});})();
