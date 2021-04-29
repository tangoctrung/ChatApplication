var currentUserKey = '';
var chatKey = '';
var friend_id = '';
var arrChatKey = [];
var countChatKey = 0;
var ObjectMessageLast = [];
var ArrSearchFriends = [];
var ArrSearchAllUsers = [];

document.addEventListener('keydown', function (key) {
    if (key.which === 13) {
        SendMessage();
    }
});

////////////////////////////////////////
function ChangeSendIcon(control) {
    if (control.value !== '') {
        document.getElementById('send').removeAttribute('style');
        document.getElementById('audio').setAttribute('style', 'display:none');
    }
    else {
        document.getElementById('audio').removeAttribute('style');
        document.getElementById('send').setAttribute('style', 'display:none');
    }
}
var count_Iconfile = 0;
function displayIcon_file() {
    if (count_Iconfile === 1) {
        document.querySelector(".icon-file").setAttribute('style', 'display:none');
        count_Iconfile = 0;
    } else {
        document.querySelector(".icon-file").removeAttribute('style');
        count_Iconfile = 1;
        document.querySelector(".icon-themen").setAttribute('style', 'display:none');
        count_Iconthemen = 0;
    }
}
var count_Iconthemen = 0;
function displayIcon_themen() {
    if (count_Iconthemen === 1) {
        document.querySelector(".icon-themen").setAttribute('style', 'display:none');
        count_Iconthemen = 0;
    } else {
        document.querySelector(".icon-themen").removeAttribute('style');
        count_Iconthemen = 1;
        document.querySelector(".icon-file").setAttribute('style', 'display:none');
        count_Iconfile = 0;
    }
}

var count_Info_User = 0;
function Display_Info_User() {
    if (count_Info_User === 1) {
        document.querySelector(".Modal_Info_User").setAttribute('style', 'display:none');
        count_Info_User = 0;
    } else {
        document.querySelector(".Modal_Info_User").removeAttribute('style');
        count_Info_User = 1;

    }
    firebase.database().ref("users").child(currentUserKey).on("value", function (user) {
        var data = user.val();      
        
        document.querySelector(".Modal_Info_User .name input").value = data.name;
        document.querySelector(".Modal_Info_User .date input").value = data.date;
        document.querySelector(".Modal_Info_User .phone input").value = data.phone;
        document.querySelector(".Modal_Info_User .email .email_user").textContent = data.email;
        document.querySelector(".Modal_Info_User .hometown input").value = data.hometown;
        document.querySelector(".Modal_Info_User .currentresidence input").value = data.currentresidence;
        document.querySelector(".Modal_Info_User textarea").value = data.Describe;
        document.querySelector(".Modal_Info_User .gender select").value = data.gender;
        document.querySelector(".Modal_Info_User .status select").value = data.status;
        document.querySelector(".Modal_Info_User .education select").value = data.education;
        document.querySelector(".Modal_Info_User .ChangeAvatar1 img").src = data.photoURL;

        document.querySelectorAll(".Modal_Info_User .date input")[1].checked = data.check_date;
        document.querySelectorAll(".Modal_Info_User .phone input")[1].checked = data.check_phone;
        document.querySelector(".Modal_Info_User .email input").checked = data.check_email;
        document.querySelectorAll(".Modal_Info_User .hometown input")[1].checked = data.check_hometown;
        document.querySelectorAll(".Modal_Info_User .currentresidence input")[1].checked = data.check_currentresidence;
        
        document.querySelector(".Modal_Info_User .checkbox1").checked = data.check_Describe;
        document.querySelector(".Modal_Info_User .gender input").checked = data.check_gender;
        document.querySelector(".Modal_Info_User .status input").checked = data.check_status;
        document.querySelector(".Modal_Info_User .education input").checked = data.check_education;
    });
}
// Change Avatar

function ChangeAvatar() {
    document.querySelector('.Modal_Info_User .ChangeAvatar1 .ChangeAvatar2').click();
}

const fileImage = document.querySelector(".Modal_Info_User .ChangeAvatar1 .ChangeAvatar2");
const avatar = document.querySelector("#Info_User_imgProfile");
var imageAvatar;
fileImage.addEventListener('change', handleFiles, false);
function handleFiles() {
    avatar.src = URL.createObjectURL(this.files[0]);
    console.log(currentUserKey);
    imageAvatar = this.files[0];
}

