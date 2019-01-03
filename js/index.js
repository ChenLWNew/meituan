window.onload=function(){
/*头部导航栏开始*/
    /*手机美团手机版 下拉菜单的展示*/
    var togglelis=document.getElementsByClassName('toggleli');
    for(i=0;i<togglelis.length;i++){
        togglelis[i].onmouseenter=function(){
            this.classList.add('on')
        }
        togglelis[i].onmouseleave=function(){
            this.classList.remove('on')
        }
    }
    /*产品轮播图开始*/
    var $container=$("#nav-carousel");
    var $list=$("#list");
    var $points=$("#pointDiv>span");
    var $prev=$("#prev");
    var $next=$("#next");
    var index=0;  //当前下标
/*1、点击向右(左)的图标，平滑切换到下(上)一页*/
    $next.click(function(){
        //平滑翻到下一页
        /*技巧：由于翻上页和翻下页的代码量很大，且功能类似，定义成一个函数，由于方向不同就用true/false来表示方向*/
        nextPage(true);
    });
    $prev.click(function(){
        //平滑翻到上一页
        nextPage(false);
    });
/*3、每隔4s自动滑动到下一页*/
    var intervalId=setInterval(function(){
        nextPage(true);
    },4000);
/*4、当鼠标进入图片区域时，自动切换停止，当鼠标离开后，又开始自动切换*/
    $container.hover(function(){
        //移入时清除自动切换的定时器
        clearInterval(intervalId)
    },function(){
        //移出时重新启动定时器
        intervalId=setInterval(function(){
            nextPage(true);
        },4000);
    });
/*6、点击圆点图标切换到对应的页*/
    $points.click(function(){
        //目标页的下标
        var targetIndex=$(this).index();
        //只有当点击的不是当前页的原点时才翻页到执行下标的页
        if(targetIndex != index){
            nextPage(targetIndex);
        }
    });

    /*
    定义翻页函数：
    param:next
    true:下一页
    false:上一页
    数值：执行下标页
    */
    /*定义翻页函数时需要的变量*/
    var PAGE_WIDTH=550; //一页的宽度
    var TIME=400; //翻一页的持续时间
    var ITEM_TIME=19; //单元移动的间隔时间
    var imgCount=$points.length;
    var moving=false;  //标识是否正在翻页(默认没有)
    function nextPage(next){
        /*
        var currentLeft=$list.position().left;
        var offset = next ? -PAGE_WIDTH:PAGE_WIDTH;
        $list.css("left",currentLeft+offset);
        这样我们实现了瞬间滑动,实现平滑翻页的话就需要将offset一张图片的宽度分解成许多步：
        总的偏移量：offset
        总的时间：TIME=400
        单元移动的间隔时间：ITEM_TIME=20;
        单元移动的偏移量：itemOffset=offset/(TIME/ITEM_TIME);
        启动循环定时器不断更新$list的left
        达到目标处停止定时器
        */
        //如果正在翻页，直接结束
        if(moving){ //已经正在翻页中
            return
        }
        moving=true; //标识正在翻页
        //总的偏移量：offset
        var offset=0;
        //计算offset
        if(typeof next === "boolean"){
            offset = next ? -PAGE_WIDTH:PAGE_WIDTH;
        }else{
            offset=-(next-index)*PAGE_WIDTH;
        }
        //计算单元移动的偏移量：itemOffset
        var itemOffset=offset/(TIME/ITEM_TIME);
        //得到当前的left
        var currentLeft=parseInt($list.position().left);
        //计算出目标处的left
        var targetLeft=currentLeft+offset;
        //启动循环定时器不断更新$list的left
        var intervalId=setInterval(function(){
            //计算出最新的currentLeft
            currentLeft += itemOffset;
            if((next&&currentLeft <= targetLeft)||(!next&&currentLeft >= targetLeft)){ //到达目标位置
                //设置currentLeft为targetLeft
                currentLeft=targetLeft;
            }
            if(currentLeft === targetLeft){
                //清除定时器
                clearInterval(intervalId);
                //标识翻页结束
                moving=false;
                /*
                2、无限循环切换：
                    首先要改HTML结构布局：第一页的上一页为最后页，最后一页的下一页是第一页
                    然后在CSS样式中将list宽度调整为7*600=4200px,且默认显示第一张图片，所以left:-600px
                如果到达了最右边的图片(1.jpg),跳转到最左边的第2张(1.jpg)
                如果到达了最左边的图片(5.jpg),跳转到最右边的倒数第2张(5.jpg)
                */
                //alert(currentLeft)
                if(currentLeft === -(imgCount+1)*PAGE_WIDTH){
                    //如果到达了最右边的图片(1.jpg),跳转到最左边的第2张(1.jpg)
                    currentLeft=-PAGE_WIDTH;
                }else if(currentLeft === 0){
                    //如果到达了最左边的图片(5.jpg),跳转到最右边的倒数第2张(5.jpg)
                    currentLeft=-imgCount*PAGE_WIDTH;
                }
            }
            //设置#list的left
            $list.css("left",currentLeft);
        },ITEM_TIME);
        /*5、切换页面时，下面的圆点也同步更新*/
        updatePoints(next);
    }
    /*定义更新原点的函数*/
    function updatePoints(next) {
        //计算出目标原点的下标targetIndex
        var targetIndex=0;
        if(typeof next==="boolean"){
            if (next) {
                targetIndex = index + 1;
                if (targetIndex === imgCount) {  //此时看到的是右边最后一个1.jpg
                    targetIndex = 0;
                }
            } else {
                targetIndex = index - 1;
                if (targetIndex === -1) {  //此时看到的是左边最后一个5.jpg
                    targetIndex = imgCount - 1;
                }
            }
        }else{
            targetIndex=next;
        }
        //将当前index的<span>的class="on"移除
        $points.eq(index).removeClass("active")
        //给目标原点添加class="on"
        $points.eq(targetIndex).addClass("active")
        //将index更新为targetIndex
        index=targetIndex;
    }
    /*产品轮播图结束*/
/*头部导航栏结束*/

/*中间产品图文展示开始*/
    /*有格调开始*/
        /*三角形边的初始位置*/
    var $triout=$('.quality .ico-triout')
    var width=$('.quality .pro-title ul li')[0].clientWidth;
    var left=width/2-6;
    $triout.css("left",left);
        /*鼠标移入的效果*/
    $lis=$('.quality .pro-title ul li')
    $lis.mouseenter(function(){
        /*1、三角形边的移动*/
        $preLisAll=$(this).prevAll('li')
        width=0;
        for(var i=0;i<$preLisAll.length;i++){
            width += $preLisAll[i].clientWidth;
        }
        width += (this.clientWidth/2)
        left=width - 6
        $triout.css("left",left);
        /*2、产品的切换展示*/
        var $pro_contents=$('.quality .pro-content')
        $pro_contents.css('display','none')
        var index=$(this).index()-1
        $pro_contents[index].style.display='block'
    })
    /*有格调结束*/

    /*猫眼电影开始*/
        /*三角形边的初始位置*/
    var $movie_triout=$('.movie .ico-triout')
    var movie_width=$('.movie ul li')[0].clientWidth;
    var movie_left=movie_width/2-6;
    $movie_triout.css("left",movie_left);
        /*鼠标移入的效果*/
    var $movie_lis=$('.movie .pro-title ul li')
    $movie_lis.mouseenter(function(){
        /*1、三角形边的移动*/
        $preLisAll=$(this).prevAll('li')
        movie_width=0;
        for(var i=0;i<$preLisAll.length;i++){
            movie_width += $preLisAll[i].clientWidth;
        }
        movie_width += (this.clientWidth/2)
        movie_left=movie_width - 6
        $movie_triout.css("left",movie_left);
        /*2、产品的切换展示*/
        var $pro_contents=$('.movie .pro-content')
        $pro_contents.css('display','none')
        var index=$(this).index()-1
        $pro_contents[index].style.display='block'
        /*2、展示对应的内容*/
        var $pro_contents=$('.movie .pro-content')
        $pro_contents.css('display','none')
        var index=$(this).index()-1
        $pro_contents[index].style.display='block'
    })
    /*猫眼电影结束*/
/*中间产品图文展示结束*/

/*底部链接导航开始*/
    var currentIndex=0
    var $linkcontents=$('.linkcontent')
    $('#linknav').delegate('.navatitle','click',function(){
        $linkcontents[currentIndex].classList.remove('on')
        var index=$(this).parent().index();
        $linkcontents[index].classList.add('on')
        currentIndex=index
    })
    /*底部链接导航结束*/
}
