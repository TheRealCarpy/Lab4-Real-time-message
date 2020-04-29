var direction = "North";
var content = "chat_n";

// Creates a pubnub object and save it in variable pubnubDemo.
var pubnubDemo = new PubNub({
    publishKey: 'pub-c-864af332-3663-4763-8bc0-78442d476f04',
    subscribeKey: 'sub-c-78a1f70e-8a0a-11ea-927a-2efbc014b69f'
});

pubnubDemo.subscribe({
    channels: ['North'],
    withPresence: true
});

pubnubDemo.addListener({
    message: function (event) {
        displayMessage(event.message.msg);
    }
})


function sendMessage() {
    var msg = document.getElementById("message").value;
    pubnubDemo.publish({
        message: {'msg': msg},
        channel: direction
        },
        function(status, response) {
            if (status.error) {
                console.log(status)
            }
        });
}

function displayMessage(Message) {
    let pmessage = document.createElement('p');
    pmessage.appendChild(document.createTextNode(Message));
    document.getElementById(content).appendChild(pmessage);
}


function givePermission() {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                }
            })
            .catch(console.error);
    } else {
        // handle regular non iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation, true);

    }
}

function handleOrientation(event)
{
    var heading = event.alpha;

    if (typeof event.webkitCompassHeading !== "undefined") {
        heading = event.webkitCompassHeading;
    }

    document.getElementById("heading").innerHTML = heading.toFixed([0]);

    var old_direction = direction;

    if (heading >= 45 && heading < 135) {
        direction = "North";
        document.getElementById("chat_n").style.display = 'block';
        document.getElementById("chat_w").style.display = 'none';
        document.getElementById("chat_s").style.display = 'none';
        document.getElementById("chat_e").style.display = 'none';
        content = "chat_n";
    } else if (heading >= 135 && heading < 225) {
        direction = "West";
        document.getElementById("chat_n").style.display = 'none';
        document.getElementById("chat_w").style.display = 'block';
        document.getElementById("chat_s").style.display = 'none';
        document.getElementById("chat_e").style.display = 'none';
        content = "chat_w";
    } else if (heading >= 225 && heading < 315){
        direction = "South";
        document.getElementById("chat_n").style.display = 'none';
        document.getElementById("chat_w").style.display = 'none';
        document.getElementById("chat_s").style.display = 'block';
        document.getElementById("chat_e").style.display = 'none';
        content = "chat_s";
    } else {
        direction = "East";
        document.getElementById("chat_n").style.display = 'none';
        document.getElementById("chat_w").style.display = 'none';
        document.getElementById("chat_s").style.display = 'none';
        document.getElementById("chat_e").style.display = 'block';
        content = "chat_e";
    }

    if (old_direction !== direction){
        pubnubDemo.unsubscribe({
            channels: [old_direction]
        });
        pubnubDemo.subscribe({
            channels: [direction],
            withPresence: true
        });
    }
    document.getElementById("direction").innerHTML = direction;

}
