let city = "";
let count = "";
let weather = "";
let weathericon = "";
let temp="";
let temp_max = "";
let temp_min = "";
let feels_like ="";
let obj = "";
let hantei_1 = "";
let hantei_2 = "";
let time = "";
var dateTime = "";
var normaldate ="";
var normaltime ="";
var one ="";
var two ="";
var three ="";
var pop = "";
var precipitation ="";
var days = "";
var table1 ="";
var table2 ="";
var table3 ="";
var table4 ="";
var table5 ="";

//数値
var listnum1 = 0;
var listnum2 = 0;
var listnum3 = 0;
var lastday =0;

//週間データ変数
var normaltimearray=  [];
var timearray = [];
var dayarray = [];
var temparray = [];
var feels_likes_array = [];
var humidityarray =[];
var poparray =[];
var weatherarray =[];
var weathericonarray =[];
var precipitationarray =[];

var one_day_weather_array=[];

var date = [];
var now = new Date();
var nowmonth = now.getMonth() + 1;
var nowday = now.getDate();
var nowhour = now.getHours();
var nowminutes = now.getMinutes();
var nowseconds = now.getSeconds();
var nextdate = "";
var weatherDate = "";
var weatherMonth = "";
var weather_day ="";
var hantei_loop_date=""
var normaldate ="";
var normalday="";


    function transmission(){

            //現在の天気を取得する場所の名前
            let targetCityName = "";
            let appId = "d7928887ff373ff707cc984cd9c6367f";

            //入力したデータから都市名を取得する
            targetCityName = document.getElementById("cities").value;
            console.log(targetCityName);   

            const requestUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&lang=ja&units=metric&q=" + targetCityName + ",jp;";
            
            //Ajax通信用のオブジェクトを作成
            let xhr =new XMLHttpRequest();
    
            //通信方式とURLを設定
            xhr.open("GET",requestUrl);
    
            //通信を実行する
            xhr.send();
    
        //通信ステータスが変わったら実行される関数
            xhr.onreadystatechange = function(){
                //通信が完了
                if(xhr.readyState == 4){
                    ShowTodaysWeather(xhr.responseText);
                }
            }

        }

        //16days
    function day_5(){
        //現在の天気を取得する場所の名前
        let targetCityName = "";
        let appId = "d7928887ff373ff707cc984cd9c6367f";

        //入力したデータから都市名を取得する
        cityname = document.getElementById("cities_5").innerText;
        targetCityName = document.getElementById("cities_5").value;
        console.log(cityname);
        console.log(targetCityName);   

        if(targetCityName == "sapporo"){
            lat = 43.0642;
            lon = 141.3469;
        }else if(targetCityName == "akita"){
            lat = "";
            lon = "";
        }else if(targetCityName == "morioka"){
            lat = "";
            lon = "";
        }else if(targetCityName == "sendai"){
            lat = "";
            lon = "";
        }else if(targetCityName == "yamagata"){
            lat = "";
            lon = "";
        }else if(targetCityName == "fukushima"){
            lat = "";
            lon = "";
        }else if(targetCityName == "tokyo"){
            lat = 35.6895;
            lon =139.6917;
        }else if(targetCityName == "saitama"){
            lat = "";
            lon = "";
        }else if(targetCityName == "yokohama"){
            lat = "";
            lon = "";
        }else if(targetCityName == "chiba"){
            lat = "";
            lon = "";
        }else if(targetCityName == "maebashi"){
            lat = "";
            lon = "";
        }else if(targetCityName == "mito"){
            lat = "";
            lon = "";
        }else if(targetCityName == "utsunomiya"){
            lat = "";
            lon = "";
        }else if(targetCityName == "london"){
            lat = "51.5085";
            lon = "-0.1257";
                
        }else{
            return;
        } 
        
        const requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&mode=json&units=metric&lang=ja&appid="+appId;
        //Ajax通信用のオブジェクトを作成
        let xhr =new XMLHttpRequest();

        //通信方式とURLを設定
        xhr.open("GET",requestUrl);

        //通信を実行する
        xhr.send();

    //通信ステータスが変わったら実行される関数
        xhr.onreadystatechange = function(){
            //通信が完了
            if(xhr.readyState == 4){
                Show5DaysWeather(xhr.responseText);
            }
        }
    }

    function nowtime(){
        now.setMonth(now.getMonth());
        now.setDate(now.getDate());
        console.log(now);
        console.log(nowmonth+"/"+nowday);
        nowdate = nowmonth+"/"+nowday;

        days = nowmonth +"月 "+ nowday +"日";
        
        document.getElementById("nowdate").innerHTML = nowdate+"<br>"+days;

        nextdate = now.getDate()+1;
        nextdate = nowmonth +"/"+ nextdate;
        console.log(nextdate);    
    }


    function Show5DaysWeather(response){
        obj = JSON.parse(response);
        cities = obj.city.name;

        console.log(cities)

        document.getElementById("city_name").innerText = cities;
        document.title = cities+"の天気";''
        //現在の日付
        nowtime();

        //data作成
        create_card();
    }

    function select_data(){

        count = obj.cnt;
        console.log(count)
        for (let i = 1; i <= count; i++){
            console.log("count:"+i);
       

        //データ取得
        time = obj.list[listnum1].dt
        temp = obj.list[listnum1].main.temp;
        feels_like = obj.list[listnum1].main.feels_like;
        humidity = obj.list[listnum1].main.humidity;
        pop = obj.list[listnum1].pop;
        weather = obj.list[listnum1].weather[0].description;
        weathericon = obj.list[listnum1].weather[0].icon;
        var rain_num = "3h";
        precipitation = obj.list[listnum1].rain;

        if(precipitation === undefined){
            precipitation = 0;
        }else{
            
        console.log(Object.values(precipitation))
        precipitation =Object.values(precipitation)[0];
        console.log(precipitation);
        }

        //小数点切り捨て
        feels_like = parseInt(feels_like,10);
        temp = parseInt(temp, 10);
        pop = pop*100;
        pop = parseInt(pop ,10);

        //Unix時間を変換
        transtime(time);

        //日付format変更
        format_time();
        console.log(normalday);
        console.log(normaldate);

        //天候データ配列作成
        create_array();
        listnum1++;
        }
    }

    function format_time(time){
        //日付
        normalday = dateTime.getMonth()+1 +"月 "+dateTime.getDate()+"日";
        timearray[listnum1] = normalday;
        //時刻
        normaltime = dateTime.getHours()+"時";
        normaltimearray[listnum1] = normaltime;

        //確認
        console.log(normalday + normaltime);

        normaldate = normalday +"|"+ normaltime;
    }

    function create_array(){
        dayarray[listnum1] = normaldate;
        temparray[listnum1] = temp;
        feels_likes_array[listnum1] = feels_like;
        humidityarray[listnum1] = humidity;
        poparray[listnum1] = pop;
        weatherarray[listnum1] = weather;
        weathericonarray[listnum1] = weathericon;
        precipitationarray[listnum1] = precipitation;
        one_day_weather_array = [dayarray,temparray,feels_likes_array,humidityarray,poparray,precipitationarray,weatherarray];
    }

    function create_card_data(){

    };

    function create_card(response){
        
        //Jsonからデータを抜粋するし配列に治す処理
        select_data()
        
        
        //最終日作成
        lastday = nowday;
        lastday =  parseInt(lastday)+5;
        lastday = lastday.toString();
        lastday = nowmonth +"月 "+ lastday +"日";

        count = obj.cnt;
        for (let i = 1; i <= count; i++){

        console.log("count:"+i);

        //表に関して
            listnum2 = parseInt(listnum2);

            //表の調整
if(timearray[listnum2] == days || lastday == timearray[listnum2]  || normaltimearray[listnum2] == "0時" || normaltimearray[listnum2] == "3時" || normaltimearray[listnum2] == "6時" || normaltimearray[listnum2] == "21時"){
}else{
    listnum3 = listnum2;
    for (let i = 1; i <= 4; i++){
        console.log("i:"+i)
        table1 =
            `
            <div class = "col">
                <div id="card`+listnum3+`" class="card" style="width: 18rem;">
                    <img id="weather_icon`+listnum3+`" src="https://openweathermap.org/img/wn/`+weathericonarray[listnum3]+`@4x.png" class="card-img-top" alt="`+weatherarray[listnum3]+`">

                    <ul id="data`+listnum3+`" class="list-group list-group-flush">
                    <li id="day`+listnum3+`" class="list-group-item">`+dayarray[listnum3]+`</li>
                    <li id="nowtemp`+listnum3+`" class="list-group-item">`+temparray[listnum3]+`℃</li>
                    <li id="nowfeellikes`+listnum3+`" class="list-group-item">`+feels_likes_array[listnum3]+`℃</li>
                    <li id="nowhumidityarray`+listnum3+`" class="list-group-item">`+humidityarray[listnum3]+`%</li>
                    <li id="rainpop`+listnum3+`" class="list-group-item">`+poparray[listnum3]+`%</li>
                    <li id="precipitation`+listnum3+`" class="list-group-item">`+precipitationarray[listnum3]+`mm</li>
                    <li id="weather`+listnum3+`" class="list-group-item">`+weatherarray[listnum3]+`</li>
                    </ul>
                </div>
            </div>
            `;

            if(i == 4){
                console.log('a piece of cake!')
                    table4=
                    `<div id="`+listnum3+`" class="row">`+
                        table3
                    +`</div>`
                    table3 = "";
                document.getElementById("content2").innerHTML = table4
            }else{
                table2 = document.getElementById("table5").innerHTML;
                table3 = table2 + table1
                document.getElementById("table5").innerHTML = table3;
            }
        listnum3++
    }

            // table1 =
            // `
            // <div class = "col">
            //     <div id="card`+listnum2+`" class="card" style="width: 18rem;">
            //         <img id="weather_icon`+listnum2+`" src="https://openweathermap.org/img/wn/`+weathericonarray[listnum2]+`@4x.png" class="card-img-top" alt="`+weatherarray[listnum2]+`">

            //         <ul id="data`+listnum2+`" class="list-group list-group-flush">
            //         <li id="day`+listnum2+`" class="list-group-item">`+dayarray[listnum2]+`</li>
            //         <li id="nowtemp`+listnum2+`" class="list-group-item">`+temparray[listnum2]+`℃</li>
            //         <li id="nowfeellikes`+listnum2+`" class="list-group-item">`+feels_likes_array[listnum2]+`℃</li>
            //         <li id="nowhumidityarray`+listnum2+`" class="list-group-item">`+humidityarray[listnum2]+`%</li>
            //         <li id="rainpop`+listnum2+`" class="list-group-item">`+poparray[listnum2]+`%</li>
            //         <li id="precipitation`+listnum2+`" class="list-group-item">`+precipitationarray[listnum2]+`mm</li>
            //         <li id="weather`+listnum2+`" class="list-group-item">`+weatherarray[listnum2]+`</li>
            //         </ul>
            //     </div>
            // </div>
            // `;

            
            // table2 = document.getElementById("content2").innerHTML;
            
            // document.getElementById("content2").innerHTML = table3;

                    // //体感気温       
                    // if(temp <= -5){
                    //     //最小値＜最大値
                    // document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(0,32,128)";
                    // document.getElementById("nowtemp"+listnum).style.color = "white";
        
                    // }else if(-4 <= temp && temp <= 0){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(0,65,255)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "white";
                        
                        
                    // }else if(1 <= temp && temp <= 5){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(0,150,255)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "white";
        
                    // }else if(6 <= temp && temp <= 10){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(185,235,255)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "black";
        
                    // }else if(11 <= temp && temp <= 15){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(255,255,240)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "black";
        
                    // }else if(16 <= temp && temp <= 20){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(255,255,150)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "black";
        
                    // }else if(21 <= temp && temp <= 25){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(250,240,0)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "black";
        
                    // }else if(26 <= temp && temp <= 30){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(255,153,0)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "black";
        
                    // }else if(31 <= temp && temp <= 35){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(255,40,0)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "black";
                
                    // }else if(36 <= temp){
                    //     document.getElementById("nowtemp"+listnum).style.backgroundColor = "rgb(180,0,104)";
                    //     document.getElementById("nowtemp"+listnum).style.color = "white";
                
                    // }else{
                    // }
                    // //~35
                    // //35~30
                    // //25~20
                    // //20~15
                    // //15~10
                    // //10~5
                    // //5~0
                    // //0~-5
                    // //-5~


                    // //体感気温       
                    // if(feels_like <= -5){
                    //     //最小値＜最大値
                    //     document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(0,32,128)";
                    //     document.getElementById("nowfeellikes"+listnum).style.color = "white";
            
                    //     }else if(-4 <= feels_like && feels_like <= 0){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(0,65,255)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "white";
                            
                            
                    //     }else if(1 <= feels_like && feels_like <= 5){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(0,150,255)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "white";
            
                    //     }else if(6 <= feels_like && feels_like <= 10){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(185,235,255)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "black";
            
                    //     }else if(11 <= feels_like && feels_like <= 15){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(255,255,240)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "black";
            
                    //     }else if(16 <= feels_like && feels_like <= 20){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(255,255,150)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "black";
            
                    //     }else if(21 <= feels_like && feels_like <= 25){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(250,240,0)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "black";
            
                    //     }else if(26 <= feels_like && feels_like <= 30){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(255,153,0)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "black";
            
                    //     }else if(31 <= feels_like && feels_like <= 35){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(255,40,0)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "black";
                    
                    //     }else if(36 <= feels_like){
                    //         document.getElementById("nowfeellikes"+listnum).style.backgroundColor = "rgb(180,0,104)";
                    //         document.getElementById("nowfeellikes"+listnum).style.color = "white";
                    
                    //     }else{
                    //     }
            }

            listnum2++
         }
    }


    function transtime(unixtime) {
        // Dateがミリ秒なので1000倍が必要
        dateTime = new Date(unixtime * 1000);
        normaldate = dateTime.toLocaleDateString('ja-JP').slice(5) +" "+ dateTime.toLocaleTimeString('ja-JP');
        weatherDate = dateTime.getDate();
        weatherMonth = dateTime.getMonth();
        weather_day = weatherMonth+1 +"/"+ weatherDate;
        console.log(weather_day);
    }


    /**
     * 今日の天気を表示する
     */
    function ShowTodaysWeather(response){

        obj = JSON.parse(response);

        weather = obj.weather[0].description;
        city = obj.name;
        temp = obj.main.temp;
        temp_max = obj.main.temp_max
        temp_min = obj.main.temp_min
        feels_like = obj.main.feels_like
        humidity = obj.main.humidity        
        
        //小数点切り捨て
        temp = parseInt(temp, 10);
        temp_max = parseInt(temp_max, 10);
        temp_min = parseInt(temp_min, 10);
        feels_like = parseInt(feels_like,10);

        //データをHTML上に表示
        document.getElementById("city").innerText = city;
        document.getElementById("weather").innerText = weather;
        document.getElementById("temp").innerText = temp;
        document.getElementById("temp_max").innerText = temp_max;
        document.getElementById("temp_min").innerText = temp_min;
        document.getElementById("feels_like").innerText = feels_like;
        document.getElementById("humidity").innerText = humidity;

        enterSchedule_temp();
        enterSchedule_weather();
        hatei();
    }

    