function Save_Info_User() {
    var name_User = document.querySelector(".Modal_Info_User .name input");
    var date_User = document.querySelector(".Modal_Info_User .date input");
    var phone_User = document.querySelector(".Modal_Info_User .phone input");
    var email_User = document.querySelector(".Modal_Info_User .email span");
    var hometown_User = document.querySelector(".Modal_Info_User .hometown input");
    var currentresidence_User = document.querySelector(".Modal_Info_User .currentresidence input");
    var Describe_User = document.querySelector(".Modal_Info_User textarea");
    var gender_User = document.querySelector(".Modal_Info_User .gender select");
    var status_User = document.querySelector(".Modal_Info_User .status select");
    var education_User = document.querySelector(".Modal_Info_User .education select");

    var status_date_User = document.querySelectorAll(".Modal_Info_User .date input")[1];
    var status_phone_User = document.querySelectorAll(".Modal_Info_User .phone input")[1];
    var status_email_User = document.querySelector(".Modal_Info_User .email input");
    var status_hometown_User = document.querySelectorAll(".Modal_Info_User .hometown input")[1];
    var status_currentresidence_User = document.querySelectorAll(".Modal_Info_User .currentresidence input")[1];
    
    var status_Describe_User = document.querySelector(".Modal_Info_User .checkbox1");
    var status_gender_User = document.querySelector(".Modal_Info_User .gender input");
    var status_status_User = document.querySelector(".Modal_Info_User .status input");
    var status_education_User = document.querySelector(".Modal_Info_User .education input");
    
    console.log(email_User.textContent);
    // change avatar
    

    firebase.database().ref("users").child(currentUserKey).update({
        name: name_User.value,
        email: email_User.textContent,
        check_email: status_email_User.checked,
        phone: phone_User.value,
        check_phone: status_phone_User.checked,
        date: date_User.value,
        check_date: status_date_User.checked,
        hometown: hometown_User.value,
        check_hometown: status_hometown_User.checked,
        currentresidence: currentresidence_User.value,
        check_currentresidence: status_currentresidence_User.checked,
        Describe: Describe_User.value,
        check_Describe: status_Describe_User.checked,
        gender: gender_User.value,
        check_gender: status_gender_User.checked,
        status: status_User.value,
        check_status: status_status_User.checked,
        education: education_User.value,
        check_education: status_education_User.checked,
    });

    if (imageAvatar !== null) {
        var imageName = imageAvatar.name;
        var storageRef = firebase.storage().ref("images/" + imageName);
        var upLoadTask = storageRef.put(imageAvatar);
        upLoadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is" + progress + "done");
        }, function (error) {
            console.log(error.message);
        }, function () {
            upLoadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
                console.log(downloadUrl);
                firebase.database().ref('users/' + currentUserKey).update({
                    photoURL: downloadUrl
                })
            });
        });
    }

}
/////////////////////////////////////////////
// Audio record

let chunks = [];
let recorder;
var timeout;

function record(control) {
    let device = navigator.mediaDevices.getUserMedia({ audio: true });
    device.then(stream => {
        if (recorder === undefined) {
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => {
                chunks.push(e.data);

                if (recorder.state === 'inactive') {
                    let blob = new Blob(chunks, { type: 'audio/webm' });
                    //document.getElementById('audio').innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="video/webm" />'; //;
                    var reader = new FileReader();

                    reader.addEventListener("load", function () {
                        var chatMessage = {
                            userId: currentUserKey,
                            msg: reader.result,
                            msgType: 'audio',
                            dateTime: new Date().toLocaleString(),
                            messageId: ''
                        };
                        document.getElementById("ReplyMessage").innerHTML = "";
                        document.querySelector(`.${chatKey}`).innerHTML = `You: Audio ${chatMessage.dateTime.split(',')[1]}`;
                        document.querySelector(`.${chatKey}`).title = `${chatMessage.dateTime.split(',')[0]}`;
                        ObjectMessageLast.forEach(element => {
                            if (element.chatKey === chatKey) {
                                element.message = "File";
                                element.messageTime0 = chatMessage.dateTime.split(',')[0];
                                element.messageTime1 = chatMessage.dateTime.split(',')[1];
                                element.PersonSendId = chatMessage.userId;
                            }

                        });
                        var messageKey1 = firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
                            if (error) alert(error);
                            else {

                                document.getElementById('txtMessage').value = '';
                                document.getElementById('txtMessage').focus();
                            }
                        }).getKey();
                        firebase.database().ref('chatMessages/' + chatKey + '/' + messageKey1).update({
                            messageId: messageKey1
                        })
                    }, false);

                    reader.readAsDataURL(blob);
                }
            }

            recorder.start();
            control.setAttribute('class', 'fas fa-stop fa-2x');
        }
    });

    if (recorder !== undefined) {
        if (control.getAttribute('class').indexOf('stop') !== -1) {
            recorder.stop();
            control.setAttribute('class', 'fas fa-microphone fa-2x');
        }
        else {
            chunks = [];
            recorder.start();
            control.setAttribute('class', 'fas fa-stop fa-2x');
        }
    }
}

/////////////////////////////////////////////////////////////////

function showEmojiPanel() {
    document.getElementById('emoji').removeAttribute('style');
}

function hideEmojiPanel() {
    document.getElementById('emoji').setAttribute('style', 'display:none;');
}

function clickEmoji() {
    document.querySelector('emoji-picker')
        .addEventListener('emoji-click', event => {
            document.getElementById('send').removeAttribute('style');
            document.getElementById('audio').setAttribute('style', 'display:none');
            document.getElementById('txtMessage').value += event.detail.unicode
        });
}
clickEmoji();


