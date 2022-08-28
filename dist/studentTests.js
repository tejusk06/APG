"use strict";(()=>{console.log("Student Tests logic");MemberStack.onReady.then(function(r){r.loggedIn||window.location.replace(window.location.hostname),r["is-parent"]==="yes"&&(r.membership.name==="AP Guru SAT Students"?window.location.replace("/sat-program/dashboard"):r.membership.name==="AP Guru ACT Students"&&window.location.replace("/act-program/dashboard"));let q=r.airtableid;function a(o,l){fetch(o).then(function(n){return n.blob().then(u=>{var i=document.createElement("a");i.href=URL.createObjectURL(u),i.setAttribute("download",l),i.click()})})}let w=function(o){let l=new Date;return o.setHours(0,0,0,0)<=l.setHours(0,0,0,0)};Date.prototype.addDays=function(o){var l=new Date(this.valueOf());return l.setDate(l.getDate()+o),l},document.querySelectorAll(".tests-templates")[0].style.display="none",fetch(`https://apguru-server.herokuapp.com/api/v1/tests/student/${q}`).then(o=>o.json()).then(o=>{let l=o.testsArray,n=document.querySelectorAll(".tests-holder")[0],u=document.querySelectorAll(".test-wrap.test-upcoming")[0],i=document.querySelectorAll(".test-wrap.test-completed")[0],L=document.querySelectorAll(".test-wrap.test-missed")[0];console.log("response",o),l.forEach(e=>{document.querySelector(".empty-message").style.display="none";let S=w(new Date(e.dueDate).addDays(1));if(e.report||e.status){let t=i.cloneNode(!0);t.querySelector(".test-name").innerHTML=`${e.name}`,e.momentDate?t.querySelector(".test-date").innerHTML=`${e.momentDate}`:t.querySelector(".test-date").style.display="none",e.report?t.querySelector(".download-report-wrap").onclick=function(){a(`${e.report}`,`${e.name} - Report`)}:t.querySelector(".download-report-wrap").style.display="none",e.questionPaper?t.querySelector(".download-test-wrap").onclick=function(){a(`${e.questionPaper}`,`${e.name} - Question Paper`)}:t.querySelector(".download-test-wrap").style.display="none",e.writtenExplanation?t.querySelector(".link-written-explanation").href=`${e.writtenExplanation}`:t.querySelector(".written-explanation").style.display="none",e.videoExplanation?t.querySelector(".link-video-explanation").href=`${e.videoExplanation}`:t.querySelector(".video-explanation").style.display="none",e.report&&(t.querySelector(".download-report-wrap").onclick=function(){a(`${e.report}`,`${e.name} - Report`)},t.querySelector(".download-report-wrap").style.display="flex"),n.appendChild(t)}else if(!S||e.dueDate===null){let t=u.cloneNode(!0);t.querySelector(".test-name").innerHTML=`${e.name}`,e.questionPaper?t.querySelector(".download-test-wrap").onclick=function(){a(`${e.questionPaper}`,`${e.name} - Question Paper`)}:t.querySelector(".download-test-wrap").style.display="none",t.querySelector(".tests-wrap").addEventListener("click",()=>{localStorage.setItem("formName","Update Test Status"),localStorage.setItem("formLink",`https://web.miniextensions.com/OZXtLcp3k47yTO1G6nYf/${e.testId}`),localStorage.setItem("pageName","All Tests"),localStorage.setItem("pageLink",`${window.location.href}`),window.location.replace("/update-page")}),e.dueDate===null?(t.querySelector(".date-upcoming").style.display="none",t.querySelector(".date-select").style.display="block",t.querySelector(".date-select").addEventListener("click",()=>{localStorage.setItem("formName","Update Test Date"),localStorage.setItem("formLink",`https://web.miniextensions.com/JaBjH4um3uXj9mqa7y5S/${e.testId}`),localStorage.setItem("pageName","All Tests"),localStorage.setItem("pageLink",`${window.location.href}`),window.location.replace("/update-page")})):t.querySelector(".date-upcoming").innerHTML=`${e.momentDate}`,n.appendChild(t)}else if(S){let t=L.cloneNode(!0);t.querySelector(".test-name").innerHTML=`${e.name}`,t.querySelector(".test-date").innerHTML=`${e.momentDate}`,t.querySelector(".tests-wrap").addEventListener("click",()=>{localStorage.setItem("formName","Update Test Status"),localStorage.setItem("formLink",`https://web.miniextensions.com/OZXtLcp3k47yTO1G6nYf/${e.testId}`),localStorage.setItem("pageName","All Tests"),localStorage.setItem("pageLink",`${window.location.href}`),window.location.replace("/update-page")}),e.questionPaper?t.querySelector(".download-test-wrap").onclick=function(){a(`${e.questionPaper}`,`${e.name} - Question Paper`)}:t.querySelector(".download-test-wrap").style.display="none",n.appendChild(t)}})});let g=document.querySelectorAll(".empty-text"),s=document.querySelector(".tests-holder"),k=document.querySelectorAll(".filter-button"),p=document.querySelector("#filter-all"),y=document.querySelector("#filter-upcoming"),m=document.querySelector("#filter-completed"),f=document.querySelector("#filter-missed"),c=()=>{k.forEach(o=>{o.classList.contains("filter-button-active")&&o.classList.remove("filter-button-active")})},d=()=>{g.forEach(o=>{o.style.display="none"})};p.addEventListener("click",function(){c(),p.classList.add("filter-button-active");let o=s.querySelectorAll(".test-wrap");o.forEach(l=>{document.querySelector(".empty-message").style.display="none",l.style.display="flex"}),o.length===0&&(document.querySelector(".empty-message").style.display="flex",d(),document.querySelector(".empty-text.all").style.display="block")}),y.addEventListener("click",function(){c(),y.classList.add("filter-button-active");let o=s.querySelectorAll(".test-wrap"),l=s.querySelectorAll(".test-wrap.test-upcoming");o.forEach(n=>{n.style.display="none"}),l.forEach(n=>{document.querySelector(".empty-message").style.display="none",n.style.display="block"}),l.length===0&&(document.querySelector(".empty-message").style.display="flex",d(),document.querySelector(".empty-text.upcoming").style.display="block")}),m.addEventListener("click",function(){c(),m.classList.add("filter-button-active");let o=s.querySelectorAll(".test-wrap"),l=s.querySelectorAll(".test-wrap.test-completed");o.forEach(n=>{n.style.display="none"}),l.forEach(n=>{document.querySelector(".empty-message").style.display="none",n.style.display="block"}),l.length===0&&(document.querySelector(".empty-message").style.display="flex",d(),document.querySelector(".empty-text.completed").style.display="block")}),f.addEventListener("click",function(){c(),f.classList.add("filter-button-active");let o=s.querySelectorAll(".test-wrap"),l=s.querySelectorAll(".test-wrap.test-missed");o.forEach(n=>{n.style.display="none"}),l.forEach(n=>{document.querySelector(".empty-message").style.display="none",n.style.display="block"}),l.length===0&&(document.querySelector(".empty-message").style.display="flex",d(),document.querySelector(".empty-text.missed").style.display="block")})});})();