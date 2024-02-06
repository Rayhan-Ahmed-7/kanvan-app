import { useSelector } from "../../store";

const Sidebar = () => {
    const user = useSelector(state => state.user);
    console.log(user.username)
    return (
        <div>

        </div>
    );
};

export default Sidebar;