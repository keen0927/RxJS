function func1() {
    console.log('target click #1');
}
function func2() {
    console.log('target click #2');
}

// document.querySelector('#target').addEventListener('click',func1);
// document.querySelector('#target').addEventListener('click',func2);

// 이벤트 핸들러 : 이벤트를 등록만 해두면 나중에 이벤트가 발생했을때 알려준다. 그 후 콜백 함수가 실행됨.
// 즉 콜백 함수가 실행되기 전까지의 과정이 옵저버 패턴을 활용한 예

var Keen = (function(){
    function Keen() {
        this.subscribe = [];
        Keen.prototype.publish = function() {
            var self = this;
            this.subscribe.every(function(subscribe){
                subscribe.fire(self);
                return true;
            });
        };
        Keen.prototype.register = function(target) {
            this.subscribe.push(target);
        };
    }
    return Keen;
})();

var Sil = (function(){
    function Sil() {
        this.list = [];
    }
    Sil.prototype.subscribe = function(target) {
        this.list.push({
            target: target,
            point: 0,
        });
        target.register(this);
    }
    Sil.prototype.unsubscribe = function(target) {
        this.list = this.list.filter(function(person){
            return person.target !== target;
        });
    };
    Sil.prototype.fire = function(target) {
        this.list.some(function(person){
            console.log(person.target, target, person.target === target);
            if (person.target === target) {
                 ++person.point;
                 return true;
            }
        });
    };
    return Sil;
});

var keen = new Keen();
var sil = new Sil();

sil.subscribe(keen);
keen.publish();
console.log(sil.list);



// var Vespasianus = (function() {
//     function Vespasianus() {
//       this.subscribers = [];
//     }
//     Vespasianus.prototype.publish = function() {
//       var self = this;
//       this.subscribers.every(function(subscriber) {
//         subscriber.fire(self);
//         return true;
//       });
//     };
//     Vespasianus.prototype.register = function(target) {
//       this.subscribers.push(target);
//     };
//     return Vespasianus;
//   })();
  
//   var Mucianus = (function() {
//     function Mucianus() {
//       this.list = [];
//     }
//     Mucianus.prototype.subscribe = function(target) {
//       this.list.push({
//         target: target,
//         point: 0,
//       });
//       target.register(this);
//     };
//     Mucianus.prototype.unsubscribe = function(target) {
//       this.list = this.list.filter(function(person) {
//         return person.target !== target;
//       });
//     };
//     Mucianus.prototype.fire = function(target) {
//       this.list.some(function(person) {
//         console.log(person.target, target, person.target === target);
//         if (person.target === target) {
//           ++person.point;
//           return true;
//         }
//       });
//     };
//     return Mucianus;
//   })();

// var vespasianus = new Vespasianus();
// var mucianus = new Mucianus();
// mucianus.subscribe(vespasianus);
// vespasianus.publish();
// mucianus.list;


// RxJS응 옵저버 패턴을 적용한 옵저버블 이라는 객체를 중심으로 동작한다. 옵저버블은 특정 객체를 관찰하는 옵저버에게 여러 이벤트나 값을 보내는 역할을 한다.
// 옵저버블 객체안에 여러개의 값이나 이벤트를 취급하고 옵저버의 함수를 호출해 필요한 값이나 이벤트를 보내는 방식

// 하나의 값이나 이벤트를 다룸 = 싱글
// 여러개의 값, 이벤트를 다룸 = 멀티플
// 데이터를 받을지 경정하는 = 풀
// 데이터를 보낼지 결정하는 = 푸쉬
// 위의 4가지 개념이 있다. 

// 옵저버블 = 여러개 값을 보낼지 결정하는 개념