function enterSchedule_temp(){
    document.title = city + "の天気";

    console.log(temp_max);
    console.log(temp_min);
    console.log(feels_like);
    console.log(humidity);

    var result = document.getElementById("result");
    result.style.visibility = "visible";

    if(25 < feels_like && feels_like < 28){
        document.getElementById("hantei_temp").innerText = "熱中症レベル：警戒" + " \n《運動や激しい作業をする際は定期的に充分に休息を取り入れる》";
        hantei_1 = "2";
    }else if(28 < feels_like && feels_like < 31){
        document.getElementById("hantei_temp").innerText = "熱中症レベル：厳重警戒" + " \n《外出時は炎天下を避け、室内では室温の上昇に注意する。》";
        hantei_1 = "3";

    }else if(31 < feels_like){
        document.getElementById("hantei_temp").innerText = "熱中症レベル：危険" + " \n《高齢者においては安静状態でも発生する危険性が大きい。\n 外出はなるべく避け、涼しい室内に移動する。》";
        hantei_1 = "4";

    }else{
        document.getElementById("hantei_temp").innerText = "問題なし、スケジュールを入れましょう！";
        hantei_1 = "1";
    }
}


function enterSchedule_weather() {

    if (weather.includes("雨")) {
        console.log("雨");
        document.getElementById("hantei_weather").innerText = "雨降ってる";  
        hantei_2 = "3"
        
    }else if(weather.includes("雲")||weather.includes("曇")){
        console.log("雲");
        document.getElementById("hantei_weather").innerText = "曇りかも";  
        hantei_2 = "2"

    }else if(weather.includes("雪")){
        console.log("雪");
        document.getElementById("hantei_weather").innerText = "雪降っとる";  
        hantei_2 = "4"
        
    }else if(weather.includes("晴")){
        console.log("晴");
        document.getElementById("hantei_weather").innerText = "今日はいい天気";  
        hantei_2 = "1"
        
    }else{
        console.log("その他");
        hantei_2 = "0"
    }
  }

