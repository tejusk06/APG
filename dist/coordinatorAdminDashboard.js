"use strict";(()=>{console.log("Admin Dashboard logic");MemberStack.onReady.then(function(t){t.loggedIn||window.location.replace(window.location.hostname);let s=null;t.membership.name==="AP Guru Coordinators"?s=t.airtableid:t.membership.name==="AP Guru Admin"&&(s="admin"),fetch(`https://apguru-server.herokuapp.com/api/v1/coordinatorAdmin/dashboard/${s}`).then(e=>e.json()).then(e=>{document.querySelector(".upcoming-classes").innerHTML=e.stats.upcomingClasses,document.querySelector(".completed-classes").innerHTML=e.stats.completedClasses,document.querySelector(".missed-classes").innerHTML=e.stats.missedClasses,document.querySelector(".total-students").innerHTML=e.stats.totalStudents})});})();
