//gets all the connections that the user has made

var posts = require('../models/posts');

module.exports = function(request, response){
    
    var username = request.session.username;
    
    //the arrays that will contain the connections
    var rider_posts = [];
    
    var option = "rider";
    
    posts.getRiderConnections(username, function(allposts){
        if (allposts.length != 0){
            allposts.forEach(function(post){
            posts.getUserInformationById(option, post.RiderPostID, function(data){
                
                if (data.length != 0){
                    
                    var dict = {};
                    
                    dict.option = option;
                    dict.id = post.RiderPostID;
                    dict.username = post.Username;
                    dict.responderUsername = post.ResponderUsername;
                    dict.responseMessage = post.ResponseMessage;
                    
                    dict.fromStreet = data[0].FromStreet;
                    dict.fromCity = data[0].FromCity;
                    dict.fromState = data[0].FromState;
                    
                    dict.toStreet = data[0].ToStreet;
                    dict.toCity = data[0].ToCity;
                    dict.toState = data[0].ToState;
                    
                    dict.day = data[0].Day;
                    dict.month = data[0].Month;
                    dict.year = data[0].Year;
                    
                    dict.hour = data[0].DepartureHour;
                    dict.minute = data[0].DepartureMinute;
                    dict.meridian = data[0].DepartureMeridian;
                    
                    dict.passengers = data[0].Passengers;
                    dict.fare = data[0].Fare;
                    
                    rider_posts.push(dict);    
                }
                
                response.render('RiderConnections',{rider_posts:rider_posts});
            });
        });
        } else{
            response.render('RiderConnections', {rider_posts:rider_posts});
        }
    });
};