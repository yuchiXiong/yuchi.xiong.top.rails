import hljs from 'highlight.js';

$(document).on("turbolinks:load", () => {

    // * 博客列表页[首页]
    if ($("#blogs__index")) {
        // * 页面底部下拉加载
        $(document).scroll(() => {
            if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                const loadMoreBtn = $('#load_more');
                if ( !loadMoreBtn.data('loading')) {
                    document.querySelector('#load_more').click();
                    loadMoreBtn.data('loading', true);
                }
            }
        })
    }

    // * 博客详情页
    if ($("#blogs__show")) {
        // * 高亮
        const codeBlocks = $('.markdown-article pre>code');
        for (let i = 0; i < codeBlocks.length; i++) {
            hljs.highlightBlock(codeBlocks[i]);
        }

        // * .format_date为后端created_at格式时间，自动将其格式化
        const formatDateContainer = $('.format_date');
        for (let i = 0; i < formatDateContainer.length; i++) {
            const current = $(formatDateContainer[i]);
            const formatDate = dayjs(current.text());
            current.attr({title: formatDate.fromNow()})
                   .text(formatDate.format('YYYY-MM-DD HH:mm:ss'));
        }

        // * 生成目录并添加锚点
        $("article h1," +
            "article h2," +
            "article h3").each(function (i, item) {

            const tag = $(item).get(0).localName;
            $(item).attr("id", "toc" + i);
            $("#toc").append('<a class="toc_' + tag + '" href="#toc' + i + '">' + $(this).text() + '</a></br>');

        });
        for (let i = 1; i < 7; i++) {
            $(`.toc_h${i}`).css("margin-left", (i - 1) * 20);
        }
    }

    // * 添加滚动跳转
    $("#toc > a").each((index, item) => {
        $(item).click(e => {
            e.preventDefault();
            $('html, body').animate({scrollTop: $($(item).attr('href')).offset().top - 80}, 450);
        });
    });

});