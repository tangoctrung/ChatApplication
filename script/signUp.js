const fileImage = document.querySelector(".container .form .chooseImage #file-upload");
console.log(fileImage);
const avatar = document.querySelector(".container .form .chooseImage img");
let urlavatar = '';

{/* <div class="form-group chooseImage">
        <label for="file-upload" class="custom-file-upload">
          <i class="ti-cloud-up"> </i>Avatar
        </label>
        <input id="file-upload"   type="file" />
        <img class="AvatarDemo rounded-circle" src="./img/avatar.png" style="width:80px;margin-left: 20px;"/>
      </div> */}
fileImage.addEventListener('change', handleFiles, false);
function handleFiles() {
  avatar.src = URL.createObjectURL(this.files[0]);
  
  var imageAvatar = this.files[0];
  var imageName = imageAvatar.name;
  var storageRef = firebase.storage().ref("images/" + imageName);
  var upLoadTask = storageRef.put(imageAvatar);
  upLoadTask.on('state_changed', function(snapshot) {
    var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log("upload is" + progress + "done");
  }, function(error){
    console.log(error.message);
  }, function(){
    upLoadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl){
      console.log(downloadUrl);
      urlavatar = downloadUrl;
    });
  });
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
          

          var user = firebase.auth().currentUser;
          if (urlavatar === "") urlavatar = "/img/pp.png";
          user.updateProfile({
            displayName: name,
            photoURL: urlavatar
          }).then(function() {

            document.getElementById('success-register').style = '';
            document.getElementById('container-signup').style = 'display:none';
          
          }).catch(function(error) {
            // An error happened.
            alert(error);
          });
          
        
      
      })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          alert(error);
          // ..
        });
    }

    


})

