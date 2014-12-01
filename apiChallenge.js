/**
 * Created by Jesus Garcia on 11/30/14.
 * Email: jesusega@usc.edu
 */

var html = '';
var token = "";
var email = "jesusega@usc.edu";
var github = "https://github.com/jesusega/code2040_challenge";
var dictionary = {
    email: email,
    github: github
}

$.ajax({
    url: 'http://challenge.code2040.org/api/register',
    type: 'POST',
    dataType: 'JSON',
    data: JSON.stringify(dictionary)
}).done(function(response) {
    token = response.result;
    html += "Token: " + token + "<br/>";
    $('#console').html(html);
    stage1();
});

//=============================
// Stage I: Reverse a String
// ============================
var stage1 = function() {
    var oldString = '';
    var reversedString = '';
    var stringArray;

    // Retrieve string
    dictionary = {
        token: token
    }
    $.ajax({
        url: 'http://challenge.code2040.org/api/getstring',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(dictionary)
    }).done(function(response) {
        oldString = response.result;
        html += "String Retrieved: " + oldString + "<br/>";
        $('#console').html(html);
        reverseString();
    });

    var reverseString = function() {
        // Reverse the string
        stringArray = oldString.split('');
        for (var i = stringArray.length-1; i >= 0; i--) {
            reversedString += stringArray[i];
        }

        // Send reversed string
        dictionary = {
            token: token,
            string: reversedString
        }
        $.ajax({
            url: 'http://challenge.code2040.org/api/validatestring',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(dictionary)
        }).done(function() {
            html += "String Sent: " + reversedString + "<br/>";
            $('#console').html(html);
            stage2();
        });
    }
}

//=============================
// Stage II: Needle in a Haystack
// ============================
var stage2 = function() {
    var needle = '';
    var haystack;
    var index = -1;

    // Retrieve needle and haystack
    dictionary = {
        token: token
    }
    $.ajax({
        url: 'http://challenge.code2040.org/api/haystack',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(dictionary)
    }).done(function(response) {
        needle = response.result.needle;
        haystack = response.result.haystack;
        html += "Needle Retrieved: " + needle + "<br/>";
        $('#console').html(html);
        html += "Haystack Retrieved: " + haystack + "<br/>";
        $('#console').html(html);
        findNeedle();
    });

    var findNeedle = function() {
        // Find the needle
        for (var i = 0; i < haystack.length; i++) {
            if(haystack[i] == needle) {
                index = i;
            }
        }

        // Send index of needle
        dictionary = {
            token: token,
            needle: index
        }
        $.ajax({
            url: 'http://challenge.code2040.org/api/validateneedle',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(dictionary)
        }).done(function() {
            html += "Index Sent: " + index + "<br/>";
            $('#console').html(html);
            stage3();
        });
    }
}

//=============================
// Stage III: Prefix
// ============================
var stage3 = function() {
    var prefix = '';
    var arrayOfStrings;
    var arrayNoPrefix = new Array();

    // Retrieve prefix and array
    dictionary = {
        token: token
    }
    $.ajax({
        url: 'http://challenge.code2040.org/api/prefix',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(dictionary)
    }).done(function(response) {
        prefix = response.result.prefix;
        arrayOfStrings = response.result.array;
        html += "Prefix Retrieved: " + prefix + "<br/>";
        $('#console').html(html);
        html += "Array Retrieved: " + arrayOfStrings + "<br/>";
        buildArray();
    });

    var buildArray = function() {
        // Find the strings that do not start with the prefix
        var prefixEnd = prefix.length;
        for (var i = 0; i < arrayOfStrings.length; i++) {
            if((arrayOfStrings[i].substring(0,prefixEnd)) != prefix) {
                arrayNoPrefix.push(arrayOfStrings[i]);
            }
        }

        // Send array of strings without prefix
        dictionary = {
            token: token,
            array: arrayNoPrefix
        }
        $.ajax({
            url: 'http://challenge.code2040.org/api/validateprefix',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(dictionary)
        }).done(function() {
            html += "Array Sent: " + arrayNoPrefix + "<br/>";
            $('#console').html(html);
            stage4();
        });
    }
}

//=============================
// Stage IV: The Dating Game
// ============================
var stage4 = function() {
    var dateStamp;
    var interval;
    var newDateTime;

    // Retrieve string
    dictionary = {
        token: token
    }
    $.ajax({
        url: 'http://challenge.code2040.org/api/time',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(dictionary)
    }).done(function(response) {
        dateStamp = response.result.datestamp;
        interval = response.result.interval;
        html += "DateStamp Retrieved: " + dateStamp + "<br/>";
        $('#console').html(html);
        html += "Interval Retrieved: " + interval + "<br/>";
        $('#console').html(html);
        incrementTime();
    });

    var incrementTime = function() {
        // Increment time by the amount in the interval
        var incDate = new Date(dateStamp);
        incDate.setSeconds(incDate.getSeconds() + interval);
        newDateTime = moment(incDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        // Send new DateStamp
        dictionary = {
            token: token,
            datestamp: newDateTime
        }
        $.ajax({
            url: 'http://challenge.code2040.org/api/validatetime',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(dictionary)
        }).done(function() {
            html += "New DateStamp Sent: " + newDateTime + "<br/>";
            $('#console').html(html);
            apiStatus();
        });
    }
}

var apiStatus = function() {
    var status;
    // Retrieve status
    dictionary = {
        token: token
    }
    $.ajax({
        url: 'http://challenge.code2040.org/api/status',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(dictionary)
    }).done(function(response) {
        status = response.result;
        console.log("Status of API Challenge: " + status);
    });
}