function hatei(){ 
    let hantei_3 = parseInt(hantei_1) + parseInt(hantei_2);
    console.log(hantei_3);
    if(hantei_3 == 1){
    document.getElementById("hantei_result").innerText = "不明";  

    }else if(hantei_3 == 2){
        document.getElementById("hantei_result").innerText = "問題なし";  

    }else if(hantei_3 == 3){
        document.getElementById("hantei_result").innerText = "特に急用がない場合は避けること";  

    }else if(hantei_3 == 4){
        document.getElementById("hantei_result").innerText = "避けたほうがいい";  

    }else if(hantei_3 == 5){
        document.getElementById("hantei_result").innerText = "危険かも";  

    }else if(hantei_3 == 6){
        document.getElementById("hantei_result").innerText = "家から出るな！";  

    }else if(hantei_3 == 7){
        document.getElementById("hantei_result").innerText = "超常現象レベル";  

    }else if(hantei_3 == 8){
        document.getElementById("hantei_result").innerText = "物理世界が崩壊してる";  

    }
}






function reload(){
    document.location.reload()
}

//朝　6時
//昼　12時
//夜　18時

//hantei_loop_date == normaldate
function hantei_result2(){
    for(let i = 1; i <= 39; i++){
        hantei_loop_date++
    }
}