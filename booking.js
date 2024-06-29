function convertCurrencyINR(value,currency) {
    if(currency=='INR')
    return value*1;
    if(currency=='USD')
    return value*83.12;
    if(currency=='EUR')
    return value*90.9;
}

let place =
{
    'Howrah':[22.5858, 88.3426],
    'Delhi': [28.6415, 77.2190],
    'Mumbai': [18.9670, 72.8194],
    'Chennai': [13.0827, 80.2757],
    'Lucknow': [26.8239, 80.9210],
    'Raipur': [21.2514, 81.6296],
};
// let placeName=['Howrah','Delhi','Mumbai','Chennai','Lucknow','Raipur'];

let val;
let currency='INR';
let flight = 5, train = 1.16;
let star = [ 1000, 3000, 6000, 9000, 12000 ];
let currPoint, destiPoint, transport;
let budget;
let pickPoint, pickupPoint;
let destinationPoint;
let via1=false,via2=false;
function currencyChange(value)
{
    currency=value;
}

function pickup(value)
{
    if(value=='Kalyani')
    {
        value='Howrah';
        via1='Howrah';
    }
    if(value=='Chembur')
    {
        value='Mumbai';
        via1='Mumbai';
    }
    if(value=='Royapuram')
    {
        value='Chennai';
        via1='Chennai';
    }
    if(value=='Alamnagar')
    {
        value='Lucknow';
        via1='Lucknow';
    }
    if(value=='Gondia')
    {
        value='Raipur';
        via1='Raipur';
    }
    pickPoint = place[value];
    pickupPoint=value;
}

function destination(value)
{
    if(value=='Kalyani')
    {
        value='Howrah';
        via2='Howrah';
    }
    if(value=='Chembur')
    {
        value='Mumbai';
        via2='Mumbai';
    }
    if(value=='Royapuram')
    {
        value='Chennai';
        via2='Chennai';
    }
    if(value=='Alamnagar')
    {
        value='Lucknow';
        via2='Lucknow';
    }
    if(value=='Gondia')
    {
        value='Raipur';
        via2='Raipur';
    }
    destiPoint = place[value];
    destinationPoint=value;
    if(value=='Howrah')
    val="hotelCheckout.html";
    if(value=='Mumbai')
    val="hotelCheckout.html";
    if(value=='Chennai')
    val="hotelCheckout.html";
    if(value=='Lucknow')
    val="hotelCheckout.html";
    if(value=='Raipur')
    val="hotelCheckout.html";
}

function irctc()
{
    window.location.href = "https://www.irctc.co.in/nget/train-search";
}

function easytrip()
{
    window.location.href = "https://www.easemytrip.com/flights.html";
}

function hotelgo()
{
    window.location.href = val;
}

function onSubmission()
{
    document.getElementById("output1").style.display="block";
    document.getElementById("output1").style.visibility="visible";
    document.getElementById("output2").style.display="block";
    document.getElementById("output2").style.visibility="visible";
    document.getElementById("output3").style.display="block";
    document.getElementById("output3").style.visibility="visible";

    // navigator.geolocation.getCurrentPosition(getPosition);
    getPosition(pickPoint);
}

function getPosition(position)
{
    // currPoint = [position.coords.latitude,position.coords.longitude];
    currPoint = [position[0], position[1]];
    // console.log(currPoint);
    getExpense();
}

