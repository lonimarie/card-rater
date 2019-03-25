/*
 *@Author Loni Wooldridge
 *Javascript file linked to index.html
 *Used to run all backend of Card Rater
 */
window.addEventListener("load", start); //call start function when page loads

var cards = 51;
var deck = []; //array of card objects
var values = ["A", "2", "3", "4", "5", "6", "7",  "8", "9", "10", "J", "Q", "K"]; //card values per suit, used to generate array 
var suits = ["♥", "♦", "♠", "♣"]; //suits, used to generate array
var maxCard; //Card that has the max amount of likes
var totalLiked = 0; //total amount of likes between user and computer
var myLikes = 0; //amount of likes from user
var myDislikes = 0; //amount of dislikes from user
var firstLikedCard; //Card that is first liked by the user

/*
*Shuffles the array of cards so that they are randomly displayed
*/
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


/*
 *Called on page load. Builds the array of cards and adds action listeners to like and dislike buttons
 */
function start()  {
        var color;

        document.getElementById("like").addEventListener("click", decrementCounterOnLike); //like button on html page
        document.getElementById("dislike").addEventListener("click", decrementCounterOnDislike); //dislike button on html page

        for (var i = 0; i < suits.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (suits[i] == "♠" || suits[i] == "♣") {
                    color = "black";
                } else {
                    color = "red"
                }
                //card object added to array(deck). Card consists of a value (ex. A♠), a color, total likes, and likes and dislikes from the user
                var card = {Value: values[j] + " " + suits[i], Color: color, Likes: 0, Dislikes: 0, likeAmount: 0} 

                deck.push(card);    
            }
        }
        shuffle(deck);

        document.getElementById("cardvalue").innerHTML = deck[cards - 1].Value; //Starts the first card with a random card
        maxCard = deck[51]; //Makes the first card the max one
    }


/*
 *Called when the "All Stats" button is pressed (called from html page)
 * Hides the main display with the card and like buttons
 * Displays the div that contains all the stats
 */
function loadAllStats() {
        if (cards < 52) {
            document.getElementById("myStats").style.display = "none"; //Hide the div that contains stats on the user

            document.getElementById("main").style.display = "none"; //Hide both main card with buttons and main pages side panel
            document.getElementById("mainSideBar").style.display = "none";

            document.getElementById("right-container").style.display = "block"; //display the stats side bar and all stats information
            document.getElementById("statsSideBar").style.display = "block";

            document.getElementById("allStatsButton").style.display = "none"; //Hide all stats button since the all stats page is being displayed
            document.getElementById("myStatsButton").style.display = "block"; //show the my stats button

            document.getElementById("favoriteCard").innerHTML = maxCard.likeAmount + "% thumbs up"; //set the 80% liked from the max card

            document.getElementById("cardvalue2").className = maxCard.Color; //setting up the color, value and percent that it was liked in max card
            document.getElementById("cardvalue2").innerHTML = maxCard.Value;
            var percentLiked = (totalLiked / 52) * 100;
            document.getElementById("percentLiked").innerHTML = percentLiked + "%";

        }

}
/*Called when "my stats" button is pressed from html page
 *Hides on content on main page and in the "all stats" page
 */
function loadMyStats() {
    if (cards < 52) {
        document.getElementById("main").style.display = "none"; //set the display of all main page components to none
        document.getElementById("mainSideBar").style.display = "none";
        document.getElementById("right-container").style.display = "none"; //set the view of all statistics to none 
        document.getElementById("myStats").style.display = "block"; //view individual user statistics
        document.getElementById("statsSideBar").style.display = "block";

        document.getElementById("allStatsButton").style.display = "block"; //switch from "my stats" to "all stats" button
        document.getElementById("myStatsButton").style.display = "none";

        var percentLiked = (myLikes / 52) * 100; //calculate and display the percent of liked cards        
        document.getElementById("myPercentLiked").innerHTML = percentLiked +"%";

        var percentDisliked = (myDislikes / 52) * 100; //calculate and display the percent of disliked cards
        document.getElementById("percentDisliked").innerHTML = percentDisliked +"%";

        document.getElementById("firstLikedCard").className = firstLikedCard.Color; //set the display of the first liked card
        document.getElementById("firstLikedCard").innerHTML = firstLikedCard.Value;

    }

}

/* 
 * Called when the back button is pressed
 * Sets all statistics to not be visible and displays main page components
 */
function back() {
    document.getElementById("myStats").style.display = "none"; //sides user statistics
    document.getElementById("right-container").style.display = "none"; //hides all statistics

    document.getElementById("main").style.display = "block"; //displays all components on main page
    document.getElementById("mainSideBar").style.display = "block";
    document.getElementById("statsSideBar").style.display = "none";

    document.getElementById("allStatsButton").style.display = "none"; //sides the buttons on the statistics sidebar
    document.getElementById("myStatsButton").style.display = "none";

    if (cards < 0) {
        cards = 0;
    }
    document.getElementById("cardsremaining").innerHTML = cards + " Cards Remaining"; //display the correct amount of cards remaining
    

}

/*
 * Action listener set to the like button from the "start" function. It then calls this function
 * Decrements the amount of cards left and increments the like amount on a card
 */
function decrementCounterOnLike() {
    if (cards >= 0) {
        document.getElementById("cardsremaining").innerHTML = cards + " Cards Remaining";
        deck[cards].Likes += 1;
        if (myLikes == 0) {
            firstLikedCard = deck[cards];
        }
        myLikes += 1;
        console.log("liked");
        computerRatings();
    }
}

/*
 * Action listener set to the dislike button from the "start" function. It then calls this function
 * Decrements the amount of cards left and increments the dislike amount on a card
 */
function decrementCounterOnDislike() {
    if (cards >= 0) {
        document.getElementById("cardsremaining").innerHTML = cards + " Cards Remaining";
        deck[cards].Dislikes += 1;
        myDislikes += 1;
        console.log("disliked");
        computerRatings();
    }

}

/*
 * Function that "generates 4 random users" and randomly likes or dislikes the current card
 * Called from the dislike and like function
 */
function computerRatings() {
    document.getElementById("cardvalue").className = deck[cards].Color; 
    document.getElementById("cardvalue").innerHTML = deck[cards].Value;
    
    for (var i = 0; i < 4; i++){ 
        var likeOrDislike = Math.floor(Math.random() * 2); //randomly generate a 0 or a 1 

        if (likeOrDislike == 0) { //like if the random number is a 0
            deck[cards].Likes += 1;
        } else { //else dislike
            deck[cards].Dislikes += 1; 
        }
    }

    deck[cards].likeAmount = deck[cards].Likes * 20; //calculate the percentage that a certain card was liked
    if (deck[cards].likeAmount > maxCard.likeAmount) { //decide if its the new maxCard 
        maxCard = deck[cards];
    } 

    if (deck[cards].Likes > deck[cards].Dislikes) { //determine if it was liked or disliked more
        totalLiked += 1;
    }
    cards--;

}