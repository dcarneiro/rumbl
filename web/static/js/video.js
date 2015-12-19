import Player from "./player"

let Video = {

  init(socket, element){ if(!element){ return }
    let msgContainer = document.getElementById("msg-container")
    let msgInput     = document.getElementById("msg-input")
    let postButton   = document.getElementById("msg-submit")
    let videoId      = element.getAttribute("data-id")
    let playerId     = element.getAttribute("data-player-id")
    Player.init(element.id, playerId)

    socket.connect()
    let vidChannel = socket.channel("videos:" + videoId)

    vidChannel.on("ping", ({count}) => console.log("PING", count))

    vidChannel.join()
      .receive("ok", resp => console.log("joined the video channel", resp))
      .receive("error", reason => console.log("join failed", reason))
  }
}
export default Video