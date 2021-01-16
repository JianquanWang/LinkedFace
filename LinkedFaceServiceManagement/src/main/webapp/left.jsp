<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=8" >
    <title>Left Nav</title>
    <link rel="stylesheet" type="text/css" href="./css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="./css/common.css"/>
    <script type="text/javascript" src="./js/jquery-1.8.3.min.js"></script>
    <!--框架高度设置-->
    <script type="text/javascript">
        $(function(){
            $('.sidenav li').click(function(){
                $(this).siblings('li').removeClass('now');
                $(this).addClass('now');
            });

            $('.erji li').click(function(){
                $(this).siblings('li').removeClass('now_li');
                $(this).addClass('now_li');
            });

            var main_h = $(window).height();
            $('.sidenav').css('height',main_h+'px');
        })
    </script>
    <!--框架高度设置-->
</head>

<body>
<div id="left_ctn">
    <ul class="sidenav">
        <li class="now">
            <div class="nav_m">
                <span><a>Person management</a></span>
                <i>&nbsp;</i>
            </div>
            <ul class="erji">
                <li>
                    <span><a href="person/list.do" target="main">person list</a></span>
                </li>
                <li>
                    <span><a href="face_detect.jsp" target="main">face detect</a></span>
                </li>
            </ul>
        </li>
        <li class="now">
            <div class="nav_m">
                <span><a>User management</a></span>
                <i>&nbsp;</i>
            </div>
            <ul class="erji">
                <li>
                    <span><a href="user/toEdit.do" target="main">Change Password</a></span>
                </li>
            </ul>
        </li>
        <li>
            <div class="nav_m">
                <span><a href="logout.do" target="_top">Logout</a></span>
            </div>
        </li>
    </ul>
</div>
</body>
</html>

