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
    stage2();
    stage3();
    stage4();
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
        });
    }
}

//=============================
// Stage III: Prefix
// ============================
var stage3 = function() {
    var prefix = '';
    var arrayOfStrings;
    var arrayNoPrefix;

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
        var prefixEnd = prefix.length - 1;
        for (var i = 0; i < arrayOfStrings.length; i++) {
            if(arrayOfStrings[i].substring(0,prefixEnd) != prefix) {
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
        });
    }
}

//=============================
// Stage IV: The Dating Game
// ============================
var stage4 = function() {
    var dateStamp = '';
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
        });
    }
}