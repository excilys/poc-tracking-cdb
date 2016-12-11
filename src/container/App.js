/**
 * Created by charles on 10/12/16.
 */

import React from "react";
import GitList from "./GitList";
import TraineeDetails from './TraineeDetails'

class App extends React.Component {

    render() {
        return (
            <div>
                <GitList />
                <TraineeDetails />
            </div>
        );
    }
}

export default App;
