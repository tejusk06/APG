"use strict";(()=>{console.log("Admin Individual Students Classes logic for admin");MemberStack.onReady.then(function(a){a.loggedIn||window.location.replace(window.location.hostname);let m=function(o){let s=new Date;return o.setHours(0,0,0,0)<=s.setHours(0,0,0,0)};function u(o,s){fetch(o).then(function(d){return d.blob().then(c=>{var l=document.createElement("a");l.href=URL.createObjectURL(c),l.setAttribute("download",s),l.click()})})}document.querySelectorAll(".tests-templates")[0].style.display="none";let n=window.location.href.split("?studentID=")[1];fetch(`https://apguru-server.herokuapp.com/api/v1/admin/student/${n}`).then(o=>o.json()).then(o=>{o.student.image&&(document.querySelector(".student-image").src=o.student.image),document.querySelector(".student-name-heading").innerHTML=o.student.name,document.querySelector(".student-subheading").innerHTML=o.student.email?o.student.email:"",document.querySelector("#student-tests").classList.add("w--current"),document.querySelector("#student-dashboard").href=`/coordinator-admin/student-dashboard/?studentID=${n}&courseID=${o.student.courseID}`,document.querySelector("#student-classes").href=`/coordinator-admin/student-classes/?studentID=${n}&courseID=${o.student.courseID}`,document.querySelector("#student-form").href=`/coordinator-admin/student-form/?studentID=${n}`,document.querySelector("#student-tests").href=`/coordinator-admin/student-tests?studentID=${n}`,document.querySelector("#student-homework").href=`/coordinator-admin/student-homework?studentID=${n}`,document.querySelector("#student-topics").href=`/coordinator-admin/student-topics?studentID=${n}`}),fetch(`https://apguru-server.herokuapp.com/api/v1/tests/student/${n}`).then(o=>o.json()).then(o=>{let s=o.testsArray,d=document.querySelectorAll(".tests-holder")[0],c=document.querySelectorAll(".test-wrap.test-upcoming")[0],l=document.querySelectorAll(".test-wrap.test-completed")[0],p=document.querySelectorAll(".test-wrap.test-missed")[0];console.log("response",o),s.forEach(t=>{let i=m(new Date(t.dueDate));if(t.report||t.status){let e=l.cloneNode(!0);e.querySelector(".test-name").innerHTML=`${t.name}`,t.momentDate?e.querySelector(".test-date").innerHTML=`${t.momentDate}`:e.querySelector(".test-date").style.display="none",e.querySelector(".download-test-wrap").onclick=function(){u(`${t.questionPaper}`,`${t.name} - Question Paper`)},t.report?(e.querySelector(".download-report-wrap").onclick=function(){u(`${t.report}`,`${t.name} - Report`)},e.querySelector(".download-report-wrap").style.display="flex",e.querySelector(".add-report-wrap").style.display="none"):(e.querySelector(".download-report-wrap").style.display="none",e.querySelector(".add-report-wrap").style.display="flex",e.querySelector(".add-report-wrap").onclick=function(){let r=e.querySelector(".add-report-embed");r.style.display==="block"?r.style.display="none":r.style.display="block"},e.querySelector(".test-report-embed").src=`https://web.miniextensions.com/NPGyyM2mTvzbW1G2m9oz/${t.testId}`),d.appendChild(e)}else if(!i||t.dueDate===null){let e=c.cloneNode(!0);e.querySelector(".test-name").innerHTML=`${t.name}`,e.querySelector(".add-report-wrap").style.display="flex",e.querySelector(".add-report-wrap").onclick=function(){let r=e.querySelector(".add-report-embed");r.style.display==="block"?r.style.display="none":r.style.display="block"},e.querySelector(".test-report-embed").src=`https://web.miniextensions.com/NPGyyM2mTvzbW1G2m9oz/${t.testId}`,e.querySelector(".download-test-wrap").onclick=function(){u(`${t.questionPaper}`,`${t.name} - Question Paper`)},e.querySelector(".tests-wrap").href=`https://web.miniextensions.com/OZXtLcp3k47yTO1G6nYf/${t.testId}`,t.dueDate===null?(e.querySelector(".date-upcoming").style.display="none",e.querySelector(".date-select").style.display="block",e.querySelector(".date-select").href=`https://web.miniextensions.com/JaBjH4um3uXj9mqa7y5S/${t.testId}`):e.querySelector(".date-upcoming").innerHTML=`${t.momentDate}`,d.appendChild(e)}else if(i){let e=p.cloneNode(!0);e.querySelector(".test-name").innerHTML=`${t.name}`,e.querySelector(".test-date").innerHTML=`${t.momentDate}`,e.querySelector(".add-report-wrap").style.display="flex",e.querySelector(".add-report-wrap").onclick=function(){let r=e.querySelector(".add-report-embed");r.style.display==="block"?r.style.display="none":r.style.display="block"},e.querySelector(".test-report-embed").src=`https://web.miniextensions.com/NPGyyM2mTvzbW1G2m9oz/${t.testId}`,e.querySelector(".tests-wrap").href=`https://web.miniextensions.com/OZXtLcp3k47yTO1G6nYf/${t.testId}`,e.querySelector(".download-test-wrap").onclick=function(){u(`${t.questionPaper}`,`${t.name} - Question Paper`)},d.appendChild(e)}})})});})();