//////////////////////////////////////////////////////////////////////
function StartChat(friendKey, friendName, friendPhoto) {
    document.getElementById("ReplyMessage").innerHTML = "";
    var friendList = { friendId: friendKey, userId: currentUserKey, chatKey: '12345' };
    friend_id = friendKey;

    var db = firebase.database().ref('friend_list');
    var flag = false;
    db.on('value', function (friends) {
        friends.forEach(function (data) {
            var user = data.val();
            if ((user.friendId === friendList.friendId && user.userId === friendList.userId)
                || ((user.friendId === friendList.userId && user.userId === friendList.friendId))) {
                flag = true;
                chatKey = data.key;
            }
        });

        if (flag === false) {
            chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
                if (error) alert(error);
                else {
                    document.getElementById('chatPanel').removeAttribute('style');
                    document.getElementById('divStart').setAttribute('style', 'display:none');
                    hideChatList();
                }
            }).getKey();
            firebase.database().ref('friend_list/' + chatKey).update({
                chatKey: chatKey
            })

        }
        else {
            document.getElementById('chatPanel').removeAttribute('style');
            document.getElementById('divStart').setAttribute('style', 'display:none');
            hideChatList();
        }
        //////////////////////////////////////
        //display friend name and photo
        document.getElementById('divChatName').innerHTML = friendName;
        document.getElementById('imgChat').src = friendPhoto;

        document.getElementById('messages').innerHTML = '';

        document.getElementById('txtMessage').value = '';
        document.getElementById('txtMessage').focus();
        ////////////////////////////
        // Display The chat messages
        LoadChatMessages(chatKey, friendPhoto);


    });
}


function LoadChatKey() {

    firebase.database().ref("messageLast").on("child_added", function (chatKey) {
        var user = chatKey.val();

        var obj = {
            chatKey: user.chatKey,
            message: user.message,
            messageTime0: user.messageTime0,
            messageTime1: user.messageTime1,
            PersonSendId: user.PersonSendId
        };
        if (ObjectMessageLast.indexOf(obj) === -1) {
            ObjectMessageLast.push({
                chatKey: user.chatKey,
                message: user.message,
                messageTime0: user.messageTime0,
                messageTime1: user.messageTime1,
                PersonSendId: user.PersonSendId
            });
        }

    });

}
LoadChatKey();
//////////////////////////////////////

function LoadChatMessages(chatKey, friendPhoto) {
    var urlImageUser = "";
    firebase.database().ref('users').child(currentUserKey).on("value", function (data) {
        user = data.val();
        urlImageUser = user.photoURL;
    })
    firebase.database().ref("messageLast").child(chatKey).on("value", function(data){
        var messageLast = data.val();
        if (messageLast.PersonSendId !== currentUserKey) {
            document.querySelector(`.${chatKey}`).innerHTML = `${messageLast.message} ${messageLast.messageTime1}`;
            document.querySelector(`.${chatKey}`).title = `${messageLast.messageTime0}`;
        } else {
            document.querySelector(`.${chatKey}`).innerHTML = `You: ${messageLast.message} ${messageLast.messageTime1}`;
            document.querySelector(`.${chatKey}`).title = `${messageLast.messageTime0}`;
        }
        
    });
    var db = firebase.database().ref('chatMessages').child(chatKey);

    db.on('value', function (chats) {
        var messageDisplay = '';
        var deleteAllMessages = '';
        chats.forEach(function (data) {
            var chat = data.val();
            var messageKey = data.val().messageId;
            var dateTime = chat.dateTime.split(",");
            var msg = '';
            var messageLast = '';
            if (chat.msgType === 'image') {
                msg = `<img src='${chat.msg}' class="img-fluid" />`;
                messageLast = "Image";
            }
            else if (chat.msgType === 'audio') {
                msg = `<audio controls>
                        <source src="${chat.msg}" type="video/webm" />
                    </audio>`;
                messageLast = "Audio";
            }
            else if (chat.msgType === 'file') {
                // msg = `<video class="sendMessageFile">{${chat.msg}}</video>`
                msg = `<a href="${chat.dataUrl}" class="sendMessageFile" style="text-decoration: underline; cursor: pointer;">${chat.msg}</a>`;
                messageLast = `${chat.msg}`;
            }
            else {
                msg = chat.msg;
                messageLast = chat.msg;
            }
            if (chat.userId !== currentUserKey) {
                messageDisplay += `<div class="row">
                                    <div class="col-2 col-sm-1 col-md-1">
                                        <img src="${friendPhoto}" class="chat-pic rounded-circle" />
                                    </div>
                                    <div class="col-6 col-sm-7 col-md-7 LineMessage1">
                                        <p class="receive">                                                                                   
                                            ${msg}                                           
                                            <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                        </p>
                                        <ul class="list-icon-extend1">                                                                                     
                                            </li>
                                            <li class="member-icon-extend1">
                                            <i class="fa fa-reply"
                                            id="ReplyMessageButton"                                  
                                            title="Reply"
                                            onclick="ReplyMessageButton('${messageLast}')"
                                            ></i>                                          
                                            </li>
                                        </ul>
                                    </div>
                                </div>`;
                deleteAllMessages = `<a href="#" class="dropdown-item"
                onclick="DeleteMessages('${chatKey}')"              
                >Delete Messages</a>`;
                
            }
            else {

                messageDisplay += `<div class="row justify-content-end">
                            <div class="col-10 col-sm-7 col-md-7 LineMessage">
                                <ul class="list-icon-extend"> 
                                    <li class="member-icon-extend">
                                        <i class="fa fa-window-close"
                                        id="DeleteMessageButton"                                  
                                        title="Delete"
                                        onclick="DeleteMessageButton('${chatKey}', '${messageKey}')"
                                        ></i>                                   
                                    </li>

                                    <li class="member-icon-extend">
                                        <i class="fa fa-reply"
                                        id="ReplyMessageButton"                                  
                                        title="Reply"
                                        onclick="ReplyMessageButton('${messageLast}')"
                                        ></i>                                
                                    </li>
                                </ul>
                                <p class="sent float-right messageDelete">                                  
                                    
                                    ${msg}
                                    <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                </p>
                                
                                  
                            </div>
                            <div class="col-2 col-sm-1 col-md-1">
                                <img src="${urlImageUser}" class="chat-pic rounded-circle" />
                            </div>
                        </div>`;
                deleteAllMessages = `<a href="#" class="dropdown-item"
                onclick="DeleteMessages('${chatKey}')"              
                >Delete Messages</a>`;
            }


        });

        document.getElementById('messages').innerHTML = messageDisplay;
        document.getElementById('messages').scrollTo(0, document.getElementById('messages').scrollHeight);
        document.getElementById('deleteMessages').innerHTML = deleteAllMessages;

    });


}


