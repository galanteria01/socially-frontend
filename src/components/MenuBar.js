import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

const MenuBar = () => {

    const pathName = window.location.pathname;
    const path = pathName === "/" ? 'home' : pathName.substr(1);
    const [active, setActive] = useState(path);

    const handleItemClick = (e, { name }) => setActive(name)

    return (
        <div>
            <Menu pointing secondary size="massive" color="green">
                <Menu.Item
                    name='home'
                    active={active === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={active === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name='register'
                        active={active === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>

        </div>
    )
}

export default MenuBar
