import React, { useState, useContext } from 'react';
import { CalorieResult } from './calories-result';
import { AppContext } from '../app';
import Button from 'react-bootstrap/Button';

export const Calories = () => {
  const { userData, setUserData, setCalories, calories, user, day } = useContext(AppContext);
  const [modalStatus, setStatus] = useState(false);
  // setUserData({...userData, gender: event.target.value})
  // s
  // calculation
  // For women = BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)
  // For men = BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)

  function plannerReturn() {
    window.location.hash = day;
  }
  const handleClose = () => setStatus(false);
  const handleShow = () => setStatus(true);

  const calorieCalculation = data => {
    const { gender, currentWeight, height, age, activityLevel, goal } = data;
    let bmr = null;
    let calories = null;

    const kgConversion = 0.453592;
    const cmConversion = 2.54;

    if (gender === 'male') {
      bmr = 66.47 + (13.75 * (currentWeight * kgConversion)) + (5.003 * (height * cmConversion)) - (6.755 * age);
    } else {
      bmr = 655.1 + (9.563 * (currentWeight * kgConversion)) + (1.850 * (height * cmConversion)) - (4.676 * age);
    }

    switch (activityLevel) {
      case 'sedentary':
        calories = bmr * 1.2;
        break;
      case 'lightly active':
        calories = bmr * 1.375;
        break;
      case 'moderately active':
        calories = bmr * 1.55;
        break;
      case 'active':
        calories = bmr * 1.725;
        break;
      case 'very active':
        calories = bmr * 1.9;
        break;
      default:
        calories = 0;
    }

    switch (goal) {
      case 'lose':
        calories = calories - 800;
        break;
      case 'gain':
        calories = calories + 800;
        break;
      default:
        calories = calories + 0;
    }
    return Math.round(calories);
  };

  async function updateCalories(userData) {
    const userId = user.userId;
    let req = {};

    if (!calories) {
      req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData, userId })
      };
    }

    req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userData, userId })
    };

    // console.log(req);
    await (await fetch('/api/caloriesData', req)).json();

  }

  const calorieSubmit = event => {
    event.preventDefault();
    // console.log('userData after form submit:', userData);
    // console.log(calorieCalculation(userData));
    const result = calorieCalculation(userData);
    setCalories(result);
    updateCalories(result);
  };

  const handleGender = event => {
    const { value } = event.target;
    setUserData({ ...userData, gender: value });
  };

  const handleWeight = event => {
    const { value } = event.target;
    setUserData({ ...userData, currentWeight: parseInt(value) });
  };

  const handleHeight = event => {
    const { value } = event.target;
    setUserData({ ...userData, height: parseInt(value) });
  };

  const handleAge = event => {
    const { value } = event.target;
    setUserData({ ...userData, age: parseInt(value) });
  };

  const handleActivity = event => {
    const { value } = event.target;
    setUserData({ ...userData, activityLevel: value });
  };

  const handleGoal = event => {
    const { value } = event.target;
    setUserData({ ...userData, goal: value });
  };

  return (
     <>
        <div className='text-form-container'>
          <p className='text-style'>
            Knowing how many calories you need to consume each day is essential
            for losing, gaining or maintaining your weight. The formula used here
            is the Harris-Benedict Formula. It takes your estimated BMR (basal metabolic
             rate) along with your activity level to calculate your recommended
            caloric intake to help guide you in your fitness goals.
          </p>
        </div>
        <div>
        <form className='calorie-form-container' onSubmit={calorieSubmit}>
           <div className='calorie-content'>
            <div>
             <label htmlFor='gender'>
                Gender:
             </label>
            </div>
            <div className='calorie-sizing'>
              <select required className='input-sizing-select' name="gender" id="gender" onChange={handleGender} defaultValue={userData.gender}>
                <option value="" selected disabled>Select:</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className='calorie-content'>
          <div>
            <label htmlFor="currentWeight">Current Weight:</label>
          </div>
          <div className='calorie-sizing'>
            <input
              required
              className='input-sizing'
              type="text"
              name="currentWeight"
              id='currentWeight'
              placeholder='Current weight in lbs...'
              onChange={handleWeight}
            />
          </div>
          </div>
          <div className='calorie-content'>
            <div>
              <label htmlFor="height">Height:</label>
            </div>
            <div className='calorie-sizing'>
              <input
                required
                className='input-sizing'
                type="text"
                name="height"
                id='height'
                placeholder='Height in inches..'
                onChange={handleHeight}
                />
            </div>
          </div>
          <div className='calorie-content'>
                <label htmlFor="age">Age:</label>
            <div className='calorie-sizing'>
              <input
                required
                className='input-sizing'
                type="text"
                name="age"
                id='age'
                onChange={handleAge}
                />
            </div>
          </div>
          <div className='calorie-content'>
            <div>
              <label htmlFor="activityLevel">Activity Level:</label>
            </div>
            <div className='calorie-sizing'>
              <select required className='input-sizing-select' name="activityLevel" id="activityLevel" onChange={handleActivity}>
                <option value="" selected disabled>Select activity level:</option>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightly active">Lightly active (exercise 1-3 days/week)</option>
                <option value="moderately active">Moderately active (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very active">Very Active (hard exercise 6-7 days/week)</option>
              </select>
            </div>
          </div>
          <div className='calorie-content'>
            <div>
             <label htmlFor="goal">Fitness Goal:</label>
            </div>
            <div className='calorie-sizing'>
              <select required className='input-sizing-select' name="goal" id="goal" onChange={handleGoal}>
                <option value="" selected disabled>Select fitness goal:</option>
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
          </div>
          <div className='calorie-button'>
            <Button className='logo-header' type='submit' variant="light" onClick={handleShow}>
              Submit
            </Button>
          </div>
          {/* <button type='submit' data-bs-toggle='modal' data-bs-target='#modal-view'>Submit</button> */}
      </form>
    </div>
    {
        modalStatus
          ? <CalorieResult show={modalStatus} onHide={handleClose} onBack={plannerReturn}/>
          : null
    }
    </>
  );
};
