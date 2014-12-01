/**
 * Created by Jesus Garcia on 11/30/14.
 * Email: jesusega@usc.edu
 */

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
    console.log("Token: " + token);
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
        console.log("String Retrieved: " + oldString);
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
            console.log("String Sent: " + reversedString);
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
        console.log("Needle Retrieved: " + needle);
        console.log("Haystack Retrieved: " + haystack);
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
            console.log("Index Sent: " + index);
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
        console.log("Prefix Retrieved: " + prefix);
        console.log("Array Retrieved: " + arrayOfStrings);
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
            console.log("Array Sent: " + arrayNoPrefix);
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
        console.log("DateStamp Retrieved: " + dateStamp);
        console.log("Interval Retrieved: " + interval);
        incrementTime();
    });

    var incrementTime = function() {
        // Split the date string into integers
        var year = parseInt(dateStamp.substring(0, 4));
        var month = parseInt(dateStamp.substring(5, 7));
        var day = parseInt(dateStamp.substring(8, 10));
        var hour = parseInt(dateStamp.substring(11, 13));
        var minute = parseInt(dateStamp.substring(14, 16));
        var second = parseInt(dateStamp.substring(17, 19));
        var milli = parseInt(dateStamp.substring(20, 23));

        // Increment time by the amount in the interval
        var incDate = new Date(year, month-1, day, hour, minute, second, milli);
        console.log(incDate);
        incDate.setSeconds(incDate.getSeconds() + interval);
        console.log(incDate);
        newDateTime = incDate.toISOString();
        console.log(newDateTime);
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
            console.log("New DateStamp Sent: " + newDateTime);
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