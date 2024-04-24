const workoutIteam = ({workout}) => {
    return(
        <div className="workoutIteam">
            <h2>{workout.title}</h2>
            <h4>WEIGHT(kg):{workout.weight}</h4>
            <h4>REPS:{workout.reps}</h4>
            <h4>SETS:{workout.sets}</h4>
            <h4>SET TIME(Mins):{workout.setTime}</h4>
            <h4>REST TIME(Mins):{workout.restTime}</h4>
        </div>
    )
}

export default workoutIteam