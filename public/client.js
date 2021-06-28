const socket = io();

navigator.mediaDevices.getUserMedia({
    audio: true
}).then((stream) => {

    const makeCall = document.getElementById('call');
    const answerCall = document.getElementById('answer');

    let peer1 = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: stream
    });


    peer1.on('signal', data => {
        console.log("Init call code", JSON.stringify(data));
    })



    makeCall.addEventListener('click', () => {
        let peer2 = new SimplePeer({ trickle: false });
        const callcode = document.getElementById('friend__code').value;

        peer2.signal(callcode)

        peer2.on('signal', (data) => {
            console.log("Answer", JSON.stringify(data));
        })

        peer2.on('connect', data => {
            console.log("Connected 2");
        })

        peer2.on('stream', stream => {
            var audio = document.querySelector('audio')
            audio.srcObject = stream
            audio.play()
        })

        answerCall.addEventListener('click', () => {
            const answercode = document.getElementById('answer__code').value;
            peer1.signal(answercode)
        })
    })

    peer1.on('connect', () => {
        console.log("Connected 1");
    })
}).catch(() => { })

socket.on("message", (message) => {
    console.log(message);
})
