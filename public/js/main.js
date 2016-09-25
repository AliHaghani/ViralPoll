$(document).ready(function() {
    if(polls) {
        var recentPolls = $('#recentPolls');
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



function optionClicked(data, pollID)
{
    var pts = data.points;
    var testID = pollID;




}