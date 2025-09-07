class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    // 🔑 Queue for ICE candidates received before remoteDescription is set
    this.pendingCandidates = [];
    this.remoteDescriptionSet = false;
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
    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    this.remoteDescriptionSet = true;

    // Flush queued candidates
    for (const cand of this.pendingCandidates) {
      await this.peer.addIceCandidate(new RTCIceCandidate(cand));
    }
    this.pendingCandidates = [];
  }

  async getAnswer() {
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setRemoteAnswer(answer) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    this.remoteDescriptionSet = true;

    // Flush queued candidates
    for (const cand of this.pendingCandidates) {
      await this.peer.addIceCandidate(new RTCIceCandidate(cand));
    }
    this.pendingCandidates = [];
  }

  async addIceCandidate(candidate) {
    if (!candidate) return;

    if (this.remoteDescriptionSet) {
      await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
      // Queue until remoteDescription is ready
      this.pendingCandidates.push(candidate);
    }
  }

  close() {
    this.peer.close();
  }
}

export default PeerService;