////////////////////////////////////////////////////////////////
// DeleteMessageButton: delete a message

function DeleteMessageButton(chatKey, messageKey) {
    firebase.database().ref('chatMessages/').child(chatKey).child(messageKey).remove();
}

function ReplyMessageButton(message) {
    console.log("Reply message");
    var input = document.getElementById('txtMessage');

    document.querySelector('#ReplyMessage').innerHTML = "Reply: " + message
    + `<i style="float: right; color: red; cursor: pointer;" onclick="CloseReplyMessage()" class="fa fa-window-close" aria-hidden="true"></i>`;
    document.getElementById('txtMessage').focus();
    // document.getElementById('txtMessage').setAttribute("style", "font-size: 15px");

}

function CloseReplyMessage(){
    document.getElementById("ReplyMessage").innerHTML = "";
}
// Delete Messages : xoa mot cuoc hoi thoai

function DeleteMessages(chatKey) {
    // console.log('chatMessages/'+ chatKey);
    document.getElementById('deleteMessages').onclick = function () {
        firebase.database().ref('chatMessages/').child(chatKey).remove();
    }
}


function showChatList() {
    document.getElementById('side-1').classList.remove('d-none', 'd-md-block');
    document.getElementById('side-2').classList.add('d-none');
}

function hideChatList() {
    document.getElementById('side-1').classList.add('d-none', 'd-md-block');
    document.getElementById('side-2').classList.remove('d-none');
}


function SendMessage() {

    var chatMessage = {
        userId: currentUserKey,
        msg: document.getElementById('txtMessage').value,
        msgType: 'normal',
        dateTime: new Date().toLocaleString(),
        messageId: ''
    };
    document.getElementById("ReplyMessage").innerHTML = "";
    document.getElementById('audio').removeAttribute('style');
    document.getElementById('send').setAttribute('style', 'display:none');
    
    firebase.database().ref("messageLast").child(chatKey).update({
        chatKey: chatKey,
        message: chatMessage.msg,
        messageTime0: chatMessage.dateTime.split(',')[0],
        messageTime1: chatMessage.dateTime.split(',')[1],
        PersonSendId: chatMessage.userId
    });

    var messageKey1 = firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
        if (error) alert(error);
        else {
            firebase.database().ref('fcmTokens').child(friend_id).once('value').then(function (data) {
                $.ajax({
                    url: 'https://fcm.googleapis.com/fcm/send',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'key=AIzaSyBXkd3HN8IO3Xa4AFTvqFpo5LXZQ9-Rj7s'
                    },
                    data: JSON.stringify({
                        'to': data.val().token_id, 'data': { 'message': chatMessage.msg.substring(0, 30) + '...', 'icon': firebase.auth().currentUser.photoURL }
                    }),
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.error);
                    }
                });
            });

            document.getElementById('txtMessage').value = '';
            document.getElementById('txtMessage').focus();
        }
    }).getKey();
    // console.log(messageKey1);

    firebase.database().ref('chatMessages/' + chatKey + '/' + messageKey1).update({
        messageId: messageKey1
    })
}

