var questions_asked = 1;
var correct = 0;
var mydata,prev_ans,mid,time,level,valid,movname,total_ans,sec = 60;
myar = new Array();
resquest(1);
const nextBtn = '<button type="button" id="sub" class="next animated bounceInLeft">Submit</button>';
function resquest(c){
	var myar = new Array();
	$.getJSON("config/quizdb.php",function(data){
		mydata = JSON.parse(data);
                console.log(mydata);
	});
	setter(c);
}
function setter(x,check){
	let r = mydata.result.length;
	let q = Math.floor(Math.random() * r);
	movname = mydata.result[q].movie.replace(/_/g," ");
	let ans= $("input[type='radio']:checked").val();
	if (myar.includes(q)) {
		return setter(x);
	}
	else if(x == 1) {
		createradios(q);
	}else{
		if (check == "check") {
			if (ans == prev_ans) {
				switch(valid){
					case "easy":
						correct+=10;
						break;
					case "medium":
						correct+=15;
						clearInterval(time)
						sec+=4;
						counter()
						break;
					case "hard":
						correct+=20;
						clearInterval(time)
						sec+=7;
						counter();
						break;
				}
			}
			else{
				switch(valid){
					case "easy":
						correct-=5;
						break;
					case "medium":
						correct-=5;
						break;
					case "hard":
						correct-=10;
						break;
				}
			}
		}
		$("#div2").remove("")
		createradios(q);
	}
}
function shuffler(item){
	let arr=item.split("");
	let sqr = new Array();
	let j=0;
	for(let i=0;i<4;){
		let n = Math.floor(Math.random()*4);
		if (!sqr.includes(n)) {
			arr[j]=item[n];
			sqr.push(n);
			j++;
			i++;
		}
	}
	item=arr.join("");
	return item;
}

function createradios(q){
	myar.push(q);
	valid = mydata.result[q].level;
	let p = shuffler("1234");
	$('form').append('<fieldset class="q" id="div2"></fieldset>');
	$('#div2').addClass('q');
	$('<div class="mov">'+ movname +'</div>').appendTo("#div2");
	$('<div class="content"></div>').appendTo("#div2");
	$("<div id='pts'>"+ correct +"</div>").appendTo(".content");
	$('<legend>' + mydata.result[q].question + '</legend>').appendTo('.content');
	$("<div id='extras'> <span id='ans'>Question"+ questions_asked +"</span> <span id='lev'>"+ valid +"</span></div>").appendTo('.content');
	$('<span id="op1"></span>').appendTo('.content');
	$('<span id="op2"></span>').appendTo('.content');
	$('<span id="op3"></span>').appendTo('.content');
	$('<span id="op4"></span>').appendTo('.content');
	$('<input type="radio" name="quest" id="opt1" class="btnQ" value="'+mydata.result[q].option1+'">').appendTo("#op"+p[0]);
	$('<label for="opt1" class="btnQ"><span>'+ mydata.result[q].option1 + '</span></label>').insertAfter("#opt1");
	$('<input type="radio" name="quest" id="opt2" class="btnQ" value="'+mydata.result[q].option2+'">').appendTo("#op"+p[1]);
	$('<label for="opt2" class="btnQ"><span>'+ mydata.result[q].option2 + '</span></label>').insertAfter("#opt2");
	$('<input type="radio" name="quest" id="opt3" class="btnQ" value="'+mydata.result[q].option3+'">').appendTo("#op"+p[2]);
	$('<label for="opt3" class="btnQ"><span>'+ mydata.result[q].option3 + '</span></label>').insertAfter("#opt3");
	$('<input type="radio" name="quest" id="opt4" class="btnQ" value="'+mydata.result[q].answer+'">').appendTo("#op"+p[03]);
	$('<label for="opt4" class="btnQ"><span>'+ mydata.result[q].answer + '</span></label>').insertAfter("#opt4");
	$('<div class="button-space"><span><button type="button" class="check animated bounceInLeft" onclick="setter(2,\'check\')">Submit</button></span><span><button type="button" class="skip animated bounceInLeft" onclick="setter(2,\'skip\')">Skip</button><span></div>').appendTo("#div2");
	$('#div2').addClass("animated fadeInDown")
	prev_ans = mydata.result[q].answer;
	questions_asked++;
}
counter()
 $('#timer').html(sec).show();
	function counter(){
		sec--;
		(sec < 10) ? $('#timer').css('color','red'): $('#timer').css('color','');
		if (sec == 0) {
			return gameover();
		}
		$('#timer').html(sec);
		time = setTimeout(counter,1000);
	}
function gameover(){
	clearInterval(time);
	$('#timer').hide();
	$('#div2').html(`you garnered ${correct} points`);
}
