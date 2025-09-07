
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import PeerService from "../../../peer"; 

function VideoCall({ roomId, username, socket }) {
  const draggableRef = useRef(null);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [localAudio, setLocalAudio] = useState(true);
  const [localVideo, setLocalVideo] = useState(true);

  //  Get local media & join room
  useEffect(() => {
    if (!socket) return;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        //  Only join once we have the stream
        socket.emit("join", { roomId, username });
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    })();
  }, [socket, roomId, username]);

  //  WebRTC signaling
  useEffect(() => {
    if (!socket) return;

    // When a new user joins
    socket.on("joined", async ({ clients, socketId }) => {
      if (socketId === socket.id) return;
      if (!localStreamRef.current) {
        console.warn("Local stream not ready yet, skipping peer creation.");
        return;
      }

      const peer = new PeerService();
      peersRef.current[socketId] = peer;

      peer.addStream(localStreamRef.current);

      peer.handleICECandidateEvent((candidate) => {
        socket.emit("webrtc-ice-candidate", { roomId, candidate, to: socketId });
      });

      peer.onTrack((remoteStream) => {
        setRemoteStreams((prev) => [
          ...prev.filter((s) => s.socketId !== socketId),
          { socketId, stream: remoteStream },
        ]);
      });

      const offer = await peer.getOffer();
      socket.emit("webrtc-offer", { roomId, offer, to: socketId });
    });

    socket.on("webrtc-offer", async ({ from, offer }) => {
      if (!localStreamRef.current) {
        console.warn("Local stream not ready yet, skipping peer creation.");
        return;
      }

      const peer = new PeerService();
      peersRef.current[from] = peer;

      peer.addStream(localStreamRef.current);

      peer.handleICECandidateEvent((candidate) => {
        socket.emit("webrtc-ice-candidate", { roomId, candidate, to: from });
      });

      peer.onTrack((remoteStream) => {
        setRemoteStreams((prev) => [
          ...prev.filter((s) => s.socketId !== from),
          { socketId: from, stream: remoteStream },
        ]);
      });

      await peer.setRemoteOffer(offer);
      const answer = await peer.getAnswer();
      socket.emit("webrtc-answer", { roomId, answer, to: from });
    });

    socket.on("webrtc-answer", async ({ from, answer }) => {
      const peer = peersRef.current[from];
      if (peer) await peer.setRemoteAnswer(answer);
    });

    socket.on("webrtc-ice-candidate", async ({ from, candidate }) => {
      const peer = peersRef.current[from];
      if (peer && candidate) {
        await peer.addIceCandidate(candidate);
      }
    });

    socket.on("disconnected", ({ socketId }) => {
      if (peersRef.current[socketId]) {
        peersRef.current[socketId].close();
        delete peersRef.current[socketId];
      }
      setRemoteStreams((prev) => prev.filter((s) => s.socketId !== socketId));
    });

    return () => {
      socket.off("joined");
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
      socket.off("disconnected");
    };
  }, [socket, roomId]);

  //  Toggle audio
  const toggleAudio = () => {
    if (!localStreamRef.current) return;
    const enabled = !localAudio;
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = enabled));
    setLocalAudio(enabled);
  };

  //  Toggle video
  const toggleVideo = () => {
    if (!localStreamRef.current) return;
    const enabled = !localVideo;
    localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = enabled));
    setLocalVideo(enabled);
  };

  return (
    <Draggable nodeRef={draggableRef} bounds="parent">
      <div
        ref={draggableRef}
        className="fixed bottom-4 right-4 w-70 bg-slate-800 p-3 rounded-xl shadow-lg z-50 cursor-grab"
      >
        <div className="flex flex-col gap-2">
          {/* Local video */}
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-40 object-cover rounded-lg border-2 border-indigo-500"
            />
            <div className="absolute bottom-1 left-1 right-1 flex justify-between px-2">
              <button
                onClick={toggleAudio}
                className="px-2 py-0.5 text-xs rounded bg-slate-800 text-white cursor-pointer"
              >
                {localAudio ? "Mute" : "Unmute"}
              </button>
              <button
                onClick={toggleVideo}
                className="px-2 py-0.5 text-xs rounded bg-slate-800 text-white cursor-pointer"
              >
                {localVideo ? "Stop" : "Start"}
              </button>
            </div>
          </div>

          {/* Remote videos */}
          {remoteStreams.map(({ socketId, stream }) => (
            <div key={socketId} className="relative">
              <video
                autoPlay
                playsInline
                className="w-full h-40 object-cover rounded-lg border-2 border-red-500"
                ref={(ref) => {
                  if (ref) ref.srcObject = stream;
                }}
              />
              <audio
                autoPlay
                ref={(ref) => {
                  if (ref) ref.srcObject = stream;
                }}
                className="hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}

export default VideoCall;
