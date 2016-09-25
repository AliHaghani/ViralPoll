var layout = {
    showlegend: false,
    xaxis: {
        title: "Votes",
        rangemode: 'tozero',
        autorange: true,
        dtick: 1,
        fixedrange: false
    }

};

$('#recentPolls').ready(function() {
    if(typeof polls !== typeof undefined) {
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


            var pollID = polls[i]._id;
            var data = [{
                type: 'bar',
                orientation: 'h',
                y: options,
                x: optionVotes,
                pollID: pollID,
                question: polls[i].question
            }];


            layout.title = polls[i].question;
            Plotly.newPlot('pollGraph' + pollID, data, layout, {displayModeBar: false});

            var myPlot = document.getElementById('pollGraph' + pollID);

            myPlot.on('plotly_click', function(data) {optionClicked(data);} );
        }


    }

});



function optionClicked(data)
{
    if(data.points.length > 0)
    {
        var pollID = data.points[0].data.pollID;
        var option = [];
        var newX = [];
        var newY = [];
        for(var i=0; i < data.points[0].data.x.length; i++)
        {
            let votes = data.points[0].data.x[i];
            let title = data.points[0].data.y[i];
            if(i === data.points[0].pointNumber)
                votes++;

            var curr = { title: title, votes: votes};
            newX.push(votes);
            newY.push(title);
            option.push(curr);
        }

        // var form = document.createElement('form');
        // var token =
        // form.setAttribute('action', '/polls/updateVote');
        // form.setAttribute('method', 'POST');
        // var pollIDField = document.createElement('input');
        // var optionNumField = document.createElement('input');
        // pollIDField.setAttribute('type','hidden');
        // optionNumField.setAttribute('type', 'hidden');
        // pollIDField.setAttribute('id', 'pollID');
        // optionNumField.setAttribute('id', 'optionNum');
        // pollIDField.value = pollID;
        // optionNumField.value = optionNum;
        //
        // form.appendChild(pollIDField);
        // form.appendChild(optionNumField);
        //
        // var submit = document.createElement('input');
        // submit.setAttribute('type', 'submit');
        //
        // form.appendChild(submit);

        var request = new XMLHttpRequest();

        request.onreadystatechange = function(response)
        {

        };

        var params = JSON.stringify({
            poll_id: pollID,
            option: option
        });

        request.open('POST', '/updateVotes');
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));
        request.send(params);

        var pollGraph = document.getElementById('pollGraph' + pollID);
        //Plotly.deleteTraces(pollGraph, [0, 1]);
        pollGraph.data[0].x = newX;
        pollGraph.data[0].y = newY;
        layout.title = pollGraph.data[0].question;
        Plotly.redraw(pollGraph);












    }




}