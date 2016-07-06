(function () {
    loadOptions();
    submitHandler();
})();

function submitHandler() {
    var $submitButton = $('#submitButton');

    $submitButton.on('click', function () {
        console.log('Submit');

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
    });
}

function getPlayClockIndex() {
    var tabs = document.getElementsByName("tab_1");
    for (var t = 0; t < tabs.length; t++) {
        var tbclasses = tabs[t].className.split(" ");
        for (var i = 0; i < tbclasses.length; i++) {
            if (tbclasses[i] === "active") {
                return t;
            }
        }
    }
}

function setPlayClockIndex(pc_mode) {
    var tabs = document.getElementsByName("tab_1");
    for (var t = 0; t < tabs.length; t++) {
        if (pc_mode == t) {
            tabs[t].className = "tab-button active";
        }
        else {
            tabs[t].className = "tab-button"; 
        }
    }
}

function loadOptions() {
    var $toggle_2min = document.getElementById('toggle_2min');
    var $toggle_15s = document.getElementById('toggle_15s');
    var $toggle_10s = document.getElementById('toggle_10s');
    var $toggle_05s = document.getElementById('toggle_05s');

    if (localStorage.toggle_2min) {
        $toggle_2min.checked = localStorage.toggle_2min === 'true';
        $toggle_15s.checked = localStorage.toggle_15s === 'true';
        $toggle_10s.checked = localStorage.toggle_10s === 'true';
        $toggle_05s.checked = localStorage.toggle_05s === 'true';
        setPlayClockIndex(localStorage.pc_mode);
    }
    else {
        setPlayClockIndex(0);
    }
}

function getAndStoreConfigData() {
    var $toggle_2min = document.getElementById('toggle_2min');
    var $toggle_15s = document.getElementById('toggle_15s');
    var $toggle_10s = document.getElementById('toggle_10s');
    var $toggle_05s = document.getElementById('toggle_05s');

    var options = {
        toggle_2min: $toggle_2min.checked,
        toggle_15s: $toggle_15s.checked,
        toggle_10s: $toggle_10s.checked,
        toggle_05s: $toggle_05s.checked,
        pc_mode: getPlayClockIndex()
    };

    localStorage.toggle_2min = options.toggle_2min;
    localStorage.toggle_15s = options.toggle_15s;
    localStorage.toggle_10s = options.toggle_10s;
    localStorage.toggle_05s = options.toggle_05s;
    localStorage.pc_mode = options.pc_mode;

    console.log('Got options: ' + JSON.stringify(options));
    return options;
}

function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return defaultValue || false;
}