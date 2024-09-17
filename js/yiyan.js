document.addEventListener('DOMContentLoaded', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://v1.hitokoto.cn/', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            if (data && data.hitokoto) {
                // 使用 <br> 标签来添加换行
                var hitokotoString = `${data.hitokoto}`;
                if (data.from) {
                    hitokotoString += `<br> - From ${data.from}`;
                }

                // 更新内容并添加样式
                var hitokotoBox = document.querySelector('.hitokoto-box');
                hitokotoBox.innerHTML = hitokotoString;

                // 为文字添加黑色轮廓效果
                hitokotoBox.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
                hitokotoBox.style.color = 'white'; // 确保字体颜色为白色
            } else {
                document.querySelector('.hitokoto-box').innerHTML = '无法获取一言';
            }
        }
    };
    xhr.send();

    // 每隔 10 秒获取一次新的“一言”
    setInterval(function() {
        xhr.open('GET', 'https://v1.hitokoto.cn/', true);
        xhr.send();
    }, 10000);
});
