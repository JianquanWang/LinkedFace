
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta httequiv="X-UA-Compatible" content="IE=8" >
    <title>Change Password</title>
    <link rel="stylesheet" type="text/css" href="../css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../css/common.css"/>
    <link rel="stylesheet" type="text/css" href="../css/thems.css">
    <script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript">
        $(function(){
            //自适应屏幕宽度
            window.onresize=function(){ location=location };

            var main_h = $(window).height();
            $('.hy_list').css('height',main_h-45+'px');

            var main_w = $(window).width();
            $('.xjhy').css('width',main_w-40+'px');

        });
    </script>
</head>

<body onLoad="Resize();">
<div id="right_ctn">
    <div class="right_m">
        <div class="hy_list">
            <div class="box_t">
                <span class="name">Change Password</span>
            </div>
            <div class="space_hx">&nbsp;</div>
            <form action="edit.do" method="post" name="addForm">
                <input name="id" type="hidden" value="${OBJ.id}">
                <input name="username" type="hidden" value="${OBJ.username}">
                <div class="xjhy">
                    <!--高级配置-->
                    <ul class="hypz gjpz clearfix">
                        <li class="clearfix">
                            <span class="title">Password：</span>
                            <div class="li_r">
                                <input class="chang" name="password" type="password">
                                <i>*</i>
                            </div>
                        </li>
                        <li class="clearfix">
                            <span class="title">Password again: </span>
                            <div class="li_r">
                                <input class="chang" name="password2" type="password">
                                <i>*</i>
                            </div>
                        </li>
                        <li class="tj_btn">
                            <a href="javascript:history.go(-1);" class="back">back</a>
                            <a href="javascript:addForm.submit();">save</a>
                        </li>
                    </ul>
                    <!--高级配置-->
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
