//(function(){
//    "use strict";
//
//    var ekolor;
//
//    var ekolors = [
//        "#A9A8A9",
//        "#8CB7E8",
//        "#00ADBB",
//        "#3A5CAC",
//        "#7B6568",
//        "#B5A268",
//        "#FFB718",
//        "#FF4611",
//        "#DC0031"
//    ];
//
//    var kinect = EKjs.Kinect.getInstance();
//    var body = kinect.bodyFrame.getSelectedBody();
//
//
//    $(document).ready(function() {
//
//        var $loader = $('.loader');
//
//        var $loader__input = $(".loader__input");
//        $loader__input.knob({
//            'min':0,
//            'max':100,
//            'width':50,
//            'thickness':0.2,
//            'fgColor':"#FFB718",
//            'displayInput':false
//        });
//
//        //// GRID-LISTENERS ////
//        var tiles = document.getElementsByClassidle("element");
//
//        for (var i = tiles.length - 1; i >= 0; i--) {
//            body.pointer.addEventListener(EKjs.Kinect.Events.Pointer.OVER, functionOver,tiles[i]);
//            body.pointer.addEventListener(EKjs.Kinect.Events.Pointer.OUT, functionOut,tiles[i]);
//            body.pointer.addEventListener(EKjs.Kinect.Events.Pointer.HOLD_START, functionHoldStart,tiles[i],{handClosed:true});
//            body.pointer.addEventListener(EKjs.Kinect.Events.Pointer.HOLD_PROGRESS, functionHoldProgress,tiles[i],{handClosed:true});
//            body.pointer.addEventListener(EKjs.Kinect.Events.Pointer.HOLD_END, functionHoldEnd,tiles[i],{handClosed:true});
//        };
//
//
//        function functionHoldStart(target) {
//            $loader.css('opacity', '1');
//        };
//
//        function functionHoldProgress(target,progress) {
//            $loader__input.val((progress * 100)).trigger('change');
//
//        };
//
//        function functionHoldEnd(target,progress) {
//
//            var $target = $(target);
//
//            $loader.css('opacity', '0');
//
//            if($target.context && $target.context.href!=undefined)
//            {
//                document.location=$target.context.href;
//            }
//
//        };
//
//        function functionOver(target) {
//
//            var $target = $(target);
//
//            toggleBorderRadius($target,"circle","square");
//            $target.children('.element__zoom').css({
//                display:"block"
//            });
//        };
//
//        function functionOut(target) {
//
//            var $target = $(target);
//            $loader.css('opacity', '0');
//
//
//            $target.children('.element__zoom').css({
//                display:"none"
//            });
//            toggleBorderRadius($target,"square","circle");
//
//        };
//
//
//        function toggleBorderRadius($target,classActive, classInactive){
//            if ($target.hasClass(classActive)) {
//                $target.css({borderRadius: "0%"});
//            } else if ($target.hasClass(classInactive)) {
//                $target.css({borderRadius: "50%"});
//            }
//        }
//
//
//    });
//
//})();
//

/*
 Johnst State Machine
 */
var KinectStatemachine = function(transitions, currentIdleState, onStateChange){
    this.currentIdleState = currentIdleState;
    this.transitions = transitions;
    this.current = this.transitions[this.currentIdleState];
    this.onStateChange = onStateChange;
};

KinectStatemachine.prototype.handle = function(eventidle){
    if (this.current[eventidle]) {
        this.currentIdleState = this.current[eventidle];
        this.current = this.transitions[this.currentIdleState];
        if(this.onStateChange){
            this.onStateChange(this.currentIdleState);
        }
    }
};

/*
Team Member - listing actions in each member's videos
 */
var TeamMember = function() {


    function logStateChange(newState){
        console.log("state changed to "+newState);
    }

    // Cool: declarative state transitions!!!
    this.fsm = new KinectStatemachine({
            // state
            "ready" : {
                // event idle : new state
                "person-idling": "idle",
                "special-received" : "special",
                "noise-detected" : "noise",
                "dance-received" : "dance"
            },
        "idle":{
            "person-idling": "video/path",
            "idle-ready":"ready"
        },
            "noise" : {
                "noise-detected" : "video/path",
                "idle-ready":"ready"
            },
            "special" : {
                "special-received" : "video/path",
                "idle-ready":"ready"
            },
            "dance" : {
                "dance-received" : "video/path",
                "idle-ready":"ready"

            }
        },
        "ready",
        logStateChange.bind(this));
};

TeamMember.prototype.returnToReady = function() {
    this.fsm.handle("idle-ready");
};

TeamMember.prototype.performIdle = function() {
    this.fsm.handle("person-idling");
};

TeamMember.prototype.performSpecialIdle = function () {
    this.fsm.handle("special-received");
};

TeamMember.prototype.performNoise = function() {
    this.fsm.handle("noise-detected");
};

TeamMember.prototype.performDance = function () {
    this.fsm.handle("dance-received");
};




var tm = new TeamMember();
tm.returnToReady();
tm.performIdle();

tm.returnToReady();
tm.performSpecialIdle();

tm.returnToReady();
tm.performIdle();

tm.returnToReady();
tm.performNoise();

tm.returnToReady();
tm.performIdle();

tm.returnToReady();
tm.performDance();

tm.returnToReady();
tm.performIdle();