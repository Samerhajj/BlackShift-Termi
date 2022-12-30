

// This code defines a AvatarGenerator class that can be used to generate a random avatar image based on a seed value.
//The AvatarGenerator class has a single method called generateRandomAvatar
//which takes a seed as an input and uses it to initialize a random function using the seedrandom library.

// The generateRandomAvatar method then defines several arrays of options for different avatar features
//such as top type, accessories type, etc. These options arrays contain strings 
//that correspond to different options for each avatar feature. For example
//, the topTypeOptions array contains strings that correspond to different
//types of tops that the avatar can have (such as "NoHair", "Eyepatch", "Hat", etc.).

// The generateRandomAvatar method then uses the random function 
//to randomly select an option from each of the options arrays.
//It constructs an avatar image URL using these random selections and returns it.

// For example, if the topTypeOptions array contained the strings 
//"NoHair", "Eyepatch", "Hat", and the random function returned 0.5 
//when it was called, the generateRandomAvatar method 
//would select the "Eyepatch" option from the topTypeOptions array.

// The AvatarGenerator class can be used to generate a random avatar 
//image by creating an instance of the class and 
//calling the generateRandomAvatar method on it, like this:

// let avatarGenerator = new AvatarGenerator();
// let avatarImageUrl = avatarGenerator.generateRandomAvatar('my-seed');
// This would generate a random avatar image URL based on the seed value 'my-seed'.
//If you used the same seed value again, the same avatar image would be generated.
//If you used a different seed value, a different avatar image would be generated.

import seedrandom from "seedrandom";

class AvatarGenerator {
  constructor() {}

  generateRandomAvatar(seed) {
      
      
      let avatarStyleOptions=[
          "Circle",
          "Transparent"
          ];
      
    let topTypeOptions = [
      "NoHair",
      "Eyepatch",
      "Hat",
      "Hijab",
      "Turban",
      "WinterHat1",
      "WinterHat2",
      "WinterHat3",
      "WinterHat4",
      "LongHairBigHair",
      "LongHairBob",
      "LongHairBun",
      "LongHairCurly",
      "LongHairCurvy",
      "LongHairDreads",
      "LongHairFrida",
      "LongHairFro",
      "LongHairFroBand",
      "LongHairNotTooLong",
      "LongHairShavedSides",
      "LongHairMiaWallace",
      "LongHairStraight",
      "LongHairStraight2",
      "LongHairStraightStrand",
      "ShortHairDreads01",
      "ShortHairDreads02",
      "ShortHairFrizzle",
      "ShortHairShaggyMullet",
      "ShortHairShortCurly",
      "ShortHairShortFlat",
      "ShortHairShortRound",
      "ShortHairShortWaved",
      "ShortHairSides",
      "ShortHairTheCaesar",
      "ShortHairTheCaesarSidePart"
    ];

    let accessoriesTypeOptions = [
      "Blank",
      "Kurt",
      "Prescription01",
      "Prescription02",
      "Round",
      "Sunglasses",
      "Wayfarers"
    ];

    let facialHairTypeOptions = [
      "Blank",
      "BeardMedium",
      "BeardLight",
      "BeardMagestic",
      "MoustacheFancy",
      "MoustacheMagnum"
    ];

    let facialHairColorOptions = [
      "Auburn",
      "Black",
      "Blonde",
      "BlondeGolden",
      "Brown",
      "BrownDark",
      "Platinum",
      "Red"
    ];

    let clotheTypeOptions = [
      "BlazerShirt",
      "BlazerSweater",
      "CollarSweater",
      "GraphicShirt",
      "Hoodie",
      "Overall",
      "ShirtCrewNeck",
      "ShirtScoopNeck",
      "ShirtVNeck"
    ];

    let eyeTypeOptions = [
      "Close",
      "Cry",
      "Default",
      "Dizzy",
      "EyeRoll",
      "Happy",
      "Hearts",
      "Side",
      "Squint",
      "Surprised",
      "Wink",
      "WinkWacky"
    ];

    let eyebrowTypeOptions = [
      "Angry",
      "AngryNatural",
      "Default",
      "DefaultNatural",
      "FlatNatural",
      "RaisedExcited",
      "RaisedExcitedNatural",
      "SadConcerned",
      "SadConcernedNatural",
      "UnibrowNatural",
      "UpDown",
      "UpDownNatural"
    ];

    let mouthTypeOptions = [
      "Concerned",
      "Default",
      "Disbelief",
      "Eating",
      "Grimace",
      "Sad",
      "ScreamOpen",
      "Serious",
      "Smile",
      "Tongue",
      "Twinkle",
      "Vomit"
    ];

    let skinColorOptions = [
      "Tanned",
      "Yellow",
      "Pale",
      "Light",
      "Brown",
      "DarkBrown",
      "Black"
    ];

  let random = seedrandom(seed);
    let avatarStyle=avatarStyleOptions[Math.floor(random()*avatarStyleOptions.length)];
    let topType = topTypeOptions[Math.floor(random() * topTypeOptions.length)];
    let accessoriesType =
      accessoriesTypeOptions[Math.floor(random() * accessoriesTypeOptions.length)];
    let facialHairType =
      facialHairTypeOptions[Math.floor(random() * facialHairTypeOptions.length)];
    let facialHairColor =
      facialHairColorOptions[Math.floor(random() * facialHairColorOptions.length)];
    let clotheType = clotheTypeOptions[Math.floor(random() * clotheTypeOptions.length)];
    let eyeType = eyeTypeOptions[Math.floor(random() * eyeTypeOptions.length)];
    let eyebrowType =
      eyebrowTypeOptions[Math.floor(random() * eyebrowTypeOptions.length)];
    let mouthType = mouthTypeOptions[Math.floor(random() * mouthTypeOptions.length)];
    let skinColor = skinColorOptions[Math.floor(random() * skinColorOptions.length)];


 return (
      "https://avataaars.io/" +
      "?" +
      "topType=" +
      topType +
      "&avatarStyle="+
      avatarStyle +
      "&accessoriesType=" +
      accessoriesType +
      "&facialHairType=" +
      facialHairType +
      "&facialHairColor=" +
      facialHairColor +
      "&clotheType=" +
      clotheType +
      "&eyeType=" +
      eyeType +
      "&eyebrowType=" +
      eyebrowType +
      "&mouthType=" +
      mouthType +
      "&skinColor=" +
      skinColor
    );
  }
}

export default AvatarGenerator;