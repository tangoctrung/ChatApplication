var currentUserKey = '';
var chatKey = '';
var friend_id = '';
var arrChatKey = [];
var countChatKey = 0;
var ObjectMessageLast = [];
var ArrSearchFriends = [];
var ArrSearchAllUsers = [];
var currentUserKey1 = "";

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
    firebase.database().ref("users").child(currentUserKey).update({
        statusAcitve: true
    });
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

    
    var lst = '';
    document.getElementById('lstUsers').innerHTML = lst;

}

function showChatList() {
    document.getElementById('side-1').classList.remove('d-none', 'd-md-block');
    document.getElementById('side-2').classList.add('d-none');
}

function hideChatList() {
    document.getElementById('side-1').classList.add('d-none', 'd-md-block');
    document.getElementById('side-2').classList.remove('d-none');
}

function showEmojiPanel() {
    document.getElementById('emoji').removeAttribute('style');
}

function hideEmojiPanel() {
    document.getElementById('emoji').setAttribute('style', 'display:none;');
}

function clickEmoji() {
    document.querySelector('emoji-picker')
        .addEventListener('emoji-click', event => {
            document.getElementById('txtMessage').value += event.detail.unicode
        });
}
clickEmoji();

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
        // <div class="under-name ${lst.chatKey}" title="${timeText0}">${TextPerson} ${textFisrt} ${timeText1}</div>
        // if (user.PersonSendId === currentUserKey) {
        //     document.querySelector(`.${user.chatKey}`).innerHTML = `You ${user.message} ${user.messageTime1}`
        //     document.querySelector(`.${user.chatKey}`).title = `${user.messageTime0}`;
        // } else {
        //     document.querySelector(`.${user.chatKey}`).innerHTML = `${user.message} ${user.messageTime1}`
        //     document.querySelector(`.${user.chatKey}`).title = `${user.messageTime0}`;
        // }

    });

}
LoadChatKey();

///////////////////////////////////////////////
// CHAT MEMBER

