$(document).ready(function() {
    
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
        
    //TO-DO: clear chatbox
    }
    
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
    $(".readyTwoButton").hide();
    $(".winnerButton").hide();
    
    $(".readyOneButton").on("click", function(){
        $(".readyOneButton").text("Ready!");

        if(playerTwoSelect){
        database.ref("/state").update({
            state: "true",
        })
    }
    })
    });
}

database.ref("/playerOne").on("child_added", function(){
    selectPlayerTwo();
    
})


function selectPlayerTwo(){
    $(".playerTwoCard").show();
    //player two select
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
        $(".readyTwoButton").text("Player Two, are you ready?");
        $(".winnerButton").hide();
      });

        $(".readyTwoButton").on("click", function(){
        $(".readyTwoButton").text("Ready!");

        if(playerOneSelect){
            database.ref("/state").update({
            state: "true",
            });
        }

        })

        
    }


database.ref("/playerOne").on("value", function(snapshot){
    playerOneSelect = snapshot.val().p1Selected;
    playerOne = snapshot.val().p1ID;
});

database.ref("/playerTwo").on("value", function(snapshot){
    playerTwoSelect = snapshot.val().p2Selected;
    playerTwo = snapshot.val().p2ID
});



    database.ref("/state").on("child_added", function(){
        playGame();
        })
    
   

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
                var otherDiv2 = $(".playerOneCard").html("<div>")
                $(otherDiv2).addClass("notMine")
    
                var scissors = $("<div class = 'card fighterCard'><img src='./assets/images/ScissorsIcon.JPG'></div>");
                var paper = $("<div class = 'card fighterCard'><img src='./assets/images/PaperIcon.JPG'></div>");
                var rock = $("<div class = 'card fighterCard'><img src='./assets/images/RockIcon.JPG'></div>");
    
                $(scissors).attr("fighter", "scissors");
                $(paper).attr("fighter", "paper");
                $(rock).attr("fighter", "rock");


                $(".playerTwoCard").append(scissors, paper, rock);
                $(".playerTwoCard").addClass("card-group")
            }
        }
    
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

    database.ref("/playerOne").on("value", function(snapshot){
            p1Pick = snapshot.val().pick;
            p1Round = snapshot.val().round;
    });
    
    database.ref("/playerTwo").on("value", function(snapshot){
            p2Pick = snapshot.val().pick;
            p2Round = snapshot.val().round;        
        })

    $(".readySetGoCard").on("click", "#p1Play", function(){

        if(p2Round){
            database.ref("/round").set({
            state: "true",
            });
        }
    })

    $(".playerTwoCard").on("click", ".fighterCard", function(){
        p2Pick = $(this).attr("fighter");

        database.ref("/playerTwo").update({
            pick: p2Pick,
            round: true
         });

        

        $(".readyTwoButton").text("Play");
        $(".readyTwoButton").show();
        $(".readyTwoButton").attr("id", "p2Play")

    })

    $(".readySetGoCard").on("click", "#p2Play", function(){

        if(p1Round){
            database.ref("/round").set({
            state: "true",
            });
        }
        
        
    });

    database.ref("/round").on("value", function(snapshot){
        checkWinner();
    })

    function checkWinner(){
        console.log("check winner called")
        if(p1Pick == p2Pick){
            $(".winnerButton").text("it's a tie!");

        }else if(
            (p1Pick == "rock") && (p2Pick == "scissors") ||
            (p1Pick == "scissors") && (p2Pick == "paper") ||
            (p1Pick == "paper") && (p2Pick == "rock")){
                $(".winnerButton").text("Player One Wins!");

                database.ref("/playerOne/Score").update({
                    winsTally: 1,
                    lossesTally: 0
                });

                database.ref("/playerTwo/Score").update({
                    lossesTally: 1,
                    winsTally: 0
                });
        }else{
            $(".winnerButton").text("Player Two Wins!")
            
            database.ref("/playerTwo/Score").update({
                winsTally: 1,
                lossesTally: 0
            });

            database.ref("/playerOne/Score").update({
                lossesTally: 1,
                winsTally: 0
            });
        }

        updateP1Scorecard();
        updateP2Scorecard();
    }

    database.ref("/playerOne").on("value", function(snapshot){
        p1WinsTally = snapshot.val().Score.winsTally;
        p1LossTally = snapshot.val().Score.lossesTally
    });
    
    database.ref("/playerTwo").on("value", function(snapshot){
        p2WinsTally = snapshot.val().Score.winsTally;
        p2LossTally = snapshot.val().Score.lossesTally
    });

    function updateP1Scorecard(){
        console.log("update scorecard called")
        var SCDiv = $("<div>");

        var p1W = $("<p>Wins: " + p1WinsTally + "</p>");
        var p1L = $("<p>Losses: " + p1LossTally + "</p>");

        $(SCDiv).append(p1W, p1L);
        $(".P1SCard").html(SCDiv);
    }

    function updateP2Scorecard(){
        var SCDiv = $("<div>");

        var p2W = $("<p>Wins: " + p2WinsTally + "</p>");
        var p2L = $("<p>Losses: " + p2LossTally + "</p>");

        $(SCDiv).append(p2W, p2L);
        $(".P2SCard").html(SCDiv);
    }


});