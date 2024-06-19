import React from "react";

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                login: "Dummy",
                location: "Default",
                avatar_url: "https;//dummyphoto.com"
            }
        };

        console.log(this.props.name + "Child Constructor");
    }

    async componentDidMount() {
        // console.log(this.props.name + "Child Component Did Mount");
        const data = await fetch("https://api.github.com/users/hey-shashikant");
        const json = await data.json();

        this.setState({
            userInfo: json,    
        })
        console.log(json);

    }

    render() {

        // const {name, location} = this.props;
        // const {count} = this.state;
        const {login, location, twitter_username, avatar_url} = this.state.userInfo;

        console.log("Child Render")
        return (
            <div className="user-card">   
            <img src={avatar_url}></img> 
            <h1>{login}</h1>
            <h3>{location}</h3>
            <h4>{twitter_username}</h4>
        </div>
        );
    }
}

export default UserClass;