function LoadChatList() {

    var db = firebase.database().ref('friend_list');
    db.on('value', function (lists) {
        document.getElementById('lstChat').innerHTML = "";
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
            if (textFisrt.length >= 24) {
                textFisrt = textFisrt.slice(0, 21) + "...";
            }
            if (friendKey !== "") {
                firebase.database().ref('users').child(friendKey).on('value', function (data) {
                    var user = data.val();

                    ArrSearchFriends.push({
                        friendKey: data.key,
                        friendName: user.name,
                        friendPhoto: user.photoURL,
                        friendEmail: user.email
                    });
                    if (lst.notificationMessage === true && lst.sender !== currentUserKey) {
                        if (user.statusAcitve === true) {
                            document.getElementById('lstChat').innerHTML += `<li class="list-group-item list-group-item-action" id="${lst.chatKey}" >
                                <div class="row">
                                    <div class="col-2 col-md-2" style="display: flex; padding: 0; margin-left: 10px;" >
                                        <div style="position:relative; height: 50px;width: 50px;">
                                            <div style="position:absolute; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                                <img style="height: 100%; width:100%; object-fit: cover;" src="${user.photoURL}" onclick="Display_Info_Friend('${data.key}')" class="friend-pic rounded-circle" />
                                            </div>
                                        </div> 
                                        <i class="fa fa-circle iconNotification" aria-hidden="true" id=""
                                            style=""
                                            ></i>
                                        <i class="fa fa-circle" aria-hidden="true" id="${friendKey}"
                                        style="color: seagreen; font-size: 12px; margin-top: 37px; margin-left:-10px;"
                                        ></i>
                                    </div>
                                    <div class="col-7 col-md-7" style="cursor:pointer;" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
                                        <div class="name">${user.name}</div>
                                        <div class="under-name ${lst.chatKey}" title="${timeText0}">${TextPerson} ${textFisrt} ${timeText1}
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>`;
                        }
                        else {
                            document.getElementById('lstChat').innerHTML += `<li class="list-group-item list-group-item-action" id="${lst.chatKey}" >
                                <div class="row">
                                    <div class="col-2 col-md-2" style="display: flex; padding: 0; margin-left: 10px;" >
                                        <div style="position:relative; height: 50px;width: 50px;">
                                            <div style="position:absolute; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                                <img style="height: 100%; width:100%; object-fit: cover;" src="${user.photoURL}" onclick="Display_Info_Friend('${data.key}')" class="friend-pic rounded-circle" />
                                            </div>
                                        </div>   
                                        <i class="fa fa-circle iconNotification" aria-hidden="true" id=""
                                            style=""
                                        ></i>                                
                                    </div>
                                    <div class="col-7 col-md-7" style="cursor:pointer;" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
                                        <div class="name">${user.name}</div>
                                        <div class="under-name ${lst.chatKey}" title="${timeText0}">${TextPerson} ${textFisrt} ${timeText1}
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>`;
                        }
                    } else {
                        if (user.statusAcitve === true) {
                            document.getElementById('lstChat').innerHTML += `<li class="list-group-item list-group-item-action" id="${lst.chatKey}" >
                                <div class="row">
                                    <div class="col-2 col-md-2" style="display: flex; padding: 0; margin-left: 10px;" >
                                        <div style="position:relative; height: 50px;width: 50px;">
                                            <div style="position:absolute; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                                <img style="height: 100%; width:100%; object-fit: cover;" src="${user.photoURL}" onclick="Display_Info_Friend('${data.key}')" class="friend-pic rounded-circle" />
                                            </div>
                                        </div>
                                
                                        <i class="fa fa-circle" aria-hidden="true" id="${friendKey}"
                                        style="color: seagreen; font-size: 12px; margin-top: 37px; margin-left:-10px;"
                                        ></i>
                                    </div>
                                    <div class="col-8 col-md-8" style="cursor:pointer; line-height: 30px;" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
                                        <div class="name">${user.name}</div>
                                        <div class="under-name ${lst.chatKey}" title="${timeText0}">${TextPerson} ${textFisrt} ${timeText1}                                          
                                        </div>
                                    </div>
                                </div>
                            </li>`;
                        }
                        else {
                            document.getElementById('lstChat').innerHTML += `<li class="list-group-item list-group-item-action" id="${lst.chatKey}" >
                                <div class="row">
                                    <div class="col-2 col-md-2" style="display: flex; padding: 0; margin-left: 10px" >
                                        <div style="position:relative; height: 50px;width: 50px;">
                                            <div style="position:absolute; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                                <img style="height: 100%; width:100%; object-fit: cover;" src="${user.photoURL}" onclick="Display_Info_Friend('${data.key}')" class="friend-pic rounded-circle" />
                                            </div>
                                        </div>                                   
                                    </div>
                                    <div class="col-8 col-md-8" style="cursor:pointer; line-height: 30px;" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
                                        <div class="name">${user.name}</div>
                                        <div class="under-name ${lst.chatKey}" title="${timeText0}">${TextPerson} ${textFisrt} ${timeText1}                                         
                                        </div>
                                    </div>
                                </div>
                            </li>`;
                        }
                    }


                });
            }
        });
    });

}
var chatKeyMain = "";
function StartChat(friendKey, friendName, friendPhoto) {
    var friendList = { friendId: friendKey, userId: currentUserKey, chatKey: '12345' };
    friend_id = friendKey;
    firebase.database().ref("users").child(currentUserKey).update({
        statusAcitve: true
    });

    var db = firebase.database().ref('friend_list');
    var flag = false;
    db.on('value', function (friends) {
        friends.forEach(function (data) {
            var user = data.val();
            if ((user.friendId === friendList.friendId && user.userId === friendList.userId)
                || ((user.friendId === friendList.userId && user.userId === friendList.friendId))) {
                flag = true;
                chatKey = data.key;
                chatKeyMain = chatKey;
                // firebase.database().ref("friend_list").child(chatKey).update({
                //     notificationMessage: false,
                // })
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
            // firebase.database().ref("friend_list").child(chatKey).update({
            //     notificationMessage: false,
            // })

        }
        else {
            document.getElementById('chatPanel').removeAttribute('style');
            document.getElementById('divStart').setAttribute('style', 'display:none');
            hideChatList();
        }
        //////////////////////////////////////
        //display friend name and photo

        // document.getElementById('messages').innerHTML = '';

        // document.getElementById('txtMessage').value = '';
        // document.getElementById('txtMessage').focus();
        ////////////////////////////
        // Display The chat messages
        LoadChatMessages(chatKey, friendPhoto, friendName, friendKey);
    });
}

function LoadChatMessages(chatKey, friendPhoto, friendName, friendKey) {
    document.getElementById("chatPanel").innerHTML = ` <div class="card-header">
    <div class="row">
        <div class="col-1 col-sm-1 col-md-1 col-lg-1 d-md-none" style="margin-top: 12px;">
            <i class="fas fa-list mt-2 " style="cursor:pointer" onclick="showChatList()"></i>
        </div>
        <div style="margin-top: 8px;" class="col-1 col-sm-1 col-md-1 col-lg-1">           
            <div style="position:relative; height: 40px; width: 40px !important;">
                <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                    <img id="imgChat" class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${friendPhoto}"/>
                </div>
            </div> 
        </div>
        <div class="col-6 col-sm-5 col-md-5 col-lg-7" style="margin-top: 8px; margin-left: 20px;">
            <div class="name" id="divChatName">${friendName}</div>
            <div class="under-name" id="divChatSeen">Active now</div>
        </div>
        <div class="col-3 col-sm-4 col-md-4 col-lg-3 icon header-icon" style="display: flex; align-items: center;">
            
            <div class="icon-member2">
                <i style="cursor: pointer;" class="fas fa-paperclip iconScaleWhenHover" onclick="displayIcon_file()"></i>
                <div class="icon-file" style="display: none;">
                    <a href="#" class="icon-file-member" onclick="ChooseImage()">
                        Image
                        <input type="file" id="imageFile" onchange="SendImage(this);" accept="image/*" style="display:none;" />
                    </a>
                    <a href="#" class="" onclick="ChooseFile()">
                        File
                        <input type="file" id="file" onchange="SendFile(this);" style="display:none;" />
                    </a>
                </div>
            </div>

            <div class="icon-member3">
                <i style="padding: 5px 10px; cursor: pointer;" class="fas fa-ellipsis-v iconScaleWhenHover" onclick="displayIcon_themen()"></i>
                <div class="icon-themen" style="display: none;">
                    <li class='member-menu'>
                        <a href="#" class="dropdown-item">
                            Theme    
                        </a>
                        <ul class="list-themen">
                        <img class="member-themen" onclick="clickThemenColor('./img/ThemenNone.jpg', '${chatKey}')" src="./img/ThemenNone.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen1.jpg', '${chatKey}')" src="./img/Themen1.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen2.jpg', '${chatKey}')" src="./img/Themen2.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen3.jpg', '${chatKey}')" src="./img/Themen3.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen4.jpg', '${chatKey}')" src="./img/Themen4.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen5.jpg', '${chatKey}')" src="./img/Themen5.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen6.jpg', '${chatKey}')" src="./img/Themen6.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen7.jpg', '${chatKey}')" src="./img/Themen7.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen8.jpg', '${chatKey}')" src="./img/Themen8.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen9.jpg', '${chatKey}')" src="./img/Themen9.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen10.jpg', '${chatKey}')" src="./img/Themen10.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen11.jpg', '${chatKey}')" src="./img/Themen11.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen12.jpg', '${chatKey}')" src="./img/Themen12.jpg"/>    
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen13.jpg', '${chatKey}')" src="./img/Themen13.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen14.jpg', '${chatKey}')" src="./img/Themen14.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen15.jpg', '${chatKey}')" src="./img/Themen15.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen16.jpg', '${chatKey}')" src="./img/Themen16.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen17.jpg', '${chatKey}')" src="./img/Themen17.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen18.jpg', '${chatKey}')" src="./img/Themen18.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen19.jpg', '${chatKey}')" src="./img/Themen19.jpg"/>
                        <img class="member-themen" onclick="clickThemenColor('./img/Themen20.jpg', '${chatKey}')" src="./img/Themen20.jpg"/> 
                        
                        </ul>

                    </li>
                    
                    <li id='deleteMessages'></li>   
                </div>
            </div>
        
        </div>
    </div>
</div>

<div class="card-body" id="messages">
    
</div>

<div class="card-footer">
    
    <span class="col-3 col-md-1" id="ReplyMessage1"></span>
    <span class="col-10 col-md-1" id="ReplyMessage"></span>
    
    <div class="row">

        <div class="col-2 col-md-2" style="cursor:pointer;">
            <i class="far fa-grin fa-2x iconScaleWhenHover" onclick="showEmojiPanel()"></i>
        </div>
        <div class="col-8 col-md-8">
            <input id="txtMessage" onfocus="hideEmojiPanel()" onkeyup="ChangeSendIcon(this)" type="text" placeholder="Type here" class="form-control form-rounded"/>
        </div>
        <div class="col-2 col-md-2" style="margin-right: 0px;">
            <i style="cursor:pointer;" id="audio" onclick="record(this)" class="fas fa-microphone fa-2x iconScaleWhenHover"></i>
            <i id="send" class="fa fa-paper-plane fa-2x iconScaleWhenHover" style="display:none;" 
            onclick="SendMessage('${friendKey}')"
            ></i>
        </div>
    </div>
</div>`;

    firebase.database().ref("users").child(friendKey).on("value", function (data) {
        var user = data.val();
        if (user.statusAcitve === true) {
            document.getElementById("divChatSeen").innerHTML = "Active now";
        } else {
            document.getElementById("divChatSeen").innerHTML = "Offline";
        }
    })
    firebase.database().ref("BackgroundChatkey").child(chatKey).on("value", function (data) {
        var url = data.val();
        var brgImage = document.getElementById("messages");
        brgImage.setAttribute("style", `background-Image: url(${url.bgrURL}); background-size: auto;`);
    })
    var urlImageUser = "";
    firebase.database().ref('users').child(currentUserKey).on("value", function (data) {
        user = data.val();
        urlImageUser = user.photoURL;
    })
    // <i class="fa fa-circle" aria-hidden="true" id=""
    // style="color: blue; font-size: 15px; float:right;"
    // ></i>
    var personSendId = '';
    var chatKeyPersonSend = '';
    firebase.database().ref("messageLast").child(chatKey).on("value", function (data) {
        var messageLast = data.val();
        personSendId = messageLast.PersonSendId;
        chatKeyPersonSend = messageLast.chatKey;
        if (messageLast.message.length >= 24) {
            messageLast.message = messageLast.message.slice(0, 21) + "...";
        }
        if (messageLast.PersonSendId !== currentUserKey) {
            document.querySelector(`.${chatKey}`).innerHTML = `${messageLast.message} ${messageLast.messageTime1}`;
            document.querySelector(`.${chatKey}`).title = `${messageLast.messageTime0}`;
            document.querySelector(".card-body").addEventListener('click', function (event) {
                firebase.database().ref("friend_list").child(chatKey).update({
                    notificationMessage: false
                });
                firebase.database().ref("friend_list").child(chatKey).update({
                    seenMessage: true,
                })
            })
            document.querySelector(".card-body").onscroll = function (event) {
                firebase.database().ref("friend_list").child(chatKey).update({
                    notificationMessage: false
                });
                firebase.database().ref("friend_list").child(chatKey).update({
                    seenMessage: true,
                })
            }
            document.getElementById("txtMessage").onclick = function (event) {

                firebase.database().ref("friend_list").child(chatKey).update({
                    notificationMessage: false
                });
                firebase.database().ref("friend_list").child(chatKey).update({
                    seenMessage: true,
                })
            }


        } else {
            document.querySelector(`.${chatKey}`).innerHTML = `You: ${messageLast.message} ${messageLast.messageTime1}`;
            document.querySelector(`.${chatKey}`).title = `${messageLast.messageTime0}`;
        }

    });

    var seenMessage;
    var senderId = "";
    firebase.database().ref("friend_list").child(chatKey).on("value", function (data) {
        var chat = data.val();
        seenMessage = chat.seenMessage;
        senderId = chat.sender;
    })
    
    var db = firebase.database().ref('chatMessages').child(chatKey);
    db.on('value', function (chats) {
        
        var chatKeyExtra = chats.key;
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
                    msg = `<audio style="width: 250px;" controls>
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
                    if (chat.msgReply === "") {
                        if (chat.MessageRemove === true) {
                            messageDisplay += `<div class="row" 
                                style="display: flex;
                                flex-direction: row;
                                flex-wrap: nowrap;">
                                    <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; left: 10px;">
                                        <img style="border: 1.5px solid #000;" src="${friendPhoto}" class="chat-pic rounded-circle" />
                                    </div>                             
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage1" style="padding: 0px;">
                                        <p class="remove">                                                                                   
                                            ${msg}                                                                             
                                        </p>
                                        
                                    </div>                                     
                            </div>`;
                        }
                        else {
                            messageDisplay += `<div class="row" 
                                style="display: flex;
                                flex-direction: row;
                                flex-wrap: nowrap;">
                                    <div class="col-2 col-sm-1 col-md-1" style="left: 10px; padding: 2px; margin-top: 2px;">
                                        <img style="border: 1.5px solid #000;" src="${friendPhoto}" class="chat-pic rounded-circle" />
                                    </div>                             
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage1" style="padding: 0px;">
                                        <p class="receive">                                                                                   
                                            ${msg}   
                                            <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>                                        
                                        </p>
                                        <ul class="list-icon-extend1">                                                                                                                               
                                            <li class="member-icon-extend1">
                                            <i class="fa fa-reply"
                                            id="ReplyMessageButton"                                  
                                            title="Reply"
                                            style="opacity: 0.2;"
                                            onclick="ReplyMessageButton('${messageLast}', '${chat.userId}')"
                                            ></i>                                          
                                            </li>
                                        </ul>
                                    </div>                                     
                            </div>`;
                        }
    
                    }
                    else {
                        if (chat.MessageRemove === true) {
                            messageDisplay += `<div class="row" 
                                style="display: flex;
                                flex-direction: row;
                                flex-wrap: nowrap;">
                                    <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; left: 10px;">
                                        <img style="border: 1.5px solid #000;" src="${friendPhoto}" class="chat-pic rounded-circle" />
                                    </div>                                           
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage1" style="padding: 0px;">
                                        <p class="remove">                                                                                   
                                            ${msg}                                           
                                        </p>                              
                                    </div>                                    
                            </div>`;
                        }
                        else {
                            messageDisplay += `<div class="row" 
                                style="display: flex;
                                flex-direction: row;
                                flex-wrap: nowrap;">
                                <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; margin-top: 52px; left: 10px;">
                                    <img style="border: 1.5px solid #000;" src="${friendPhoto}" class="chat-pic rounded-circle" />
                                </div>
                                <div>
                                    <div class="col-10 col-sm-7 col-md-7 float-left" style="padding: 0px;">
                                        <p class="titleReplyMember">
                                        ${chat.titleReply}
                                        </p>
                                    </div>
                                    <div class="col-10 col-sm-7 col-md-7 float-left containerReplyPadding" style="padding: 0px;">
                                        <p id="${chat.messageId}" class="reply replyPadding" style="color:rgb(118,103,107); padding: 5px 15px 15px 15px;">                                                 
                                            ${chat.msgReply}
                                        </p> 
                                    </div>
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage1" style="padding: 0px;">
                                        <p class="receive">                                                                                   
                                            ${msg}   
                                            <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>                                        
                                        </p>
                                        <ul class="list-icon-extend1">                                                                                                                               
                                            <li class="member-icon-extend1">
                                            <i class="fa fa-reply"
                                            id="ReplyMessageButton"                                  
                                            title="Reply"
                                            style="opacity: 0.2;"
                                            onclick="ReplyMessageButton('${messageLast}', '${chat.userId}')"
                                            ></i>                                          
                                            </li>
                                        </ul>
                                    </div>
                                </div>              
                            </div>`;
                        }
    
                    }
    
                    deleteAllMessages = `<a href="#" class="dropdown-item"
                        onclick="DeleteMessages('${chatKey}')"              
                        >Delete Messages</a>`;
    
                }
                else {
                    if (chat.msgReply === "") {
                        if (chat.MessageRemove === true) {
                            messageDisplay += `<div class="row justify-content-end">                  
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 20px;">                              
                                        <p class="remove float-right">                                                 
                                            ${msg}
                                        </p>               
                                    </div>
                            
                        </div>`;
                        }
                        else {
                            if (seenMessage === true && senderId === currentUserKey) {
                                messageDisplay += `<div class="row justify-content-end" style="position: relative;" id="${messageKey}">                  
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 20px;">
                                        <ul class="list-icon-extend"> 
                                            <li class="member-icon-extend">
                                                <i class="fa fa-window-close"
                                                id="DeleteMessageButton"                                  
                                                title="Delete"
                                                style="opacity: 0.2;"   
                                                onclick="DeleteMessageButton('${chatKey}', '${messageKey}')"
                                                ></i>                                   
                                            </li>
                                            <li class="member-icon-extend">
                                                <i class="fa fa-reply"
                                                id="ReplyMessageButton"                                  
                                                title="Reply"
                                                style="opacity: 0.2;"   
                                                onclick="ReplyMessageButton('${messageLast}', '${chat.userId}')"
                                                ></i>                                
                                            </li>
                                        </ul>
                                        <p class="sent float-right" title="${chat.dateTime}">                                                 
                                            ${msg}
                                            <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                        </p>   
                                                
                                    </div>
                                    <div style="position: absolute; top: calc(100% - 18px); font-size: 12px; right: 20px;" class="">Seen</div> 
                                 </div>`;
                            }
                            else {
                                messageDisplay += `<div class="row justify-content-end" style="position: relative;" id="${messageKey}">                  
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 20px;">
                                        <ul class="list-icon-extend"> 
                                            <li class="member-icon-extend">
                                                <i class="fa fa-window-close"
                                                id="DeleteMessageButton"                                  
                                                title="Delete"
                                                style="opacity: 0.2;"   
                                                onclick="DeleteMessageButton('${chatKey}', '${messageKey}')"
                                                ></i>                                   
                                            </li>
                                            <li class="member-icon-extend">
                                                <i class="fa fa-reply"
                                                id="ReplyMessageButton"                                  
                                                title="Reply"
                                                style="opacity: 0.2;"   
                                                onclick="ReplyMessageButton('${messageLast}', '${chat.userId}')"
                                                ></i>                                
                                            </li>
                                        </ul>
                                        <p class="sent float-right" title="${chat.dateTime}">                                                 
                                            ${msg}
                                            <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                        </p>   
                                                
                                    </div>
                                </div>`;
                            }
                        }
    
                    }
                    // <div style="position: absolute; top: calc(100% - 18px); font-size: 12px; right: 20px;" class="">Seen</div>                
                    else {
                        if (chat.MessageRemove === true) {
                            messageDisplay += `<div class="row justify-content-end">                          
                                    <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 20px;">                          
                                        <p class="remove float-right">                                                 
                                            ${msg}
                                        </p>               
                                    </div>
                                    
                                </div>`;
                        }
                        else {
                            if (seenMessage === true && senderId === currentUserKey) {
                                messageDisplay += `<div class="row justify-content-end" style="position: relative;" id="${messageKey}">
        
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: -40px;">
                                <p class="titleReplyMember1">
                                    ${chat.titleReply}
                                </p>
                            </div>
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: -40px;">
                                <p id="${chat.messageId}" class="reply replyPadding1" style="color:rgb(118,103,107); padding: 5px 15px 15px 15px;">                                                 
                                    ${chat.msgReply}
                                </p> 
                            </div>
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 20px;">
                                <ul class="list-icon-extend"> 
                                    <li class="member-icon-extend">
                                        <i class="fa fa-window-close"
                                        id="DeleteMessageButton"                                  
                                        title="Delete"
                                        style="opacity: 0.2;"   
                                        onclick="DeleteMessageButton('${chatKey}', '${messageKey}')"
                                        ></i>                                   
                                    </li>
                                    <li class="member-icon-extend">
                                        <i class="fa fa-reply"
                                        id="ReplyMessageButton"                                  
                                        title="Reply"
                                        style="opacity: 0.2;"   
                                        onclick="ReplyMessageButton('${messageLast}', '${chat.userId}')"
                                        ></i>                                
                                    </li>
                                </ul>
                                <p class="sent float-right" title="${chat.dateTime}">                                                 
                                    ${msg}
                                    <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                </p>               
                            </div>
                            <div style="position: absolute; top: calc(100% - 18px); font-size: 12px; right: 20px;" class="">Seen</div>       
                        </div>`;
                            }
                            else {
                                messageDisplay += `<div class="row justify-content-end" style="position: relative;" id="${messageKey}">
        
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: -40px;">
                                <p class="titleReplyMember1">
                                    ${chat.titleReply}
                                </p>
                            </div>
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: -40px;">
                                <p id="${chat.messageId}" class="reply replyPadding1" style="color:rgb(118,103,107); padding: 5px 15px 15px 15px;">                                                 
                                    ${chat.msgReply}
                                </p> 
                            </div>
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 20px;">
                                <ul class="list-icon-extend"> 
                                    <li class="member-icon-extend">
                                        <i class="fa fa-window-close"
                                        id="DeleteMessageButton"                                  
                                        title="Delete"
                                        style="opacity: 0.2;"   
                                        onclick="DeleteMessageButton('${chatKey}', '${messageKey}')"
                                        ></i>                                   
                                    </li>
                                    <li class="member-icon-extend">
                                        <i class="fa fa-reply"
                                        id="ReplyMessageButton"                                  
                                        title="Reply"
                                        style="opacity: 0.2;"   
                                        onclick="ReplyMessageButton('${messageLast}', '${chat.userId}')"
                                        ></i>                                
                                    </li>
                                </ul>
                                <p class="sent float-right" title="${chat.dateTime}">                                                 
                                    ${msg}
                                    <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                </p>               
                            </div>
                        </div>`;
                            }
    
                        }
    
                    }
    
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

var FriendKeyWantSend = "";
//gui tin nhan
function SendMessage(friendKey) {
    FriendKeyWantSend = friendKey;
    var chatMessage = {
        userId: currentUserKey,
        msg: document.getElementById('txtMessage').value,
        msgType: 'normal',
        dateTime: new Date().toLocaleString(),
        messageId: '',
        titleReply: document.getElementById("ReplyMessage1").textContent,
        msgReply: document.getElementById("ReplyMessage").textContent
    };
    document.getElementById("ReplyMessage").innerHTML = "";
    document.getElementById("ReplyMessage1").innerHTML = "";
    document.getElementById('audio').removeAttribute('style');
    document.getElementById('send').setAttribute('style', 'display:none');

    firebase.database().ref("messageLast").child(chatKey).update({
        chatKey: chatKey,
        message: chatMessage.msg,
        messageId: "",
        messageTime0: chatMessage.dateTime.split(',')[0],
        messageTime1: chatMessage.dateTime.split(',')[1],
        PersonSendId: chatMessage.userId
    });
    firebase.database().ref("friend_list").child(chatKey).update({
        notificationMessage: true,
        sender: currentUserKey,
        seenMessage: false,
    })

    var imageAvatarSend = "";
    var nameSender = "";
    var message = "";
    if (chatMessage.msg.length >= 30) {
        message = chatMessage.msg.substring(0, 30);
    } else {
        message = chatMessage.msg;
    }
    firebase.database().ref("users").child(currentUserKey).on("value", function (data) {
        var user = data.val();
        imageAvatarSend = user.photoURL;
        nameSender = user.name;
    });
    var messageKey1 = firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
        if (error) alert(error);
        else {
            // firebase.database().ref('fcmTokens').child(friend_id).once('value').then(function (data) {
            //     var tokenId = data.val();
            //     $.ajax({
            //         url: 'https://fcm.googleapis.com/fcm/send',
            //         method: 'POST',
            //         headers: { 
            //             'Content-Type': 'application/json',
            //             'Authorization': 'key=AAAAuiDVSvc:APA91bHGgLuwWlx_nkMFz_DeRQah2Kl1Pvta9gWHlF2xtMc4V5dCeC29JmuOZQ2jAc1BO6buIYHNc4SALJLjVqopRyEgQ2WXioUmLZj7NEvTYV6tLn1mPQLy76yBUrVdXDJa94n_bPua'
            //         },
            //         data: JSON.stringify({
            //             'to': tokenId.token_id, 
            //             'data': { 
            //                 'title': nameSender,
            //                 'message': message,
            //                 'icon': imageAvatarSend,                                              
            //                     },

            //         }),
            //         success: function (response) {

            //             console.log(response);
            //         },
            //         error: function (error) {
            //             console.log(error);
            //         }
            //     });

            //     // document.querySelector(".ReceiveMessage").play();
            // });

            document.getElementById('txtMessage').value = '';
            document.getElementById('txtMessage').focus();
        }
    }).getKey();
    // console.log(messageKey1);
    firebase.database().ref('chatMessages/' + chatKey + '/' + messageKey1).update({
        messageId: messageKey1
    });
    firebase.database().ref('messageLast/' + chatKey).update({
        messageId: messageKey1
    });


}

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
                messageId: '',
                titleReply: document.getElementById("ReplyMessage1").textContent,
                msgReply: document.getElementById("ReplyMessage").textContent
            };
            document.getElementById("ReplyMessage").innerHTML = "";

            firebase.database().ref("messageLast").child(chatKey).update({
                chatKey: chatKey,
                message: "Image",
                messageId: "",
                messageTime0: chatMessage.dateTime.split(',')[0],
                messageTime1: chatMessage.dateTime.split(',')[1],
                PersonSendId: chatMessage.userId
            });
            firebase.database().ref("friend_list").child(chatKey).update({
                notificationMessage: true,
                sender: currentUserKey,
                seenMessage: false,
            })
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
            firebase.database().ref('messageLast/' + chatKey).update({
                messageId: messageKey1
            })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}

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
                dateTime: new Date().toLocaleString(),
                titleReply: document.getElementById("ReplyMessage1").textContent,
                msgReply: document.getElementById("ReplyMessage").textContent
            };
            document.getElementById("ReplyMessage").innerHTML = "";

            firebase.database().ref("messageLast").child(chatKey).update({
                chatKey: chatKey,
                message: "File",
                messageId: "",
                messageTime0: chatMessage.dateTime.split(',')[0],
                messageTime1: chatMessage.dateTime.split(',')[1],
                PersonSendId: chatMessage.userId
            });
            firebase.database().ref("friend_list").child(chatKey).update({
                notificationMessage: true,
                sender: currentUserKey,
                seenMessage: false,
            })
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
            firebase.database().ref('messageLast/' + chatKey).update({
                messageId: messageKey1
            })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}

// Send audio
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
                            messageId: '',
                            titleReply: document.getElementById("ReplyMessage1").textContent,
                            msgReply: document.getElementById("ReplyMessage").textContent
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
                        firebase.database().ref("friend_list").child(chatKey).update({
                            notificationMessage: true,
                            sender: currentUserKey,
                            seenMessage: false,
                        })
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
                        firebase.database().ref('messageLast/' + chatKey).update({
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

// DeleteMessageButton: delete a message
function DeleteMessageButton(chatKey, messageKey) {
    firebase.database().ref('chatMessages/').child(chatKey).child(messageKey).update({
        msg: "Message removed",
        MessageRemove: true,
    });
    firebase.database().ref("messageLast").child(chatKey).update({
        chatKey: chatKey,
        message: "Message removed",
        messageTime0: new Date().toLocaleString().split(',')[0],
        messageTime1: new Date().toLocaleString().split(',')[1],
        PersonSendId: currentUserKey
    });
}

function ReplyMessageButton(message, memberId) {
    console.log("Reply");
    if (memberId === currentUserKey) {
        document.querySelector('#ReplyMessage1').innerHTML = "Reply yourself: ";
    } else {
        var nameReply = "";
        firebase.database().ref("users").child(memberId).once("value", function (data) {
            var user = data.val();
            nameReply = user.name;
        })
        document.querySelector('#ReplyMessage1').innerHTML = "Reply: " + `${nameReply}` + ": ";
    }
    var input = document.getElementById('txtMessage');
    document.querySelector('#ReplyMessage').innerHTML = message
        + `<i style="float: right; color: red; cursor: pointer;" onclick="CloseReplyMessage()" class="fa fa-window-close" aria-hidden="true"></i>`;
    document.getElementById('txtMessage').focus();
    // document.getElementById('txtMessage').setAttribute("style", "font-size: 15px");

}

function CloseReplyMessage() {
    document.getElementById("ReplyMessage").innerHTML = "";
    document.getElementById("ReplyMessage1").innerHTML = "";
}

// Delete Messages : xoa mot cuoc hoi thoai
function DeleteMessages(chatKey) {
    // console.log('chatMessages/'+ chatKey);
    document.getElementById('deleteMessages').onclick = function () {
        firebase.database().ref('chatMessages/').child(chatKey).remove();
    }
}

// clickColorThemen
function clickThemenColor(s, chatKey) {
    firebase.database().ref("BackgroundChatkey").child(chatKey).update({
        bgrURL: s
    });
    var brgImage = document.getElementById("messages");
    brgImage.setAttribute("style", `background-Image: url(${s}); background-size: auto;`);

}



//////////////////////////////////////////////////////////////////////
// CHAT GROUP


// Tao mot group
function Creat_a_Group() {
    var count = 0;
    console.log(ArrSearchFriends);
    var groupChat = document.getElementById("lstGroupChat");
    var group = {};
    group.AdminId = currentUserKey;
    group.nameGroup = document.querySelector(".containerCreateGroup .NameGroup").value;
    ArrSearchFriends.forEach(element => {
        // console.log(document.querySelector(`.${element.friendKey}`).checked);
        if (document.querySelector(`.${element.friendKey}`).checked === true) {
            var member = "MemberId" + count;
            group[member] = element.friendKey;
            count++;
        }

    });
    group.QuantityMember = count + 1;
    group.avatarGroup = "./img/group.png";
    var groupKey = firebase.database().ref("Groups").push(group).getKey();
    console.log(group);
    console.log(groupKey);
    firebase.database().ref("Groups").child(groupKey).update({
        groupKey: groupKey
    })

    // Close container create group
    document.querySelector(".containerCreateGroup .NameGroup").value = "";
    document.querySelector(".containerCreateGroup").setAttribute("style", "display:none;");

}


// DISPLAY CREATE A GROUP
function ShowContainerCreateGroup() {
    firebase.database().ref("users").child(currentUserKey).update({
        statusAcitve: true
    });
    document.querySelector(".containerCreateGroup").removeAttribute("style");

    // SHOW LIST FRIEND
    document.getElementById('listMemberGroup').innerHTML = "";
    var db = firebase.database().ref('friend_list');
    db.on('value', function (lists) {
        lists.forEach(function (data) {
            var lst = data.val();
            var friendKey = '';
            if (lst.friendId === currentUserKey) {
                friendKey = lst.userId;
            }
            else if (lst.userId === currentUserKey) {
                friendKey = lst.friendId;
            }

            if (friendKey !== "") {
                firebase.database().ref('users').child(friendKey).on('value', function (data) {
                    var user = data.val();

                    document.getElementById('listMemberGroup').innerHTML += `<div class="list-group-item" style="margin-left: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex;">
                        <div style="position:relative; height: 50px; width: 50px !important; display: inline-block;">
                            <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                <img id="imgChat" class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${user.photoURL}"/>
                            </div>
                        </div> 
                        <label style="margin-top: 10px; font-size: 20px;" class="ml-4">${user.name}
                        </label>
                    </div>           
                    <input
                        class="${data.key}"
                        style="float: right; margin-right: 30px; transform: scale(1.4);"
                        type="checkbox" />
                </div>`;
                });
            }
        });
    });
}
function CloseContainerCreateGroup() {
    document.querySelector(".containerCreateGroup").setAttribute("style", "display:none;");
}

// Load danh sach cac group cua user
function LoadChatListGroup() {
    document.getElementById('lstGroupChat').innerHTML = "";
    firebase.database().ref("Groups").on("value", function (groups) {
        document.getElementById('lstGroupChat').innerHTML = "";
        groups.forEach(function (data) {
            var arrMembersGroupKey = [];
            var group = data.val();
            arrMembersGroupKey.push(group.AdminId);
            for (var i = 0; i < group.QuantityMember - 1; i++) {
                arrMembersGroupKey.push(group["MemberId" + i]);
            }
            var activeGroup = false;
            arrMembersGroupKey.forEach(function (element) {
                if (element !== currentUserKey) {
                    firebase.database().ref("users").child(element).once("value", function (data) {
                        var user = data.val();
                        if (user.statusAcitve === true) activeGroup = true;
                    });
                }
            });
            var groupPhoto = group.avatarGroup;
            if (arrMembersGroupKey.indexOf(currentUserKey) !== -1) {
                if (activeGroup === true) {
                    document.getElementById('lstGroupChat').innerHTML += `<li onclick="StartChatGroup('${data.key}', '${group.nameGroup}', '${groupPhoto}')" class="list-group-item list-group-item-action" >
                        <div class="row">
                            <div class="col-2 col-md-2" style="position: relative;">                                 
                                <div style="position:relative; height: 40px; width: 40px !important;">
                                    <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                        <img id="imgChat" class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${groupPhoto}"/>
                                    </div>
                                </div>  
                                <i class="fa fa-circle" aria-hidden="true" id="" style="position: absolute; z-index: 3;color: seagreen; font-size: 12px; margin-top: -10px; margin-left: 30px;"
                                ></i>                      
                            </div>
                            
                            <div  class="col-8 col-md-8" style="cursor:pointer;">
                                <div class="name" style="line-height: 50px; margin-left: 20px; font-size: 20px;">${group.nameGroup}</div>
                            </div>
                        </div>
                    </li>`;
                }
                else {
                    document.getElementById('lstGroupChat').innerHTML += `<li onclick="StartChatGroup('${data.key}', '${group.nameGroup}', '${groupPhoto}')" class="list-group-item list-group-item-action" >
                        <div class="row">
                            <div class="col-2 col-md-2" >
                                <div style="position:relative; height: 40px; width: 40px !important;">
                                    <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                        <img id="imgChat" class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${groupPhoto}"/>
                                    </div>
                                </div>                         
                            </div>                          
                            <div  class="col-8 col-md-8" style="cursor:pointer;">
                                <div class="name" style="line-height: 50px; margin-left: 20px; font-size: 20px;">${group.nameGroup}</div>
                            </div>
                        </div>
                    </li>`;
                }

            }
        })

    });
}

function StartChatGroup(groupKey, groupName, groupPhoto) {
    firebase.database().ref("users").child(currentUserKey).update({
        statusAcitve: true
    });
    document.getElementById('chatPanel').removeAttribute('style');
    document.getElementById('divStart').setAttribute('style', 'display:none');
    hideChatList();
    LoadChatMessageGroup(groupKey, groupName, groupPhoto);
}

// Load messages cua mot group
function LoadChatMessageGroup(groupKey, groupName, groupPhoto) {
    document.getElementById("chatPanel").innerHTML = ` <div class="card-header" >
    <div class="row">
        <div class="col-1 col-sm-1 col-md-1 col-lg-1 d-md-none" style="margin-top: 5px;">
            <i class="fas fa-list mt-2" style="cursor:pointer" onclick="showChatList()"></i>
        </div>
        <div class="col-1 col-sm-2 col-md-2 col-lg-1">
            <div style="position:relative; height: 40px; width: 40px !important;">
                <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                    <img id="imgChat" class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${groupPhoto}" onclick="ShowContainerInfoGroup('${groupKey}')"/>
                </div>
            </div> 
            <div class="ContainerInfoGroup" style="display: none;">
                <i onclick="CloseContainerInfoGroup('${groupKey}')" class="fa fa-window-close iconScaleWhenHoverRed" aria-hidden="true"></i>
                
                <div style="position:relative; height: 100px; width: 100px !important;">
                    <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center; margin: 20px 40px;">
                        <img id="imgChat" class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${groupPhoto}" onclick="ChooseAvatarGroup()"/>
                    </div>
                </div> 

                <input class="ChooseAvatarGroup" type="file" style="display: none;"/>
                <input class="ChangeNameGroup" type="text" value="${groupName}"/>
                <p >List member of group</p>
                <ul class="ListMemberOfGroup" style="list-style: none;">                                 
                </ul>
                <p >List friend</p>
                <input style="border-radius: 15px; outline: none; width: 80%; margin-left: 11%;" 
                class="form-control form-rounded InputSerachFriendGroup"
                onkeyup="SearchFriendAddGroup('${groupKey}')"
                type="text" placeholder="Type name or email..."/>
                <ul class="ListFriendOfGroup" style="list-style: none;">      
                                               
                </ul>
            </div>
        </div>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4" style="margin-left: 20px; margin-top: 8px;">
            <div class="name" id="divChatName">${groupName}</div>
        </div>   
        <div class="col-3 col-sm-4 col-md-4 col-lg-3 icon header-icon" style="display: flex;  align-items: center;">      
            <div class="icon-member2">
                <i style="padding: 5px 10px; cursor: pointer;" class="fas fa-paperclip iconScaleWhenHover" onclick="displayIcon_file()"></i>
                <div class="icon-file" style="display: none;">
                    <a href="#" class="icon-file-member" onclick="ChooseImage()">
                        Image
                        <input type="file" id="imageFile" onchange="SendImageGroup(this, '${groupKey}');" accept="image/*" style="display:none;" />
                    </a>
                    <a href="#" class="" onclick="ChooseFile()">
                        File
                        <input type="file" id="file" onchange="SendFileGroup(this, '${groupKey}');" style="display:none;" />
                    </a>
                </div>
            </div>
            <div class="icon-member3">
                <i style="padding: 5px 10px; cursor: pointer;" class="fas fa-ellipsis-v iconScaleWhenHover" onclick="displayIcon_themen()"></i>
                <div class="icon-themen" style="display: none;">
                    <li class='member-menu'>
                        <a href="#" class="dropdown-item">
                            Theme    
                        </a>
                        <ul class="list-themen">
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/ThemenNone.jpg', '${groupKey}')" src="./img/ThemenNone.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen1.jpg', '${groupKey}')" src="./img/Themen1.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen2.jpg', '${groupKey}')" src="./img/Themen2.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen3.jpg', '${groupKey}')" src="./img/Themen3.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen4.jpg', '${groupKey}')" src="./img/Themen4.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen5.jpg', '${groupKey}')" src="./img/Themen5.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen6.jpg', '${groupKey}')" src="./img/Themen6.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen7.jpg', '${groupKey}')" src="./img/Themen7.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen8.jpg', '${groupKey}')" src="./img/Themen8.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen9.jpg', '${groupKey}')" src="./img/Themen9.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen10.jpg', '${groupKey}')" src="./img/Themen10.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen11.jpg', '${groupKey}')" src="./img/Themen11.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen12.jpg', '${groupKey}')" src="./img/Themen12.jpg"/>    
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen13.jpg', '${groupKey}')" src="./img/Themen13.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen14.jpg', '${groupKey}')" src="./img/Themen14.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen15.jpg', '${groupKey}')" src="./img/Themen15.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen16.jpg', '${groupKey}')" src="./img/Themen16.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen17.jpg', '${groupKey}')" src="./img/Themen17.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen18.jpg', '${groupKey}')" src="./img/Themen18.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen19.jpg', '${groupKey}')" src="./img/Themen19.jpg"/>
                            <img class="member-themen" onclick="clickThemenColorGroup('./img/Themen20.jpg', '${groupKey}')" src="./img/Themen20.jpg"/>                                            
                        </ul>
                    </li>       
                </div>
            </div>
        
        </div>
    </div>
