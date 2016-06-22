var app=angular.module("app",["ngRoute"]);angular.module("app").controller("ApplicationCtrl",["$scope","$http","$location","UserSvc",function(t,e,n,o){null!=window.localStorage.getItem("token")&&(e.defaults.headers.common["X-Auth"]=window.localStorage.getItem("token"),o.getUser().success(function(e){t.currentUser=e})),t.$on("login",function(e,n){t.currentUser=n}),t.$on("logout",function(e,n){t.currentUser=""})}]),angular.module("app").controller("CreateTeamCtrl",["$scope","UserSvc","TeamService",function(t,e,n){t.registerTeam=function(e,o,r){n.create(e,o,r,t.currentUser._id)}}]),angular.module("app").controller("HomeCtrl",["$scope",function(t){}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(n,o){e.login(n,o).then(function(e){t.$emit("login",e.data),window.location.href="/#/"})}}]),angular.module("app").controller("LogoutCtrl",["$scope","UserSvc",function(t,e){e.logout(),t.$emit("logout"),window.location.href="/#/login"}]),$(function(){$(".nav a").on("click",function(){"none"!=$(".navbar-toggle").css("display")&&$(".navbar-toggle").trigger("click")}),$(".tab").on("click",function(t){t.preventDefault(),$(".active").removeClass("active"),$(t.target).closest(".tab").addClass("active")})}),$(document).ready(function(){if("http://localhost:3000/#/login"!==window.location.href&&"http://localhost:3000/#/register"!==window.location.href&&"http://localhost:3000/#/logout"!==window.location.href||($(".topnav").css("transition-duration","0s"),$(".topnav").css("background-color","black"),$(".navbar-default .navbar-nav>li>a").css("color","#ffffff"),$(".navbar-default .navbar-brand ").css("color","#ffffff")),"http://localhost:3000/#/"===window.location.href){$(".topnav").css("transition-duration","0.2s"),$(".topnav").css("background-color","transparent"),$(".navbar-default .navbar-nav>li>a").css("color","#ffffff"),$(".navbar-default .navbar-brand ").css("color","#ffffff");var t=0,e=$(".intro-message"),n=e.offset();if(e.length)var o=function(){$(document).scroll(function(){t=$(this).scrollTop(),t>n.top?($(".topnav").css("transition-duration","0.2s"),$(".navbar-default .navbar-nav>li>a").css("color","#000000"),$(".navbar-default .navbar-brand ").css("color","#000000"),$(".topnav").css("background-color","#ffffff"),$(".navbar-default .navbar-toggle .icon-bar").css("background-color","#000000")):($(".topnav").css("transition-duration","0.2s"),$(".topnav").css("background-color","transparent"),$(".navbar-default .navbar-nav>li>a").css("color","#ffffff"),$(".navbar-default .navbar-brand ").css("color","#ffffff"),$(".navbar-default .navbar-toggle .icon-bar").css("background-color","#ffffff"))})}()}$("#bs-example-navbar-collapse-1").children().on("click",function(t){$(".topnav").css("transition-duration","0s"),$(".navbar-default .navbar-nav>li>a").css("color","#ffffff"),$(".navbar-default .navbar-brand ").css("color","#ffffff"),$(".topnav").css("background-color","#000000"),$(document).off("scroll",o)}),$("#create-buttons").children().on("click",function(t){$(".topnav").css("transition-duration","0s"),$(".navbar-default .navbar-nav>li>a").css("color","#ffffff"),$(".navbar-default .navbar-brand ").css("color","#ffffff"),$(".topnav").css("background-color","#000000"),$(document).off("scroll",o)}),$(".navbar-toggle").click(function(){$(".navbar-default .navbar-nav>li>a").css("color","#000000"),$(".navbar-default .navbar-brand ").css("color","#000000"),$(".topnav").css("background-color","#ffffff"),$(".navbar-default .navbar-toggle .icon-bar").css("background-color","#000000"),"true"===$(this).attr("aria-expanded")&&($(".topnav").css("background-color","transparent"),$(".navbar-default .navbar-nav>li>a").css("color","#ffffff"),$(".navbar-default .navbar-brand").css("color","#ffffff"),$(".navbar-default .navbar-toggle .icon-bar").css("background-color","#ffffff"))})}),angular.module("app").controller("MyTeamCtrl",["$scope","UserSvc","TeamService","$routeParams",function(t,e,n,o){n.fetchOne(o.team_id).success(function(e){t.team=e})}]),angular.module("app").service("PlayerService",["$http",function(t){this.fetchAll=function(){return t.get("/api/players")},this.fetchPlayers=function(e){return t.get("/api/players/"+e)},this.fetchOne=function(e){return t.get("/api/players/:player_id",player_id)},this.create=function(e){return t.post("/api/players",{name:e}).then(function(t){})}}]),angular.module("app").controller("PostsCtrl",["$scope","PostsService",function(t,e){t.addPost=function(){t.postBody&&e.create({username:t.user,body:t.postBody}).success(function(e){t.posts.unshift(e),t.postBody=null})},e.fetch().success(function(e){t.posts=e})}]),angular.module("app").service("PostsService",["$http",function(t){this.fetch=function(){return t.get("/api/posts")},this.create=function(e){return t.post("/api/posts",e)}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(t,e){t.register=function(n,o,r,a,c,s){e.register(n,o,r,a,c,s).then(function(e){t.$emit("login",e.data),window.location.href="/#/"})},t.suggestUsername=function(){t.username=t.email.substr(0,t.email.indexOf("@"))}}]),angular.module("app").config(["$httpProvider","$interpolateProvider","$routeProvider",function(t,e,n){t.interceptors.push("httpRequestInterceptor"),n.when("/",{controller:"HomeCtrl",templateUrl:"home.html"}).when("/createteam",{controller:"CreateTeamCtrl",templateUrl:"createteam.html",resolve:{user:["UserSvc",function(t){return t.getUser()}]}}).when("/feed",{controller:"PostsCtrl",templateUrl:"posts.html",resolve:{user:["UserSvc",function(t){return t.getUser()}]}}).when("/teams",{controller:"TeamCtrl",templateUrl:"teams.html",resolve:{user:["UserSvc",function(t){return t.getUser()}]}}).when("/teams/:team_id",{controller:"MyTeamCtrl",templateUrl:"myteam.html",resolve:{user:["UserSvc",function(t){return t.getUser()}]}}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"}).when("/logout",{controller:"LogoutCtrl",template:""})}]).factory("httpRequestInterceptor",["$q","$location",function(t,e){return{responseError:function(n){return 401===n.status&&e.path("/login"),t.reject(n)}}}]),angular.module("app").controller("TeamCtrl",["$scope","$location","UserSvc","TeamService",function(t,e,n,o){o.fetchMyTeams(t.currentUser._id).success(function(e){t.teams=e}),t.showTeam=function(t){e.path("#/teams/"+t._id)}}]),angular.module("app").service("TeamService",["$http",function(t){this.fetchAll=function(){return t.get("/api/teams")},this.fetchMyTeams=function(e){return t.get("/api/teams/"+e)},this.fetchOne=function(e){return t.get("/api/teams/team/"+e)},this.create=function(e,n,o,r){return t.post("/api/teams",{name:e,type:n,playday:o,manager:r}).then(function(t){window.location.href="/#/"})}}]),angular.module("app").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.get("/api/users")},e.login=function(n,o){return t.post("/api/sessions",{username:n,password:o}).then(function(n){return window.localStorage.token=n.data,t.defaults.headers.common["X-Auth"]=n.data,e.getUser()})},e.register=function(n,o,r,a,c,s){return t.post("/api/users",{username:n,email:o,firstname:r,surname:a,dateofbirth:c,password:s}).then(function(){return e.login(n,s)})},e.logout=function(){window.localStorage.removeItem("token"),t.defaults.headers.common["X-Auth"]=""}}]);