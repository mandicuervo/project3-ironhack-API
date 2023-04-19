const mongoose = require('mongoose');
const { REQUIRED_FIELD } = require('../config/errorMessages');

const BeatSchema = new mongoose.Schema({
  beat: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  available: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    index: true,
    required: [true, REQUIRED_FIELD],
  },
  price: {
    type: Number,
    required: [true, REQUIRED_FIELD],
  },
  image: {
    type: String,
    default: 'https://play-lh.googleusercontent.com/ARszJA-aByYUrOMupplp_8pUUkibe3c35l2FWC0roGAbtE1j8dt6rE0ph5021vN-fw'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, REQUIRED_FIELD],
  },
  bpm: {
    type: Number,
    require: [true, REQUIRED_FIELD]
  },
  key: {
    type: String, 
    require: [true, REQUIRED_FIELD],
    enum: ['Cm', 'Dm', 'Em', 'Fm', 'Am', 'Gm', 'F#M', 'Bm', 'D#M', 'A#M', 'EbM', 'AbM', 'BbM', 'C#M', 'DbM', 'GbM', 'CbM', 'G#M', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] 
  },
  scale: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['Minor', 'Major']
  },
  genre: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['Cinematic', 'Hip-Hop', 'Trap', 'RnB', 'Pop', 'Electronic', 'Reggae', 'Underground', 'Old School', 'West Coast', 'East Cost', 'Drill', 'Reaggaeton', 'Rock', 'Soul', 'Club', 'New Soul', 'Pop Hip-Hop', 'Afro Beat', 'Gangsta', 'Dirty South', 'Dance Hall', 'Orchestral', 'World', 'Pop-Rap', 'Hyperpop', 'Alternative', 'Alternative RnB', 'Grime', 'Alternative Hip-Hop', 'House', 'Pop-Electronic', 'Indie Rock', 'Downtempo', 'Pop-Rock', 'Lo-Fi', 'Country', 'Hip-Hop Soul', 'Beats', 'Ambient', 'Indie', 'Dance', 'Funk', 'Funk Brazil', 'Boom Bap', 'Class Soul', 'Break Beat', 'K-Pop', 'Crunk', 'Instrumental Hip-Hop', 'Underground Hip-Hop', 'Drum and Bass', 'Rage Beats', 'Latin', 'Chill', 'Alternative Rock', 'Afro', 'Afro Pop', 'Freestyle Rap', 'Gangsta Rap', 'Uk Grime', 'Trip Hop', 'Old School Hip-Hop', 'Roots', 'Emo Hip-Hop', 'Lo-Fi Hip-Hop', 'Experimental Hip-Hop', 'Two Step', 'Pop Country', 'Cloud Rap', 'Dub', 'Contemporany Rb', 'Dubstep', 'Jersey Club', 'Smooth Rnb', 'California Sound', 'Synthwave', 'Jazz', 'Conscious Hip-Hop', 'Classical', 'Hardcore Hip-Hop', 'Folk', 'Classical Rock', 'Country Rock', 'Tropical House', 'Edm', 'Chillwave', 'Dance RnB', 'Pop 80s', 'Industrial', 'Metal', 'Latin Trap', 'G funk', 'Latin Pop', 'Jazz Rap', 'Electro Pop', 'Trance', 'Mumble Rap', 'Jazz Fusion', 'Samba', 'Bossa Nova', 'Cumbia']
  },
  mood: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['Bouncy', 'Dark', 'Energetic', 'Confident', 'Calm', 'Sad', 'Soulful', 'Inspiring', 'Angry', 'Relaxes', 'Quirky', 'Mellow', 'Accomplished', 'Crazy', 'Happy', 'Determoned', 'Powerful', 'Epic', 'Intense', 'Loved', 'Dirty', 'Depressed', 'Lonely', 'Evil', 'Hyper', 'Peaceful', 'Anxious', 'Flirty', 'Gloomy', 'Rebellious', 'Grateful', 'Adored', 'Eccentric', 'Neutral', 'Romantic', 'Crunk', 'Enraged', 'Annoyed', 'Lazy', 'Disappointed', 'Exciting', 'Tense', 'Giddy', 'Scared', 'Dramatic', 'Frantic', 'Silly', 'Majestic']
  },
  tags: {
    type: [String], 
  },
  instrument: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['Percussion', 'Piano', 'Bass Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Strings', 'Violin', 'Brass', 'Flute', 'Cymbals', 'Organ', 'Trumpet', 'Viola', 'Cello', 'Saxophone', 'Double Bass', 'Recorder', 'Banjo', 'Tambourine', 'Triangle', 'French HOrn', 'Ukulele', 'Trombone', 'Sitar', 'Harmonica', 'Piccolo', 'Harpsichord', 'Bassoon', 'Maracas', 'Clarinet', 'Mnadolin', 'Tuba', 'Oboe', 'Lute', 'Castanets', 'Bugle', 'Gong']
  },
  playingCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
});

BeatSchema.index({name: 'text'}, {instrument: 'text'});

const Beat = mongoose.model('Beat', BeatSchema);

module.exports = Beat;
