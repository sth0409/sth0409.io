require(["gitbook","jQuery"],function(e,i){var r="expanded",t=".chapter",a="expChapters",n=function(e){e.hasClass("expanded")?s(e):c(e)},s=function(e){e.length&&e.hasClass(r)&&(e.removeClass(r),l(e))},c=function(e){e.length&&!e.hasClass(r)&&(e.addClass(r),l(e))},l=function(){var s=JSON.parse(localStorage.getItem(a))||{};if(!arguments.length)return i(t).map(function(e,a){if(s[i(this).data("level")])return this});arguments[0].each(function(e,a){var t=i(this).data("level"),n=i(this).hasClass(r);s[t]=n}),localStorage.setItem(a,JSON.stringify(s))};e.events.bind("page.change",function(){!function(){var e=i(".articles").parent(t).children("a");e.append(i('<i class="exc-trigger fa"></i>')),e.on("click",function(e){e.preventDefault(),n(i(e.target).closest(t))}),c(l()),s(i(t));var a=i(t+".active");c(a),c(a.parents(t))}()})});