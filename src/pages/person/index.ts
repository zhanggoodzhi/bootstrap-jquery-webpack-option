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
});
