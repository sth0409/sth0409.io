var gitbook=window.gitbook;gitbook.events.on("page.change",function(){var o=['<div class="back-to-top"><i class="fa fa-arrow-up"></i></div>'].join("");$(".book").append(o),$(".back-to-top").hide(),$(".book-body,.body-inner").on("scroll",function(){100<$(this).scrollTop()?$(".back-to-top").fadeIn():$(".back-to-top").fadeOut()}),$(".back-to-top").click(function(){return $(".book-body,.body-inner").animate({scrollTop:0},800),!1})});