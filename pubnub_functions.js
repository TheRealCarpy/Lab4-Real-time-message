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
    //feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                }
            })
            .catch(console.error);
    } else {
        //just serve up the EventListener w/o permissions here
        window.addEventListener('deviceorientation', handleOrientation, true);
    }
}

function handleOrientation(event)
{
    var heading = event.alpha;

    // Some browsers don't understand alpha
    if (typeof event.webkitCompassHeading !== "undefined") {
        heading = event.webkitCompassHeading;
    }

    document.getElementById("Heading").innerHTML = heading.toFixed([0]);
}