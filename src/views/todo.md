# Outline
  app
    --just a container for main
    main (Main)
      --master all purpose voices
      --allow storage and retrieval
      --offer modes?

      synth (Synth)
        --switch mode?
        keyboard (Keyboard)
          --sustain
          --set tonic?
          keys (KeyboardButton)
            --take pitch
            --determine shape based on pitch
        song (ShowSong)
          --show controls
          songnotes (SongNote)
            --represent note
            --edit notes
            --playbacks
            --interpret intervals (to show)



# Keyboard
make octave
add keys to keyboard
choose scale from menu (to highlight keys in that scale)
show intervals
set tonic note
for now make it reflect shape of keys on keyboard
will abstract the model

key
  -note to determine shape of key (c/f shape ) (b/e shape)
  -shapes b/c/d whites and 1 black
    -c notch right
    -b notch left
    -d double notch
    -black double notch half width?

play
  .nextVoice()
  .mainVoice()
  .lastVoice()


Make App the main and the view into components
(worry about mulitpage later)
