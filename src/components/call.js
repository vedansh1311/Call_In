//  eslint-disable 


import { Link } from "react-router-dom";
import AgoraRTM from "../agora-rtm-sdk-1.5.1"
import { Mycontext } from "../App";
import { useContext } from "react";
     
  
export default function Call(props){
// eslint-disable no-unused-expressions

    let APP_ID = "14a0125f0f534fdab1fd7c9aecdfcca9"

    const{user} = useContext(Mycontext)
    const jwt_token = localStorage.getItem('token')
    let roomId
    fetch('http://localhost:5000/create_room',
     {method:'GET',
      headers:{
   'Authorization':`Bearer ${jwt_token}`
    }}).then(res=>res.json()).then(res=>roomId=res).catch(err=>console.error(err))

 
  const uid = user.uid
let token = null;


let client;
let channel;



let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}


let constraints = {
    video:{
        width:{min:640, ideal:1920, max:1920},
        height:{min:480, ideal:1080, max:1080},
    },
    audio:true
}


let init = async () => {
    

    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({uid, token})

    channel = client.createChannel(roomId)
    await channel.join().then(createOffer(uid))

    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)
   
    client.on('MessageFromPeer', handleMessageFromPeer)
   
try {
    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    document.getElementById('user-1').srcObject = localStream
} catch (error) {
    console.error('Failed to get user media:', error)
}

document.getElementById('user-1').srcObject = localStream





   
}
 

let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none'
    document.getElementById('user-1').classList.remove('smallFrame')
}

let handleMessageFromPeer = async (message, MemberId) => {

    message = JSON.parse(message.text)

    if(message.type === 'offer'){
        createAnswer(MemberId, message.offer)
    }

    if(message.type === 'answer'){
        addAnswer(message.answer)
    }

    if(message.type === 'candidate'){
        if(peerConnection){
            peerConnection.addIceCandidate(message.candidate)
        }
    }


}

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId)
    
    createOffer(MemberId)
}


let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream
    document.getElementById('user-2').style.display = 'block'

    document.getElementById('user-1').classList.add('smallFrame')


    if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
        document.getElementById('user-1').srcObject = localStream
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
        }
    }
}

let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId)
}


let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    client.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId)
}


let addAnswer = async (answer) => {
    if(!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer)
    }
}
 

let leaveChannel = async () => {
    await channel.leave()
    await client.logout()
} 
 
let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

    if(videoTrack.enabled){
        videoTrack.enabled = false
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    }else{
        videoTrack.enabled = true
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}

let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')

    if(audioTrack.enabled){
        audioTrack.enabled = false
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    }else{
        audioTrack.enabled = true
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}
  
window.addEventListener('beforeunload', leaveChannel)

document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)

init()




return(
    <div>
        
         <div id="videos">
        <video className="video-player" id="user-1" autoplay playsinline></video>
        <video className="video-player" id="user-2" autoplay playsinline></video>
    </div>

    <div id="controls">

        <div className="control-container" id="camera-btn">
        <img src={process.env.PUBLIC_URL + '/icons/camera.png'} alt="camera" />

            
        </div>

        <div className="control-container" id="mic-btn">
       
        <img src={process.env.PUBLIC_URL + '/icons/mic.png'} alt="mic" />

          
        </div>

        <Link to={"/home"}>
            <div className="control-container" id="leave-btn">
               
                <img src={process.env.PUBLIC_URL + '/icons/phone.png'} alt="finish" />
            </div>
        </Link>

    </div>
    </div>
)
}