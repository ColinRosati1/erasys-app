import React from 'react';
import '../styles/AppContent.css'

// extra props for more user detailz
// I dont like this hover style solution
// TODO make some sort of fixed position info element with active data. event listener on parent rather then nested hover parent in sass
const UserDataHoverComp = (props) => {
    if(!props){
        return(<div>User Error</div>) // return props error
    }

    return(
        <div className="usr-data-hover">
            <div className="usr-personal">{props.personal.body_hair}<br/>{props.personal.body_type}<br/>{props.personal.ethnicity}<br/>{props.personal.eye_color}<br/>{props.personal.height.cm}<br/>{props.personal.relationship}<br/>{props.personal.weight.kg}</div>
            <div className="usr-sexual">{"anal position " + props.sexual.anal_position}<br/>{"safer sex " + props.sexual.safer_sex}<br/>{"sm " + props.sexual.sm}</div>
        </div>
    )
}

// populate the rest of the manditory user data 
const UserDataComp = (props) => {
    if(!props){
        return(<div>User Error</div>)
    }

    return(
        <div className="usr-data">
            <div className="usr-age">{props.age + " y/o"}</div>
            <div className="usr-headline">{props.headline}</div>
            <div className="usr-location">{props.location.city + " | " + props.location.distance + "m"}</div>
        </div>
    )
}

//Second Class for nested API extended user data
//renders detailed user data
//recieves user ID and constructs API call from that
class UserData extends React.Component {
    constructor(){
        super()
        this.state = {results: []};
    }

    componentDidMount(){
        fetch("/api/profiles?ids="+this.props.id) // call api endpoint
        .then( async (response) => {
            let data = await response.json()
            return data //await promised data
          })  
          .then(async(results) => {
                await this.setState({results})
            })
    }
    render(){
        let items = this.state.results;
        return(<div className={"usr-body"}>
            {items.map( res => <div>
            <UserDataComp headline={res.headline} location={res.location} personal={res.personal} age={res.personal.age} sexual={res.sexual}/>
            <UserDataHoverComp personal={res.personal} sexual={res.sexual}/>
            </div>
        )}
        </div>)
    }
}

// return the time n mins since last longed in
// coerse date format so can subract two dates
// TODO round minutes to hours , days etc
const LastLog = (time) => {
       
       // To set two dates to two variables 
       var d1 = new Date(); 
       var d2 = new Date(time); 

       function _diff_minutes(dt2, dt1){
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
        }
 
        var lastLog = _diff_minutes(d1, d2) + " minutes ago"
    return lastLog;
}

//create User component to  put data into DOM
// TODO handle img url props bug
const UserComp = (props) => {
        if(!props){
            return(<div>User Error</div>)
        }
        var stat, url = ''
        if(props.plus === true){
            stat = '+'
        }else{
            stat = '-'
        }
        let time = LastLog(props.log)

        let obj = Object.create(props)
        if (typeof props.picture === "undefined"){ //test if picture prop is available
            console.log('the url property is not available...',); // 
            // obj[picture] = 's'
            url = 'https://loremflickr.com/424/424/gay,man/all?lock=8764'
            return(
                <div className="usr-res">
                    <div className="usr-pic"><img src={url}></img></div>
                    <div className="usr-title"><div className="usr-name">{props.name}</div><div className="usr-plus">{stat}</div></div>
                    <div className="usr-log">{time}</div> 
                </div>
                )
        }else{
            return(
            <div className="usr-res">
                <div className="usr-pic"><img src={props.picture.url}></img></div>
                <div className="usr-title"><div className="usr-name">{props.name + "  "}</div><div className="usr-plus">{"  " + stat}</div></div>
                    <div className="usr-log">{time}</div> 
            </div>
            )
        }
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
            return data.items //await promised data
        })
        .then( async results => { 
            await this.setState({results}) 
        })
        .catch( err => console.log("error with user fetch data"))
        
    }
    render(){ // handle API data here. render each array object into DOM elements
        let items = this.state.results; // grab state data
        return(
            <div>
                <div className="content-wrapper">
                {items.map(res => <div className="profile">
                        <UserComp key={res.id} id={res.id} plus={res.is_plus} log={res.last_login} name={res.name} status={res.online_status} picture={res.picture}/>
                        <UserData id={res.id} />
                    </div>
                )}
                </div>
            </div>
        )
    }
}

// render everything
function AppContent () {
  return (
    <div className="app-content">
        <Users/>
    </div>
  );
}

export default AppContent;
