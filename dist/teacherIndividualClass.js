"use strict";(()=>{MemberStack.onReady.then(function(t){t.loggedIn||window.location.replace(window.location.hostname);let n=window.location.href.split("?classID=")[1];fetch(`https://apguru-server.herokuapp.com/api/v1/class/${n}`).then(e=>e.json()).then(e=>{let c=document.querySelectorAll(".class-topic-wrap");document.querySelector(".class-name-heading").innerHTML=e.className.split("-")[0],document.querySelector(".class-date-subheading").innerHTML=e.momentDate,document.querySelector(".class-location-subheading").innerHTML=e.classLocation,e.zoomLink?document.querySelector(".button-zoom-link").href=e.zoomLink:document.querySelector(".button-zoom-link").style.display="none",e.zoomRecording?document.querySelector(".button-zoom-recording").href=e.zoomRecording:document.querySelector(".button-zoom-recording").style.display="none",c.forEach(o=>{e.topicsCompleted&&e.topicsCompleted.includes(o.querySelector(".topic-id").innerHTML)&&(o.style.display="block")})})});})();
