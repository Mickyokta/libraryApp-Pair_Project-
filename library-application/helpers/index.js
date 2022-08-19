function getCountDown(){
    return new Countdown({
        id: "ds-Countdown",
        targetTime: '2017-01-01 00:00:00',
        noDay: false,
        hideDayAtZero: false,
        separator: '/',
        afterEnd() {
          alert("Time over !")
        }
      });
}

module.exports = getCountDown