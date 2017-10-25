(function() {
  function SongPlayer() {

    /**
    * @desc Object to be returned by this service
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc currently selected song
    * @type {Object}
    */
    var currentSong = null;

 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
    var currentBuzzObject = null;





    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if(currentBuzzObject){
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };


    /**
    * @function playSong
    * @desc Plays current Buzz object and sets the 'playing' property of song to true
    * @param {Object} song
    */
    var playSong= function(song){
      currentBuzzObject.play();
      song.playing = true;
    };





    /**
    * @function this.play
    * @desc calls setSong() and playSong() if currentSong is not the one clicked. Otherwise this will play the currentSong or pause if it is already playing
    * @param {Object} song
    */
    SongPlayer.play = function(song) {

      if(currentSong !== song){
      setSong(song);

      playSong(song);

    } else if(currentSong === song) {
      if(currentBuzzObject.isPaused()) {
        playSong(song);
      }
      }

    };



    /**
    * @function this.pause
    * @desc pauses currently playing song and sets 'playing' attribute of song to false
    * @param {Object} song
    */
    SongPlayer.pause = function (song) {
      currentBuzzObject.pause();
      song.playing = false;
    };





    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  }) ();
