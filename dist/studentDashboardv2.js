"use strict";(()=>{console.log("Student Dashboard logic v2");MemberStack.onReady.then(function(a){a.loggedIn||window.location.replace(window.location.hostname);let m;a.membership.name==="AP Guru SAT Students"?m="recQ9LlXahxGsLY8I":a.membership.name==="AP Guru ACT Students"&&(m="reccXht5MjmINAccQ");function y(e,n){fetch(e).then(function(p){return p.blob().then(S=>{var i=document.createElement("a");i.href=URL.createObjectURL(S),i.setAttribute("download",n),i.click()})})}let h=function(e){let n=new Date;return e.setHours(0,0,0,0)<=n.setHours(0,0,0,0)};Date.prototype.addDays=function(e){var n=new Date(this.valueOf());return n.setDate(n.getDate()+e),n};let q=a.airtableid;document.querySelectorAll(".homework-item").forEach(e=>{e.style.display="none"}),fetch(`https://apguru-server.herokuapp.com/api/v1/student/dashboard-v2/${q}-${m}`).then(e=>e.json()).then(e=>{let{completedTopics:n}=e,p=()=>{document.querySelectorAll(".upcoming-classes-stat")[0].innerHTML=e.stats.upcomingClassesCount,document.querySelectorAll(".upcoming-classes-stat")[1].innerHTML=e.stats.upcomingClassesCount,document.querySelectorAll(".completed-classes-stat")[0].innerHTML=e.stats.completedClassesCount,document.querySelectorAll(".completed-classes-stat")[1].innerHTML=e.stats.completedClassesCount,document.querySelectorAll(".missed-classes-stat")[0].innerHTML=e.stats.missedClassesCount,document.querySelectorAll(".missed-classes-stat")[1].innerHTML=e.stats.missedClassesCount,a.membership.name==="AP Guru SAT Students"?(document.querySelector(".math-topics-stat").innerHTML=e.stats.satMathTopicsCompleted,document.querySelectorAll(".math-topics-stat")[1].innerHTML=e.stats.satMathTopicsCompleted,document.querySelector(".reading-topics-stat").innerHTML=e.stats.satReadingTopicsCompleted,document.querySelectorAll(".reading-topics-stat")[1].innerHTML=e.stats.satReadingTopicsCompleted,document.querySelector(".writing-topics-stat").innerHTML=e.stats.satWritingTopicsCompleted,document.querySelectorAll(".writing-topics-stat")[1].innerHTML=e.stats.satWritingTopicsCompleted):a.membership.name==="AP Guru ACT Students"&&(document.querySelector(".reading-topics-stat").innerHTML=e.stats.actReadingTopicsCompleted,document.querySelectorAll(".reading-topics-stat")[1].innerHTML=e.stats.actReadingTopicsCompleted,document.querySelector(".english-topics-stat").innerHTML=e.stats.actEnglishTopicsCompleted,document.querySelectorAll(".english-topics-stat")[1].innerHTML=e.stats.actEnglishTopicsCompleted,document.querySelector(".science-topics-stat").innerHTML=e.stats.actScienceTopicsCompleted,document.querySelectorAll(".science-topics-stat")[1].innerHTML=e.stats.actScienceTopicsCompleted,document.querySelector(".math-topics-stat").innerHTML=e.stats.satMathTopicsCompleted,document.querySelectorAll(".math-topics-stat")[1].innerHTML=e.stats.satMathTopicsCompleted),document.querySelector(".pending-homework-stat").innerHTML=e.stats.homeworkPending,document.querySelector(".due-homework-stat").innerHTML=e.stats.homeworkDue,document.querySelector(".completed-homework-stat").innerHTML=e.stats.homeworkCompleted,document.querySelectorAll(".pending-homework-stat")[1].innerHTML=e.stats.homeworkPending,document.querySelectorAll(".due-homework-stat")[1].innerHTML=e.stats.homeworkDue,document.querySelectorAll(".completed-homework-stat")[1].innerHTML=e.stats.homeworkCompleted,document.querySelector(".upcoming-test-stat").innerHTML=e.stats.testsUpcoming,document.querySelector(".completed-test-stat").innerHTML=e.stats.testsCompleted,document.querySelector(".missed-test-stat").innerHTML=e.stats.testsMissed,document.querySelectorAll(".upcoming-test-stat")[1].innerHTML=e.stats.testsUpcoming,document.querySelectorAll(".completed-test-stat")[1].innerHTML=e.stats.testsCompleted,document.querySelectorAll(".missed-test-stat")[1].innerHTML=e.stats.testsMissed},S=()=>{document.querySelectorAll(".topics-item").forEach(r=>{let c=r.querySelector(".topic-id").innerHTML;n&&n.forEach(d=>{c===d&&(r.querySelector(".topic-completed").style.display="flex",r.querySelector(".topic-not-completed-wrap").style.display="none")})})},i=()=>{document.querySelector(".classes-templates").style.display="none";let l=document.querySelectorAll(".class-wrapper")[0],r=document.querySelectorAll(".class-dashboard-wrap.upcoming")[0],c=document.querySelectorAll(".class-dashboard-wrap.completed")[0],d=document.querySelectorAll(".class-dashboard-wrap.missed")[0];e.classes.upcomingClasses.forEach(o=>{l.querySelector(".empty-message").style.display="none";let t=r.cloneNode(!0);t.querySelector(".dashboard-class-name").innerHTML=`${o.className.split("-")[0]}`,t.querySelector(".dashboard-class-location").innerHTML=o.location?o.location:"",t.querySelector(".dashboard-class-date-time").innerHTML=o.formattedTime?o.formattedTime:"",o.zoomLink?t.querySelector(".dashboard-class-zoom-link").href=`${o.zoomLink}`:t.querySelector(".dashboard-class-zoom-link").style.display="none",l.appendChild(t)}),e.classes.completedClasses.forEach(o=>{l.querySelector(".empty-message").style.display="none";let t=c.cloneNode(!0);t.querySelector(".dashboard-class-name").innerHTML=`${o.className.split("-")[0]}`,t.querySelector(".dashboard-class-location").innerHTML=o.location?o.location:"",t.querySelector(".dashboard-class-date-time").innerHTML=o.formattedTime?o.formattedTime:"",o.zoomRecording?t.querySelector(".dashboard-class-zoom-recording").href=`${o.zoomRecording}`:t.querySelector(".dashboard-class-zoom-recording").style.display="none",l.appendChild(t)}),e.classes.missedClasses.forEach(o=>{l.querySelector(".empty-message").style.display="none";let t=d.cloneNode(!0);t.querySelector(".dashboard-class-name").innerHTML=`${o.className.split("-")[0]}`,t.querySelector(".dashboard-class-location").innerHTML=o.location?o.location:"",t.querySelector(".dashboard-class-date-time").innerHTML=o.formattedTime?o.formattedTime:"",o.zoomRecording?t.querySelector(".dashboard-class-zoom-recording").href=`${o.zoomRecording}`:t.querySelector(".dashboard-class-zoom-recording").style.display="none",l.appendChild(t)})},T=()=>{document.querySelector(".dashboard-tests-templates").style.display="none";let l=e.testsArray,r=document.querySelectorAll(".tests-wrapper")[0],c=document.querySelectorAll(".test-dashboard-wrap.upcoming")[0],d=document.querySelectorAll(".test-dashboard-wrap.completed")[0],o=document.querySelectorAll(".test-dashboard-wrap.missed")[0];e.testsArray.forEach(t=>{let u=h(new Date(t.dueDate).addDays(1));if(r.querySelector(".empty-message").style.display="none",t.report||t.status){let s=d.cloneNode(!0);s.querySelector(".dashboard-test-name").innerHTML=`${t.name}`,t.momentDate?s.querySelector(".dashboard-test-date").innerHTML=`${t.momentDate}`:s.querySelector(".dashboard-test-date").style.display="none",t.report?s.querySelector(".dashboard-download-report-wrap").onclick=function(){y(`${t.report}`,`${t.name} - Report`)}:s.querySelector(".dashboard-download-report-wrap").style.display="none",r.appendChild(s)}else if(!u||t.dueDate===null){let s=c.cloneNode(!0);s.querySelector(".dashboard-test-name").innerHTML=`${t.name}`,s.querySelector(".dashboard-test-date").innerHTML=`${t.momentDate}`,s.querySelector(".dashboard-download-test-wrap").onclick=function(){y(`${t.questionPaper}`,`${t.name} - Question Paper`)},t.dueDate!=null?s.querySelector(".dashboard-test-date").innerHTML=`${t.momentDate}`:s.querySelector(".dashboard-test-date").style.display="none",r.appendChild(s)}else if(u){let s=o.cloneNode(!0);s.querySelector(".dashboard-test-name").innerHTML=`${t.name}`,s.querySelector(".dashboard-test-date").innerHTML=`${t.momentDate}`,s.querySelector(".dashboard-download-test-wrap").onclick=function(){y(`${t.questionPaper}`,`${t.name} - Question Paper`)},r.appendChild(s)}})},w=()=>{let l=e.homeworkArray,r=document.querySelectorAll(".homework-item"),c=document.querySelector(".homework-wrapper"),d=new Date;l.forEach(o=>{c.querySelector(".empty-message").style.display="none",r.forEach(t=>{let u=t.querySelector(".topic-id");if(u){let s=u.innerHTML;o.topicId===s&&(t.style.display="block",o.completed?(t.querySelector(".homework-dashboard-wrap.pending").style.display="none",t.querySelector(".homework-dashboard-wrap.due").style.display="none"):h(new Date(o.date).addDays(1))?(t.querySelector(".homework-dashboard-wrap.pending").style.display="none",t.querySelector(".homework-dashboard-wrap.completed").style.display="none",t.querySelector(".hw-due-date").innerHTML=o.momentDate):(t.querySelector(".homework-dashboard-wrap.due").style.display="none",t.querySelector(".homework-dashboard-wrap.completed").style.display="none",t.querySelector(".hw-pending-date").innerHTML=o.momentDate))}})})};p(),S(),i(),T(),w()}),a["is-parent"].toLowerCase()==="yes"&&(console.log("Parent Dashboard"),document.querySelectorAll(".dashboard-button").forEach(e=>{e.style.display="none"}),document.querySelectorAll(".dashboard-class-zoom-link").forEach(e=>{e.style.display="none"}),document.querySelectorAll(".dashboard-class-zoom-recording").forEach(e=>{e.style.display="none"}),document.querySelectorAll(".dashboard-download-test-wrap").forEach(e=>{e.style.display="none"}),document.querySelectorAll(".navigation .nav-link").forEach(e=>{e.style.display="none"}),document.querySelector("#logout-link").style.display="block",document.querySelector(".welcome-name").style.display="none")});})();
