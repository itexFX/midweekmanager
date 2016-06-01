var app=angular.module("app",["ngRoute"]);angular.module("app").controller("ApplicationCtrl",["$scope","$http","UserSvc",function(t,e,o){null!=window.localStorage.getItem("token")&&(e.defaults.headers.common["X-Auth"]=window.localStorage.getItem("token"),o.getUser().success(function(e){t.currentUser=e})),t.$on("login",function(e,o){t.currentUser=o}),t.logout=function(){t.currentUser="",window.localStorage.removeItem("token")}}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(o,n){e.login(o,n).then(function(e){t.$emit("login",e.data),window.location.href="/#/"})}}]),$(function(){$(".nav a").on("click",function(){"none"!=$(".navbar-toggle").css("display")&&$(".navbar-toggle").trigger("click")})}),$(function(){$(".tab").on("click",function(t){t.preventDefault(),$(".active").removeClass("active"),$(t.target).closest(".tab").addClass("active")})}),angular.module("app").controller("PostsCtrl",["$scope","PostsService",function(t,e){t.addPost=function(){t.postBody&&e.create({username:t.user,body:t.postBody}).success(function(e){t.posts.unshift(e),t.postBody=null})},e.fetch().success(function(e){t.posts=e})}]),angular.module("app").service("PostsService",["$http",function(t){this.fetch=function(){return t.get("/api/posts")},this.create=function(e){return t.post("/api/posts",e)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.get("/api/users")},e.login=function(o,n){return t.post("/api/sessions",{username:o,password:n}).then(function(o){return window.localStorage.token=o.data,t.defaults.headers.common["X-Auth"]=o.data,e.getUser()})}}]);