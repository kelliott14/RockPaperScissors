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
    var userIs;
    var uid;
    var playerOne;
    var playerTwo;

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
                user: user.uid,
                p1Selected: "true"
      })
        
      
    
    $(".readySetGoCard").show();
    $(".readyOneButton").text("Player One, are you ready?");
    $(".readyTwoButton").hide();
    $(".winnerButton").hide();
    
    $(".readyOneButton").on("click", function(){
        $(".readyOneButton").text("Ready!");

        database.ref("/playerOne").on("value", function(snapshot){
            playerOneSelect = snapshot.val().p1Selected;
        });

        database.ref("/playerTwo").on("value", function(snapshot){
            playerTwoSelect = snapshot.val().p2Selected;
        });

        console.log(playerOneSelect)
        console.log(playerTwoSelect)
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
                  user: user.uid,
                  p2Selected: "true"
        })
     
        $(".readySetGoCard").show();
        $(".readyOneButton").hide();
        $(".readyTwoButton").text("Player Two, are you ready?");
        $(".winnerButton").hide();
      });

        $(".readyTwoButton").on("click", function(){
        $(".readyTwoButton").text("Ready!");
        database.ref("/playerOne").on("value", function(snapshot){
            playerOneSelect = snapshot.val().p1Selected;
        });

        database.ref("/playerTwo").on("value", function(snapshot){
            playerTwoSelect = snapshot.val().p2Selected;
        });
        console.log(playerOneSelect)
        console.log(playerTwoSelect)

        if(playerOneSelect){
            database.ref("/state").update({
            state: "true",
            });
        }

        })

        
    }
//https://firebase.google.com/docs/database/web/read-and-write
    database.ref("/state").on("child_added", function(){

        database.ref("/playerOne").on("value", function(){
            playerOne = database.user;
        });

        database.ref("/playerTwo").on("value", function(){
            playerTwo = database.user;
        });

            playGame();
            console.log("play Game called")
            console.log("p1: " + playerOne)
            console.log("p2: " + playerTwo)
        })
    
   

    function playGame(){

        $("#playerOnePick").hide();
        $("#playerTwoPick").hide();
        
        if (playerOne = uid){
            var otherDiv = $(".playerTwoCard").html("<div>")
            $(otherDiv).addClass("notMine")

           
            var scissors = $("<img src='./assets/images/ScissorsIcon.JPG'>");
            var paper = $("<img src='./assets/images/PaperIcon.JPG'>");
            var rock = $("<img src='./assets/images/RockIcon.JPG'>");

            $(".playerOneCard").append(scissors, paper, rock);
         
        }else if (playerTwo = uid){
                var otherDiv = $(".playerOneCard").html("<div>")
                $(otherDiv).addClass("notMine")
    
                var scissors = $("<img src='./assets/images/ScissorsIcon.JPG'>");
                var paper = $("<img src='./assets/images/PaperIcon.JPG'>");
                var rock = $("<img src='./assets/images/RockIcon.JPG'>");
    
                $(".playerTwoCard").append(scissors, paper, rock);
             
            }
        }
    
    
    

});