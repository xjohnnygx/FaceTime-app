var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Tracks;
var roomId = window.location.pathname.split("/")[2];
var roomTitle = document.querySelector("#roomTitle");
var localVideo = document.querySelector("#localVideo");
var remoteVideo = document.querySelector("#remoteVideo");
var leaveButton = document.querySelector("#leaveButton");
var copyButton = document.querySelector("#copyButton");
var servers = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
    ]
};
var peerConnection = new RTCPeerConnection(servers);
peerConnection.addEventListener("icecandidate", function (event) {
    if (event.candidate) {
        websocket.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
    }
});
peerConnection.addEventListener("track", function (event) {
    remoteVideo.srcObject = event.streams[0];
});
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Tracks = stream.getTracks();
        Tracks.forEach(function (track) { return peerConnection.addTrack(track, stream); });
        localVideo.srcObject = stream;
        return [2 /*return*/];
    });
}); });
leaveButton.addEventListener("click", function () {
    Tracks.forEach(function (track) { return track.stop(); });
    peerConnection.close();
    websocket.close();
    window.location.href = "/";
});
copyButton.addEventListener("click", function () {
    navigator.clipboard.writeText(roomId);
});
copyButton.addEventListener("mousedown", function () {
    copyButton.setAttribute("fill", "#00ffee");
});
copyButton.addEventListener("mouseup", function () {
    copyButton.setAttribute("fill", "white");
});
roomTitle.innerHTML = roomId;
var websocket = new WebSocket("ws://".concat(window.location.host, "/room/").concat(roomId));
websocket.addEventListener("message", function (event) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, answer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = JSON.parse(event.data);
                    _a = data.type;
                    switch (_a) {
                        case "offer": return [3 /*break*/, 1];
                        case "candidate": return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, peerConnection.setRemoteDescription(data.offer)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, peerConnection.createAnswer()];
                case 3:
                    answer = _b.sent();
                    return [4 /*yield*/, peerConnection.setLocalDescription(answer)];
                case 4:
                    _b.sent();
                    websocket.send(JSON.stringify({ type: "answer", answer: answer }));
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, peerConnection.addIceCandidate(data.candidate)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7: return [2 /*return*/];
                case 8: return [2 /*return*/];
            }
        });
    });
});
