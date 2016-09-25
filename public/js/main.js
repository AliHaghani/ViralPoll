$(document).ready(function() {
    if(polls) {
        var recentPolls = $('#recentpolls');
        for(var i = 0; i < polls.length; i++) {
            var pollDiv = document.createElement("div");
            pollDiv.id = "pollGraph" + polls[i]._id;
            $('#recentPolls').append(pollDiv);

            var optionVotes = new Array();
            var options = new Array();

            for(var opt = 0; opt < polls[i].options.length; opt++)
            {
                var curr = polls[i].options[opt];
                optionVotes.push(curr.votes);
                options.push(curr.title);
            }

            var data = [{
                type: 'bar',
                orientation: 'h',
                y: options,
                x: optionVotes
            }];

            var layout = {
                showlegend: false,
                xaxis: {
                    title: "Votes",
                    rangemode: 'tozero',
                    autorange: false,
                    fixedrange: true
                },
                title: polls[i].question
            };


            var pollID = polls[i]._id;
            Plotly.newPlot('pollGraph' + pollID, data, layout, {displayModeBar: false});

            var myPlot = document.getElementById('pollGraph' + pollID);

            myPlot.on('plotly_click', function(data) {optionClicked(data);} );
        }


    }

});

$('#myPolls').ready(function(){
    if(myPolls){
        var rPolls =$('#myPolls');
        for(var i=0; i < myPolls.length; i++){
            var pollDiv = document.createElement("div");
            pollDiv.id = "mypollGraph" + myPolls[i]._id;
            $('#myPolls').append(pollDiv);

            var optionVotes = new Array();
            var options = new Array();

            for(var opt = 0; opt < mPolls[i].options.length; opt++)
            {
                var curr = myPolls[i].options[opt];
                optionVotes.push(curr.votes);
                options.push(curr.title);
            }

            var data = [{
                type: 'bar',
                orientation: 'h',
                y: options,
                x: optionVotes
            }];

            var layout = {
                showlegend: false,
                xaxis: {
                    title: "Votes",
                    rangemode: 'tozero',
                    autorange: false,
                    fixedrange: true
                },
                title: myPolls[i].question
            };


            var myPollID = myPolls[i]._id;
            Plotly.newPlot('pollGraph' + myPollID, data, layout, {displayModeBar: false});

            var mPlot = document.getElementById('pollGraph' + myPollID);

            mPlot.on('plotly_click', function(data) {optionClicked(data);} );
        }


    }


});





function optionClicked(data, pollID)
{
    var pts = data.points;
    var testID = pollID;




}