/**
 * Created by Ali on 2016-09-23.
 */

pollSchema.methods.newPoll = function (userId, question, options) {

    var poll = new Poll({
        postedBy: userId,
        question: question,
        options: options,
        comments: new Array(),
        datePosted: Date.now(),
        pollId: generateUUID(),
    })

};

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}