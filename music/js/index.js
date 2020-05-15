var onOff;
var totalTime;
var currentTime;
var music;
var preMusic=NaN;
var playOnOff=false;
$(document).ready(function(){
	setTimeout(Initting(),1000);
});
//初始化加载
function toPlay(){
	if(playOnOff){
		playOnOff=false;
		$("#audio")[0].pause();
		$(".play ion-icon").attr("name","play");
	}else{
		playOnOff=true;
		$("#audio")[0].play();
		$(".play ion-icon").attr("name","pause");
	}
}
function Initting(){
	start();
	onOff=self.setInterval("isFinish();",1000)
}
//开始获取信息
function start() {
	$.ajax({
		url: "https://api.uomg.com/api/rand.music",
		type: "post",
		data: {
			"sort": "热歌榜",
			"format": "json"
		},
		dataType: "json",
		error: function() {
			alert("请求出错")
		},
		success: function(data) {
			//console.log(data.data);
			preMusic=music;
			music=data.data;
			$("#audio").attr("src", music.url);
			$("#audio")[0].play();
			$(".player-bg").css("background-image","url("+music.picurl+")");
			$(".img").css("background-image","url("+music.picurl+")");
			console.log("初始化信息");
			$(".title").text(music.name);
			$(".author").text(music.artistsname);
			setTimeout(function(){
				getTotalTime();
				getCurrentTime();
			},4000);
		}
	});
}
//获取总时间
function getTotalTime() {
	totalTime = $("#audio")[0].duration;
	if (isNaN(totalTime)) {
		getTotalTime();
	} else {
		//console.log("歌曲时间为：" + totalTime + "秒");
		//return totalTime;
	}
}
//获取当前时间
function getCurrentTime() {
	currentTime = $("#audio")[0].currentTime;
	if (isNaN(currentTime)) {
		getTotalTime();
	} else {
		//console.log("歌曲当前时间为：" + currentTime + "秒");
		//return currentTime;
	}
}
//判断是否播放完毕
function isFinish(){
	//console.log("1："+currentTime+"2："+totalTime);
	if(!isNaN(currentTime) && !isNaN(totalTime)){
	getTotalTime();
	getCurrentTime();
	}
	if(!isNaN(currentTime) && !isNaN(totalTime) && totalTime-currentTime<0.5){
		console.log("清空当前歌曲数据");
		totalTime=NaN;
		currentTime=NaN;
		console.log("开始获取新歌曲");
		start();
	}

}

//上一曲
function pre(){
	//console.log(!$.isEmptyObject(preMusic));
	//console.log(preMusic);
	if(!$.isEmptyObject(preMusic)){
		$("#audio")[0].pause();
		currentTime=NaN;
		totalTime=NaN;
		$("#audio").attr("src", preMusic.url);
		$("#audio")[0].play();
		$(".player-bg").css("background-image","url("+preMusic.picurl+")");
		$(".img").css("background-image","url("+preMusic.picurl+")");
		console.log("初始化信息");
		$(".title").text(preMusic.name);
		$(".author").text(preMusic.artistsname);
		preMusic=NaN;
		setTimeout(function(){
			getTotalTime();
			getCurrentTime();
		},4000);
	}else{
		next();
	}
}
//下一曲
function next(){
	$("#audio")[0].pause();
	currentTime=NaN;
	totalTime=NaN;
	start();
}