const initialState = {
    // define your initial state
  };
  
  const yourReducer = (state = initialState, action) => {
    switch (action.type) {
      // handle your actions here
      default:
        return state; // Make sure to return the current state by default
    }
  };
  
  export default yourReducer;
  