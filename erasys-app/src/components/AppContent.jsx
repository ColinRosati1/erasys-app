import React from 'react';

//Second Class for nested API extended user data
//renders detailed user data
//recieves user ID and constructs API call from that
class UserData extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
        <div>
            <h1>UserData</h1>
        </div>
        )
    }
}

//create User component to  put data into DOM
const UserComp = (props) => {
        console.log(props)
        return(
        <div>

        </div>
        )
}

//First class for API fetched data
//willmount method for fetch data, JSON check, map each into DOM
//renders basic user data
//pass user ID into second user detail
class Users extends React.Component {
    constructor(){
        super()
        this.state = {results: []};
    }
    componentDidMount(){
        const url = "/api/search?length=32";
        fetch("/api/search?length=32")
        .then( async (response) => {
            let data = await response.json()
            console.log(data.items)
            return data.items //await promised data
        })
        .then( async results => { 
            await this.setState({results}) 
            console.log(this.state);
        })
        .catch( err => console.log("error with user fetch data"))
    }
    render(){ // handle API data here. render each array object into DOM elements
        let items = this.state.results; // grab state data
        return(
            <div> users
                <div className="content-wrapper">
                {items.map(res => <div>
                    {console.log(res)}
                        <UserData />
                        <UserComp id={res.id} plus={res.is_plus} log={res.last_login} name={res.name} status={res.online_status} picture={res.picture}/>
                    </div>
                )}
                </div>
            </div>
        )
    }
}

function AppContent () {
  return (
    <div className="app-content">
        <Users/>
    </div>
  );
}

export default AppContent;
