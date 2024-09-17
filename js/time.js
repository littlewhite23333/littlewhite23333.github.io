// 获取节日信息的函数（使用 Calendarific API）
function getCalendarificInfo(year, month, day, callback) {
    var apiKey = 'RZCWonWC2COu5oUhKv3yJDIu4pfKiMHZ'; // 在这里替换为你的 Calendarific API 密钥
    var country = 'CN'; // 假设查询中国的节日，可以根据需要更改国家代码
    var url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}&month=${month}&day=${day}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response && data.response.holidays && data.response.holidays.length > 0) {
                // 解析节日信息
                var holidayData = data.response.holidays[0];
                var holidayName = holidayData.name || ''; // 获取节日名称
                var holidayType = holidayData.type && holidayData.type.length > 0 ? holidayData.type[0] : ''; // 获取节日类型

                callback(holidayName, holidayType); // 传递节日名称和类型回调
            } else {
                console.error('No holiday data available');
                callback('', ''); // 如果没有节日信息，返回空字符串
            }
        })
        .catch(error => {
            console.error('Error fetching holiday data:', error);
            callback('', ''); // 在出错的情况下返回空字符串
        });
}

// 页面加载时请求节日信息的变量
var holidayInfo = {name: '', type: ''}; // 缓存节日信息

// 页面加载时请求一次节日信息
function fetchHolidayInfo() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    getCalendarificInfo(year, month, day, function(holiday, type) {
        holidayInfo.name = holiday;
        holidayInfo.type = type;
    });
}

// 获取当前时间并显示的函数，每秒刷新
function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // 构建时间字符串
    var timeString = `Now it is [${year}-${(month < 10 ? '0' + month : month)}-${(day < 10 ? '0' + day : day)} ${hour}:${minute}:${seconds}]`;

    // 构建节日信息字符串
    var holidayString = '';
    if (holidayInfo.name) {
        holidayString = `Holiday information: [${holidayInfo.name}]`;
        if (holidayInfo.type) {
            holidayString += ` (${holidayInfo.type})`;
        }
    } else {
        holidayString = 'Holiday information: [No holiday today]';
    }

    // 更新页面显示内容，并设置文字样式
    var boxElement = document.querySelector('.box');
    boxElement.innerHTML = timeString + '<br>' + holidayString;

    // 添加黑色轮廓效果
    boxElement.style.textShadow = '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000';
    boxElement.style.color = 'white'; // 确保字体颜色是白色
}

// 页面加载时请求节日信息
fetchHolidayInfo();

// 每秒刷新一次时间，但只请求一次节日信息
setInterval(getTime, 1000);
