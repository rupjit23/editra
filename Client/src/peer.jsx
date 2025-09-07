class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        { urls: ["stun:stun.l.google.com:19302"] },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
    });

    // 🔑 Queue ICE candidates until remote description is ready
    this.pendingCandidates = [];
    this.remoteDescriptionSet = false;

    // Debug logging
    this.peer.oniceconnectionstatechange = () => {
      console.log("ICE state:", this.peer.iceConnectionState);
    };
    this.peer.onsignalingstatechange = () => {
      console.log("Signaling state:", this.peer.signalingState);
    };
  }

  addStream(stream) {
    if (!stream) {
      console.warn("PeerService.addStream called with null stream");
      return;
    }
    stream.getTracks().forEach((track) => {
      this.peer.addTrack(track, stream);
    });
  }

  handleICECandidateEvent(cb) {
    this.peer.onicecandidate = (event) => {
      if (event.candidate) cb(event.candidate);
    };
  }

  onTrack(cb) {
    this.peer.ontrack = (event) => {
      cb(event.streams[0]);
    };
  }

  async getOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async setRemoteOffer(offer) {
    if (this.peer.signalingState !== "stable") {
      console.warn("setRemoteOffer called in wrong state:", this.peer.signalingState);
      return;
    }

    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    this.remoteDescriptionSet = true;
    await this._flushPendingCandidates();
  }

  async getAnswer() {
    if (this.peer.signalingState !== "have-remote-offer") {
      console.warn("getAnswer called in wrong state:", this.peer.signalingState);
      return;
    }

    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setRemoteAnswer(answer) {
    if (this.peer.signalingState !== "have-local-offer") {
      console.warn("Skipping setRemoteAnswer: state =", this.peer.signalingState);
      return;
    }

    await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    this.remoteDescriptionSet = true;
    await this._flushPendingCandidates();
  }

  async addIceCandidate(candidate) {
    if (!candidate) return;

    if (this.remoteDescriptionSet) {
      try {
        await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    } else {
      this.pendingCandidates.push(candidate);
    }
  }

  async _flushPendingCandidates() {
    for (const cand of this.pendingCandidates) {
      try {
        await this.peer.addIceCandidate(new RTCIceCandidate(cand));
      } catch (err) {
        console.error("Error flushing ICE candidate:", err);
      }
    }
    this.pendingCandidates = [];
  }

  close() {
    this.peer.close();
  }
}

export default PeerService;
