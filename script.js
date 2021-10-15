let player1Name = document.getElementById("player1Name");
let player2Name = document.getElementById("player2Name");
player1Name.style.color = "#4D995B";//Initial batsman

/******getting tableCells ID's*********/
let tblP1=document.getElementById("tblP1");
let p11s = document.getElementById("p11s");
let p14s = document.getElementById("p14s");
let p16s = document.getElementById("p16s");
let p1Total = document.getElementById("p1Total");

let tblP2=document.getElementById("tblP2");
let p21s = document.getElementById("p21s");
let p24s = document.getElementById("p24s");
let p26s = document.getElementById("p26s");
let p2Total = document.getElementById("p2Total");

let ballCounts = 0;
let players= ["Sachin","Virat"];
let playerScoresArr = [[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]];//Array for string Scores
					//p1---1s-------4s----6s-T-p2---1s-------4s----6s-T-------//T - Total
let currentPlayerIndex = 0;

/****Check player is changing or not****/
function isIndexChange(run){
	if(run % 2 == 1){
		if(currentPlayerIndex == 0){
			currentPlayerIndex = 1;
			player2Name.style.color = "#4D995B";
			player1Name.style.color = "black";
			return true;
		}else{
			currentPlayerIndex = 0;
			player2Name.style.color = "black";
			player1Name.style.color = "#4D995B";
			return true;
		}
	}
}

/****Runs(Input) Validation function****/
function validate(run){
	if(run == "" || run == null){
		alert("Please Enter the Run");
		return false;
	}else if(isNaN(run)){
		alert("Please Enter number only");
		return false;
	}else if(run != 1 && run != 2 && run != 3 && run != 4 && run != 6 && run != 0){
		alert("Please Enter correct data");
		return false;
	}
	else{
		ballCounts += 1;
		return true;
	}
}

let scoreRowStr = '';
let input =document.getElementById("input");
input.focus();

//EventHandler for perform thw operation when we pressed enter
input.addEventListener("keyup",(e)=>{
	if(e.keyCode === 13){
		calculateScore();
	}else if(isNaN(input.value)){
		input.style.borderColor = "red";
		
	}else if(input.value == ""){
		input.style.borderColor = "black";
	}else{
		input.style.borderColor = "green";
	}
});

function calculateScore(){
	let run = input.value;
	
	if(!validate(run)){
		console.log("Invalid Run");
		return;
	}
	
	if(ballCounts <= 6){
		if(run == 1){
			playerScoresArr[currentPlayerIndex][1] += 1;
			playerScoresArr[currentPlayerIndex][7] += 1;
		}else if(run == 4){ 
			playerScoresArr[currentPlayerIndex][4] += 1;
			playerScoresArr[currentPlayerIndex][7] += 4;	
		}else if(run == 6){
			playerScoresArr[currentPlayerIndex][6] += 1;
			playerScoresArr[currentPlayerIndex][7] += 6;
		}else if(run == 2){
			playerScoresArr[currentPlayerIndex][7] += 2;
		}else if(run == 3){
			playerScoresArr[currentPlayerIndex][7] += 3;
		}
		scoreRowStr =  "<td>"+players[currentPlayerIndex]+"</td>"
						  +"<td>"+playerScoresArr[currentPlayerIndex][1]+"</td>"
						  +"<td>"+playerScoresArr[currentPlayerIndex][4]+"</td>"
						  +"<td>"+playerScoresArr[currentPlayerIndex][6]+"</td>"
						  +"<td>"+playerScoresArr[currentPlayerIndex][7]+"</td>";
		
		/***for choose where we want to update***/
		if(currentPlayerIndex == 0){
			tblP1.innerHTML = scoreRowStr;
		}else{
			tblP2.innerHTML = scoreRowStr;
		}
		document.getElementById("total").innerHTML=playerScoresArr[0][7] + playerScoresArr[1][7];
		/****Updating bowler table****/
		document.getElementById("ballCount").innerHTML = ballCounts;
		document.getElementById("totalBallRuns").innerHTML = playerScoresArr[0][7] + playerScoresArr[1][7];
		if(ballCounts == 6){
			showResult();
			return;
		}
		isIndexChange(run);//for change the side of batsman
		input.value="";
		input.focus();
		console.log("Run " + run +" added Successfully");
	}else{
		showResult();
	}
}//End of calculateScore function

function showResult(){
	document.getElementById("resTRun").innerHTML = playerScoresArr[0][7] + playerScoresArr[1][7];
	document.getElementById("res").style.display="block";
	document.getElementById("inputCn").style.display="none";
	player2Name.style.color = "grey";
	player1Name.style.color = "grey";
	
	document.getElementById("foot").style.display = "block";
}