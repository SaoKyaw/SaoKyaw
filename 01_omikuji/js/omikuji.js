"use strict";

let n = ""; //ランダムにおみくじの内容を決定する変数
let nBefore = ""; //前回の変数nの値

window.addEventListener("DOMContentLoaded",
    function(){
        // ヘッダーのテキストエフェクト 
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000,   // テキストが置き換えられるまでの表示時間
            initialDelay: 2000,     // 遅延時間
            autoStart: true,        // アニメーションを自動的にスタート 
            in: {                   // フェードインのエフェクトの詳細設定
                effect: "fadeInLeftBig",// エフェクトの名前(animate.css参照)
                delayScale: 1.5,        // 遅延時間の指数
                delay: 50,              // 文字ごとの遅延時間
                sync: false,            // trueはアニメーションをすべての文字に同時に適用 
                shuffle: true           // trueは文字を順番にではなく、ランダムに
} });
// おみくじボタン(id="btn1") ボヤァと表示させる 
$(function(){
    ScrollReveal().reveal("#btn1", { duration: 9000 }); 
    });
    setTimeout(
        function(){
            let popMessage ="いらっしゃい！おみくじ引いてって！"
            window.alert(popMessage);
        },
        "5000"
    );
        
    },false
);

let soundEndflag = "0";
const btn1=document.getElementById("btn1");
const omikujiText=document.getElementById("omikujiText");
const omikujiTextImage=document.getElementById("omikujiTextImage");
btn1.addEventListener("click",function(){
        //
        if(soundEndflag === '1'){
            soundControl("end", "");
        };
        btn1.style.transition="1s"; //fukada-add
        let resultText=["10b_omikuji/daikichi.png","10b_omikuji/chukichi.png","10b_omikuji/syokichi.png","10b_omikuji/suekichi.png","10b_omikuji/daikyo.png"];
        // let n=Math.floor(Math.random()*resultText.length);
        while( n == nBefore){
            n=Math.floor(Math.random()*resultText.length);
        };
        nBefore = n;
        let resultMaxSpeed=[10,10,8,5,5];
        let resultMaxSize=[30,30,30,40,30,];
        let resultImage=[
            "image/star.png",
            "image/sakura_hanabira.png",
            "image/water1.png",
            "image/redLeaves4.png",
            "image/snowflakes.png"
        ];
        let resultSound=[
            "sound/omikuji_sound1.mp3",
            "sound/omikuji_sound2.mp3",
            "sound/omikuji_sound3.mp3",
            "sound/omikuji_sound4.mp3",
            "sound/omikuji_sound5.mp3",
        ];
       
        //おみくじの画像対応
        omikujiTextImage.src=resultText[n];
        omikujiTextImage.classList.add("omikujiPapaer")
        //アニメション終了時にclass削除
        omikujiTextImage.addEventListener("enimationend",
            function(){
                omikujiTextImage.classList.remove("omikujiPaper");
            }, false
        );

        //sound control
        w_sound=resultSound[n];
        soundControl("start", w_sound); //サウンド
        soundEndflag="1";

        // snowfall stop
        $(document).snowfall("clear");

        // jQueryのsnowfall 
        $(document).ready(function(){
            $(document).snowfall({
        
                maxSpeed : resultMaxSpeed[n], // 最大速度
                minSpeed : 1, // 最小速度
                maxSize : resultMaxSize[n], // 最大サイズ 
                minSize : 1, // 最小サイズ
                image : resultImage[n]
            }); 
        });
    },false
);
//sound contorl
let w_sound
let music
function soundControl(status, w_sound){
    if(status == "start"){
        music = new Audio(w_sound);
        music.currentTime=0;
        music.play();
    }else if(status === "end"){
        music.pause();
        music.currentTime=0;
    }
}