</div>
<div class="card-body" id="messagesGroup">
   
</div>
<div class="card-footer" style=""> 

    <span style="margin-bottom: 5px;" class="col-3 col-md-1" id="ReplyMessageGroup1"></span>
    <span style="margin-bottom: 5px;" class="col-10 col-md-1" id="ReplyMessageGroup"></span>

    <div class="row">
        <div class="col-2 col-md-1" style="cursor:pointer;">
            <i class="far fa-grin fa-2x iconScaleWhenHover" onclick="showEmojiPanel()"></i>
        </div>
        <div class="col-8 col-md-10">
            <input id="txtMessage" type="text" onfocus="hideEmojiPanel()" placeholder="Type here" class="form-control form-rounded txtMessageGroup"/>
        </div>
        <div class="col-2 col-md-1">
            <i id="send" class="fa fa-paper-plane fa-2x iconScaleWhenHover"  
            onclick="SendMessageGroup('${groupKey}')"
            ></i>
        </div>
    </div>
</div>`;

    firebase.database().ref("BackgroundGroupChatkey").child(groupKey).on("value", function (data) {
        var url = data.val();
        var brgImage = document.getElementById("messagesGroup");
        brgImage.setAttribute("style", `background-Image: url(${url.bgrURL}); background-size: auto;`);
    })
    var db = firebase.database().ref('GroupChatMessages').child(groupKey);
    db.on('value', function (groups) {
        var messageDisplay = '';
        groups.forEach(function (data) {
            var group = data.val();
            var msg = '';
            var messageType = "";
            if (group.msgType === 'image') {
                msg = `<img src='${group.msg}' class="img-fluid" />`;
                messageType = "image";
            }
            else if (group.msgType === 'file') {
                msg = `<a href="${group.dataUrl}" class="sendMessageFile" style="text-decoration: underline; cursor: pointer;">${group.msg}</a>`;
                messageType = "file";
            }
            else {
                msg = group.msg;
                messageType = msg;
            }
            var dateTime = group.dateTime.split(",");
            if (group.userId !== currentUserKey) {
                firebase.database().ref("users").child(group.userId).on("value", function (data) {
                    var member = data.val();
                    if (group.msgReplyGroup === "") {
                        if (group.MessageGroupRemove === true) {
                            messageDisplay += `<div class="row">
                                                    <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; margin-top: 20px; left: 12px;">
                                                        <img style="border: 1.5px solid #000;" src="${member.photoURL}" class="chat-pic rounded-circle" />
                                                    </div>                             
                                                    <div class="col-10 col-sm-7 col-md-7" style="display: flex; flex-direction: column; padding: 0px;">
                                                        <div class="nameMemberGroup" style="font-size: 12px; opacity: 0.6;">${member.name}</div>
                                                        <div>
                                                            <p class="remove">                                                                                   
                                                                ${msg}                                                                             
                                                            </p>
                                                        </div>    
                                                    </div>                                     
                                                </div>`;
                        }
                        else {
                            messageDisplay += `<div class="row">
                                        <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; left: 12px;">
                                            <img style="border: 1.5px solid #000;" src="${member.photoURL}" class="chat-pic rounded-circle" />
                                        </div>
                                        <div class="col-10 col-sm-7 col-md-7 LineMessageGroup" style="padding: 0px;">
                                            <div class="nameMemberGroup" style="font-size: 12px; opacity: 0.6;">${member.name}</div>
                                            <div style="display: flex; flex-direction: row;">
                                                <p class="receive">                                                                                   
                                                    ${msg}  
                                                    <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                                </p>  
                                                <li style="list-style: none; margin: 17px 0px 0 4px;" class="member-icon-extend">
                                                    <i class="fa fa-reply"
                                                    id="ReplyMessageButton"                                  
                                                    title="Reply"
                                                    style="opacity: 0.2;"
                                                    onclick="ReplyMessageGroupButton('${messageType}', '${group.userId}')"
                                                    ></i>                                   
                                                </li>   
                                            </div>
                                                                              
                                        </div>
                                    </div>`;
                        }
                    }
                    else {
                        if (group.MessageGroupRemove === true) {
                            messageDisplay += `<div class="row">
                            <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; margin-top: 20px; left: 12px;">
                                <img style="border: 1.5px solid #000;" src="${member.photoURL}" class="chat-pic rounded-circle" />
                            </div>                             
                            <div class="col-10 col-sm-7 col-md-7" style="display: flex; flex-direction: column; padding: 0px;">
                                <div class="nameMemberGroup" style="font-size: 12px; opacity: 0.6;">${member.name}</div>
                                <div>
                                    <p class="remove">                                                                                   
                                        ${msg}                                                                             
                                    </p>
                                </div>    
                            </div>                                     
                        </div>`;
                        }
                        else {
                            messageDisplay += `<div class="row">
                                        <div class="col-2 col-sm-1 col-md-1" style="padding: 2px; left: 12px;">
                                            <img style="border: 1.5px solid #000;" src="${member.photoURL}" class="chat-pic rounded-circle" />
                                        </div>
                                        <div class="col-6 col-sm-7 col-md-7 LineMessageGroup" style="padding: 0px;">
                                            <div class="col-10 col-sm-7 col-md-7 float-left" style="padding: 0px;">
                                                <p class="titleReplyGroup titleReplyGroupMember">                                                       
                                                    ${group.titleReplyGroup}
                                                </p>
                                            </div>
                                            <div class="col-10 col-sm-7 col-md-7 float-left containerReplyPadding" style="padding: 0px;">
                                                <p class="reply replyPadding" style="color:rgb(118,103,107); padding: 5px 15px 15px 15px; margin-left: 5px;">                                                 
                                                    ${group.msgReplyGroup}
                                                </p> 
                                            </div>
                                            <div style="display: flex; flex-direction: row; z-index: 1;">
                                                <p class="receive">                                                                                   
                                                    ${msg}  
                                                    <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                                </p>  
                                                <li style="list-style: none; margin: 17px 0px 0 4px;" class="member-icon-extend">
                                                    <i class="fa fa-reply"
                                                    id="ReplyMessageButton"                                  
                                                    title="Reply"
                                                    style="opacity: 0.2;"
                                                    onclick="ReplyMessageGroupButton('${messageType}', '${group.userId}')"
                                                    ></i>                                   
                                                </li>   
                                            </div>
                                                                              
                                        </div>
                                    </div>`;
                        }
                    }


                });

            }
            else {
                firebase.database().ref("users").child(group.userId).on("value", function (data) {
                    var admin = data.val();
                    if (group.msgReplyGroup === "") {
                        if (group.MessageGroupRemove === true) {
                            messageDisplay += `<div class="row justify-content-end">
                                <div class="col-10 col-sm-7 col-md-7 LineMessage">                                                           
                                    <p class="remove float-right">                                                                    
                                        ${msg}
                                    </p>                                 
                                </div>                             
                            </div>`;
                        }
                        else {
                            messageDisplay += `<div class="row justify-content-end">
                                <div class="col-10 col-sm-7 col-md-7 LineMessage">   
                                    <div style="margin-top: 15px;">
                                        <li style="list-style: none;" class="member-icon-extend">
                                            <i class="fa fa-window-close"
                                            id="DeleteMessageButton"                                  
                                            title="Delete"
                                            style="opacity: 0.2;"
                                            onclick="DeleteMessageGroupButton('${groupKey}', '${group.messageId}')"
                                            ></i>                                   
                                        </li>  
                                        <li style="list-style: none;" class="member-icon-extend">
                                            <i class="fa fa-reply"
                                            id="ReplyMessageButton"                                  
                                            title="Reply"
                                            style="opacity: 0.2;"
                                            onclick="ReplyMessageGroupButton('${messageType}', '${group.userId}')"
                                            ></i>                                   
                                        </li>   
                                    </div> 
                                                           
                                    <p class="sent float-right messageDelete">                                                                    
                                        ${msg}
                                        <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                    </p>                                 
                                </div>                           
                            </div>`;
                        }
                    }
                    else {
                        if (group.MessageGroupRemove === true) {
                            messageDisplay += `<div class="row justify-content-end">
                                <div class="col-10 col-sm-7 col-md-7 LineMessage">                                                           
                                    <p class="remove float-right">                                                                    
                                        ${msg}
                                    </p>                                 
                                </div>                               
                            </div>`;
                        }
                        else {
                            messageDisplay += `<div class="row justify-content-end">
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px;">
                                <p class="titleReplyGroup titleReplyGroupUser" style="margin-right: 20px;">
                                    ${group.titleReplyGroup}
                                </p>
                            </div>
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px;">
                                <p class="reply replyPadding1" style="color:rgb(118,103,107); padding: 5px 15px 15px 15px; margin-right: 20px;">                                                 
                                    ${group.msgReplyGroup}
                                </p> 
                            </div>
                            <div class="col-10 col-sm-7 col-md-7 LineMessage" style="padding: 0px; margin-right: 16px;">
                                <ul class="list-icon-extend"> 
                                    <li class="member-icon-extend">
                                        <i class="fa fa-window-close"
                                        id="DeleteMessageButton"                                  
                                        title="Delete"
                                        style="opacity: 0.2;"   
                                        onclick="DeleteMessageGroupButton('${groupKey}', '${group.messageId}')"                          
                                        ></i>                                   
                                    </li>
                                    <li class="member-icon-extend">
                                        <i class="fa fa-reply"
                                        id="ReplyMessageButton"                                  
                                        title="Reply"
                                        style="opacity: 0.2;"   
                                        onclick="ReplyMessageGroupButton('${messageType}', '${group.userId}')"
                                        ></i>                                
                                    </li>
                                </ul>
                                <p class="sent float-right messageDelete">                                                 
                                    ${msg}
                                    <span class="time float-right" title="${dateTime[0]}">${dateTime[1]}</span>
                                </p>               
                            </div>                          
                        </div>`;
                        }
                    }


                });

            }
        });

        document.getElementById('messagesGroup').innerHTML = messageDisplay;
        document.getElementById('messagesGroup').scrollTo(0, document.getElementById('messagesGroup').scrollHeight);
    });


}

// SEND message group
function SendMessageGroup(groupKey) {
    var chatMessage = {
        userId: currentUserKey,
        msg: document.querySelector('.txtMessageGroup').value,
        msgType: 'normal',
        dateTime: new Date().toLocaleString(),
        messageId: '',
        titleReplyGroup: document.getElementById("ReplyMessageGroup1").textContent,
        msgReplyGroup: document.getElementById("ReplyMessageGroup").textContent
    };
    document.getElementById("ReplyMessageGroup1").textContent = "";
    document.getElementById("ReplyMessageGroup").textContent = "";
    var messageKey1 = firebase.database().ref('GroupChatMessages').child(groupKey).push(chatMessage, function (error) {
        if (error) alert(error);
        else {
            document.querySelector('.txtMessageGroup').value = '';
            document.querySelector('.txtMessageGroup').focus();
        }
    }).getKey();

    firebase.database().ref('GroupChatMessages/' + groupKey + '/' + messageKey1).update({
        messageId: messageKey1
    })
}

// SEND IMAGE group
function SendImageGroup(event, groupKey) {
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

            // console.log(ObjectMessageLast);
            var messageKey1 = firebase.database().ref('GroupChatMessages').child(groupKey).push(chatMessage, function (error) {
                if (error) alert(error);
                else {

                    document.getElementById('txtMessage').value = '';
                    document.getElementById('txtMessage').focus();
                }
            }).getKey();

            firebase.database().ref('GroupChatMessages/' + groupKey + '/' + messageKey1).update({
                messageId: messageKey1
            })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}

//SEND FILE group
function SendFileGroup(event, groupKey) {
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

            var messageKey1 = firebase.database().ref('GroupChatMessages').child(groupKey).push(chatMessage, function (error) {
                if (error) alert(error);
                else {

                    document.getElementById('txtMessage').value = '';
                    document.getElementById('txtMessage').focus();
                }
            }).getKey();
            firebase.database().ref('GroupChatMessages/' + groupKey + '/' + messageKey1).update({
                messageId: messageKey1
            })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}

// change themen group
function clickThemenColorGroup(s, groupKey) {
    firebase.database().ref("BackgroundGroupChatkey").child(groupKey).update({
        bgrURL: s,
    });
    var brgImage = document.getElementById("messagesGroup");
    brgImage.setAttribute("style", `background-Image: url(${s}); background-size: auto;`);

}

// delete message in group
function DeleteMessageGroupButton(groupKey, messageKey) {
    firebase.database().ref('GroupChatMessages').child(groupKey).child(messageKey).update({
        msg: "Message Removed",
        MessageGroupRemove: true,
    });
}

// reply message group
function ReplyMessageGroupButton(messageType, memberId) {

    if (memberId === currentUserKey) {
        document.querySelector('#ReplyMessageGroup1').innerHTML = "Reply yourself: ";
    } else {
        var nameReply = "";
        firebase.database().ref("users").child(memberId).once("value", function (data) {
            var user = data.val();
            nameReply = user.name;
        })
        document.querySelector('#ReplyMessageGroup1').innerHTML = "Reply: " + `${nameReply}` + ": ";
    }
    var input = document.getElementById('txtMessage');
    document.querySelector('#ReplyMessageGroup').innerHTML = messageType
        + `<i style="float: right; color: red; cursor: pointer;" onclick="CloseReplyMessageGroup()" class="fa fa-window-close" aria-hidden="true"></i>`;
    document.getElementById('txtMessage').focus();


}

function CloseReplyMessageGroup() {
    // document.getElementById("ReplyMessage").innerHTML = "";
    // document.getElementById("ReplyMessage1").innerHTML = "";
    document.getElementById("ReplyMessageGroup").innerHTML = "";
    document.getElementById("ReplyMessageGroup1").innerHTML = "";
}

// Display infor group
var imageAvatarGroup;
function CloseContainerInfoGroup(groupKey) {
    console.log(groupKey);
    var nameGroup = document.querySelector(".ContainerInfoGroup .ChangeNameGroup").value;
    firebase.database().ref("Groups").child(groupKey).update({
        nameGroup: nameGroup
    })
    if (imageAvatarGroup !== undefined) {
        var imageNameGroup = imageAvatarGroup.name;
        var storageRef = firebase.storage().ref("images/" + imageNameGroup);
        var upLoadTask = storageRef.put(imageAvatarGroup);
        imageAvatarGroup = undefined;
        upLoadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is" + progress + "done");
        }, function (error) {
            console.log(error.message);
        }, function () {
            upLoadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
                console.log(downloadUrl);
                firebase.database().ref("Groups").child(groupKey).update({
                    avatarGroup: downloadUrl
                })
            });
        });
    }
    document.querySelector(".ContainerInfoGroup").setAttribute("style", "display: none");
    LoadChatListGroup();
}
// choose avatar group
function ChooseAvatarGroup() {
    document.querySelector(".ChooseAvatarGroup").click();
    const fileImageGroup = document.querySelector(".ChooseAvatarGroup");
    console.log(fileImageGroup);
    const avatarGroup = document.querySelector(".ContainerInfoGroup img");
    console.log(avatarGroup);
    fileImageGroup.addEventListener('change', handleFilesGroup, false);
    function handleFilesGroup() {
        avatarGroup.src = URL.createObjectURL(this.files[0]);
        imageAvatarGroup = this.files[0];
    }
}

function ShowContainerInfoGroup(groupKey) {
    document.querySelector(".ContainerInfoGroup").removeAttribute("style");
    document.querySelector(".ListMemberOfGroup").innerHTML = "";
    firebase.database().ref("Groups").child(groupKey).once("value", function (data) {
        document.querySelector(".ListMemberOfGroup").innerHTML = "";
        var group = data.val();
        var arrMembersGroupKey = [];
        arrMembersGroupKey.push(group.AdminId);
        for (var i = 0; i < group.QuantityMember - 1; i++) {
            var memberKey = group["MemberId" + i];
            arrMembersGroupKey.push(memberKey);
        }
        arrMembersGroupKey.forEach(function (element) {
            firebase.database().ref("users").child(element).once("value", function (data) {
                var user = data.val();
                if (arrMembersGroupKey[0] === currentUserKey || element === currentUserKey) {
                    document.querySelector(".ListMemberOfGroup").innerHTML += `<li class="MemberOfGroup list-group-item">
                                    <div style="position:relative; height: 50px; width: 50px !important; display: inline-block;">
                                        <div style="position:absolute; cursor: pointer; height: 100%; width:100%; display: flex; align-items: center; justify-content: center;">
                                            <img class="rounded-circle" style="height: 100%; width:100%; object-fit: cover;" src="${user.photoURL}"/>
                                        </div>
                                    </div> 
                                    <span style="position: absolute; margin-left: 10px; margin-top: 15px;">
                                        ${user.name}
                                    </span>
                                    <i onclick="DeleteMemberOfGroup('${element}', '${groupKey}')" class="fa fa-times" aria-hidden="true"></i>
                                </li>`;
                } else {
                    document.querySelector(".ListMemberOfGroup").innerHTML += `<li class="MemberOfGroup list-group-item">
                                    <img src="${user.photoURL}" style="height: 50px; width: 50px;"/>
                                    ${user.name}
                                </li>`;
                }

            })
        });

    });
}

// xoa thanh vien khoi nhom
function DeleteMemberOfGroup(MemberId, groupKey) {
    firebase.database().ref("Groups").child(groupKey).once("value", function (data) {
        var group = data.val();
        var QuantityMember = group.QuantityMember;
        if (group.AdminId === MemberId) {
            firebase.database().ref("Groups").child(groupKey + '/' + "AdminId").remove();
            firebase.database().ref("Groups").child(groupKey).update({
                QuantityMember: QuantityMember - 1
            });
        } else {
            var danhdau = 0;
            for (var i = 0; i < QuantityMember - 1; i++) {
                if (group["MemberId" + i] === MemberId) {
                    console.log(MemberId);
                    console.log(group["MemberId" + i]);
                    danhdau = i;
                    break;
                }

            }
            firebase.database().ref("Groups").child(groupKey + '/' + "MemberId" + danhdau).remove();
            firebase.database().ref("Groups").child(groupKey).update({
                QuantityMember: QuantityMember - 1
            });

            firebase.database().ref("Groups").child(groupKey).once("value", function (data) {
                var group = data.val();
                console.log(danhdau);
                console.log(group.QuantityMember);
                for (var i = danhdau; i < group.QuantityMember - 1; i++) {
                    console.log(i);
                    firebase.database().ref("Groups").child(groupKey).update({
                        ["MemberId" + i]: group["MemberId" + (i + 1)]
                    });
                }
                firebase.database().ref("Groups").child(groupKey + '/' + "MemberId"
                    + (group.QuantityMember - 1)).remove();
            });

        }

    });

    document.querySelector(".ContainerInfoGroup").setAttribute("style", "display: none");
    document.getElementById('lstGroupChat').innerHTML = "";
    firebase.database().ref("Groups").on("value", function (groups) {
        groups.forEach(function (data) {
            var arrMembersGroupKey = [];
            var group = data.val();
            arrMembersGroupKey.push(group.AdminId);
            for (var i = 0; i < group.QuantityMember - 1; i++) {
                arrMembersGroupKey.push(group["MemberId" + i]);
            }
            var groupPhoto = group.avatarGroup;
            if (arrMembersGroupKey.indexOf(currentUserKey) !== -1) {
                document.getElementById('lstGroupChat').innerHTML += `<li onclick="StartChatGroup('${data.key}', '${group.nameGroup}', '${groupPhoto}')" class="list-group-item list-group-item-action" >
                            <div class="row">
                                <div class="col-md-2" >
                                    <img src="${groupPhoto}" class="friend-pic rounded-circle" />
                                </div>
                                <div  class="col-md-10" style="cursor:pointer;">
                                    <div class="name">${group.nameGroup}</div>
                                </div>
                            </div>
                        </li>`;
            }
        })

    });

}

//Tim kiem thanh vien de add vao group
function SearchFriendAddGroup(groupKey) {
    var arrMembersGroupKey = [];
    var arrMembersGroupInfo = [];
    var input = document.querySelector(".InputSerachFriendGroup").value;

    firebase.database().ref("Groups").child(groupKey).once("value", function (data) {
        var group = data.val();
        arrMembersGroupKey.push(group.AdminId);
        for (var i = 0; i < group.QuantityMember - 1; i++) {
            var memberKey = group["MemberId" + i];
            arrMembersGroupKey.push(memberKey);
        }
        arrMembersGroupKey.forEach(function (element) {
            firebase.database().ref("users").child(element).once("value", function (data) {
                var user = data.val();
                arrMembersGroupInfo.push({
                    MemberEmail: user.email,
                    MemberName: user.name,
                    MemberPhoto: user.photoURL
                })
            })
        });
    });

    var count = 0;
    for (var i = 0; i < arrMembersGroupInfo.length; i++) {
        if (input === arrMembersGroupInfo[i].MemberName || input === arrMembersGroupInfo[i].MemberEmail) {
            document.querySelector(".ListFriendOfGroup").innerHTML = `<span style="font-size: 25px; color: #fff; margin-top: 15px;">User nay da o trong group</span>`;
            break;
        } else {
            count++;
            document.querySelector(".ListFriendOfGroup").innerHTML = "";
        }
    }

    if (count === arrMembersGroupInfo.length) {
        for (var i = 0; i < ArrSearchFriends.length; i++) {
            if (input === ArrSearchFriends[i].friendName || input === ArrSearchFriends[i].friendEmail) {
                document.querySelector(".ListFriendOfGroup").innerHTML = `<li class="FriendOfGroup">
                                    <img src="${ArrSearchFriends[i].friendPhoto}" style="height: 50px; width: 50px;"/>
                                    ${ArrSearchFriends[i].friendName}
                                    <i onclick="AddMemberForGroup('${groupKey}', '${ArrSearchFriends[i].friendKey}')" style="background-color: blue; border-radius: 15px; font-size: 14px;">Add</i>
                                </li> `;
                break;

            } else {
                document.querySelector(".ListFriendOfGroup").innerHTML = "";
            }
        }
    }

}

// them thanh vien cho group
function AddMemberForGroup(groupKey, MemberKey) {
    document.querySelector(".ListFriendOfGroup").innerHTML = "";
    document.querySelector(".InputSerachFriendGroup").value = "";
    var sl = 0;
    firebase.database().ref("Groups").child(groupKey).on("value", function (data) {
        document.querySelector(".ListFriendOfGroup").innerHTML = "";
        var group = data.val();
        sl = group.QuantityMember;
    })
    firebase.database().ref("Groups").child(groupKey).update({
        ["MemberId" + (sl - 1)]: MemberKey,
        QuantityMember: sl + 1
    });
    document.querySelector(".ContainerInfoGroup").setAttribute("style", "display: none");
}

/////////////////////////////////////////////////

// hien thi thong tin cua ban be
var count_Info_Friend = 0;
function Display_Info_Friend(friendKey) {
    firebase.database().ref("users").child(currentUserKey).update({
        statusAcitve: true
    });
    if (count_Info_Friend === 1) {
        document.querySelector(".Modal_Info_Friend").setAttribute('style', 'display:none');
        count_Info_Friend = 0;
    } else {
        document.querySelector(".Modal_Info_Friend").removeAttribute('style');
        count_Info_Friend = 1;

        // Hien thong tin cua friend
        console.log(friendKey);
        firebase.database().ref("users").child(friendKey).on("value", function (user) {
            var data = user.val();
            console.log(data);
            document.querySelector(".Modal_Info_Friend img").src = data.photoURL
            document.querySelector(".Modal_Info_Friend .Name_Friend").textContent = data.name;
            if (data.check_date === true) {
                document.querySelector(".Modal_Info_Friend .Date_Friend span").textContent = data.date;
            } else {
                document.querySelector(".Modal_Info_Friend .Date_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_gender === true) {
                document.querySelector(".Modal_Info_Friend .Gender_Friend span").textContent = data.gender;
            } else {
                document.querySelector(".Modal_Info_Friend .Gender_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_phone === true) {
                document.querySelector(".Modal_Info_Friend .Phone_Friend span").textContent = data.phone;
            } else {
                document.querySelector(".Modal_Info_Friend .Phone_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_email === true) {
                document.querySelector(".Modal_Info_Friend .Email_Friend span").textContent = data.email;
            } else {
                document.querySelector(".Modal_Info_Friend .Email_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_status === true) {
                document.querySelector(".Modal_Info_Friend .Status_Friend span").textContent = data.status;
            } else {
                document.querySelector(".Modal_Info_Friend .Status_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_education === true) {
                document.querySelector(".Modal_Info_Friend .Education_Friend span").textContent = data.education;
            } else {
                document.querySelector(".Modal_Info_Friend .Education_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_hometown === true) {
                document.querySelector(".Modal_Info_Friend .Hometown_Friend span").textContent = data.hometown;
            } else {
                document.querySelector(".Modal_Info_Friend .Hometown_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_currentresidence === true) {
                document.querySelector(".Modal_Info_Friend .Currentresidence_Friend span").textContent = data.currentresidence;
            } else {
                document.querySelector(".Modal_Info_Friend .Currentresidence_Friend span").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
            if (data.check_Describe === true) {
                document.querySelector(".Modal_Info_Friend .Describe_Friend label").textContent = data.Describe;
            } else {
                document.querySelector(".Modal_Info_Friend .Describe_Friend label").innerHTML = `<i title="This user has not updated their information or they are kept private" class="fa fa-lock" aria-hidden="true"></i>`;
            }
        })
    }
}
function Hide_Info_Friend() {
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
    console.log(ArrSearchFriends);
    ArrSearchFriends.forEach(function (element) {
        console.log(element.friendName.toLowerCase() + " " + valueInputSearch.toLowerCase());
        if (element.friendName.toLowerCase().search(valueInputSearch.toLowerCase()) !== -1
            || element.friendName.toUpperCase().search(valueInputSearch.toUpperCase()) !== -1) {

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
    var db = firebase.database().ref('users');
    var dbNoti = firebase.database().ref('notifications');
    var lst = '';

    // firebase.database().ref('users').child(friendKey).on('value', function (data) {
    //     var user = data.val();
    db.on('value', function (users) {
        document.getElementById('lstUsers').innerHTML = lst;
        // if (users.hasChildren()) {
        //     lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
        //                     <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
        //                 </li>`;

        //     document.getElementById('lstUsers').innerHTML = lst;
        // }
        users.forEach(function (data) {
            var user = data.val();
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
                        ArrSearchAllUsers.push({
                            NameUser: user.name,
                            AvatarUser: user.photoURL,
                            KeyUser: data.key,
                            StatusUser: "Sent"
                        });
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
                                ArrSearchAllUsers.push({
                                    NameUser: user.name,
                                    AvatarUser: user.photoURL,
                                    KeyUser: data.key,
                                    StatusUser: "Pending"
                                });
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
                                ArrSearchAllUsers.push({
                                    NameUser: user.name,
                                    AvatarUser: user.photoURL,
                                    KeyUser: data.key,
                                    StatusUser: "Send Request"
                                });
                                document.getElementById('lstUsers').innerHTML += lst;
                            }
                        });
                    }
                });
            }
        });
    });

}

