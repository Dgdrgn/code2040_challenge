/**
 * Created by Jesus Garcia on 11/30/14.
 * Email: jesusega@usc.edu
 */

var promise = $.ajax({
    url: 'http://challenge.code2040.org/api/register',
    type: 'post',
    dataType: 'json',
    data: {
        email: "jesusega@usc.edu",
        github: "https://github.com/jesusega/code2040_challenge"
    }
});

promise.done(function(response) {
   console.log(response);
});

