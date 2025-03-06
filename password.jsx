import React, { useState } from 'react';

const RandomPasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [wordCount, setWordCount] = useState(1);
  const [timeToCrack, setTimeToCrack] = useState('N/A');

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
  const attemptsPerSecond = 1000000;  // Assumption: 1 million attempts per second

  const generatePassword = () => {
    const wordList = ['apple', 'banana', 'cherry', 'date', 'elderberry']; // Example word list
    let generatedPassword = '';

    // Generate password based on word count
    for (let i = 0; i < wordCount; i++) {
      let word = '';
      for (let j = 0; j < passwordLength / wordCount; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        word += characters.charAt(randomIndex);
      }
      generatedPassword += word + (i < wordCount - 1 ? '-' : '');
    }

    setPassword(generatedPassword);

    // Calculate time to crack
    const numOfCombinations = Math.pow(characters.length, passwordLength);  // C^n
    const timeToCrackInSeconds = numOfCombinations / attemptsPerSecond;

    // Convert time to crack to more readable format
    let time;
    if (timeToCrackInSeconds < 60) {
      time = `${timeToCrackInSeconds.toFixed(2)} seconds`;
    } else if (timeToCrackInSeconds < 3600) {
      time = `${(timeToCrackInSeconds / 60).toFixed(2)} minutes`;
    } else if (timeToCrackInSeconds < 86400) {
      time = `${(timeToCrackInSeconds / 3600).toFixed(2)} hours`;
    } else {
      time = `${(timeToCrackInSeconds / 86400).toFixed(2)} days`;
    }

    setTimeToCrack(time);
  };

  const handleLengthChange =
