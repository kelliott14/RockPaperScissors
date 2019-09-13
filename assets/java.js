$(document).ready(function() {
    //firebase grab
    var config = {
        apiKey: "AIzaSyCxS0eBVsumuimkLasTR_4BqEIYFdDsUWU",
        authDomain: "bootcamp-5213b.firebaseapp.com",
        databaseURL: "https://bootcamp-5213b.firebaseio.com",
        projectId: "bootcamp-5213b",
        storageBucket: "bootcamp-5213b.appspot.com",
        messagingSenderId: "409316849325",
        appId: "1:409316849325:web:6d67206e22effae63bb824"
      };
      
    firebase.initializeApp(config);
    
    //variables
    var database = firebase.database();

    var playGame;
    var playerOneSelect;
    var playerTwoSelect;
    var user;
    var uid;
    var playerOne;
    var playerTwo;

    var p1Pick;
    var p2Pick;
    var p1Round;
    var p2Round;
    var p1WinsTally;
    var p1LossTally;
    var p2WinsTally;
    var p2LossTally;

    //on initial load of the page
    function onLoad(){
        var pickPlayerOne = $("<button>Player One</button>");
        var pickPlayerTwo = $("<button>Player Two</button>");

        $(pickPlayerOne).addClass("btn btn-primary btn-block");
        $(pickPlayerTwo).addClass("btn btn-danger btn-block");

        $(pickPlayerOne).attr("id", "playerOnePick");
        $(pickPlayerTwo).attr("id", "playerTwoPick");

        $(".playerOneDiv").append(pickPlayerOne);
        $(".playerTwoDiv").append(pickPlayerTwo);

        playerOneSelect = false;
        playerTwoSelect = false;
        $(".readySetGoCard").hide();
        $(".playerOneCard").hide();
        $(".playerTwoCard").hide();

        database.ref("/playerOne").set({
            user: null
        })

        database.ref("/playerTwo").set({
            user: null
        })

        database.ref("/state").set({
            state: null
        })

        database.ref("/round").set({
            state: null
        })
        
        p1WinsTally = 0;
        p1LossTally = 0;
        p2WinsTally = 0;
        p2LossTally = 0;
        playerOne = "";
        playerTwo = "";
        
    //TO-DO: clear chatbox
    }
    
    //calling initial functions on page load
    onLoad();
    selectPlayerOne();    

    //Player One select
    function selectPlayerOne(){
        $(".playerOneCard").show();
    
        $("body").on("click", "#playerOnePick", function(){   
        
            firebase.auth().signInAnonymously().catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                        });
                user = firebase.auth().currentUser;
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        var isAnonymous = user.isAnonymous;
                        uid = user.uid;
                    }
                })

                database.ref("/playerOne").set({
                        p1ID: user.uid,
                        p1Selected: "true"
            });

            $(".readySetGoCard").show();
            $(".readyOneButton").text("Player One, are you ready?");
            $(".readyOneButton").attr("id", "p1Ready")
            $(".readyTwoButton").hide();
            $(".winnerButton").hide();
            
            $(".readySetGoCard").on("click", "#p1Ready", function(){
                $(".readyOneButton").text("Ready!");

                if(playerTwoSelect){
                database.ref("/state").update({
                    state: "true",
                })
                }
            });
        });
    }

    //on setting of Player One, it runs the set Player Two function
    database.ref("/playerOne").once("child_added", function(){
        selectPlayerTwo();
    });

    //player two select
    function selectPlayerTwo(){
        
        $(".playerTwoCard").show();
        
        $("body").on("click", "#playerTwoPick", function(){
        
            firebase.auth().signInAnonymously().catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });

            user = firebase.auth().currentUser;
            firebase.auth().onAuthStateChanged(function(user) {

                if (user) {
                    var isAnonymous = user.isAnonymous;
                    uid = user.uid;
                }
            })
    
            database.ref("/playerTwo").set({
                    p2ID: user.uid,
                    p2Selected: "true"
            });
            
            $(".readySetGoCard").show();
            $(".readyOneButton").hide();
            $(".readyTwoButton").attr("id", "p2Ready")
            $(".readyTwoButton").text("Player Two, are you ready?");
            $(".winnerButton").hide();
        });

        $(".readySetGoCard").on("click", "#p2Ready", function(){
            $(".readyTwoButton").text("Ready!");

            if(playerOneSelect){
                database.ref("/state").update({
                state: "true",
                });
            }
        });     
    }

    //Setting the Player One values to the database
    database.ref("/playerOne").on("value", function(snapshot){
        var test = snapshot.child("p1Selected").exists();

        if (test){
        playerOneSelect = snapshot.val().p1Selected;
        playerOne = snapshot.val().p1ID;
        }
    });

    //Setting the Player Two values to the database
    database.ref("/playerTwo").on("value", function(snapshot){
        var test = snapshot.child("p2Selected").exists();

        if (test){
        playerTwoSelect = snapshot.val().p2Selected;
        playerTwo = snapshot.val().p2ID
        }
    });

    //After both players have been selected, it runs the play game function
    database.ref("/state").once("child_added", function(){
        playGame();
    });   

    //Play Game function
    function playGame(){

        $("#playerOnePick").hide();
        $("#playerTwoPick").hide();
        $(".winnerButton").hide();
        $(".readyOneButton").hide();
        $(".readyTwoButton").hide();

        if (playerOne == uid){
            var otherDiv1 = $(".playerTwoCard").html("<div>")
            $(otherDiv1).addClass("notMine")
           
            var scissors = $("<div class = 'card fighterCard'><img src='./assets/images/ScissorsIcon.JPG'></div>");
            var paper = $("<div class = 'card fighterCard'><img src='./assets/images/PaperIcon.JPG'></div>");
            var rock = $("<div class = 'card fighterCard'><img src='./assets/images/RockIcon.JPG'></div>");

            $(scissors).attr("fighter", "scissors");
            $(paper).attr("fighter", "paper");
            $(rock).attr("fighter", "rock");

            $(".playerOneCard").append(scissors, paper, rock);
            $(".playerOneCard").addClass("card-group")

         
        }else if (playerTwo == uid){
            var otherDiv2 = $(".playerOneCard").html("<div>");
            $(otherDiv2).addClass("notMine");

            var scissors = $("<div class = 'card fighterCard'><img src='./assets/images/ScissorsIcon.JPG'></div>");
            var paper = $("<div class = 'card fighterCard'><img src='./assets/images/PaperIcon.JPG'></div>");
            var rock = $("<div class = 'card fighterCard'><img src='./assets/images/RockIcon.JPG'></div>");

            $(scissors).attr("fighter", "scissors");
            $(paper).attr("fighter", "paper");
            $(rock).attr("fighter", "rock");


            $(".playerTwoCard").append(scissors, paper, rock);
            $(".playerTwoCard").addClass("card-group");
        }
    }
    
    //sends P1's selection to the database
    database.ref("/playerOne").on("value", function(snapshot){
        var test = snapshot.child("pick").exists();

        if (test){
                p1Pick = snapshot.val().pick;
                p1Round = snapshot.val().round;
        }
    });
    
    //sends P2's selection to the database
    database.ref("/playerTwo").on("value", function(snapshot){
        var test = snapshot.child("pick").exists();

        if (test){
                p2Pick = snapshot.val().pick;
                p2Round = snapshot.val().round;   
        }     
    });

    //During play game function, where P1 picks a S, P or R option
    $(".playerOneCard").on("click", ".fighterCard", function(){
        p1Pick = $(this).attr("fighter");

        database.ref("/playerOne").update({
            pick: p1Pick,
            round: true
         });
         
        $(".readyOneButton").text("Play");
        $(".readyOneButton").show();
        $(".readyOneButton").attr("id", "p1Play");
    });
    //After P1 makes selection, they click on the button to play, if P2 is ready, it will play
    $(".readySetGoCard").on("click", "#p1Play", function(){
        $(".playerOneCard").hide();
        $("#p1Play").hide();

        if(p2Round){
            database.ref("/round").set({
            state: "true",
            });
        } 
    })

    //P2 makes a selection
    $(".playerTwoCard").on("click", ".fighterCard", function(){
        p2Pick = $(this).attr("fighter");

        database.ref("/playerTwo").update({
            pick: p2Pick,
            round: true
         });

        $(".readyTwoButton").text("Play");
        $(".readyTwoButton").show();
        $(".readyTwoButton").attr("id", "p2Play")

    });

    //After P2 makes selection, they click on the button to play, if P1 is ready, it will play
    $(".readySetGoCard").on("click", "#p2Play", function(){
        $(".playerTwoCard").hide()
        $("#p2Play").hide();

        if(p1Round){
            database.ref("/round").set({
            state: "true",
            });
        }

        
    });

    //Once both players are ready, it runs the check winner function
    database.ref("/round").on("value", function(snapshot){
        checkWinner();
    })

    //updates the database with the wins and losses for P1
    database.ref("/playerOne").on("value", function(snapshot){
        var test = snapshot.child("Score").exists();

        if (test){
            p1WinsTally = snapshot.val().Score.winsTally;
            p1LossTally = snapshot.val().Score.lossesTally
        }
    });
    
    //updates the database with the wins and losses for P2
    database.ref("/playerTwo").on("value", function(snapshot){
        var test = snapshot.child("Score").exists();

        if (test){
                p2WinsTally = snapshot.val().Score.winsTally;
                p2LossTally = snapshot.val().Score.lossesTally;
        }
    });

    //compares the selection and declares the winner
    function checkWinner(){
        var db2RefW = database.ref("/playerTwo/Score/winsTally")
        var db1RefW = database.ref("/playerOne/Score/winsTally")
        var db2RefL = database.ref("/playerTwo/Score/lossesTally")
        var db1RefL = database.ref("/playerOne/Score/lossesTally")

        $(".winnerButton").show();
        
        //where it's a tie
        if(p1Pick == p2Pick){
            $(".winnerButton").text("It's a tie!");

        //where P1 is a winner
        }else if(
            (p1Pick == "rock") && (p2Pick == "scissors") ||
            (p1Pick == "scissors") && (p2Pick == "paper") ||
            (p1Pick == "paper") && (p2Pick == "rock")){
                $(".winnerButton").text("Player One Wins!");

            db2RefL.transaction(function(p2LossTally){
                return p2LossTally +1;
            });

            db1RefW.transaction(function(p1WinsTally){
                return p1WinsTally +1;
            });

        //where p2 is a winner
        }else{
            $(".winnerButton").text("Player Two Wins!");
            db2RefW.transaction(function(p2WinsTally){
                return p2WinsTally +1;
            });

            db1RefL.transaction(function(p1LossTally){
                return p1LossTally +1;
            });
        }

        updateP1Scorecard();
        updateP2Scorecard();
    }

    
    //Updates P1's scorecard
    function updateP1Scorecard(){
       
        var SCDiv = $("<div>");

        var p1W = $("<p>Wins: " + p1WinsTally + "</p>");
        var p1L = $("<p>Losses: " + p1LossTally + "</p>");

        $(SCDiv).append(p1W, p1L);
        $(".P1SCard").html(SCDiv);
    }

    //Updates P2's scorecard
    function updateP2Scorecard(){
        var SCDiv = $("<div>");

        var p2W = $("<p>Wins: " + p2WinsTally + "</p>");
        var p2L = $("<p>Losses: " + p2LossTally + "</p>");

        $(SCDiv).append(p2W, p2L);
        $(".P2SCard").html(SCDiv);
    }


});