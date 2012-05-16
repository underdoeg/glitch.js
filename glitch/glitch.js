var glitchAmount=0;

function randomInt(min, max){
    return Math.floor(Math.random()*(max+min)+min);
}

function makeGlitchLines(amount){
    if(glitchAmount>40)
        return;
    var content=$("#glitchContainer").contents().find("#glitchContent").html();
    if(content==null){
        return;
    }
    var y=randomInt(0,$(document).height());
    var h=randomInt(2, 30);
    /*if(content.length>255){
        var start=randomInt(0,content.length-900);
        var end=randomInt(start+500,content.length);
        content = content.substring(start,end);
    }*/
    var offY=randomInt(20,$("#glitchContainer").contents().height()-5);
    var offX=randomInt(0,Math.floor($("#glitchContainer").contents().width()*.3));
    var colW=randomInt(h,h+20);
    for(var i=0;i<amount;i++){
        glitchAmount++;
        $("#glitchCanvas").append('<div class="glitch" scrolling="no" style=";overflow:hidden;border:none;margin-top:'+y+'px;height:'+h+'px"><div class="colorSquare" style="background-color:'+randomColor()+';width:'+colW+'px;height:'+colW+'px"></div><div style="margin-top:-'+offY+'px;margin-left:'+offX+'px">'+content+'</div></div>');
    }
}

function startGlitch(){
    $('body').css("overflow","hidden");
    $('body').css("margin","0px");
    $('body').css("padding","0px");
    $('body').html('<iframe id="glitchContainer" src="'+window.location.pathname+'?glitch&showImages" width="100%" height="100%" style="border:none" ></iframe><div id="glitchCanvas">&nbsp;</div>');
    var frm = document.getElementById("glitchContainer").contentWindow;
    $('iframe#glitchContainer').load(function() 
    {
        //makeGlitchLines(4);
    });
    frm.onscroll = function(){
        if(Math.random()>.9)
            makeGlitchLines(1);
    }
    startTimer();
}

function startTimer(){
    $.timer(randomInt(20,100), function (timer) {
        timer.stop();
        if($("#glitchContainer").contents().find("#glitchContent").html()!=null){
            $('.glitch').each(function(index) {
                if(Math.random()>.9){
                    $(this).hide();
                    var offY=randomInt(0,$(document).height());
                    var mx=Math.floor($("#glitchContainer").contents().width()*.5);
                    var offX=randomInt(0,mx);
                    if(Math.random()>.5)
                        offX="-"+offX;
                    $(this).css("marginTop",offY+"px");
                    $(this).css("marginLeft",offX+"px");
		    
		    var cs=$(this).find(".colorSquare");
		    var colW=randomInt(10,500);
		    cs.css("width",colW+"px");
		    cs.css("height",colW+"px");
		    cs.css("marginLeft",randomInt(0,$(document).width())+"px");
                }else{
                    $(this).show();
                }
            });
            if(Math.random()>.9)
                makeGlitchLines(randomInt(0,2));
        }else{
	    glitchAmount-=3;
	}
        startTimer();
    });
}

// changeColour
function randomColor(e){
 	// random values between 0 and 255, these are the 3 colour values
 	var g = Math.floor(Math.random()*230);
        var r=g+Math.floor(Math.random()*20);
 	// change the text colour of this element
 	return getHex(r,g,g);
}

// intToHex()
function intToHex(n){
 	n = n.toString(16);
 	// eg: #0099ff. without this check, it would output #099ff
 	if( n.length < 2)
 		n = "0"+n;
 	return n;
 }

// getHex()
// shorter code for outputing the whole hex value
function getHex(r, g, b){
 	return '#'+intToHex(r)+intToHex(g)+intToHex(b);
}