///////////////////////////////////////////////////////////////
//Send image
function ChooseImage() {
    document.getElementById('imageFile').click();
}

function SendImage(event) {
    var file = event.files[0];

    if (!file.type.match("image.*")) {
        alert("Please select image only.");
    }
    else {
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            var chatMessage = {
                userId: currentUserKey,
                // msgDisplay: reader.result,
                msg: reader.result,
                msgType: 'image',
                dateTime: new Date().toLocaleString(),
                messageId: ''
            };
            document.getElementById("ReplyMessage").innerHTML = ""; 

            firebase.database().ref("messageLast").child(chatKey).update({
                chatKey: chatKey,
                message: "Image",
                messageTime0: chatMessage.dateTime.split(',')[0],
                messageTime1: chatMessage.dateTime.split(',')[1],
                PersonSendId: chatMessage.userId
            });
            // console.log(ObjectMessageLast);
            var messageKey1 = firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
                if (error) alert(error);
                else {

                    document.getElementById('txtMessage').value = '';
                    document.getElementById('txtMessage').focus();
                }
            }).getKey();

            firebase.database().ref('chatMessages/' + chatKey + '/' + messageKey1).update({
                messageId: messageKey1
            })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}


///////////////////////////////////////////////////////////////////
// Send file 
function ChooseFile() {
    document.getElementById('file').click();
}

