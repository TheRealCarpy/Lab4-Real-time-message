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