function getExpense()
{
    // optimize();
    try
    {
        document.getElementById("result").innerText = "";
        document.getElementById("mode1").innerText = "";
        document.getElementById("hotel1").innerText = "";
        document.getElementById("reserved1").innerText = "";
        document.getElementById("mode2").innerText = "";
        document.getElementById("hotel2").innerText = "";
        document.getElementById("reserved2").innerText = "";
        if(document.getElementById("mode1").hasChildNodes())
        document.getElementById("mode1").removeChild(document.getElementById("hotel1").children[0]);
        if(document.getElementById("mode2").hasChildNodes())
        document.getElementById("mode2").removeChild(document.getElementById("hotel2").children[0]);
        if(document.getElementById("hotel1").hasChildNodes())
        document.getElementById("hotel1").removeChild(document.getElementById("hotel1").children[0]);
        if(document.getElementById("hotel2").hasChildNodes())
        document.getElementById("hotel2").removeChild(document.getElementById("hotel2").children[0]);
        document.getElementById("mode1b1").style.visibility="hidden";
        document.getElementById("mode1b2").style.visibility="hidden";
        document.getElementById("mode2b1").style.visibility="hidden";
        document.getElementById("mode2b2").style.visibility="hidden";
        document.getElementById("mode1b1").style.display="none";
        document.getElementById("mode1b2").style.display="none";
        document.getElementById("mode2b1").style.display="none";
        document.getElementById("mode2b2").style.display="none";


        let distance = Math.sqrt(Math.abs(currPoint[0]-destiPoint[0])**2+Math.abs(currPoint[1]-destiPoint[1])**2)*111.1;
        console.log(distance);
        budget = document.getElementById("bdgt").value;
        let num = document.getElementById("num").value;
        let days = document.getElementById("dys").value;
        let room = document.getElementById("room").value;

        if(budget == "" || num == "" || days == "" || room=="")
        {
            document.getElementById("result").innerText = "Please enter all details first";
            return;
        }
        let flag=0;
        budget = parseInt(budget);
        budget = parseInt(convertCurrencyINR(budget,currency));
        num = parseInt(num);
        days = parseInt(days);
        room = parseInt(room);


        let flightBudget=budget*35/100;
        let trainBudget=budget*35/100;
        let hotelBudget=budget*45/100;
        let reserved=budget*20/100;


        if(trainBudget<distance*train*2*num)
        {
            document.getElementById("mode1").innerText = "This plan is out of your budget";

            document.getElementById("mode2").innerText = "This plan is out of your budget";
            return;
        }
        else
        {
            let spend=parseInt(distance*train*2*num/100)*100;
            document.getElementById("mode1").innerHTML = "You can travel by train for  <span style='color: #0698f3; font-weight: bold;'>Rs" + spend + "</span>. For booking your journey Click Here";

            
            document.getElementById("mode1b1").style.visibility="visible";
            document.getElementById("mode1b1").style.display="flex";
            trainBudget-=spend;

        }
        if(flightBudget<distance*flight*2*num)
        {
      
            document.getElementById("mode2").innerText = "Budget is too low to accomodate a flight. Sorry!!";
        }
        else
        {
            flag=1;
            let spend=parseInt(distance*flight*2*num/100)*100;
            document.getElementById("mode2").innerHTML = "You can travel by flight for <span style='color: #0698f3; font-weight: bold;'>Rs" + spend + "</span>. For more details click ";

            document.getElementById("mode2b1").style.visibility="visible";
            document.getElementById("mode2b1").style.display="flex";
            flightBudget-=spend;
        }
        if(via1==false && via2==false)
            document.getElementById("modal1").innerText="No via journey found. You can still view the Maps";
        else if(via1!=false && via2!=false)
        document.getElementById("modal1").innerText="The journey will be via "+via1+" and "+via2;
        else if(via1)
        document.getElementById("modal1").innerText="The journey will be via "+via1;
        else if(via2)
        document.getElementById("modal1").innerText="The journey will be via "+via2;


        if(hotelBudget<(days)*star[0]*room)
        {
            document.getElementById("mode1").innerText = "This plan is out of your budget";
            document.getElementById("mode2").innerText = "This plan is out of your budget";
            document.getElementById("mode1b1").style.visibility="hidden";
            document.getElementById("mode1b2").style.visibility="hidden";
            document.getElementById("mode2b1").style.visibility="hidden";
            document.getElementById("mode2b2").style.visibility="hidden";
            document.getElementById("mode1b1").style.display="none";
            document.getElementById("mode1b2").style.display="none";
            document.getElementById("mode2b1").style.display="none";
            document.getElementById("mode2b2").style.display="none";

            return;
        }
        for(let i=5;i>=1;i--)
        if(hotelBudget>=(days)*star[i-1]*room)
        {
            spend=days*star[i-1]*room;
            console.log(spend);
            document.getElementById("hotel1").innerHTML = "You can accommodate " + i + " star hotel rooms for <span style='color: #0698f3; font-weight: bold;'>Rs " + spend + "</span>. For booking your hotel Click Here";



            document.getElementById("mode1b2").style.visibility="visible";
            document.getElementById("mode1b2").style.display="flex";
            if(flag==1)
            {
                document.getElementById("hotel2").innerHTML = "You can accommodate " + i + " star hotel rooms for  <span style='color: #0698f3; font-weight: bold;'>Rs" + spend + "</span>. For booking your hotel Click Here";

                document.getElementById("mode2b2").style.visibility="visible";
                document.getElementById("mode2b2").style.display="flex";
            }
            hotelBudget-=spend;
            break;
        }

        reserved+=hotelBudget;
        document.getElementById("reserved1").innerHTML = "For sight-seeing and other necessities"+" <span style='color: #0698f3; font-weight: bold;'>Rs" + (reserved + trainBudget) + "</span> is reserved";

        if(flag==1)
            document.getElementById("reserved2").innerHTML = "For sight-seeing and other necessities"+" <span style='color: #0698f3; font-weight: bold;'>Rs" + (reserved + flightBudget) + "</span> is reserved";

    }
    catch(error)
    {
        document.getElementById("result").innerText = "Please enter all details first";
        document.getElementById("output1").style.display="none";
        document.getElementById("output2").style.display="none";
        document.getElementById("output3").style.display="none";
    }
}
function getvisible1(){
    document.getElementById("signin").style.visibility='visible';
    document.getElementById("signin").style.display='flex';
    document.getElementById("signup").style.visibility='hidden';
    document.getElementById("signup").style.display='none';
    
}
function getvisible2(){
    document.getElementById("signin").style.visibility='hidden';
    document.getElementById("signin").style.display='none';
    document.getElementById("signup").style.visibility='visible';
    document.getElementById("signup").style.display='flex';
}
function gethidden(){
    document.getElementById("signup").style.visibility='hidden';
    document.getElementById("signin").style.visibility='hidden';
    document.getElementById("signup").style.display='none';
    document.getElementById("signin").style.display='none';
}