function SendFile(event) {
    var file = event.files[0];


    if (!file.type === "application/pdf") {
        alert("Please select file only.");
    }
    else {
        var reader = new FileReader();

        reader.addEventListener("load", function (e) {
            console.log(e.target.result);
            var chatMessage = {
                userId: currentUserKey,
                msg: file.name,
                msgType: 'file',
                dataUrl: e.target.result,
                dateTime: new Date().toLocaleString()
            };
            document.getElementById("ReplyMessage").innerHTML = "";           

            firebase.database().ref("messageLast").child(chatKey).update({
                chatKey: chatKey,
                message: "File",
                messageTime0: chatMessage.dateTime.split(',')[0],
                messageTime1: chatMessage.dateTime.split(',')[1],
                PersonSendId: chatMessage.userId
            });
            var messageKey1 = firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
                if (error) alert(error);
                else {

                    document.getElementById('txtMessage').value = '';
                    document.getElementById('txtMessage').focus();
                }
            }).getKey();
            firebase.database().ref('chatMessages/' + chatKey + '/' + messageKey1).update({
                messageId: messageKey1
            })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}


///////////////////////////////////////////////////////////////////////
/////////////

function LoadChatList() {

    var db = firebase.database().ref('friend_list');
    db.on('value', function (lists) {
        lists.forEach(function (data) {
            var lst = data.val();

            var friendKey = '';
            var textFisrt = '';
            var timeText0 = '';
            var timeText1 = '';
            var PersonSendId = '';
            if (lst.friendId === currentUserKey) {
                friendKey = lst.userId;
            }
            else if (lst.userId === currentUserKey) {
                friendKey = lst.friendId;
            }
            for (let i = 0; i < ObjectMessageLast.length; i++) {
                if (lst.chatKey === ObjectMessageLast[i].chatKey) {
                    textFisrt = ObjectMessageLast[i].message;
                    timeText0 = ObjectMessageLast[i].messageTime0;
                    timeText1 = ObjectMessageLast[i].messageTime1;
                    PersonSendId = ObjectMessageLast[i].PersonSendId;
                }
            }

            var TextPerson = '';
            if (PersonSendId === currentUserKey) {
                TextPerson = "You: ";
            } else {
                TextPerson = "";
            }
            if (friendKey !== "") {
                firebase.database().ref('users').child(friendKey).on('value', function (data) {
                    var user = data.val();
            
                    ArrSearchFriends.push({
                        friendKey: data.key,
                        friendName: user.name,
                        friendPhoto: user.photoURL
                    });
                    document.getElementById('lstChat').innerHTML += `<li class="list-group-item list-group-item-action" >
                            <div class="row">
                                <div class="col-md-2">
                                    <img src="${user.photoURL}" onclick="Display_Info_Friend('${data.key}')" class="friend-pic rounded-circle" />
                                </div>
                                <div class="col-md-10" style="cursor:pointer;" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
                                    <div class="name">${user.name}</div>
                                    <div class="under-name ${lst.chatKey}" title="${timeText0}">${TextPerson} ${textFisrt} ${timeText1}</div>
                                </div>
                            </div>
                        </li>`;
                });
            }
        });
    });

}

var count_Info_Friend = 0;
function Display_Info_Friend(friendKey) {
    if (count_Info_Friend === 1) {
        document.querySelector(".Modal_Info_Friend").setAttribute('style', 'display:none');
        count_Info_Friend = 0;
    } else {
        document.querySelector(".Modal_Info_Friend").removeAttribute('style');
        count_Info_Friend = 1;

        // Hien thong tin cua friend
        console.log(friendKey);
        firebase.database().ref("users").child(friendKey).on("value", function(user){
            var data = user.val();
            console.log(data);
            document.querySelector(".Modal_Info_Friend img").src = data.photoURL
            document.querySelector(".Modal_Info_Friend .Name_Friend").textContent = data.name;
            if (data.check_date === true){
                document.querySelector(".Modal_Info_Friend .Date_Friend span").textContent = data.date;
            } else {
                document.querySelector(".Modal_Info_Friend .Date_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_gender === true){
                document.querySelector(".Modal_Info_Friend .Gender_Friend span").textContent = data.gender;
            } else {
                document.querySelector(".Modal_Info_Friend .Gender_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_phone === true){
                document.querySelector(".Modal_Info_Friend .Phone_Friend span").textContent = data.phone;
            } else {
                document.querySelector(".Modal_Info_Friend .Phone_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_email === true){
                document.querySelector(".Modal_Info_Friend .Email_Friend span").textContent = data.email;
            } else {
                document.querySelector(".Modal_Info_Friend .Email_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_status === true){
                document.querySelector(".Modal_Info_Friend .Status_Friend span").textContent = data.status;
            } else {
                document.querySelector(".Modal_Info_Friend .Status_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_education === true){
                document.querySelector(".Modal_Info_Friend .Education_Friend span").textContent = data.education;
            } else {
                document.querySelector(".Modal_Info_Friend .Education_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_hometown === true){
                document.querySelector(".Modal_Info_Friend .Hometown_Friend span").textContent = data.hometown;
            } else {
                document.querySelector(".Modal_Info_Friend .Hometown_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_currentresidence === true){
                document.querySelector(".Modal_Info_Friend .Currentresidence_Friend span").textContent = data.currentresidence;
            } else {
                document.querySelector(".Modal_Info_Friend .Currentresidence_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_Describe === true){
                document.querySelector(".Modal_Info_Friend .Describe_Friend label").textContent = data.Describe;
            } else {
                document.querySelector(".Modal_Info_Friend .Describe_Friend label").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }          
        })
    }
}
function Hide_Info_Friend(){
    document.querySelector(".Modal_Info_Friend").setAttribute('style', 'display:none');
    count_Info_Friend = 0;
}

function ChangeInputSearch() {
    document.getElementById("listSearchFriend").removeAttribute('style');
    document.getElementById("lstChat").setAttribute('style', 'display:none');
    var valueInputSearch = document.querySelector(".input_search").value.toLowerCase();
    if (valueInputSearch === "") {
        document.getElementById("listSearchFriend").setAttribute('style', 'display:none');
        document.getElementById("lstChat").removeAttribute('style');
    }
    document.getElementById("listSearchFriend").innerHTML = "";
    ArrSearchFriends.forEach(function (element) {

        if (element.friendName.search(valueInputSearch.toLowerCase()) !== -1
            || element.friendName.search(valueInputSearch.toUpperCase()) !== -1) {

            document.getElementById("listSearchFriend").innerHTML += `<li class="list-group-item list-group-item-action" >
            <div class="row">
                <div class="col-md-2">
                    <img src="${element.friendPhoto}" onclick="Display_Info_Friend('${element.friendKey}')" class="friend-pic rounded-circle" />
                </div>
                <div class="col-md-10" style="cursor:pointer;" onclick="StartChat('${element.friendKey}', '${element.friendName}', '${element.friendPhoto}')">
                    <div class="name">${element.friendName}</div>                   
                </div>
            </div>
        </li>`;
        }
    });

}


function PopulateUserList() {
    document.getElementById('lstUsers').innerHTML = `<div class="text-center">
                                                         <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
                                                     </div>`;
    var db = firebase.database().ref('users');
    var dbNoti = firebase.database().ref('notifications');
    var lst = '';
    // firebase.database().ref('users').child(friendKey).on('value', function (data) {
    //     var user = data.val();
    db.on('value', function (users) {
        
        if (users.hasChildren()) {
            lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
                            <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
                        </li>`;
            document.getElementById('lstUsers').innerHTML = lst;
        }
        users.forEach(function (data) {
            var user = data.val();
            console.log(data.key);
            console.log(user);
            if (user.email !== firebase.auth().currentUser.email) {
                dbNoti.orderByChild('sendTo').equalTo(data.key).on('value', function (noti) {
                    if (noti.numChildren() > 0 && Object.values(noti.val())[0].sendFrom === currentUserKey) {
                        lst = `<li class="list-group-item list-group-item-action">
                            <div class="row">
                                <div class="col-md-2">
                                    <img onclick="Display_Info_Friend('${data.key}')" src="${user.photoURL}" class="rounded-circle friend-pic" />
                                </div>
                                <div class="col-md-10" style="cursor:pointer;">
                                    <div class="name">${user.name}
                                        <button class="btn btn-sm btn-defualt" style="float:right;"><i class="fas fa-user-plus"></i> Sent</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
                        document.getElementById('lstUsers').innerHTML += lst;
                    }
                    else {
                        dbNoti.orderByChild('sendFrom').equalTo(data.key).on('value', function (noti) {
                            if (noti.numChildren() > 0 && Object.values(noti.val())[0].sendTo === currentUserKey) {
                                lst = `<li class="list-group-item list-group-item-action">
                            <div class="row">
                                <div class="col-md-2">
                                    <img onclick="Display_Info_Friend('${data.key}')" src="${user.photoURL}" class="rounded-circle friend-pic" />
                                </div>
                                <div class="col-md-10" style="cursor:pointer;">
                                    <div class="name">${user.name}
                                        <button class="btn btn-sm btn-defualt" style="float:right;"><i class="fas fa-user-plus"></i> Pending</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
                                document.getElementById('lstUsers').innerHTML += lst;
                            }
                            else {
                                lst = `<li class="list-group-item list-group-item-action" >
                            <div class="row">
                                <div class="col-md-2">
                                    <img onclick="Display_Info_Friend('${data.key}')" src="${user.photoURL}" class="rounded-circle friend-pic" />
                                </div>
                                <div class="col-md-10" style="cursor:pointer;">
                                    <div class="name">${user.name}
                                        <button onclick="SendRequest('${data.key}')" class="btn btn-sm btn-primary" style="float:right;"><i class="fas fa-user-plus"></i> Send Request</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;

                                document.getElementById('lstUsers').innerHTML += lst;
                            }
                        });
                    }
                });
            }
        });
    });

}

function NotificationCount() {
    let db = firebase.database().ref('notifications');

    db.orderByChild('sendTo').equalTo(currentUserKey).on('value', function (noti) {
        let notiArray = Object.values(noti.val()).filter(n => n.status === 'Pending');
        document.getElementById('notification').innerHTML = notiArray.length;
    });
}

function SendRequest(key) {
    var nameUser = "";
    var linkPhotoUser = "";
    firebase.database().ref("users").child(currentUserKey).on("value", function(data){
        var user = data.val();
        nameUser = user.name;
        linkPhotoUser = user.photoURL;
    });
    let notification = {
        sendTo: key,
        sendFrom: currentUserKey,
        name: nameUser,
        photo: linkPhotoUser,
        dateTime: new Date().toLocaleString(),
        status: 'Pending'
    };

    firebase.database().ref('notifications').push(notification, function (error) {
        if (error) alert(error);
        else {
            // do something
            PopulateUserList();
        }
    });
}

function PopulateNotifications() {
    document.getElementById('lstNotification').innerHTML = `<div class="text-center">
                                                         <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
                                                     </div>`;
    var db = firebase.database().ref('notifications');
    var lst = '';
    db.orderByChild('sendTo').equalTo(currentUserKey).on('value', function (notis) {
        if (notis.hasChildren()) {
            lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
                            <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
                        </li>`;
        }
        notis.forEach(function (data) {
            var noti = data.val();
            if (noti.status === 'Pending') {
                lst += `<li class="list-group-item list-group-item-action">
                            <div class="row">
                                <div class="col-md-2">
                                    <img src="${noti.photo}" class="rounded-circle friend-pic" />
                                </div>
                                <div class="col-md-10" style="cursor:pointer;">
                                    <div class="name">${noti.name}
                                        <button onclick="Reject('${data.key}')" class="btn btn-sm btn-danger" style="float:right;margin-left:1%;"><i class="fas fa-user-times"></i> Reject</button>
                                        <button onclick="Accept('${data.key}')" class="btn btn-sm btn-success" style="float:right;"><i class="fas fa-user-check"></i> Accept</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
            }
        });

        document.getElementById('lstNotification').innerHTML = lst;
    });
}

function Reject(key) {
    let db = firebase.database().ref('notifications').child(key).once('value', function (noti) {
        let obj = noti.val();
        obj.status = 'Reject';
        firebase.database().ref('notifications').child(key).update(obj, function (error) {
            if (error) alert(error);
            else {
                // do something
                PopulateNotifications();
            }
        });
    });
}

function Accept(key) {
    let db = firebase.database().ref('notifications').child(key).once('value', function (noti) {
        var obj = noti.val();
        obj.status = 'Accept';
        firebase.database().ref('notifications').child(key).update(obj, function (error) {
            if (error) alert(error);
            else {
                // do something
                PopulateNotifications();
                var friendList = { friendId: obj.sendFrom, userId: obj.sendTo, chatKey: '' };
                var chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
                    if (error) alert(error);
                    else {
                        //do Something
                    }
                }).getKey();
                firebase.database().ref('friend_list/' + chatKey).update({
                    chatKey: chatKey
                })
            }
        });
    });
}