function ChangeInputSearchAllUser() {
    // lstSearchAllUsers
    // lstUsers
    // input_search_AllUser
    document.getElementById("lstSearchAllUsers").removeAttribute('style');
    document.getElementById("lstUsers").setAttribute('style', 'display:none');
    var valueInputSearch = document.querySelector(".input_search_AllUser").value.toLowerCase();
    if (valueInputSearch === "") {
        document.getElementById("lstSearchAllUsers").setAttribute('style', 'display:none');
        document.getElementById("lstUsers").removeAttribute('style');
    }
    document.getElementById("lstSearchAllUsers").innerHTML = "";
    console.log(ArrSearchAllUsers);
    ArrSearchAllUsers.forEach(function (element) {
        console.log(element.NameUser.toLowerCase() + " " + valueInputSearch.toLowerCase());
        if (element.NameUser.toLowerCase().search(valueInputSearch.toLowerCase()) !== -1
            || element.NameUser.toUpperCase().search(valueInputSearch.toUpperCase()) !== -1) {
            if (element.StatusUser === "Sent") {
                document.getElementById("lstSearchAllUsers").innerHTML += `<li class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-md-2">
                            <img onclick="Display_Info_Friend('${element.KeyUser}')" src="${element.AvatarUser}" class="rounded-circle friend-pic" />
                        </div>
                        <div class="col-md-10" style="cursor:pointer;">
                            <div class="name">${element.NameUser}
                                <button class="btn btn-sm btn-defualt" style="float:right;"><i class="fas fa-user-plus"></i> Sent</button>
                            </div>
                        </div>
                    </div>
                </li>`;
            } else if (element.StatusUser === "Pending") {
                document.getElementById("lstSearchAllUsers").innerHTML += `<li class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-md-2">
                            <img onclick="Display_Info_Friend('${element.KeyUser}')" src="${element.AvatarUser}" class="rounded-circle friend-pic" />
                        </div>
                        <div class="col-md-10" style="cursor:pointer;">
                            <div class="name">${element.NameUser}
                                <button class="btn btn-sm btn-defualt" style="float:right;"><i class="fas fa-user-plus"></i> Pending</button>
                            </div>
                        </div>
                    </div>
                </li>`;
            } else if (element.StatusUser === "Send Request") {
                document.getElementById("lstSearchAllUsers").innerHTML += `<li class="list-group-item list-group-item-action" >
                    <div class="row">
                        <div class="col-md-2">
                            <img onclick="Display_Info_Friend('${element.KeyUser}')" src="${element.AvatarUser}" class="rounded-circle friend-pic" />
                        </div>
                        <div class="col-md-10" style="cursor:pointer;">
                            <div class="name">${element.NameUser}
                                <button onclick="SendRequest('${element.KeyUser}')" class="btn btn-sm btn-primary" style="float:right;"><i class="fas fa-user-plus"></i> Send Request</button>
                            </div>
                        </div>
                    </div>
                </li>`;
            }

        }
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
    firebase.database().ref("users").child(currentUserKey).once("value", function (data) {
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
    document.getElementById('lstNotification').innerHTML = lst;
    db.orderByChild('sendTo').equalTo(currentUserKey).on('value', function (notis) {
        // if (notis.hasChildren()) {
        //     lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
        //                     <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
        //                 </li>`;
        // }
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

            }
        });
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
    console.log(currentUserKey1);
    reload = true;
    setTimeout(function () {

        location.reload();
        reload = false;

    }, 200);

    firebase.auth().signOut();
    firebase.database().ref("users").child(currentUserKey).update({
        statusAcitve: false
    });
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
            statusAcitve: true
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
                    // currentUserKey1 = data.key;
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
            // messaging.requestPermission().then(function () {
            //                 return messaging.getToken();
            //             }).then(function (token) {
            //                 firebase.database().ref('fcmTokens').child(currentUserKey).set({token_id: token });
            //             })
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
            LoadChatListGroup();
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


// Call auth State changed

onFirebaseStateChanged();