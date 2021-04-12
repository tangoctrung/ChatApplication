

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

$(".signupForm").on("submit", function(event){
    event.preventDefault();
    var name = $(".signupForm .usernameSignup .InputUsernameSignup").val();
    var email = $('.signupForm .EmailSignup .InputEmailSignup').val();
    var password = $('.signupForm .PasswordSignup .InputPasswordSignup').val();
    var comfirmPassword = $('.signupForm .ConfirmPasswordSignup .InputConfirmPasswordSignup').val();
    console.log(name);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCreated) => {
            var userU = userCreated.user;
            console.log(userU);
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name,
                photoURL: './img/ava.jpg'
            })
                .then(function(){
                    SignupToLogin();
                })
                .catch(function(error){
                    alert(error);
                })
            
        })
        .catch(function(error){
            alert(error);
        });
});

//LOGIN

$(".loginForm").on("submit", function(event){
    event.preventDefault();
    var email = $('.loginForm .username .InputUsername').val();
    var password = $('.loginForm .password .InputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user){
            document.getElementById('pagelogin').setAttribute('style', 'display:none;');
            console.log(user.user);
        })
        .catch(function(error){
            alert(error);
        });
});