function PopulateFriendList() {
    // document.getElementById('lstFriend').innerHTML = `<div class="text-center">
    //                                                     <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
    //                                                 </div>`;
    // var db = firebase.database().ref('users');
    // var lst = '';
    // db.on('value', function (users) {
    //    if (users.hasChildren()) {
    //        lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
    //                        <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
    //                    </li>`;
    //    }
    //    users.forEach(function (data) {
    //        var user = data.val();
    //        if (user.email !== firebase.auth().currentUser.email) {
    //            lst += `<li class="list-group-item list-group-item-action" data-dismiss="modal" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
    //                        <div class="row">
    //                            <div class="col-md-2">
    //                                <img src="${user.photoURL}" class="rounded-circle friend-pic" />
    //                            </div>
    //                            <div class="col-md-10" style="cursor:pointer;">
    //                                <div class="name">${user.name}</div>
    //                            </div>
    //                        </div>
    //                    </li>`;
    //        }
    //    });

    //    document.getElementById('lstFriend').innerHTML = lst;
    // });

}

function signIn() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user) => {
        document.getElementById('pagelogin').setAttribute('style', 'display:none;');
    });
    return false;
}

function signInFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result);
        })

}

function signOut() {


    reload = true;
    setTimeout(function () {

        location.reload();
        reload = false;
    }, 200);
    firebase.auth().signOut();
    document.getElementById('pagelogin').removeAttribute('style');


}

