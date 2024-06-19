import { useEffect, useState } from "react";

const User = ({name}) => {
    const [count] = useState(0);
    const [count2] = useState(1);

    useEffect( () => {
        // API calls...
    }, []);

    return (
        <div className="user-card">
            <h1>Count: {count}</h1>
            <h1>Count2: {count2}</h1>
            <h1>{name}</h1>
            <h3>Location: Uttar Pradesh</h3>
            <h4>Contact: @hey-shashikant</h4>
        </div>
    )
}

export default User;