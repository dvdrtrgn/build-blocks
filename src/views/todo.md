# Outline
  app
    --just a container for main
    main (Main)
      --master all purpose voices
      --allow storage and retrieval
      --offer modes?

      synth (ShowMuse)
        --switch mode?
        keyboard (Piano)
          --sustain
          --set tonic?
          pianokeys (PianoKey)
            --take pitch
            --determine shape based on pitch
        song (Song)
          --show controls
          songnotes (SongNote)
            --represent note
            --edit notes
            --playbacks
            --interpret intervals (to show)

# Wishes

dropdown to pick a tonic, scale

listener to always show the played notes

toggle for showing pitch name or interval relative to global tonic

dropdown to choose global mode
  --- keys to respond by tinting notes of that mode


interpreter that takes tonic and pitch and describes key shape

Piano Model
  keyshape lookup

  Piano Key Model



# Piano
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


// note stack
if time 0 ... remove
if note 0 ... rest
