if (typeof window !== "undefined") {
    ;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var scale = 0;
    var screenW = 750;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    
    function setScale(){
        screenW = win.screen.width;
        scale = screenW / 750;
        if (metaEl) {
            metaEl.setAttribute('content', 'width=750, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        } else {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        }
    }
    
    win.addEventListener('resize', function() {
        if (screenW !== window.screen.width) {
            clearTimeout(tid);
            tid = setTimeout(setScale, 300);
        }
    })
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(setScale, 300);
        }
    }, false);
    
    setScale();
    
    flexible.setScale = setScale;
    })(window, window['FB'] || (window['FB'] = {}));
}