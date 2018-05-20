//引入mockjs
const Mock = require('mockjs')
const Random = Mock.Random;
/* 产生随机整数 */
function number(min,max){
    var c = max-min+1;
    return Math.floor(Math.random()*c+min)
};

var template={
    'people|3':[{
        'name':'@name',
        'age':'@integer(10,80)'
    }]
}
//使用mockjs模拟数据
Mock.mock('/api/data',template)

//首页轮播banner数据接口
const homeBanner = function() {
    let imgUrl = [];
    for(let i = 0; i < 5; i++){
        let data = {
            url: Random.dataImage('650x300', '首页banner'),
        }
        imgUrl.push(data);
    };
    return {
        imgUrl
    }    
};
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/homebanner',homeBanner);

//新游推荐数据接口
const newGameData = function() {
    let data = [];
    for (let i = 0; i < 4; i++) {
        let datalist = {
            // gameName:Random.cname(), /* 生成中文姓名 */
            gameName: Random.cword(4,8),
            intr: Random.csentence(10,20), /* 生成一段句子 */
            number: Random.integer(3,5), /* 生成整数 */
            imgUrl: Random.dataImage('70x70', 'icon图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            downloadUrl :'https://b.6kw.com/klrz/10000/0/e7f372ee4dbf1edc936eedfec9d6b8fb.apk',
        }
        data.push(datalist)
    }
    return {
        data:data
    }
};
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/newgame',newGameData);

// 新游上线接口
let newGame = function() {
    let alldata = [];
    let data = []; 
    let date = {
        month:Random.datetime('MM'),
        day:Random.datetime('HH'),
    };
    for (let i = 0; i < number(1,3); i++) {
        let datalist = {
            gameName: Random.cword(4,8),  /* 游戏名 */
            intr: Random.csentence(10,20), /* 游戏介绍 */
            number: Random.integer(3,5), /* 星级 最低3星最高5星*/
            imgUrl: Random.dataImage('70x70', 'icon图片'), /* 游戏icon */
            downloadUrl :'https://b.6kw.com/klrz/10000/0/e7f372ee4dbf1edc936eedfec9d6b8fb.apk', /* 下载地址 */
        }
        data.push(datalist)
    };
    alldata.push(data);
    alldata.push(date);
    return {
        data:alldata
    }
};
let newGameOnline = [];
    for(let i = 0 ; i< 3; i++){
        newGameOnline.push(newGame)
    }
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/test',newGameOnline);