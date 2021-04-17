
var LoginPasswordDisplay = document.querySelector(".loginForm .password .InputPassword");
var SignupPasswordDisplay = document.querySelector(".signupForm .PasswordSignup .InputPasswordSignup");
var SignupConfirmPasswordDisplay = document.querySelector(".signupForm .ConfirmPasswordSignup .InputConfirmPasswordSignup");

function ClickIconShowPassword(){
    LoginPasswordDisplay.type = 'text';
    console.log(LoginPasswordDisplay);
    document.querySelector(".loginForm .password .iconShowHide #eyeShow").setAttribute('style', 'display:none;');
    document.querySelector(".loginForm .password .iconShowHide #eyeHide").removeAttribute('style');
}

function ClickIconHidePassword(){
    LoginPasswordDisplay.type = 'password';
    document.querySelector(".loginForm .password .iconShowHide #eyeHide").setAttribute('style', 'display:none;');
    document.querySelector(".loginForm .password .iconShowHide #eyeShow").removeAttribute('style');
}

function ClickIconShowPasswordSignup(){
    SignupPasswordDisplay.type = 'text';
    document.querySelector(".signupForm .PasswordSignup .iconShowHideSignup #eyeShowSignup").setAttribute('style', 'display:none;');
    document.querySelector(".signupForm .PasswordSignup .iconShowHideSignup #eyeHideSignup").removeAttribute('style');
}

function ClickIconHidePasswordSignup(){
    SignupPasswordDisplay.type = 'password';
    document.querySelector(".signupForm .PasswordSignup .iconShowHideSignup #eyeHideSignup").setAttribute('style', 'display:none;');
    document.querySelector(".signupForm .PasswordSignup .iconShowHideSignup #eyeShowSignup").removeAttribute('style');
}

function ClickIconShowConfirmPasswordSignup(){
    SignupConfirmPasswordDisplay.type = 'text';
    document.querySelector(".signupForm .ConfirmPasswordSignup .iconShowHideSignup #eyeShowSignup").setAttribute('style', 'display:none;');
    document.querySelector(".signupForm .ConfirmPasswordSignup .iconShowHideSignup #eyeHideSignup").removeAttribute('style');
}

function ClickIconHideConfirmPasswordSignup(){
    SignupConfirmPasswordDisplay.type = 'password';
    document.querySelector(".signupForm .ConfirmPasswordSignup .iconShowHideSignup #eyeHideSignup").setAttribute('style', 'display:none;');
    document.querySelector(".signupForm .ConfirmPasswordSignup .iconShowHideSignup #eyeShowSignup").removeAttribute('style');
}

function LoginToSignup() {    
    document.getElementById('loginFormId').classList.remove('aniShowLoginForm');
    document.getElementById('signupFormId').classList.remove('aniHideSignupForm');

    document.getElementById('loginFormId').classList.add('aniHideLoginForm');
    document.getElementById('signupFormId').classList.add('aniShowSignupForm');
}

function SignupToLogin() {
    document.getElementById('loginFormId').classList.remove('aniHideLoginForm');
    document.getElementById('signupFormId').classList.remove('aniShowSignupForm');

    document.getElementById('loginFormId').classList.add('aniShowLoginForm');
    document.getElementById('signupFormId').classList.add('aniHideSignupForm');
}

// SIGNUP

// document.querySelector(".signup .signupForm .body .buttonSignup .ButtonSignup1").addEventListener("submit", (event) => {
//     event.preventDefault();
//     var name = $(".signupForm .usernameSignup .InputUsernameSignup").val();
//     var email = $('.signupForm .EmailSignup .InputEmailSignup').val();
//     var password = $('.signupForm .PasswordSignup .InputPasswordSignup').val();
//     var comfirmPassword = $('.signupForm .ConfirmPasswordSignup .InputConfirmPasswordSignup').val();
//     if (password === comfirmPassword) {
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCreated) => {
//             var userU = userCreated.user;
//             console.log(userU);
//             var user = firebase.auth().currentUser;
//             user.updateProfile({
//                 displayName: name,
//                 photoURL: "/img/pp.png"
//             })
//                 .then(function(){
//                     document.getElementById('success-register').style = '';
//                     document.getElementById('pagesignup').style = 'display:none';
//                 })
//                 .catch(function(error){
//                     alert(error);
//                 })
            
//         })
//         .catch(function(error){
//             alert(error);
//         });
//     }
//     else {
//         alert('Password and ConfirmPassword are different')
//     }
    
// });

//LOGIN

// $(".loginForm").on("submit", (event) => {
//     event.preventDefault();
//     var email = $('.loginForm .username .InputUsername').val();
//     var password = $('.loginForm .password .InputPassword').val();
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((user) => {
            
//             console.log(user.user);
//         })
//         .catch(function(error){
//             alert(error);
//         });
// });

