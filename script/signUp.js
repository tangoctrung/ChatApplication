const fileImage = document.querySelector(".container .form .chooseImage #file-upload");
console.log(fileImage);
const avatar = document.querySelector(".container .form .chooseImage img");
let urlavatar = '';


fileImage.addEventListener('change', handleFiles, false);
function handleFiles() {
  avatar.src = URL.createObjectURL(this.files[0]);
  
  console.log(fileImage.value);
  urlavatar = fileImage.value;
}


const signup = document.querySelector('#signup-form');

signup.addEventListener('submit', (e) =>{

    e.preventDefault();
    
    const name = signup['name'].value;
    const email = signup['email'].value;
    const password = signup['password'].value;
    const cpassword = signup['cpassword'].value;

      if(password.length<6 ){
        alert("Please make sure password is longer than 6 characters.")
        return false;
    
      } else if(password != cpassword) {

        alert("Please make sure passwords match.")
         return false;
      }

     else if(password === cpassword) {
     
  
       
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
      
          var userU = userCredential.user;
          console.log(userU);

          var user = firebase.auth().currentUser;

          user.updateProfile({
            displayName: name,
            photoURL: "/img/pp.png"
          }).then(function() {

            document.getElementById('success-register').style = '';
            document.getElementById('container-signup').style = 'display:none';
          
          }).catch(function(error) {
            // An error happened.
          });
          
        
      
      })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          alert("The email is not exits");
          // ..
        });
    }

    


})

