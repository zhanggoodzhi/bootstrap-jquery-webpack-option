import * as utils from 'utils';
import './index.less';
const b = 'person页面js';
console.log(b);
utils.a();

$(() => {
    $('[data-toggle="tooltip"]').tooltip();
    $('#myButton').on('click', function () {
        console.log('bug');
        var $btn = $(this).button('loading');
    });
    const a = '加载全局js';
    console.log(a);
    init();
});

function init(){
    $.ajax({
        url:'/shopping/restaurants/search?extras%5B%5D=activity&keyword=3&latitude=31.26327&limit=100&longitude=121.59231&offset=0&terminal=web',
        type:'GET',
        success:()=>{
            console.log('4343');
        }
    });
}
