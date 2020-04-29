var pubnubDemo = new PubNub({
    publishKey: 'pub-c-864af332-3663-4763-8bc0-78442d476f04',
    subscribeKey: 'sub-c-78a1f70e-8a0a-11ea-927a-2efbc014b69f'
});

pubnubDemo.publish({ message: { "color" : "blue" }, channel: 'demo_tutorial' });

pubnubDemo.addListener({
    message: function(message){
        console.log(message)
    }
})

pubnubDemo.subscribe({
    channels:['demo_tutorial']
});

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

    var direction = "North";
    if (heading >= 45 && heading < 135) {
        direction = "North";
    } else if (heading >= 135 && heading < 225) {
        direction = "West";
    } else if (heading >= 225 && heading < 315){
        direction = "South";
    } else {
        direction = "East";
    }

    document.getElementById("direction").innerHTML = direction;

}