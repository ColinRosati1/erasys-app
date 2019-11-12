import React from 'react';
import '../styles/AppContent.css'

// has extra props for more user detailz
const UserDataComp = (props) => {
    if(!props){
        return(<div>User Error</div>)
    }

    return(
        <div className="usr-data">
            <div className="usr-headline">{props.headline}</div>
            <div className="usr-location">{props.location.city + " | " + props.location.distance + "m"}</div>
            {/* <div className="usr-headline">{props.headline}</div>     */}
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
            <UserDataComp headline={res.headline} location={res.location} personal={res.personal} sexual={res.sexual}/>
            </div>
        )}
        </div>)
    }
}

//create User component to  put data into DOM
// id: 1432659330859008
// log: "2019-11-10T14:26:54.876Z"
// name: "JohnFox"
// picture: {comment: "Bepdi be guc pogowibad nifet seldi cicho nu cobeowa ra idkidi hogup zunioj mukza cilik poiveafu.", url: "https://loremflickr.com/424/424/gay,man/all?lock=9475"}
// plus: false
// status: "ONLINE"
// TODO clean up user login date. it is UGLYYYY
// TODO handle img url string
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

        let obj = Object.create(props)
        if (typeof props.picture === "undefined"){ //test if picture prop is available
            console.log('the property is not available...',); // 
            // obj[picture] = 's'
            url = 'https://loremflickr.com/424/424/gay,man/all?lock=8764'
            return(
                <div className="usr-res">
                    <div className="usr-pic"><img src={url}></img></div>
                    <div className="usr-name">{props.name}</div>
                    <div className="usr-log">{props.log}</div> 
                    <div className="usr-status">{stat}</div>
                    <div className="usr-plus">{props.plus}</div>
                </div>
                )
        }else{
            return(
            <div className="usr-res">
                <div className="usr-pic"><img src={props.picture.url}></img></div>
                <div className="usr-name">{props.name}</div>
                <div className="usr-log">{props.log}</div> 
                <div className="usr-status">{stat}</div>
                <div className="usr-plus">{props.plus}</div>
                
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
                        <UserComp id={res.id} plus={res.is_plus} log={res.last_login} name={res.name} status={res.online_status} picture={res.picture}/>
                        <UserData id={res.id} />
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