let dp;

function recursion(mode,place,factor)
{
    if(place in dp)
    return dp[place];

    if(place==destinationPoint)
    return dp[place]=[0,"",0];

    dp[place]=[-1,"",-1];
    let minValue=-1,minPlace="",minValue2=-1,otherFactor;
    if(factor=='price')
    otherFactor='time';
    if(factor=='time')
    otherFactor='price';
    for(let i=0;i<Object.keys(data[mode][place]).length;i++)
    if(Object.values(data[mode][place])[i].name in dp)
    {
        if(dp[Object.values(data[mode][place])[i].name][0]!=-1)
        if(minValue==-1)
        {
            minValue=Object.values(data[mode][place])[i][factor]+dp[Object.values(data[mode][place])[i].name][0];
            minPlace=Object.values(data[mode][place])[i].name+" "+dp[Object.values(data[mode][place])[i].name][1];
            minValue2=Object.values(data[mode][place])[i][otherFactor]+dp[Object.values(data[mode][place])[i].name][2];
        }
        else
        {
            minValue=Math.min(minValue,Object.values(data[mode][place])[i][factor]+dp[Object.values(data[mode][place])[i].name])[0];
            minPlace=Object.values(data[mode][place])[i].name+" "+dp[Object.values(data[mode][place])[i].name][1];
            minValue2=Object.values(data[mode][place])[i][otherFactor]+dp[Object.values(data[mode][place])[i].name][2];
        }
    }
    else
    {
        let value=recursion(mode,Object.values(data[mode][place])[i].name,factor);
        if(value[0]!=-1)
        if(minValue==-1)
        {
            minValue=Object.values(data[mode][place])[i][factor]+value[0];
            minPlace=Object.values(data[mode][place])[i].name+" "+value[1];
            minValue2=Object.values(data[mode][place])[i][otherFactor]+value[2];
        }
        else
        {
            minValue=Math.min(minValue,Object.values(data[mode][place])[i][factor]+value[0]);
            minPlace=Object.values(data[mode][place])[i].name+" "+value[1];
            minValue2=Object.values(data[mode][place])[i][otherFactor]+value[2];
        }
    }

    return dp[place]=[minValue,minPlace,minValue2];
}

function optimize()
{
 
    document.getElementById("modal").innerText = "";
    document.getElementById("modal1").innerText = "";
    document.getElementById("modal2").innerText = "";
    document.getElementById("modal1").style.visibility = "visible";
    document.getElementById("modal2").style.visibility = "visible";
    document.getElementById("modal1").style.display = "flex";
    document.getElementById("modal2").style.display = "flex";
    let mode='train',place=pickupPoint,factor='time';
    dp=new Array();
    let value=recursion(mode,place,factor);
    let totalTime=value[0];
    let points=value[1].substring(0,value[1].indexOf(" "));
    let expense=value[2];
    console.log(totalTime+","+points+","+expense);
   
     document.getElementById("modal").innerText=totalTime+" hrs is the most optimesd time.";
     if(pickupPoint)
    document.getElementById("modal1").innerText="The journey will be via "+points.substring(0,value[1].indexOf(" "))+" ";
    document.getElementById("modal2").innerText="Total budget of the journey will be "+value[2]+"Rs";
    if(document.getElementById("bdgt").value<expense)
    {
        document.getElementById("modal").innerText = "This plan is out of your budget";
        document.getElementById("modal1").style.visibility = "hidden";
        document.getElementById("modal2").style.visibility = "hidden";
        document.getElementById("modal1").style.display = "none";
        document.getElementById("modal2").style.display = "none";
        return;
    }
}
