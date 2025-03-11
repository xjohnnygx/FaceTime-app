let Tracks: MediaStreamTrack[];
const roomId = window.location.pathname.split("/")[2];
const roomTitle = document.querySelector("#roomTitle") as HTMLSpanElement;
const localVideo = document.querySelector("#localVideo") as HTMLVideoElement;
const remoteVideo = document.querySelector("#remoteVideo") as HTMLVideoElement;
const leaveButton = document.querySelector("#leaveButton") as HTMLButtonElement;
const copyButton = document.querySelector("#copyButton") as SVGElement;
const servers: RTCConfiguration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
    ]
};

const peerConnection = new RTCPeerConnection(servers);
peerConnection.addEventListener("icecandidate", function(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
        websocket.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
    }
});
peerConnection.addEventListener("track", function(event: RTCTrackEvent) {
    remoteVideo.srcObject = event.streams[0];
});

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(async stream => {
    Tracks = stream.getTracks();
    Tracks.forEach(track => peerConnection.addTrack(track, stream));
    localVideo.srcObject = stream;
});

leaveButton.addEventListener("click", function() {
    Tracks.forEach(track => track.stop());
    peerConnection.close();
    websocket.close();
    window.location.href = "/";
});

copyButton.addEventListener("click", function() {
    navigator.clipboard.writeText(roomId);
});

copyButton.addEventListener("mousedown", function() {
    copyButton.setAttribute("fill", "#00ffee");
});

copyButton.addEventListener("mouseup", function() {
    copyButton.setAttribute("fill", "white")
});

roomTitle.innerHTML = roomId;

const websocket = new WebSocket(`ws://${window.location.host}/room/${roomId}`);
websocket.addEventListener("message", async function(event: MessageEvent) {
    const data = JSON.parse(event.data);
    switch (data.type) {
        case "offer":
            await peerConnection.setRemoteDescription(data.offer);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            websocket.send(JSON.stringify({ type: "answer", answer: answer }));
            break;
        case "candidate":
            await peerConnection.addIceCandidate(data.candidate);
            break;
        default:
            return;
    }
});