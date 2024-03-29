import React, { useContext } from 'react';
import { AppContext } from '../../app';

export const DefaultWorkoutList = props => {
  const defaultList = props.list;
  const workoutTitle = [];

  const { handleAddWorkout } = useContext(AppContext);

  defaultList.forEach(element => {
    if (workoutTitle.indexOf(element.bodyPart) === -1) {
      workoutTitle.push(element.bodyPart);
    }
  });

  return (
    <div id='accordionFlush' className='accordion container accordion-flush pt-3'>
        {
          workoutTitle.map((element, index) => {
            return (
                <div key={index} className='accordion-item card'>
                  <div className='card-header d-flex justify-content-center text-bg-light p-2' id={`flush-heading${index}`}>
                    <button className='collapsed dg-background' data-bs-toggle='collapse' data-bs-target={`#flush-collapse${index}`} aria-expanded='true' aria-controls={`flush-collapse${index}`}>
                      <h3 className='text-white'>
                        {element}
                      </h3>
                    </button>
                  </div>
                  <div id={`flush-collapse${index}`} className='collapse' aria-labelledby={`flush-heading${index}`} data-parent='#accordionFlush'>
                    <WorkoutDetails addWorkout={handleAddWorkout} list={defaultList} bodyPart={element}/>
                  </div>
                </div>
            );
          })
       }
  </div>
  );
};

const WorkoutDetails = props => {
  const workoutDetails = [];
  const defaultList = props.list;
  defaultList.forEach((element, index) => {
    if (element.bodyPart === props.bodyPart) {
      workoutDetails.push(
        <div id='accordionDetails' className='accordion' key={index} ref={props.reference}>
          <div className='accordion-item border'>
            <div className='container d-flex justify-content-around' onClick={props.addWorkout}>
              <h5 className='collapsed text-center col-6' data-bs-toggle='collapse' data-bs-target={`#collapse${index}`} aria-expanded='true' aria-controls={`collapse${index}`}>
                {element.name}
              </h5>
              <button className='col-1'>Add</button>
            </div>
            <div id={`collapse${index}`} className='collapse' aria-labelledby={`heading${index}`} data-parent='#accordionDetails'>
              <p className='border-top'>
                {element.details}
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
   <>
    {workoutDetails}
   </>
  );
};