function ClickButtonLogin() {
    var username = document.getElementById('inputUsernameId').value;
    var password = document.getElementById('inputPasswordId').value;

    if (username === '12345678' && password === '12345678') {
        document.getElementById('pagelogin').setAttribute('style', 'display:none;');
    }
}

function onFirebaseStateChanged() {
    firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user) {
    if (user) {
        // document.getElementById('pagelogin').setAttribute('style', 'display:none;');

        document.getElementById('page-login').style = 'display:none';

        var userProfile = {
            email: '',
            name: '',
            photoURL: '',
            phone: '',
            date: '',
            hometown: '',
            currentresidence: '',
            Describe: '',
            gender: '',
            status: '',
            education: '',          
            check_email: false,
            check_phone: false,
            check_date: false,
            check_hometown: false,
            check_currentresidence: false,
            check_Describe: false,
            check_gender: false,
            check_status: false,
            check_education: false,
        };
        userProfile.email = firebase.auth().currentUser.email;
        userProfile.name = firebase.auth().currentUser.displayName;
        userProfile.photoURL = firebase.auth().currentUser.photoURL;
        var db = firebase.database().ref('users');
        var flag = false;
        db.on('value', function (users) {
            users.forEach(function (data) {
                var user = data.val();
                if (user.email === userProfile.email) {
                    currentUserKey = data.key;
                    flag = true;
                }
            });

            if (flag === false) {
                firebase.database().ref('users').push(userProfile, callback);
            }
            else {
                var urlImageUser = "";
                firebase.database().ref('users').child(currentUserKey).on("value", function (data) {
                    user = data.val();
                    urlImageUser = user.photoURL;
                })
                document.getElementById('imgProfile').src = urlImageUser;
                document.getElementById('imgProfile').title = user.name;

                document.getElementById('lnkSignIn').style = 'display:none';
                document.getElementById('lnkSignOut').style = '';
            }

            // const messaging = firebase.messaging();
            // navigator.serviceWorker.register('./firebase-messaging-sw.js')
            //     .then((registration) => {
            //         messaging.useServiceWorker(registration);

            //         // Request permission and get token.....
            //         messaging.requestPermission().then(function () {
            //             return messaging.getToken();
            //         }).then(function (token) {
            //             firebase.database().ref('fcmTokens').child(currentUserKey).set({ token_id: token });
            //         })
            //     });



            document.getElementById('lnkNewChat').classList.remove('disabled');
            LoadChatList();
            NotificationCount();
        });

    }
    else {
        document.getElementById('imgProfile').src = './img/pp.png';
        document.getElementById('imgProfile').title = '';

        document.getElementById('lnkSignIn').style = '';
        document.getElementById('lnkSignOut').style = 'display:none';

        document.getElementById('lnkNewChat').classList.add('disabled');
    }
}

function callback(error) {
    if (error) {
        alert(error);
    }
    else {
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName;

        document.getElementById('lnkSignIn').style = 'display:none';
        document.getElementById('lnkSignOut').style = '';
    }
}

////////////////////////////////////////////////////////////////
// clickColorThemen
function clickThemenColor(s) {
    // document.getElementById('messages').setAttribute('style', 'background-color: red;');
    document.getElementById('messages').setAttribute('style', `background-color: ${s};`);
}


const LoginByAccount = document.querySelector('#loginByAccount');

LoginByAccount.addEventListener('click', (e) => {

    e.preventDefault();

    const email = document.getElementById('input-name-acc').value;
    const password = document.getElementById('pswrd').value;

    if (email != '' && password != '') {

        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {

        }).catch((error) => {

            alert("Username or password is wrong");
        })

    }

});



/////////
// Call auth State changed

onFirebaseStateChanged();